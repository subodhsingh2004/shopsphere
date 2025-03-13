import { Router } from "express";
import { addNewOrder } from "../controllers/order.controller.js";

const router = Router();

router.route('/add-new-order').post(addNewOrder)

export default router;