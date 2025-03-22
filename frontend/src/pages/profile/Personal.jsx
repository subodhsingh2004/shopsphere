import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userInfoUpdate } from '../../services/authApi'
import { update } from '../../slices/userSlice'

function Personal() {
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.user.userDetails)

    const [username, setUsername] = useState(userDetails.username || "")
    const [email, setEmail] = useState(userDetails.email || "")
    const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber || "")

    const [pinCode, setPinCode] = useState(userDetails.address?.pinCode || "")
    const [streetAddress, setStreetAddress] = useState(userDetails.address?.street || "")
    const [city, setCity] = useState(userDetails.address?.city || "")
    const [state, setState] = useState(userDetails.address?.state || "")

    const [editStatus, setEditStatus] = useState(false)

    const handleEdit = async () => {
        const status = editStatus
        setEditStatus(!status)

        if (status) {
            try {
                const updatedUserInfo = await userInfoUpdate(
                    userDetails._id,
                    username,
                    phoneNumber,
                    streetAddress,
                    pinCode,
                    city,
                    state
                )

                if (updatedUserInfo.data) dispatch(update(updatedUserInfo.data?.updatedUserInfo))
                toast.success("Updated successfully")

            } catch (error) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <div className='w-full h-auto lg:h-[500px] font-[poppins] flex flex-col pb-4 lg:pb-0'>
            <h1 className='font-medium text-xl dark:text-white'>Personal</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} readOnly={!editStatus} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} readOnly={true} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">Phone number</label>
                    <input type="text" max={10} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} readOnly={!editStatus} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">Gender</label>
                    <select className='w-auto h-full px-2 mt-2 outline-none text-sm text-black dark:text-white appearance-none'>
                        <option value="Male" className='text-sm'>Male</option>
                        <option value="Female" className='text-sm'>Female</option>
                        <option value="Others" className='text-sm'>Others</option>
                    </select>
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">Street address</label>
                    <input type="text" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} readOnly={!editStatus} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">Pincode</label>
                    <input type="text" value={pinCode} onChange={e => setPinCode(e.target.value)} readOnly={!editStatus} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} readOnly={!editStatus} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

                <div className="w-full h-[50px] bg-gray-100 dark:bg-[#202020] py-1 rounded-md">
                    <label className="text-sm font-medium pl-2 absolute select-none text-gray-400">State</label>
                    <input type="text" value={state} onChange={e => setState(e.target.value)} readOnly={!editStatus} className="w-full h-full px-2 mt-2 outline-none text-sm text-black dark:text-white" />
                </div>

            </div>

            <div className='w-full flex pt-4 lg:pt-0 flex-1 justify-end items-end'>

                <button onClick={handleEdit} className='text-sm font-medium bg-[#3772ff] rounded-md py-2 px-3 text-white cursor-pointer'>
                    {
                        editStatus ? "Save changes" : "Edit"
                    }
                </button>

                <button onClick={() => setEditStatus(false)} className={`${editStatus ? "flex" : "hidden"} bg-red-500 text-white py-2 px-3 text-sm font-medium rounded-md ml-2 cursor-pointer`}>Cancel</button>

            </div>

        </div>
    )
}

export default Personal