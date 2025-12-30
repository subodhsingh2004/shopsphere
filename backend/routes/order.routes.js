import { Router } from "express";
import { addNewOrder, checkout, generateReceipt, paymentVerification } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const limiter = (maxRequests) => rateLimit({
    windowMs: 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 429, message: "Too many requests, Please try again later." }
});

const router = Router();

router.use(limiter(10));
router.route('/checkout').post(verifyJWT, checkout)
router.route('/payment-verification').post(verifyJWT, paymentVerification)
router.route('/add-new-order').post(verifyJWT, addNewOrder)
router.route('/generate-receipt/:orderId').get(generateReceipt)

export default router;