import { Router } from "express";
import { addProductToCart, getProductsOfCart, removeProductsOfCart, updateProductsOfCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.route('/add-to-cart').post(verifyJWT, addProductToCart)
router.route('/get-cart-products/:userId').get(verifyJWT, getProductsOfCart)
router.route('/update-cart-products').patch(verifyJWT, updateProductsOfCart)
router.route('/remove-cart-products').delete(verifyJWT, removeProductsOfCart)


export default router;