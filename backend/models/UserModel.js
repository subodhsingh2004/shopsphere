import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import { AdressSchema } from "./AddressModel.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        unique: [true, "Phone number should be unique"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (v) {
                if (v.length < 8) {
                    throw new ApiError(500, "Password length must be 8", "Password_Length_Error");
                }
                return true;
            },
        }
    },
    address: {
        type: AdressSchema,
    },
    orderHistory: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
            orderedProducts: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }],
            orderDate: { type: Date },
            orderStatus: { type: String },
            orderedQuantity: { type: Number }
        }
    ],
    cart: [
        {
            name: { type: String },
            image: { type: String },
            price: { type: Number },
            quantity: { type: Number }
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true })


userSchema.pre("save", async function () {
    if (this.isModified()) this.updatedAt = Date.now()
})

// hashing the password
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

// function to check password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)