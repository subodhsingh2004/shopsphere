import axios from "axios";

const api = axios.create({
    baseURL: '/api/v1/order'
})

export const userOrder = async (orderId) => {
    try {
        const response = api.get(`/generate-receipt//${orderId}`)
        return response
    } catch (error) {
        throw error
    }
}