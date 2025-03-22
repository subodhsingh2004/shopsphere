import { Types } from "mongoose";
import { Product } from "../models/ProductModel.js";
import { Review } from "../models/ReviewModel.js";
import { User } from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addReview = asyncHandler(async function (req, res) {
    const { productId, userId, review, rating } = req.body;

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
        review
    })

    return res.status(201).json({ addedReview })
})

const getReviews = asyncHandler(async function (req, res) {
    const { productId } = req.params;
    const { limit, skip } = req.query;

    const reviews = await Review.find({ product: productId }).populate("user", "username email")
        .limit(limit).skip(skip)

    if (!reviews) {
        throw new ApiError(404, "Reviews not found")
    }

    const totalReviews = await Review.countDocuments({ product: productId })
    const totalPages = Math.ceil(totalReviews / limit)

    const rating = await Review.find({ product: productId }).select("rating")
    if(rating.length === 0){
        return res.status(200).json({ reviews, totalPages, avgRating: 0 })
    }

    const avgRating = rating.reduce((acc, item) => acc + item.rating, 0) / rating.length

    return res.status(200).json({ reviews, totalPages, avgRating })
})

export { addReview, getReviews }