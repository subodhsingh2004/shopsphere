import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function ReviewForm({ isActive, closeFunction }) {
    return (
        <div className={`${isActive ? "flex" : "hidden"} w-full h-screen items-center justify-center fixed top-0 z-20 bg-transparent backdrop-blur`}>

            <div className='w-[450px] h-[600px] rounded-3xl border border-gray-200 shadow-2xl bg-white dark:bg-[#000] dark:border-[#212121] font-[poppins] flex flex-col items-center py-4 px-4'>

                <div className='dark:text-white flex items-center justify-center relative w-full mb-10'>
                    <span className=' text-center text-lg'>Write a review</span>
                    <button onClick={() => closeFunction(false)} className='absolute right-0 cursor-pointer'><CloseIcon /></button>
                </div>

                <form className='w-[80%]'>
                    <div className="relative">
                        <input id='product-name' type="text" required readOnly disabled className='w-full h-[45px] border border-gray-400 dark:border-[#707070] rounded-md px-2 dark:text-white peer' />
                        <label htmlFor="product-name" className='absolute text-sm top-[-10px] left-2 px-1 bg-[white] dark:bg-[#141414] text-gray-400 peer-focus:text-black dark:peer-focus:text-white'>Name</label>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default ReviewForm