import React, { useEffect, useState } from 'react'
import { userOrders } from '../../services/userApi'
import { useSelector } from 'react-redux'

const dateOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
}

const date = (dateVal) => {
    const d = new Date(dateVal)
    return d.toLocaleDateString('en-GB', dateOptions)
}

function UserOrders() {

    const user = useSelector(state => state.user.userDetails)
    const [orders, setOrders] = useState([])

    const getUserOrders = async () => {
        try {
            const response = await userOrders(user._id)
            setOrders(response.data.orderHistory)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserOrders()
    }, [])

    return (

        orders.length == 0 ?

            <div className='w-full h-full md:h-[500px] font-[poppins] flex flex-col items-center justify-center'>
                <span className='text-xl font-medium text-gray-400 dark:text-[#707070]'>No orders!</span>
                <p className='tem-sm text-gray-400 dark:text-[#707070] text-center'>Look like you haven't order anything yet.</p>
            </div> :

            <div className='w-full overflow-y-scroll h-full md:h-[500px] font-[poppins]'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {
                        orders.map(order =>
                            order?.orderedProducts.map(product =>
                                <div key={order._id} className='w-full h-auto bg-white dark:bg-[#191919] flex flex-col space-x-2 justify-center px-4 py-2 md:py-4 rounded-lg shadow-md border border-gray-200 dark:border-[#303030]'>
                                    <div className='flex items-center space-x-2'>
                                        <img src={product.image} alt={product.name} className='flex h-[80px] rounded-lg' />
                                        <div>
                                            <h2 className='dark:text-white'>{product.name}</h2>
                                            <span className='dark:text-white'>₹{product.price}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-sm mt-1'>
                                        <span className='text-gray-400'>Quantity : {order.orderedQuantity}</span>
                                        <span className='text-gray-400'>Ordered on : {date(order.orderDate)}</span>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>

    )
}

export default UserOrders