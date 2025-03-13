import { configureStore } from "@reduxjs/toolkit"
import cartSlice from '../slices/cartSlice.js'
import userSlice from '../slices/userSlice.js'

const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice
    }
})

export default store