import React from 'react'
import { Link } from 'react-router-dom'
import { addProductToCart } from '../services/cartApi'
import { useDispatch, useSelector } from 'react-redux';
import { addProductInCart } from '../slices/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toast } from 'react-toastify';


function ProductCard({ product_id, productName, productImage, productPrice }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userDetails)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)


    const handleAddToCart = async (e) => {
        e.preventDefault()
        if (isLoggedIn) {
            try {
                const response = await addProductToCart({ productId: product_id, quantity: 1, userId: user._id })
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
        <Link to={`/product/${product_id}`}>
            <div className="font-[poppins] w-[280px] h-auto shadow-lg border border-gray-200 dark:border-[#212121] bg-white dark:bg-[#202020] rounded-xl flex flex-col items-center space-y-1 p-3 group">

                <div className='relative flex'>
                    <img src={productImage} alt={productName} className='h-[260px] rounded-md' />
                    <button onClick={handleAddToCart} className='hidden md:block cursor-pointer absolute w-[40px] h-[40px] mt-[210px] ml-[205px] rounded-full bg-[#ffd400] p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <AddShoppingCartIcon sx={{ color: "black", fontSize: "20px" }} />
                    </button>
                </div>

                <p className='text-[16px] truncate dark:text-gray-200 font-medium w-full pt-2'>{productName}</p>

                <span className='text-lg dark:text-white font-bold w-full text-right'>₹{productPrice}</span>

            </div>
        </Link>
    )
}

export default ProductCard