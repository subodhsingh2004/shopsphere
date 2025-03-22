import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getLatestProduct, getMostSellingProduct, getProductsByCategory, getSingleProduct, searchProduct, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/FileHandler.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router()

router.route("/add-product").post(upload.single('file'), verifyJWT, addProduct);
router.route("/product-search").get(searchProduct);
router.route("/get-all-products").get(getAllProducts);
router.route("/addproduct").post(addProduct);
router.route("/get-latest-products").get(getLatestProduct)
router.route("/get-most-selling-product").get(getMostSellingProduct)
router.route('/get-single-product/:productId').get(getSingleProduct)
router.route('/get-products-by-category/:category').get(getProductsByCategory)

router.route("/update-product/:productId").put(updateProduct)
router.route("/delete-product/:productId").delete(deleteProduct)

export default router;