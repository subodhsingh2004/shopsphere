import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../services/authApi';
import { logout } from '../slices/userSlice';
import { toast } from 'react-toastify';

function ProfilePageNav() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.user.userDetails)

    const handleLogout = async () => {
        try {
            const response = await userLogout()
            if (response.data) dispatch(logout())
            toast.info("Logout successfully")
            navigate('/')
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
    return (
        <div className='h-full w-full md:w-auto flex items-center flex-col md:flex-row'>
            <div className='md:h-[500px] w-full md:w-[280px] dark:bg-[#191919] flex flex-col items-center border border-gray-200 dark:border-[#414141] rounded-2xl'>
                {/* Profile */}
                <div className='w-full flex flex-col items-center py-6 space-y-3 border-b border-b-gray-200 dark:border-b-[#414141]'>
                    {/* Profile Image */}
                    <div className='w-[70px] h-[70px] bg-[#ffd400] flex items-center justify-center text-3xl font-bold rounded-full'>A</div>
                    {/* Name and Email */}
                    <div className='leading-none'>
                        <h1 className='font-medium text-center dark:text-white'>{userDetails.username}</h1>
                        <span className='text-sm text-gray-500'>{userDetails.email}</span>
                    </div>
                </div>
                {/* Buttons */}
                <div className='w-full flex-col flex-1 p-6 space-y-4'>

                    <NavLink to={`/profile/${userDetails._id}`} end className={({ isActive }) => `flex items-center gap-2 cursor-pointer text-sm ${isActive ? "text-[#3772ff] font-medium" : "text-[#707070]"} `}>
                        <PersonOutlineOutlinedIcon />
                        <span>Personal</span>
                    </NavLink>

                    <NavLink to={`/profile/${userDetails._id}/orders`} className={({ isActive }) => `flex items-center gap-2 cursor-pointer text-sm ${isActive ? "text-[#3772ff] font-medium" : "text-[#707070]"} `}>                        <ShoppingBagOutlinedIcon />
                        Orders
                    </NavLink>

                </div>
                {/* Logout */}
                <div className='w-full flex items-center px-6 h-[60px] border-t border-gray-200 dark:border-[#414141]'>
                    <button onClick={handleLogout} className='text-sm gap-2 flex items-center cursor-pointer text-[#707070] dark:text-white'>
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageNav