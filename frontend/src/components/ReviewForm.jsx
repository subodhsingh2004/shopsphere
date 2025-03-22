import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addReview } from '../services/reviewApi';

function ReviewForm({ isActive, closeFunction, productId, getReviews }) {
    const user = useSelector(state => state.user.userDetails)

    const [rating, setRating] = useState(5)
    const handleRating = (e) => {
        const ratingValue = e.target.value.slice(-1)
        if(ratingValue >= 1 && ratingValue <= 5){
            setRating(ratingValue)
        }
        else toast.error('Rating should be between 1 and 5')
    }

    const [review, setReview] = useState('')
    const handleReview = (e) => {
        setReview(e.target.value)
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            const response = await addReview({
                productId,
                userId: user._id,
                rating,
                review
            })
            if(response.status === 201){
                toast.success('Review added successfully')
                closeFunction(false)
                getReviews()
            }
            else toast.error('An error occured, please try again')
        } catch (error) {
            console.log(error)
            toast.error('An error occured, please try again')
        }
    }

    return (
        <div className={`${isActive ? "flex" : "hidden"} w-full h-screen items-center justify-center fixed top-0 z-20 bg-transparent backdrop-blur`}>

            <div className='w-[320px] sm:w-[400px] h-auto rounded-3xl border border-gray-200 shadow-2xl bg-white dark:bg-[#000] dark:border-[#212121] font-[poppins] flex flex-col items-center pt-5 pb-7 px-4'>

                <div className='dark:text-white flex items-center justify-center relative w-full mb-10'>
                    <span className=' text-center text-lg'>Write a review</span>
                    <button onClick={() => closeFunction(false)} className='absolute right-0 cursor-pointer'><CloseIcon /></button>
                </div>

                <form onSubmit={handleSubmit} className='w-full sm:w-[90%] space-y-6'>
                    <div className="relative">
                        <input id='product-name' type="text" value={user?.username} required readOnly disabled className='w-full h-[45px] border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                        <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Name</label>
                    </div>

                    <div className="relative">
                        <input id='product-name' type="number" value={rating} onChange={handleRating} min={1} max={5} required className='w-full h-[45px] border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                        <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Rating</label>
                    </div>

                    <div className="relative">
                        <textarea id='product-name' value={review} onChange={handleReview} type="text" required style={{resize: 'none'}} className='w-full h-[100px] border border-gray-400 dark:border-[#707070] rounded-md px-2 pt-1.5 dark:text-white peer' />
                        <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Review</label>
                    </div>

                    <button type='submit' className='w-full h-[45px] bg-[#3772ff] text-white font-medium cursor-pointer rounded-md'>
                        Add Review
                    </button>
                </form>

            </div>

        </div>
    )
}

export default ReviewForm