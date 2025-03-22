import React, { useEffect, useState } from 'react'
import SalesGraph from '../../components/graphs/SalesGraph.jsx'
import SalesByCategory from '../../components/graphs/SalesByCategory.jsx'
import { getLastSixMonthSalesData, getTotalCustomers, getTotalOrders, getTotalSales } from '../../services/adminApi.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminDashboard() {

    const [totalSales, setTotalSales] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalCustomers, setTotalCustomers] = useState(0)
    const [monthlyData, setMonthlyData] = useState()

    const getTotalSalesValue = async () => {
        try {
            const response = await getTotalSales()
            if (response.data) setTotalSales(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalOrdersValue = async () => {
        try {
            const response = await getTotalOrders()
            if (response.data) setTotalOrders(response.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalcustomersValue = async () => {
        try {
            const response = await getTotalCustomers()
            if (response.data) setTotalCustomers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getLastSixMonthsDataValue = async () => {
        try {
            const response = await getLastSixMonthSalesData()
            if (response.data) setMonthlyData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTotalSalesValue()
        getTotalOrdersValue()
        getTotalcustomersValue()
        getLastSixMonthsDataValue()
    }, [])

    return (
        <>
            <div className='w-full relative h-auto sm:h-[91vh] flex items-center flex-col space-y-2'>

                <h1 className='w-full text-center font-semibold font-[poppins] dark:text-white pt-5 text-2xl'>Analytics</h1>

                <div className='w-full md:w-[85%] h-auto md:h-full flex justify-center flex-col md:flex-row p-6 space-x-6'>

                    <div className='h-auto md:h-full w-full md:w-1/2 lg:w-[18%] flex flex-col items-center space-y-6'>
                        <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[150px] min-w-full flex flex-col items-center justify-center'>
                            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Total Sales</p>
                            <span className='text-2xl text-black dark:text-[#ffd400] font-[poppins] font-bold'>₹ {totalSales}</span>
                        </div>
                        <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[150px] min-w-full flex flex-col items-center justify-center'>
                            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Total Customers</p>
                            <span className='text-2xl text-black dark:text-white font-[poppins] font-bold'>{totalCustomers}</span>
                        </div>
                        <div className='bg-white dark:bg-[#121212] dark:outline-0 outline outline-gray-200 rounded-md shadow-md h-[150px] min-w-full flex flex-col items-center justify-center'>
                            <p className='text-sm font-[poppins] text-gray-400 dark:text-gray-200'>Total Orders</p>
                            <span className='text-2xl text-black dark:text-white font-[poppins] font-bold'>{totalOrders}</span>
                        </div>
                    </div>

                    <div className='hidden lg:flex flex-col items-center justify-around h-[350px] outline dark:outline-0 dark:bg-[#121212] dark:text-white outline-gray-300 rounded-md px-6 md:h-full w-full md:w-1/2 lg:w-[60%]'>
                        <span className='font-[poppins]'>Sales Graph</span>
                        {
                            monthlyData ?
                                <SalesGraph sixMonthSalesData={monthlyData} /> : null
                        }
                    </div>

                    <div className='hidden lg:flex rounded-md outline dark:outline-0 outline-gray-200 h-full w-[22%] dark:bg-[#121212]'></div>

                </div>

            </div>
        </>
    )
}

export default AdminDashboard