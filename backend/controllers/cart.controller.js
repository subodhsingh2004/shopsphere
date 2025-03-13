import { Product } from "../models/ProductModel.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addProductToCart = asyncHandler(async function (req, res) {
    const { productId, userId } = req.body;

    console.log(productId)

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    const productForCart = {
        name: product.name,
        price: product.price,
        quantity: 1,
        _id: productId
    }

    user.cart.push(productForCart);
    await user.save();

    return res.status(200).json({
        message: "Product Added Successfully",
        product: productForCart
    })

})

const getProductsOfCart = asyncHandler(async function (req, res) {
    const { userId } = req.body;

    const user = await User.findById("67485a047502990ca123953d").select("cart");
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const userCartProducts = await user.populate("cart")

    return res.status(200).json(userCartProducts.cart)
})

const updateProductsOfCart = asyncHandler(async function (req, res) {
    const { userId, productId, quantity } = req.body;

    console.log(quantity)

    const user = await User.findById(userId).select("cart");
    if (!user) {
        throw new ApiError(404, "User not found")
    }


    const updatedProduct = user.cart.find((product) => product._id == productId)
    updatedProduct.quantity = quantity;

    await user.save();

    return res.status(200).json({updatedProduct})
})

const removeProductsOfCart = asyncHandler(async function (req, res) {
    const { userId, productId } = req.body
    
    // find user
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(500, "Something went wrong")
    }

    const removedProduct = user.cart.find(p => p._id.toString() === productId)
    
    // find product in user cart
    user.cart = user.cart.filter(p => p._id != productId)
    await user.save();
    
    res.status(200).json({
        message: "Removed successfully",
        product: removedProduct
    })
})

export { addProductToCart, getProductsOfCart, updateProductsOfCart, removeProductsOfCart }