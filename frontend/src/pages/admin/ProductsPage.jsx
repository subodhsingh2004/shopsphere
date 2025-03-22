import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { getAllProducts } from '../../services/productApi';
import { getOutofStockProducts } from '../../services/adminApi';

function ProductsPage() {

  const [products, setProducts] = useState([])
  const [outofStockProducts, setOutofStockProducts] = useState([])

  // Get the lists of products
  const getProducts = async () => {
    try {
      const response = await getAllProducts()
      if (response.data) {
        setProducts(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getOutofStockProductsLists = async () => {
    try {
      const response = await getOutofStockProducts()
      if (response.data) {
        setOutofStockProducts(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
    getOutofStockProductsLists()
  }, [])

  return (
    <>
      <div className='w-full relative min-h-[92vh] md:min-h-[91vh] max-h-auto  p-3 md:p-8 flex items-center flex-col font-[poppins]'>

        <div className='md:w-[80%] h-auto space-y-6 flex flex-col'>
          {/* Page Heading */}
          <div className='w-full flex justify-between items-center'>
            <h1 className='font-bold text-lg md:text-3xl dark:text-white'>Products ({products.length})</h1>
            <Link to={'/admin/all-products/add-product'}>
              <button className='bg-[#3772ff] text-white px-3 py-[6px] rounded-lg text-xs md:text-sm font-medium cursor-pointer'> <AddIcon /> New product</button>
            </Link>
          </div>

          <div className='w-full h-auto lg:min-h-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8'>

            {/* Product Listing Box */}
            <div className='w-full lg:w-3/4 lg:h-full flex flex-col border dark:bg-[#141414] border-gray-300 dark:border-[#414141] rounded-xl'>

              <div className='w-full bg-[#3772ff] py-2 text-center rounded-t-xl flex items-center'>
                <div className='w-[50%] lg:w-[60%] text-white text-sm font-medium'>Product</div>
                <div className='w-[25%] lg:w-[20%] text-white text-sm font-medium'>Price</div>
                <div className='w-[25%] lg:w-[20%] text-white text-sm font-medium'>Stock</div>
              </div>

              {/* Product Lists*/}
              <div className='w-full lg:min-h-full max-h-[467.6px] overflow-scroll flex-col'>

                {
                  products.map(product =>
                    <Link to={`/admin/all-products/${product._id}`} key={product._id}>
                      <div className='w-full py-2 cursor-pointer h-auto text-center flex items-center border-t border-gray-300 dark:border-[#414141]'>
                        <div className='w-[50%] lg:w-[60%] h-full px-2 lg:px-5 text-white flex items-center space-x-2'>
                          <img src={product.image} className='h-[50px] rounded-md' alt={product.name} />
                          <span className='text-black dark:text-white text-sm leading-none md:text-lg'>{product.name}</span>
                        </div>
                        <div className='w-[25%] lg:w-[20%] h-full flex justify-center items-center text-black dark:text-white text-sm leading-none md:text-lg font-medium'>₹ {product.price}</div>
                        <div className='w-[25%] lg:w-[20%] h-full flex justify-center items-center text-black dark:text-white text-sm leading-none md:text-lg font-medium'>{product.quantity}</div>
                        {/* <DeleteForeverIcon/> */}
                      </div>
                    </Link>
                  )
                }

              </div>

            </div>

            {/* Out of Order Product Box */}
            <div className='w-full lg:w-1/4 lg:min-h-full dark:bg-[#141414] border border-gray-200 dark:border-[#212121] rounded-xl shadow-xl flex flex-col'>
              <div className='w-full h-full flex flex-col items-center'>

                <div className='w-full bg-[#ffd400] py-2 text-center rounded-t-xl'>
                  <span className='text-black font-[poppins] text-sm md:text-md font-medium'>Out of Stock Products</span>
                </div>

                <div className='w-full max-h-[624px] md:max-h-[724px] py-2 gap-2 flex flex-col items-center'>

                  {
                    outofStockProducts?.map(product =>
                      <div className='w-full h-[60px] md:h-[70px] space-x-1 flex px-3 md:px-5 items-center'>
                        <img src={product.image} className='h-[60px] md:h-[70px]' alt={product.name} />
                        <div className='leading-5 dark:text-white'>
                          <h2 className='font-[poppins] text-sm md:text-lg'>{product.name}</h2>
                          <span className='font-[poppins] text-sm font-medium'>₹ {product.price}</span>
                        </div>
                      </div>
                    )
                  }

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default ProductsPage