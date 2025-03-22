import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { toast } from 'react-toastify';

function CheckoutPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { products, totalPrice } = location.state
    const user = useSelector(state => state.user.userDetails)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    const [selectedPayment, setSelectedPayment] = useState('online');

    const handleConfirmOrder = async () => {
        const response = await axios.post('/api/v1/order/checkout', {
            productsPrice: totalPrice,
            products,
            user
        })
        console.log(response)

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount: response.data.razorpayOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "ShopSphere",
            description: "Test Transaction",
            image: "https://res.cloudinary.com/filedatabase/image/upload/v1742119757/Screenshot_2025-03-16_153715_ggvvqf.png",
            order_id: response.data.razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "/api/v1/order/payment-verification",
            prefill: {
                name: user.username,
                email: user.email,
                contact: user.phoneNumber
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3772ff"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();

    }

    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
    }, [])

    return (
        <>
            <div className='w-full h-[92vh] md:h-[91vh] relative top-[8vh] md:top-[9vh] bg-white dark:bg-black px-4 md:px-8 py-8 flex flex-col space-y-5 font-[poppins]'>

                <div className='w-full h-full flex flex-col justify-between items-center'>

                    <div className='space-y-3 w-full flex flex-col items-center'>

                        <div className='bg-white dark:bg-[#212121] px-3 h-[100px] flex flex-col justify-center w-full sm:w-[400px] lg:w-[500px] rounded-sm font-[poppins] leading-none border border-gray-300 dark:border-0'>
                            <div className='flex justify-between'>
                                <span className='text-gray-500 dark:text-gray-400 font-light'>Delivered to</span>
                                <button className='text-sm text-[#3772ff] cursor-pointer'>Edit</button>
                            </div>
                            <h1 className='text-black dark:text-white font-bold text-lg'>{user.username}</h1>
                            <p className='text-[#121212] dark:text-gray-200'>{user.address.street}, {user.address.city}, {user.address.state} - {user.address.pinCode}</p>
                        </div>

                        <div className='bg-white dark:bg-[#212121] p-3 h-auto flex flex-col w-full sm:w-[400px] lg:w-[500px] rounded-sm font-[poppins] leading-none border border-gray-300 dark:border-0 space-y-1'>
                            <span className='text-gray-500 dark:text-gray-400 font-medium'>Order Summary</span>
                            <div className='flex'>
                                <div className='flex w-full justify-between items-center'>
                                    <h2 className='dark:text-white text-sm md:text-[16px]'>Total Items amount</h2>
                                    <span className='font-semibold text-lg dark:text-[#ffd400]'>₹{totalPrice}</span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white dark:bg-[#212121] p-3 h-auto flex flex-col w-full sm:w-[400px] lg:w-[500px] rounded-sm font-[poppins] leading-none border border-gray-300 dark:border-0 space-y-4'>

                            <span className='text-gray-500 dark:text-gray-400 font-medium'>Payment Method</span>
                            <div className='flex flex-col'>
                                <div className='w-full flex justify-between relative'>
                                    <label htmlFor="cod" className='cursor-pointer dark:text-white text-sm w-full'>Cash on Delivery</label>
                                    <input
                                        type="checkbox"
                                        id="cod"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={selectedPayment === 'COD'}
                                        onChange={() => toast.info("Cash on delivery is currently not available")}
                                        style={{ opacity: 0 }}
                                    />
                                    <div onClick={() => setSelectedPayment(selectedPayment === 'COD' ? '' : 'COD')}
                                        className='dark:text-white absolute right-0'>
                                        {
                                            selectedPayment === "COD" ?
                                                <CheckCircleIcon sx={{ fontSize: "20px" }} /> :
                                                <RadioButtonUncheckedIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>
                                </div>
                                <div className='w-full flex justify-between relative'>
                                    <label htmlFor="online" className='cursor-pointer dark:text-white text-sm w-full'>Online payment</label>
                                    <input
                                        type="checkbox"
                                        id="online"
                                        name="paymentMethod"
                                        value="online"
                                        checked={selectedPayment === 'online'}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        style={{ opacity: 0 }}
                                    />
                                    <div onClick={() => setSelectedPayment(selectedPayment === 'online' ? '' : 'online')} className='dark:text-white absolute right-0'>
                                        {
                                            selectedPayment === "online" ?
                                                <CheckCircleIcon sx={{ fontSize: "20px" }} /> :
                                                <RadioButtonUncheckedIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='w-full sm:w-[400px] lg:w-[500px]'>
                        <button onClick={handleConfirmOrder} className='bg-[#3772ff] hover:bg-[#275ad2] w-full text-white py-2 rounded-md text-lg font-medium cursor-pointer'>Confirm order</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CheckoutPage