import { Router } from 'express';
import { addReview, getReviews } from '../controllers/review.controller.js';
import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,  
  standardHeaders: true, 
  legacyHeaders: false, 
  message: { status: 429, message: "Too many requests, Please try again later." }
});

const router = Router();

router.use(limiter);
router.route('/add-review').post(addReview)
router.route('/get-reviews/:productId').get(getReviews)
export default router;
