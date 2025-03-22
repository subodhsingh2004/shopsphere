import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { removeProductsOfCart, updateProductInCart } from '../services/cartApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductOfCart, updateProduct } from '../slices/cartSlice.js';
import { toast } from 'react-toastify';

function CartCard({ productId, productName, productImage, quantity, productPrice, func }) {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.user.userDetails)
    const [productQuantity, setProductQuantity] = useState(quantity)

    const increaseQuantity = async () => {
        let newQuantity = productQuantity + 1;
        setProductQuantity(newQuantity)
        let response = await updateProductInCart(userDetails._id, productId, newQuantity)
        dispatch(updateProduct(response.data.updatedProduct))
    }

    const decreaseQuantity = async () => {
        if (productQuantity > 1) {
            let newQuantity = productQuantity - 1;
            setProductQuantity(newQuantity)
            let response = await updateProductInCart(userDetails._id, productId, newQuantity)
            dispatch(updateProduct(response.data.updatedProduct))
            
        }
    }

    const handleDeleteItems = async () => {
        let response = await removeProductsOfCart(userDetails._id, productId)
        dispatch(removeProductOfCart(response.data.product))
        toast.info("Product removed from cart")
    }

    return (
        <div className="w-full min-h-[100px] border-t border-gray-200 dark:border-gray-600 flex items-center">

            <div className="h-full flex flex-1 items-center px-2 md:px-4 justify-between">
                <div className='flex space-x-2 md:space-x-4 items-center'>
                    <img src={productImage} alt="" className="h-[60px] sm:h-[70px]" />
                    <h1 className="font-[poppins] text-xs sm:text-sm lg:text-[16px] dark:text-white">{productName}</h1>
                </div>
                <div>
                    <button onClick={handleDeleteItems} className='cursor-pointer'><DeleteForeverIcon sx={{ color: "#ef4444" }} /></button>
                </div>
            </div>

            <div className="hidden sm:flex h-full items-center justify-center space-x-3 w-[15%]">
                <button className='cursor-pointer' onClick={decreaseQuantity}><RemoveCircleOutlineIcon sx={{ color: "#f8d525" }} /></button>
                <span className='font-jetbrains dark:text-white'> {productQuantity} </span>
                <button className='cursor-pointer' onClick={increaseQuantity}><AddCircleOutlineIcon sx={{ color: "#f8d525" }} /></button>
            </div>

            <div className="hidden h-full sm:flex items-center justify-center w-[15%] font-jetbrains font-medium text-[#3772ff]">
                ₹{productPrice * productQuantity}
            </div>


            <div className='flex flex-col px-2 sm:hidden'>
                <div className="flex h-full items-center justify-center space-x-1">
                    <button onClick={decreaseQuantity}><RemoveCircleOutlineIcon sx={{ color: "#f8d525" }} /></button>
                    <span className='font-jetbrains dark:text-white'> {productQuantity} </span>
                    <button onClick={increaseQuantity}><AddCircleOutlineIcon sx={{ color: "#f8d525" }} /></button>
                </div>

                <div className="h-full flex items-center justify-center font-jetbrains font-medium text-[#3772ff]">
                    ₹{productPrice * productQuantity}
                </div>
            </div>

        </div>
    )
}

export default CartCard