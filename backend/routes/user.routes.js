import { Router } from "express";
import { editUserInfo, getUserInfo, logoutUser, userLogin, userOrders, userSignup } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js"
import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,  
  standardHeaders: true, 
  legacyHeaders: false, 
  message: { status: 429, message: "Too many requests, Please try again later." }
});

const router = Router()

router.use(limiter);
router.route('/signup').post(userSignup)
// router.route('/signup/otp-verification').post(OTPVerification, userSignupVerification)
router.route('/login').post(userLogin)
router.route('/logout').post(logoutUser)

router.route('/user-info/:userId').get(verifyJWT, getUserInfo)
router.route('/update').put(verifyJWT, editUserInfo)
router.route('/orders/:userId').get(verifyJWT, userOrders)

export default router