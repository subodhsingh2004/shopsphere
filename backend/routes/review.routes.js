import { Router } from 'express';
import { addReview, getReviews } from '../controllers/review.controller.js';

const router = Router();

router.route('/add-review').post(addReview)
router.route('/get-reviews/:productId').get(getReviews)
export default router;
