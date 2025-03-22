import { useDispatch, useSelector } from "react-redux"
import { addProductInCart } from "../slices/cartSlice"
import { addProductToCart } from "../services/cartApi"
import { useEffect, useState } from "react"
import { getMostSellingProducts } from "../services/productApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Herosection() {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userDetails)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  const [productDetails, setProductDetails] = useState([])

  const addToCart = async () => {
    if (isLoggedIn) {
      try {
        const response = await addProductToCart({ productId: productDetails[0]?._id, quantity: 1, userId: user?._id })
        if (response.data) {
          dispatch(addProductInCart(response.data?.product))
          toast.success("Product added to cart")
        }
      } catch (error) {
        toast.error(error.response.data.error)
      }
    }
    else {
      toast.error("Please login")
      navigate('/login')
    }
  }

  const getMostSellingProductInfo = async () => {
    try {
      const response = await getMostSellingProducts()
      if (response.data) {
        setProductDetails(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMostSellingProductInfo()
  }, [])

  return (
    <>
      {
        productDetails &&
        <div className='w-full bg-white dark:bg-[#000] h-auto px-4 md:px-10 py-4 md:py-10 flex justify-center border-b border-gray-300 dark:border-gray-600 items-center'>

          <div className='w-full h-auto py-8 md:py-4 bg-white dark:bg-[#1d1d1d] rounded-xl'>

            <div className='h-auto flex flex-col md:flex-row md:justify-evenly items-center'>

              <div className="relative flex justify-center">
                <div className='md:hidden absolute w-auto h-auto rounded-sm p-1 text-xs bg-[#f8d525] -top-5 z-5 md:text-[14px] font-semibold font-[poppins]'>Most Selling</div>
                <img src={productDetails[0]?.image} alt={productDetails[0]?.name} className='absoulte w-auto h-[250px] lg:h-[350px] rounded-xl' />
              </div>

              <div className='w-auto mt-4 h-full flex flex-col md:pr-8 justify-center space-y-4'>
                <div className="flex flex-col items-center md:space-y-4 relative">

                  <div className='hidden md:block absolute w-auto h-auto rounded-sm p-1 text-xs bg-[#f8d525] -top-8 z-5 md:text-[14px] font-semibold font-[poppins]'>Most Selling</div>

                  <h1 className='font-medium text-[22px] md:text-[26px] text-center lg:text-left xl:text-[40px] font-[poppins] text-black dark:text-white'>{productDetails[0]?.name}</h1>

                  <p className="hidden md:block w-[400px] text-center text-gray-500 dark:text-gray-400">{productDetails[0]?.description}</p>

                  <div className='flex items-center space-x-2 md:space-x-5'>
                    <h2 className='font-[poppins] dark:text-white font-bold text-lg md:text-[30px]'>₹{productDetails[0]?.price}</h2>
                    <button onClick={addToCart} className='bg-[#3772ff] text-sm text-white cursor-pointer rounded-full px-3 py-1 md:py-3 md:px-5 font-[poppins] font-medium'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default Herosection
