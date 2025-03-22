import React from 'react'

function Wishlist() {
    return (
        <div className='w-full h-full md:h-[500px] font-[poppins] flex flex-col items-center justify-center'>
            <span className='text-xl font-medium text-gray-400 dark:text-[#707070]'>Whislist is empty!</span>
            <p className='tem-sm text-gray-400 dark:text-[#707070] text-center'>Look like you have no items in your wishlist.</p>
        </div>
    )
}

export default Wishlist