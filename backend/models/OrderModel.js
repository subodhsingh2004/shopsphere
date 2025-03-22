import mongoose from "mongoose";
import { AdressSchema } from "./AddressModel.js";

const paymentSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded", "wating_for_delivery"],
        default: "pending"
    },
    paymentTransactionId: {
        type: String,
        required: function () { return this.paymentMethod !== "cash_on_delivery" }
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: null
    },
    refundStatus: {
        type: String,
        default: "pending"
    },
})

const orderSchema = new mongoose.Schema({
    razorpay_order_id:{
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: AdressSchema
    },
    orderStatus: {
        type: String,
        default: "Pending"
    },
    paymentMethod: {
        type: String,
    },
    paymentStatus: {
        type: String,
    }
}, { timestamps: true })

// orderSchema.pre('save', function (next) {
//     if (this.paymentInfo.paymentMethod === "cash_on_delivery") {
//         this.paymentInfo.paymentDate = null
//     }
//     else this.paymentInfo.paymentDate = Date.now()

//     next()
// })

export const Order = mongoose.model("Order", orderSchema)