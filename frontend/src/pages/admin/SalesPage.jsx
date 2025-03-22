import React, { useEffect, useState } from 'react'
import SalesByCategory from '../../components/graphs/SalesByCategory'
import SalesGraph from '../../components/graphs/SalesGraph'
import MonthlySalesGraph from '../../components/graphs/MonthlySalesGraph'
import { getLastCurrentMonthSalesData, getSalesByCategory } from '../../services/adminApi'
import { set } from 'mongoose'

function SalesPage() {

  const [data, setData] = useState([])
  const [currentMonthSalesData, setCurrentMonthSalesData] = useState(0)
  const [todaySalesData, setTodaySalesData] = useState(0)
  const [salesByCategoryData, setSalesByCategoryData] = useState()

  const getData = async () => {
    try {
      const response = await getLastCurrentMonthSalesData()
      if (response.data) {
        setData(response.data.monthlySalesData)
        setCurrentMonthSalesData(response.data.totalMonthlySales)
        setTodaySalesData(response.data.todaySalesData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDatabyCategory = async () => {
    try {
      const response = await getSalesByCategory()
      if (response.data) {
        setSalesByCategoryData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
    getDatabyCategory()
  }, [])

  return (
    <div className='w-full relative h-[91vh] px-6 pt-6 flex items-center flex-col space-y-0 font-[poppins]'>

      {/* Page Heading */}
      <h1 className='font-bold text-3xl dark:text-white'>Sales</h1>

      <div className='w-full md:w-[80%] h-full flex flex-col md:flex-row py-6 space-x-6'>

        <div className='h-[350px] md:h-full w-full md:w-1/2 lg:w-[18%] flex flex-col items-center space-y-6'>
          <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[120px] min-w-full flex flex-col items-center justify-center'>
            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Today Sales</p>
            <span className='text-2xl text-black dark:text-[#ffd400] font-[poppins] font-bold'>₹{todaySalesData}</span>
          </div>
          <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[120px] min-w-full flex flex-col items-center justify-center'>
            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Monthly Sales</p>
            <span className='text-2xl text-black dark:text-white font-[poppins] font-bold'>₹{currentMonthSalesData}</span>
          </div>
          <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md flex-1 p-2 space-y-3 w-full flex flex-col items-center justify-center'>
            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Sales by Category</p>
            {
              salesByCategoryData?.length > 0 ?
                <SalesByCategory salesData={salesByCategoryData} /> :
                null
            }
          </div>
        </div>

        <div className='hidden lg:flex flex-col items-center justify-around h-[350px] dark:text-white rounded-md space-y-6 md:h-full w-full md:w-1/2 lg:w-full'>

          <div className='w-full h-full outline dark:outline-0 outline-gray-300 dark:bg-[#121212] rounded-md flex flex-col items-center justify-center p-2'>
            <span>This Month</span>
            {
              data.length > 0 ?
                <MonthlySalesGraph salesData={data} /> : null
            }
          </div>

        </div>

      </div>

    </div>
  )
}

export default SalesPage