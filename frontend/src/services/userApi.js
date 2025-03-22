import axios from "axios";

const api = axios.create({
    baseURL: '/api/v1/user'
})

export const userOrders = async (userId) => {
    try {
        const response = api.get(`/orders/${userId}`)
        return response
    } catch (error) {
        throw error
    }
}