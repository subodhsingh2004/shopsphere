import { useDispatch, useSelector } from "react-redux"
import { addProductInCart } from "../slices/cartSlice"
import { addProductToCart } from "../services/cartApi"

function Herosection() {

  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.user.userDetails)

    const addToCart = async () => {
        const response = await addProductToCart(productId, userDetails._id)
        dispatch(addProductInCart(response.data?.product))
    }

  return (
    <>
      <div className='w-full bg-white dark:bg-[#000] h-auto px-4 md:px-10 py-4 md:py-10 flex justify-center border-b border-gray-500 items-center'>

        <div className='w-full relative h-auto pb-8 md:pb-0 bg-white dark:bg-[#1d1d1d] rounded-xl'>

          <div className='absolute w-auto h-auto rounded-sm p-1 bg-[#f8d525] top-4 lg:top-16 left-4 lg:left-6 z-10 text-[14px] font-bold font-[poppins]'>Most Selling</div>

          <div className='relative flex flex-col md:flex-row md:justify-between items-center'>
            <img src="https://res.cloudinary.com/filedatabase/image/upload/v1741873401/m4macmini_emvlmm.png" alt="" className='absoulte w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] rounded-xl' />

            <div className='w-full mt-[-60px] md:mt-0 h-full flex flex-col md:pr-8 justify-center md:items-end space-y-4'>
              <div className="flex flex-col items-center space-y-4">
                <h1 className='font-medium text-[18px] md:text-[26px] text-center lg:text-left xl:text-[40px] font-[poppins] text-black dark:text-white'>Apple 2024 Mac Mini with M4 Chip 16GB</h1>

                <div className='flex items-center space-x-2 md:space-x-5'>
                  <h2 className='font-[poppins] dark:text-white font-bold text-lg md:text-[30px]'>₹59900</h2>
                  <button onClick={addToCart} className='bg-[#3772ff] text-sm text-white cursor-pointer rounded-full px-3 py-2 md:py-3 md:px-5 font-[poppins] font-medium'>Add to cart</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Herosection
