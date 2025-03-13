import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/OrderModel.js";

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

export { addNewOrder, getAllOrder }