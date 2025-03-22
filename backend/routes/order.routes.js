import { Router } from "express";
import { addNewOrder, checkout, paymentVerification } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();
router.route('/checkout').post(verifyJWT, checkout)
router.route('/payment-verification').post(verifyJWT, paymentVerification)
router.route('/add-new-order').post(verifyJWT, addNewOrder)

export default router;