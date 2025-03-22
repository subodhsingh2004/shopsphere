import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/OrderModel.js";
import { instance } from "../index.js"
import crypto from "crypto"
import { Product } from "../models/ProductModel.js";

const checkout = asyncHandler(async function (req, res) {
    const { productsPrice, products, user } = req.body

    const options = {
        amount: Number(productsPrice * 100), // in paise
        currency: 'INR',
    }

    const razorpayOrder = await instance.orders.create(options)

    // create order items
    const orderItems = products.map(product => {
        return {
            productId: product._id,
            quantity: product.quantity
        }
    })

    // order to save in the database
    const order = new Order({
        razorpay_order_id: razorpayOrder.id,
        customer: user._id,
        items: orderItems,
        totalAmount: productsPrice
    })
    await order.save({ validateBeforeSave: false })

    res.json({ razorpayOrder, order })
})

const paymentVerification = asyncHandler(async function (req, res) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest('hex')


    // if payment is failed then delete the order from database
    const isAuthenticated = expectSignature === razorpay_signature
    if (!isAuthenticated) {
        await Order.findOneAndDelete({ razorpay_order_id: razorpay_order_id })
        throw new ApiError(402, "Payment verification failed")
    }

    const order = await Order.findOne({ razorpay_order_id: razorpay_order_id })
    if (!order) {
        throw new ApiError(404, "Order not found")
    }

    // reduce the no of stock from db according to the product quantity
    const orderedProducts = order.items
    for (let product of orderedProducts) {
        const productFromDb = await Product.findById(product.productId)
        if (!productFromDb) {
            throw new ApiError(404, "Product not found")
        }
        productFromDb.quantity -= product.quantity
        productFromDb.purchaseCount += product.quantity
        await productFromDb.save({ validateBeforeSave: false })
    }

    // add the product to the user order history
    const user = await User.findById(order.customer)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    order.items.map(product => {
        user.orderHistory.push({
            orderId: order._id,
            orderedProducts: product.productId,
            orderDate: Date.now(),
            orderStatus: "Completed",
            orderedQuantity: product.quantity
        })
    })

    user.cart = []

    await user.save({ validateBeforeSave: false })

    // send the order confirmation email to the user

    // save the order in database
    if (order) {
        order.orderStatus = "Completed"
        order.save({ validateBeforeSave: false })
    }

    // res.redirect(`/order-success/${order._id}`)  // this is for development
    res.redirect(`https://shopsphere-80d1.onrender.com/order-success/${order._id}`)
    res.status(200).json(order)
})

const addNewOrder = asyncHandler(async function (req, res) {
    const { userId, items, totalAmount, shippingAddress } = req.body;

    if (!items || !totalAmount || !shippingAddress) {
        throw new ApiError(400, "All fields are requied")
    }

    // find user 
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "Something went wrong");
    }

    // const paymentInfo = {
    //     paymentMethod,
    //     paymentTransactionId,
    //     amountPaid,
    //     paymentDate,
    //     refundStatus
    // }

    const order = await Order.create({
        items,
        customer: user,
        shippingAddress,
    })

    return res.status(200).json(order)

})

const getAllOrder = asyncHandler(async function (req, res) {
    const orders = await Order.find()
    return res.status(200).json(orders)
})

const generateReceipt = asyncHandler(async function (req, res) {
    const { orderId } = req.params

    // find the order
    const order = await Order.findOne({ _id: orderId }).populate("customer", "username email phoneNumber")
    .populate("items.productId", "name price image")

    if (!order) {
        return new ApiError(404, "Order not found")
    }

    res.status(200).json(order)

})

export { checkout, paymentVerification, addNewOrder, getAllOrder, generateReceipt }