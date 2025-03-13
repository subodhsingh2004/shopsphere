import { verifyOTP } from "../services/OTPservice.js";
import { ApiError } from "../utils/ApiError.js";

const OTPVerification = (req, res, next) => {
    const { email, otp } = req.body
    
    if (!email || !otp) {
        throw new ApiError(403, "email and otp are required")
    }

    const isOTPValid = verifyOTP(otp, email)
    if(!isOTPValid){
        throw new ApiError(401, "OTP is either not valid or has been expired")
    }

    next()
}

export default OTPVerification