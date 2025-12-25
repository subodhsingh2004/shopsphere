import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1/product'
})

export const addProduct = async (formData) => {

    try {
        const addedProduct = api.post(
            '/add-product',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        return addedProduct

    } catch (error) {
        throw error
    }
}

export const getSearchedProducts = async (searchQuery) => {
    try {
        const searchedProducts = api.get(`product-search?query=${searchQuery}`)
        return searchedProducts
    } catch (error) {
        throw error
    }
}

export const getProducts = async () => {
    try {
        const productLists = api.get('get-latest-products')
        return productLists
    } catch (error) {
        throw error;
    }
}

export const getSingleProduct = async (productId) => {
    try {
        const productDetails = api.get(`get-single-product/${productId}`)
        return productDetails

    } catch (error) {
        throw error
    }
}

export const getAllProducts = async () => {
    try {
        const products = api.get('/get-all-products')
        return products
    } catch (error) {
        throw error
    }
}

export const getMostSellingProducts = async () => {
    try {
        const products = api.get('/get-most-selling-product')
        return products
    } catch (error) {
        throw error
    }
}

export const getProductsByCategory = async (category) => {
    try {
        const products = api.get(`/get-products-by-category/${category}`)
        return products
    } catch (error) {
        throw error
    }
}

export const updateProduct = async (productId, { name, price, quantity, description }) => {
    try {
        const deletedProduct = api.put(`/update-product/${productId}`, { name, price, quantity, description })
        return deletedProduct
    } catch (error) {
        throw error
    }
}

export const deleteProduct = async (productId) => {
    try {
        const deletedProduct = api.delete(`/delete-product/${productId}`)
        return deletedProduct
    } catch (error) {
        throw error
    }
}