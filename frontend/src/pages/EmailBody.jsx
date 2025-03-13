import React from 'react'

function EmailBody() {
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='bg-[#141414] shadow-lg border h-auto w-[500px] rounded-2xl font-[poppins] flex flex-col justify-between items-center p-5 text-gray-300'>
                    <h1 className='font-[cookie] text-[40px] leading-none text-[#3772ff]'>Shop<span className='text-[#f8d525]'>Sphere</span></h1>

                    <div>
                        <p className='leading-none text-sm pt-5'>Thank you for choosing Shopsphere! We’re excited to have you join our community.
                            To complete your signup process, please enter the One-Time Password (OTP) below:
                        </p>

                        <div className='my-4 bg-[#3772ff] w-full text-center py-2 rounded-md'>
                            <span className='text-lg font-bold text-white tracking-wider'>123456</span>
                        </div>

                        <p className='leading-none text-sm'>This code is valid for the next 10 minutes. If you didn’t request this, please ignore this email.</p>

                        <p className='leading-none text-sm w-full text-left pt-5'>Best regards, <br />
                            <span className='font-semibold text-[#ffd400]'>The Shopsphere Team</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailBody