import { Product } from "../models/ProductModel.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addProductToCart = asyncHandler(async function (req, res) {
    const { productId, quantity, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    const isProductExist = user.cart.find(p => p._id.toString() === productId)
    // if product already exist in cart 
    if (isProductExist) {
        throw new ApiError(400, "Product already exist in cart")
    }

    const productForCart = {
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity,
        _id: productId
    }

    user.cart.push(productForCart);
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
        message: "Product Added Successfully",
        product: productForCart
    })

})

const getProductsOfCart = asyncHandler(async function (req, res) {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(404, "Invalid UserId")
    }

    const user = await User.findById(userId).select("cart");
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const userCartProducts = await user.populate("cart")

    return res.status(200).json(userCartProducts.cart)
})

const updateProductsOfCart = asyncHandler(async function (req, res) {
    const { userId, productId, quantity } = req.body;

    const user = await User.findById(userId).select("cart");
    if (!user) {
        throw new ApiError(404, "User not found")
    }


    const updatedProduct = user.cart.find((product) => product._id == productId)
    updatedProduct.quantity = quantity;

    await user.save();

    return res.status(200).json({ updatedProduct })
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
    await user.save({validateBeforeSave: false});

    res.status(200).json({
        message: "Removed successfully",
        product: removedProduct
    })
})

export { addProductToCart, getProductsOfCart, updateProductsOfCart, removeProductsOfCart }