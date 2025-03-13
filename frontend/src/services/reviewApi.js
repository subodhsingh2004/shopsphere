import axios from "axios"

const api = axios.create({
    baseURL: '/api/v1/review'
})

export const getReviews = async (productId) => {
    try {
        const response = await api.get(`get-reviews/${productId}`)
        return response
    } catch (error) {
        throw error
    }
}