import { useEffect, useState } from "react"
import { getProducts } from "../services/productApi"
import LatestProductCard from "./LatestProductCard"


function LatestCategory() {
    const [products, setProducts] = useState([])

    async function getLatestProducts() {
        try {
            const response = await getProducts()
            setProducts(response.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getLatestProducts()
    }, [])

    return (

        <div className="w-full h-auto py-10 bg-white dark:bg-black">

            <h1 className="text-black dark:text-white font-[poppins] text-[28px] md:text-[50px] font-bold text-center leading-7">Latest Product</h1>

            <div className="flex w-full justify-center pt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        products.map(product =>
                            <LatestProductCard 
                                key={product._id}
                                productId={product._id}
                                productQuantity={product.quantity}
                                productImage={product.image}
                                productName={product.name}
                                productPrice={product.price}
                            />
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default LatestCategory