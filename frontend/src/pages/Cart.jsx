import { useSelector } from "react-redux"
import CartCard from "../components/CartCard"
import { getProductsOfCart } from "../services/cartApi.js"
import { useEffect, useMemo, useState } from "react"
import { setProductsInCart } from "../slices/cartSlice.js"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Cart() {

  const navigate = useNavigate()
  const products = useSelector(state => state.cart.products)
  const user = useSelector(state => state.user.userDetails)

  const [productsPrice, setProductsPrice] = useState(0)

  const getProducts = async () => {
    if (user._id != undefined) {
      const productLists = await getProductsOfCart(user._id)
      if (productLists.data) setProductsInCart(productLists.data)
    }
    // console.log(productLists.data.cart[0].quantity)
    // setProducts(productLists.data)
  }

  // total amount of all products without shipping charges
  const getProductsAmount = useMemo(() => {

    let total = 0;

    products.map((product) => (
      total += product.price * product.quantity
    ))

    setProductsPrice(total)
  }, [products])


  useEffect(() => {
    getProducts()
  }, [])

  const onQuantityChange = () => {
    getProducts()
  }

  const handleCheckout = async () => {

    if (products.length === 0) {
      toast.error('No items in your cart !')
      return
    }
    // check if user adrress is present or not
    if (!user.address ||
      user.address.street === undefined ||
      user.address.city === undefined ||
      user.address.state === undefined ||
      user.address.pinCode === undefined) {

      toast.error('Please add your address to proceed !')
      navigate(`/profile/${user._id}`)
      return

    }

    // check if user phone number is present or not
    if (user.phoneNumber === undefined || user.phoneNumber === '') {
      toast.error('Please add your phone number to proceed !')
      navigate(`/profile/${user._id}`)
      return
    }
    navigate('/checkout', {
      state: {
        products: products,
        totalPrice: productsPrice < 499 ? productsPrice+50 : productsPrice
      }
    })
  }

  return (
    <div className='w-full h-auto lg:h-[91vh] relative top-[8vh] md:top-[9vh] dark:bg-black px-6 md:px-[10%] py-10 flex flex-col space-y-5 bg-white'>

      <h2 className="font-[poppins] font-medium text-2xl dark:text-white leading-none">Your Cart</h2>


      {/* Items Box */}
      <div className="h-full w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 md:space-x-8">

        <div className="w-full flex flex-col shadow-xl border border-gray-200 dark:border-gray-600 lg:w-[70%] h-[50vh] md:min-h-full rounded-xl">

          <div className="w-full h-[6vh] md:h-[6vh] border-b border-gray-200 dark:border-gray-600 flex items-center font-dmsans font-medium text-[16px] dark:text-white md:text-[20px]">
            <p className="flex-1 text-sm text-center">Items</p>
            <p className="hidden sm:block sm:w-[15%] text-center text-sm border-l border-r border-gray-200 dark:border-gray-600 h-full leading-[4vh] md:leading-[6vh]">Quantity</p>
            <p className="hidden sm:block sm:w-[15%] text-center text-sm">Price</p>
          </div>

          {
            products.length > 0 ?
              <div className="w-full max-h-auto flex-col items-center overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                {
                  products.map((product) => (
                    <CartCard key={product._id} func={onQuantityChange} productImage={product.image} productId={product._id} productName={product.name} productPrice={product.price} quantity={product.quantity} />
                  ))
                }
              </div> :
              <div className="w-full h-full flex flex-col justify-center items-center font-[poppins]">
                <span className="sm:text-lg dark:text-white">No items in your cart !</span>
                <p className=" text-xs sm:text-sm text-gray-400">Start shopping to add items to your cart</p>
              </div>
          }

        </div>

        {/* OrderSummary Box */}
        <div className="h-full lg:w-[30%] w-full flex flex-col space-y-4 md:space-y-8 justify-between font-[poppins]">
          <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-none shadow-xl h-[40vh] md:h-full w-full rounded-xl p-4">
            <h2 className="font-[poppins] dark:text-white font-medium md:text-[20px]">Billing Details</h2>

            <div className="w-full mt-5 space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-[14px] text-gray-500">Items total amount</p>
                <span className="dark:text-white">₹{productsPrice}</span>
              </div>

              <div className="flex w-full justify-between">
                <p className="text-[14px] text-gray-500">Shipping charges</p>
                <span className="dark:text-white">{productsPrice < 499 && productsPrice > 0 ? 50 : 0}</span>
              </div>

              <div className="flex w-full justify-between">
                <p className="text-[14px] text-gray-500">Discount</p>
                <span className="dark:text-white">-₹0</span>
              </div>

              <div className="flex w-full justify-between border-t border-gray-200 dark:border-gray-600 mt-2 pt-1">
                <p className="text-[16px] dark:text-white font-medium">Total</p>
                <span className="text-[16px] dark:text-white font-medium">₹{productsPrice < 499 && productsPrice > 0 ? productsPrice + 50 : productsPrice}</span>
              </div>
            </div>

          </div>

          <button onClick={handleCheckout} className="w-full cursor-pointer flex justify-between px-6 bg-[#3772ff] hover:bg-[#275ad2] rounded-full font-medium  text-xl text-white py-3">
            <p>Checkout</p>
            <span className="">₹ {productsPrice < 499 && productsPrice > 0 ? productsPrice + 50 : productsPrice}</span>
          </button>
        </div>

      </div>

    </div>
  )
}

export default Cart