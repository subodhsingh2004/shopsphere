import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

function OtpInput({ length, submitOtp }) {

  const inputRef = useRef([])
  const [otp, setOtp] = useState(new Array(length).fill(""))

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus()
    }
  }, [])

  const handleChange = (e, idx) => {
    const val = e.target.value
    if (val === " ") return
    if (isNaN(val)) return

    const newOtp = [...otp];

    newOtp[idx] = val.substring(val.length - 1);
    setOtp(newOtp);

    // all otp value
    // const optVal = newOtp.join("")
    // if (optVal.length == length) submitOtp(optVal)

    if (val.length && idx < length - 1) {
      inputRef.current[idx + 1].focus()
    }
  }

  const handleClick = (idx) => {
    inputRef.current[idx].setSelectionRange(1, 1);
  }

  const handleKeyClick = (e, idx) => {
    if (e.key == 'Backspace' && idx > 0 && otp[idx] == "" && inputRef.current[idx - 1]) {
      inputRef.current[idx - 1].focus()
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join("")

    if (otp.every(val => val.trim() !== "")) {
      setOtp(new Array(length).fill(""))
      submitOtp(otpValue)
    } else {
      toast.error("All fields are required")
    }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <form onSubmit={handleOtpSubmit} className='space-y-5'>
          <div className='flex space-x-2'>
            {
              otp.map((val, idx) => (
                <input type="text"
                  key={idx}
                  ref={(input) => (inputRef.current[idx] = input)}
                  value={val}
                  onChange={(e) => handleChange(e, idx)}
                  onClick={(e) => handleClick(idx)}
                  onKeyDown={(e) => handleKeyClick(e, idx)}
                  className='h-[35px] w-[35px] rounded-md focus:outline-[#616161] outline outline-[#212121] bg-[#313131] text-center text-sm font-[poppins] text-white'
                />
              ))
            }
          </div>
          <button type='submit' className='h-[35px] bg-[#3772ff] text-white font-medium w-full rounded-md cursor-pointer hover:bg-[#2361d1]'>Continue</button>
        </form>
      </div>

    </>
  )
}

export default OtpInput