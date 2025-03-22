import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../services/cartApi.js';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addProductInCart } from '../slices/cartSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

function LatestProductCard({ productId, productName, productPrice, productImage, productQuantity }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.userDetails)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    const addToCart = async (e) => {
        e.preventDefault()

        if (isLoggedIn) {
            try {
                const response = await addProductToCart({ productId: productId, quantity: 1, userId: user._id })
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

    return (
        <Link to={`/product/${productId}`}>

            <div key={productId} className={`w-[240px] h-[300px] font-[poppins] rounded-xl shadow-lg border border-gray-200 dark:border-[#212121] ${productQuantity > 0 ? "bg-white" : "bg-gray-100"} dark:bg-[#202020] flex flex-col items-center space-y-2 p-3 group`}>

                <div className="flex relative">
                    {
                        productQuantity == 0 ? <span className="absolute bg-[#ff0000] text-white text-xs font-medium w-fit py-1 px-2 rounded font-[dmsans]">
                            Out of Stock
                        </span> : null
                    }
                    <img src={productImage} alt={productName} className="rounded-md" />
                    <button onClick={addToCart} className={`absolute hidden h-[40px] w-[40px] rounded-full items-center justify-center cursor-pointer bg-[#ffd400] bottom-2 right-2  ${productQuantity > 0 ? "sm:group-hover:flex" : null} `}>
                        <AddShoppingCartIcon sx={{ color: "black", fontSize: "20px" }} />
                    </button>
                </div>

                <p className='text-sm truncate dark:text-gray-200 font-medium w-full'>{productName}</p>

                <span className='text-[16px] dark:text-white font-bold w-full text-right'>₹{productPrice}</span>

            </div>

        </Link >
    )
}

export default LatestProductCard