import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/v1'
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'product/get-all-products'
        })
    })
})

export const { useGetProductsQuery } = api