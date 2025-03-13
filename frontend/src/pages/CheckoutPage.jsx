import React from 'react'

function CheckoutPage() {
    return (
        <>
            <div className='w-full h-auto md:h-[91vh] relative top-[8vh] md:top-[9vh] bg-white dark:bg-black px-4 md:px-8 py-8 flex flex-col space-y-5'>

                <div className='w-full h-full flex justify-center'>

                    <div className='space-y-3'>

                        <div className='bg-white dark:bg-[#212121] px-3 h-[100px] flex flex-col justify-center w-[500px] rounded-sm font-[poppins] leading-none border border-gray-300 dark:border-0'>
                            <div className='flex justify-between'>
                                <span className='text-gray-500 dark:text-gray-400 font-light'>Delivered to</span>
                                <button className='text-sm text-[#3772ff] cursor-pointer'>Edit</button>
                            </div>
                            <h1 className='text-black dark:text-white font-bold text-lg'>Subodh Singh</h1>
                            <p className='text-[#121212] dark:text-gray-200'>New Delhi, Delhi - 110000, India</p>
                        </div>

                        <div className='bg-white dark:bg-[#212121] p-3 h-auto flex flex-col w-[500px] rounded-sm font-[poppins] leading-none border border-gray-300 dark:border-0 space-y-1'>
                            <span className='text-gray-500 dark:text-gray-400 font-medium'>Order Summary</span>
                            <div className='flex'>
                                <div className='flex w-full justify-between items-center'>
                                    <h2 className='dark:text-white'>Total Items amount</h2>
                                    <span className='font-medium text-xl dark:text-[#ffd400]'>₹35000</span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white dark:bg-[#212121] p-3 h-auto flex flex-col w-[500px] rounded-sm font-[poppins] leading-none border border-gray-300 dark:border-0 space-y-4'>

                            <span className='text-gray-500 dark:text-gray-400 font-medium'>Payment Method</span>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default CheckoutPage