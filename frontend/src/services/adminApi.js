import axios from "axios"

const api = axios.create({
    baseURL: '/api/v1/admin'
})

export const getTotalSales = async () => {
    try {
        const response = api.get('/get-total-sales')
        return response
    } catch (error) {
        throw error
    }
}

export const getTotalOrders = async () => {
    try {
        const response = api.get('/get-total-orders')
        return response
    } catch (error) {
        throw error
    }
}

export const getTotalCustomers = async () => {
    try {
        const response = api.get('/get-total-customers')
        return response
    } catch (error) {
        throw error
    }
}

export const getLastSixMonthSalesData = async () => {
    try {
        const response = api.get('/get-last-6-months-data')
        return response
    } catch (error) {
        throw error
    }
}

export const getLastCurrentMonthSalesData = async () => {
    try {
        const response = api.get('/get-current-month-sales-data')
        return response
    } catch (error) {
        throw error
    }
}

export const getSalesByCategory = async () => {
    try {
        const response = api.get('/get-total-sales-by-category')
        return response
    } catch (error) {
        throw error
    }
}

export const getOutofStockProducts = async () => {
    try {
        const response = api.get('/get-out-of-stock-products')
        return response
    } catch (error) {
        throw error
    }
}