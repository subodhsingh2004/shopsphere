import axios from "axios";

const api = axios.create({
    baseURL: '/api/v1/user'
})

export const userSignup = async (username, email, password) => {
    try {
        const response = api.post('/signup', { username, email, password })
        return response
    } catch (error) {
        throw error
    }
}

// export const userSignupVerification = async (email, otp) => {
//     try {
//         const response = api.post('/signup/otp-verification', { email, otp })
//         return response
//     } catch (error) {
//         throw error
//     }
// }

export const userLogin = async (email, password) => {
    try {
        const response = api.post('/login', { email, password })
        return response
    } catch (error) {
        throw error
    }
}

export const userLogout = async () => {
    try {
        const response = api.post('/logout')
        return response
    } catch (error) {
        throw error
    }
}

export const userInfoUpdate = async (userId, username, phoneNumber, streetAdress, pinCode, city, state) => {
    try {
        const response = api.put(
            '/update',
            { userId, username, phoneNumber, streetAdress, pinCode, city, state }
        )
        return response
    } catch (error) {
        throw error
    }
} 