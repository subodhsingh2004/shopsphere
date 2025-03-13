import React from 'react'
import SalesByCategory from '../../components/graphs/SalesByCategory'
import SalesGraph from '../../components/graphs/SalesGraph'

function SalesPage() {
  return (
    <div className='w-full relative h-[91vh] px-6 pt-6 flex items-center flex-col space-y-0 font-[poppins]'>

      {/* Page Heading */}
      <h1 className='font-bold text-3xl dark:text-white'>Sales</h1>

      <div className='w-full md:w-[80%] h-full flex flex-col md:flex-row py-6 space-x-6'>

        <div className='h-[350px] md:h-full w-full md:w-1/2 lg:w-[18%] flex flex-col items-center space-y-6'>
          <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[120px] min-w-full flex flex-col items-center justify-center'>
            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Today Sales</p>
            <span className='text-2xl text-black dark:text-[#ffd400] font-[poppins] font-bold'>$1000</span>
          </div>
          <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[120px] min-w-full flex flex-col items-center justify-center'>
            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Monthly Sales</p>
            <span className='text-2xl text-black dark:text-white font-[poppins] font-bold'>$100</span>
          </div>
          <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md flex-1 p-2 space-y-3 w-full flex flex-col items-center justify-center'>
            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Sales by Category</p>
            <SalesByCategory/>
          </div>
        </div>

        <div className='hidden lg:flex flex-col items-center justify-around h-[350px] dark:text-white rounded-md space-y-6 md:h-full w-full md:w-1/2 lg:w-[41%]'>
          
            <div className='w-full h-1/2 outline dark:outline-0 outline-gray-300 dark:bg-[#121212] rounded-md flex flex-col items-center justify-between p-2'>
              <span>This Month</span>
              <SalesGraph/>
            </div>
            <div className='w-full h-1/2 outline dark:outline-0 outline-gray-300 dark:bg-[#121212] rounded-md'></div>

        </div>

        <div className='hidden lg:flex rounded-md outline dark:outline-0 outline-gray-200 h-full w-[41%] dark:bg-[#121212]'></div>

      </div>

    </div>
  )
}

export default SalesPage