import Razorpay from "razorpay";
import { app } from "./app.js";
import connectDB from "./db/index.js";

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server is running")
        })
    })
    .catch((error) => {
        console.log("monogodb connection failed", error)
    })