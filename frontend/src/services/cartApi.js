import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1/cart'
})

export const getProductsOfCart = async (userId) => {
    try {
        if (userId) {
            const products = api.get(`get-cart-products/${userId}`)
            return products
        }
    } catch (error) {
        throw error
    }
}

export const addProductToCart = async ({productId, quantity, userId}) => {
    try {
        const response = api.post('add-to-cart', {
            productId,
            quantity,
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