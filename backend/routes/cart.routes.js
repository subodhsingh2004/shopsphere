import { Router } from "express";
import { addProductToCart, getProductsOfCart, removeProductsOfCart, updateProductsOfCart } from "../controllers/cart.controller.js";

const router = Router();

router.route('/add-to-cart').post(addProductToCart)
router.route('/get-cart-products').get(getProductsOfCart)
router.route('/update-cart-products').patch(updateProductsOfCart)
router.route('/remove-cart-products').delete(removeProductsOfCart)


export default router;