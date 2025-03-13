import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/cart'
})

export const getProductsOfCart = async () => {
    try {
        const products = api.get('get-cart-products')
        return products
    } catch (error) {
        throw error
    }
}

export const addProductToCart = async (productId, userId) => {
    try {
        const response = api.post('add-to-cart', {
            productId,
            userId
        })
        return response
    } catch (error) {
        throw error
    }
}

export const updateProductInCart = async (userId, productId, quantity) => {
    try {
        const response = api.patch('update-cart-products', { userId, productId, quantity })
        return response
    } catch (error) {
        throw error
    }
}

export const removeProductsOfCart = async (userId, productId) => {
    try {
        const data = { userId, productId }
        return api.delete('remove-cart-products', { data })
    } catch (error) {
        throw error
    }
}