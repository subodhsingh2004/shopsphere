import { Product } from "../models/ProductModel.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { deleteCloudinary, uploadOnCloudinary } from "../utils/FileUpload.js";


const searchProduct = asyncHandler(async function (req, res) {
    const { query } = req.query;

    const products = await Product.find({ name: { $regex: query, $options: "i" } });
    if (!products) throw new ApiError(404, "No products found");
    return res.status(200).json(products);
})

// Get all products
const getAllProducts = asyncHandler(async function (req, res) {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json(products);
})

// Get products by category
const getProductsByCategory = asyncHandler(async function (req, res) {

    const { category } = req.params
    if (!category) throw new ApiError(401, "Category cannot be undefined")

    const products = await Product.find({ category: category })
    if (!products) throw new ApiError(404, "Product not found")


    return res.status(200).json(products)
})

const addProduct = asyncHandler(async function (req, res) {
    const { name, price, description, quantity, category, details } = req.body

    // console.log(req.file)

    const productImage = req.file
    if (!productImage) throw new ApiError(400, "Product image is required")

    if ([name, description, category, details].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if (price <= 0) {
        throw new ApiError(400, "Price must be greater than 0")
    }

    if (quantity <= 0) {
        throw new ApiError(400, "Product quantity must be one")
    }

    const imageURL = await uploadOnCloudinary(req.file.path)
    if (!imageURL) throw new ApiError(500, "error in uploading image")


    const formattedDetails = details
        .split(',') // Split by commas
        .map(item => item.trim()) // Remove extra spaces around each item
        .filter(item => item !== '');


    const addedProduct = await Product.create({
        name,
        image: imageURL.url,
        price,
        description,
        details: formattedDetails,
        quantity,
        category,
    })

    // delete the photo from cloudinary if product is not added successfully
    if (!addedProduct) {
        await deleteCloudinary(imageURL.public_id)
        throw new ApiError(500, "Error in adding the product")
    }


    return res.status(201).json({ addedProduct })
})

// Get Single Product
const getSingleProduct = asyncHandler(async function (req, res) {
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (!product) throw new ApiError(404, "product not found")

    return res.status(200).json({ product })
})

// Get latest product
const getLatestProduct = asyncHandler(async function (req, res) {
    const productList = await Product.find().sort({ createdAt: -1 }).limit(8);
    return res.status(200).json(productList);
})

// get most selling products
const getMostSellingProduct = asyncHandler(async function (req, res) {
    const productList = await Product.find().sort({ purchaseCount: -1 }).limit(1);
    return res.status(200).json(productList);
})

// Delete product
const deleteProduct = asyncHandler(async function (req, res) {
    const { productId } = req.params

    const product = await Product.findByIdAndDelete(productId)
    if (!product) throw new ApiError(404, "product not found")

    // delete the image of product
    if (product.image) {
        const imageId = product.image.slice(-24, -4)
        const response = await deleteCloudinary(imageId)
        if (!response) throw new ApiError(500, "something went wrong while deleting the image")
    }


    return res.status(200).json({ message: "Product deleted successfully" })

})

// Update product
const updateProduct = asyncHandler(async function (req, res) {
    const { productId } = req.params
    const { name, price, description, quantity, } = req.body

    const product = await Product.findById(productId)
    if (!product) throw new ApiError(404, "product not found")

    if(name) product.name = name
    if(price) product.price = price
    if(description) product.description = description
    if(quantity) product.quantity = quantity

    await product.save()
    return res.status(200).json({ product })
})

export { searchProduct, getAllProducts, addProduct, getLatestProduct, getMostSellingProduct, getSingleProduct, getProductsByCategory, deleteProduct, updateProduct }