import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getTotalOrders } from '../../services/adminApi';

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

function OrdersPage() {

  const [orders, setOrders] = useState([])

  // Get the lists of orders
  const getOrders = async () => {
    try {
      const response = await getTotalOrders()
      if (response.data) setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const formatDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-GB', dateOptions)
  }


  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <div className='min-w-full relative min-h-[92vh] md:min-h-[91vh] max-h-auto p-3 md:p-8 flex items-center flex-col font-[poppins]'>

        <div style={{ scrollbarWidth: "none" }} className='min-w-full overflow-x-scroll md:min-w-[70%] h-auto space-y-6 flex flex-col'>

          {/* Page Heading */}
          <div className='w-auto flex justify-between items-center'>
            <h1 className='font-bold text-lg md:text-3xl dark:text-white'>Orders ({orders.length})</h1>
          </div>

          <div className='w-[200%] md:w-full h-auto lg:min-h-full flex justify-center'>

            {/* Product Listing Box */}
            <div className='w-full lg:h-full flex flex-col border dark:bg-[#141414] border-gray-300 dark:border-[#414141] rounded-xl'>

              <div className='w-full bg-[#3772ff] py-2 text-center rounded-t-xl flex items-center'>
                <div className='w-[30%] text-white text-sm font-medium'>Product</div>
                <div className='w-[14%] text-white text-sm font-medium'>Customer</div>
                <div className='w-[14%] text-white text-sm font-medium'>Price</div>
                <div className='w-[14%] text-white text-sm font-medium'>Ordered quantity</div>
                <div className='w-[14%] text-white text-sm font-medium'>Ordered date</div>
                <div className='w-[14%] text-white text-sm font-medium'>Status</div>
              </div>

              {/* Product Lists*/}
              <div className='w-full lg:min-h-full max-h-[467.6px] overflow-scroll flex-col'>

                {
                  orders.map(order =>
                    order.items.map(product =>
                      <Link to={'#'} key={product._id}>
                        <div className='w-full py-2 cursor-pointer h-auto text-center flex items-center border-t border-gray-300 dark:border-[#414141]'>
                          <div className='w-[30%] h-full px-2 lg:px-5 text-white flex items-center space-x-2'>
                            <img src={product.productId.image} className='h-[50px] rounded-md' alt={product.productId.name} />
                            <span className='text-black dark:text-white text-sm text-start leading-none md:text-[16px]'>{product.productId.name}</span>
                          </div>
                          <div className='w-[14%] h-full flex justify-center items-center text-black dark:text-white text-sm leading-none font-medium truncate'>{order.customer?.username || "N/A"}</div>
                          <div className='w-[14%] h-full flex justify-center items-center text-black dark:text-white text-sm leading-none md:text-lg font-medium'>₹ {product.productId.price}</div>
                          <div className='w-[14%] h-full flex justify-center items-center text-black dark:text-white text-sm leading-none md:text-lg font-medium'>{product.quantity}</div>
                          <div className='w-[14%] h-full flex justify-center items-center text-black dark:text-white text-sm leading-none font-medium'>{formatDate(order.createdAt)}</div>
                          <div className={`w-[14%] h-full flex justify-center items-center  text-black dark:text-white text-sm leading-none font-medium`}>
                            <span className={`${order.orderStatus == 'Completed' ? "bg-green-300" : "bg-orange-300"} py-1.5 px-2 rounded-md text-xs`}>{order.orderStatus}</span>
                          </div>
                        </div>
                      </Link>
                    )
                  )
                }

              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default OrdersPage