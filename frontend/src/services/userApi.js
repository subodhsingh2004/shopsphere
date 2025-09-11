import axios from "axios";

const api = axios.create({
    baseURL: '/api/v1/user'
})

export const getUserDetails = async (userId) => {
    try {
        const response = await api.get(`/user-info/${userId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const userOrders = async (userId) => {
    try {
        const response = api.get(`/orders/${userId}`)
        return response
    } catch (error) {
        throw error
    }
}
