import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    }

}, {timestamps: true})

export const Review = mongoose.model('Review', reviewSchema)