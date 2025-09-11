import { Router } from "express";
import { editUserInfo, getUserInfo, logoutUser, userLogin, userOrders, userSignup } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js"

const router = Router()

router.route('/signup').post(userSignup)
// router.route('/signup/otp-verification').post(OTPVerification, userSignupVerification)
router.route('/login').post(userLogin)
router.route('/logout').post(logoutUser)

router.route('/user-info/:userId').get(verifyJWT, getUserInfo)
router.route('/update').put(verifyJWT, editUserInfo)
router.route('/orders/:userId').get(verifyJWT, userOrders)

export default router