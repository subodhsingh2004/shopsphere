import React from 'react'
import { Link } from 'react-router-dom'
import { addProductToCart } from '../services/cartApi'
import { useDispatch, useSelector } from 'react-redux';
import { addProductInCart } from '../slices/cartSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function ProductCard({ product_id, productName, productImage, productPrice }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userDetails)


    const handleAddToCart = async (e) => {
        e.preventDefault()
        const response = await addProductToCart(product_id, user?._id)
        dispatch(addProductInCart(response.data?.product))
    }

    return (
        <Link to={`/product/${product_id}`}>
            <div className="font-[poppins] w-[280px] h-[350px] shadow-lg border border-gray-200 dark:border-[#212121] bg-white dark:bg-[#202020] rounded-xl flex flex-col items-center space-y-1 p-3 group">

                <div className='relative flex'>
                    <img src={productImage} alt={productName} className='h-[260px] rounded-md' />
                    <button onClick={handleAddToCart} className='absolute w-[40px] h-[40px] mt-[160px] ml-[160px] rounded-full bg-[#ffd400] p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
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