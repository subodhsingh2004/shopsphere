import { createSlice } from "@reduxjs/toolkit"

const getUserFromSessionStorage = () => {
    const user = sessionStorage.getItem("user")
    return user ? JSON.parse(sessionStorage.getItem("user")) : null
}

const initialState = {
    userDetails: getUserFromSessionStorage(),
    isLoggedIn: getUserFromSessionStorage() == null ? false : true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userDetails = action.payload
            state.isLoggedIn = true
            sessionStorage.setItem("user", JSON.stringify(action.payload))
            
        },
        logout: (state) => {
            state.userDetails = {}
            state.isLoggedIn = false
            sessionStorage.clear("user")
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
            sessionStorage.setItem("user", JSON.stringify(action.payload))
        },
        update: (state, action) => {
            state.userDetails = action.payload
            sessionStorage.setItem("user", JSON.stringify(action.payload))
        }
    }
})

export default userSlice.reducer
export const { login, logout, setUserDetails, update } = userSlice.actions