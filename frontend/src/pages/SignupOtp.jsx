import React from 'react'
import Loader from '../components/Loader'
import OtpInput from '../components/OtpInput'

function SignupOtp() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#111] font-[poppins]'>
        <div className='w-auto h-auto bg-[#191919] rounded-2xl border border-[#292929] flex flex-col items-center p-4 space-y-5'>
            <h1 className='text-gray-400 text-center leading-none'>Enter 6 Digit OTP sent to <br /> testuser@test.com</h1>
            <OtpInput length={6} />
            <button className='h-[35px] bg-[#3772ff] text-white font-medium w-full rounded-md cursor-pointer hover:bg-[#2361d1]'>Continue</button>
        </div>
    </div>
  )
}

export default SignupOtp