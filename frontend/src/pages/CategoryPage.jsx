import React, { useEffect, useState } from 'react'
import { getProductsByCategory } from '../services/productApi'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

function CategoryPage() {

  const category = new URLSearchParams(location.search).get('category')

  const [product, setProducts] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(true)

  const getProducts = async () => {
    try {
      const response = await getProductsByCategory(category)
      if (response.data) {
        setLoadingStatus(false)
        setProducts(response.data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (loadingStatus) {
    return <Loader isActive={true} />
  }

  return (

    <div className='w-full min-h-[91vh] dark:bg-black relative top-[9vh] flex justify-center font-[poppins] py-8'>
      {
        product.length > 0 ?
          <div className='w-full lg:w-[80%] flex flex-col gap-4'>

            <h1 className='text-xl font-medium text-center md:text-start'>Showing category : {category}</h1>
            <div className='w-full h-full flex justify-center md:justify-start'>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                  product.map(product =>
                    <ProductCard
                      key={product._id}
                      productImage={product.image}
                      productName={product.name}
                      productPrice={product.price}
                      product_id={product._id}
                    />
                  )
                }
              </div>
            </div>

          </div> :

          <div className='w-full h-full flex items-center justify-center'>
            <h1 className='text-xl text-gray-500'>No Products found!</h1>
          </div>
      }


    </div>
  )
}

export default CategoryPage