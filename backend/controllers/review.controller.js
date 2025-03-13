import { Product } from "../models/ProductModel.js";
import { Review } from "../models/ReviewModel.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addReview = asyncHandler(async function (req, res) {
    const { productId, userId, comment, rating } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    const addedReview = await Review.create({
        user: userId,
        product: productId,
        rating,
        comment
    })

    return res.status(201).json({ addedReview })
})

const getReviews = asyncHandler(async function (req, res) {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate("user", "username email")

    return res.status(200).json({ reviews })
})

export { addReview, getReviews }