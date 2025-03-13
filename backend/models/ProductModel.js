import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    details: {
        type: [],
        required: true,
        default: []
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Men', 'Women', 'Kids', 'Beauty', 'Accessories', 'Home', 'Smartphones', 'Footwear']
    },
    productSpecification: {
        type: Object,
        // required: true,
        default: {}
    },
    purchaseCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {timestamps: true})

productSchema.pre("save", async function () {
    if(this.isModified()) this.updatedAt = Date.now()
})

export const Product = mongoose.model("Product", productSchema)