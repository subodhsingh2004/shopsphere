import { ApiError } from "../utils/ApiError.js";

let otps = {}

export const generateOTP = (email) => {
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    const validTime = Date.now() + 60000*10

    otps[email] = {
        otp,
        validFor: validTime
    }

    setTimeout(() => {
        delete otps[email]
    }, 60000*10);

    return otp;
}


export const verifyOTP = (OTP, email) => {
    const otpInfo = otps[email]   
    console.log(otpInfo) 
 
    if(!otpInfo){
        throw new ApiError(403, "OTP not found")
    }

    const {otp, validFor} = otpInfo

    if(otp === OTP && Date.now() < validFor){
        delete otps[email]
        return true
    }else{
        return false
    }
}