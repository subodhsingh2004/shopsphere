import axios from "axios"

const api = axios.create({
    baseURL: '/api/v1/review'
})

export const getReviews = async (productId, limit, skip) => {
    try {
        const response = await api.get(`get-reviews/${productId}?limit=${limit}&skip=${skip}`)
        return response
    } catch (error) {
        throw error
    }
}

export const addReview = async ({productId, userId, rating, review}) => {
    try {
        const response = await api.post('add-review', {
            productId,
            userId,
            rating,
            review
        })
        return response
    } catch (error) {
        throw error
    }
}