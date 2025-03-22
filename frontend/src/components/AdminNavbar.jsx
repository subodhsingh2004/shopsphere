import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';

function AdminNavbar() {
    return (
        <>
            <div className='hidden z-10 fixed h-full w-[45px] hover:w-[180px] transition-all duration-300 bg-white dark:bg-[#121212] border-r border-r-[#e8e8e8] dark:border-r-[#313131] md:flex flex-col items-center py-4 font-[poppins]'>

                <nav className='w-full px-2.5 overflow-hidden'>
                    <ul>
                        <NavLink to={'/admin'} end className={({ isActive }) => `${isActive ? "text-[#3772ff] font-medium" : "text-gray-400"} w-full `}>
                            <li className='flex space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#212121] py-2 rounded-md'>
                                <DashboardIcon />
                                <span>Dashboard</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/admin/all-products'} className={({ isActive }) => `${isActive ? "text-[#3772ff] font-medium":"text-gray-400"} w-full `}>
                            <li className='flex space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#212121] py-2 rounded-md'>
                                <InventoryIcon />
                                <span>Products</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/admin/sales'} end className={({ isActive }) => `${isActive ? "text-[#3772ff] font-medium" : "text-gray-400"} w-full `}>
                            <li className='flex space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#212121] py-2 rounded-md'>
                                <CurrencyRupeeIcon />
                                <span>Sales</span>
                            </li>
                        </NavLink>
                        
                        <NavLink to={'/admin/orders'} end className={({ isActive }) => `${isActive ? "text-[#3772ff] font-medium" : "text-gray-400"} w-full `}>
                            <li className='flex space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#212121] py-2 rounded-md'>
                                <ShoppingCartIcon />
                                <span>Orders</span>
                            </li>
                        </NavLink>

                    </ul>
                </nav>

            </div>
        </>
    )
}

export default AdminNavbar