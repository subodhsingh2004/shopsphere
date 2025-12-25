import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const calculateNumberOfProduct = (products) => {
    let totalQuantity = 0;

    products.forEach(product => {
        totalQuantity += product.quantity
    });

    return totalQuantity
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        setProductsInCart: (state, action) => {
            state.products = [...action.payload]
            const totalQuantity = calculateNumberOfProduct(state.products)
            state.totalQuantity = totalQuantity
        },
        addProductInCart: (state, action) => {
            const newProduct = action.payload
            state.products.push(newProduct)

            const totalQuantity = calculateNumberOfProduct(state.products)
            state.totalQuantity = totalQuantity
        },
        updateProduct: (state, action) => {
            state.products = state.products.map(
                product =>
                    product._id === action.payload._id ? { ...product, quantity: action.payload.quantity } : product
            )

            const totalQuantity = calculateNumberOfProduct(state.products)
            state.totalQuantity = totalQuantity
        },
        removeProductOfCart: (state, action) => {
            const { _id } = action.payload
            state.products = state.products.filter(product => product._id != _id)

            const totalQuantity = calculateNumberOfProduct(state.products)
            state.totalQuantity = totalQuantity
        }
    }
})

export const { setProductsInCart, addProductInCart, updateProduct, removeProductOfCart } = cartSlice.actions
export default cartSlice.reducer