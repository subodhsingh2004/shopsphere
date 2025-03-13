import { Router } from "express";
import { editUserInfo, logoutUser, userLogin, userSignup, userSignupVerification } from "../controllers/user.controller.js";
import OTPVerification from "../middlewares/OTPVerification.js";

const router = Router()

router.route('/signup').post(userSignup) 
router.route('/signup/otp-verification').post(OTPVerification, userSignupVerification) 
router.route('/login').post(userLogin)
router.route('/logout').post(logoutUser)

router.route('/update').put(editUserInfo)

export default router