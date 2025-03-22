import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useTheme from '../contexts/Theme.js';
import { getProductsOfCart } from '../services/cartApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsInCart } from '../slices/cartSlice.js';
import { toast } from 'react-toastify'
import { userLogout } from '../services/authApi.js';
// import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
    const numberOfProductsInCart = useSelector(state => state.cart.totalQuantity)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const userDetails = useSelector(state => state.user.userDetails)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const isAdminPage = location.pathname.includes('/admin')

    const [searchQuery, setSearchQuery] = useState("")
    const { lightTheme, darkTheme } = useTheme()
    const [theme, setTheme] = useState("light")
    const [products, setProducts] = useState([])
    const [searchBarStatus, setSearchBarStatus] = useState(false)
    const [mobileNavStatus, setMobileNavStatus] = useState(false)

    const getCartProducts = async () => {
        const productLists = await getProductsOfCart(userDetails._id)
        setProducts(productLists.data)
        dispatch(setProductsInCart(productLists.data))
    }

    useEffect(() => {
        if (isLoggedIn) getCartProducts()
    }, [])

    const handleLogoClick = () => {
        if (location.pathname == "/") window.scrollTo(0, 0)
        navigate("/")
    }


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value.trim())
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`)
        }
    }

    const onChangeBtn = () => {
        const darkModeStatus = theme

        if (darkModeStatus == 'light') {
            darkTheme()
            setTheme('dark')
        } else {
            lightTheme()
            setTheme('light')
        }
    }

    const handleProfileClick = () => {
        if (isLoggedIn) {
            setMobileNavStatus(false)
            navigate(`/profile/${userDetails?._id}`)
        }
        else {
            toast.error("Please login!")
            navigate("/login")
        }
    }

    const handleCartClick = () => {
        if (isLoggedIn) {
            setMobileNavStatus(false)
            navigate(`/cart`)
        }
        else {
            toast.error("Please login!")
            navigate("/login")
        }
    }

    const handleLogout = async () => {
        const response = await userLogout()
        toast.info("Logout successfully")
    }
    return (
        <>
            <nav className='hidden fixed z-10 w-full h-[9vh] bg-white shadow-xl dark:shadow-none dark:bg-gradient-to-b from-black to-[#222] sm:flex items-center px-8 justify-between'>
                <button onClick={handleLogoClick} className='cursor-pointer'>
                    <h1 className='font-[cookie] text-[40px] text-[#3772ff]'>Shop<span className='text-[#f8d525]'>Sphere</span></h1>
                </button>

                {!isAdminPage && <div className='outline flex items-center outline-gray-400 h-[5vh] w-320px lg:w-[500px] rounded-full'>
                    <form onSubmit={handleSearch} className='flex w-full items-center justify-center'>
                        <input type="text" onChange={handleInputChange} className='rounded-full w-full px-4 text-gray-600 dark:text-white font-[dmsans] outline-none h-[6vh] font-medium'
                            placeholder={searchQuery.trim() === "" ? "Search" : ""} value={searchQuery} />

                        <button className='bg-[#ffd400] cursor-pointer h-[5vh] w-[6vh] rounded-full flex justify-center items-center'><SearchIcon sx={{ fontSize: 24 }} /></button>
                    </form>
                </div>}

                <div className='flex space-x-2'>
                    <ul className='flex space-x-3 items-center'>
                        <li>
                            <button onClick={onChangeBtn}>
                                {theme == 'dark' ? <LightModeIcon sx={{ color: "#fff", fontSize: "32px" }} /> : <DarkModeIcon sx={{ color: "#000", fontSize: "32px" }} />}
                            </button>
                        </li>

                        {
                            !isAdminPage && isLoggedIn ? <li className='relative'>
                                <Link to={'/cart'}>
                                    <div className='absolute right-0 -top-1 w-[18px] h-[18px] bg-red-500 rounded-full font-[poppins] text-[14px] text-white flex items-center justify-center font-medium'><span>{numberOfProductsInCart}</span></div>
                                    <ShoppingCartIcon sx={{ color: "#ffd400", fontSize: "32px" }} />
                                </Link>
                            </li> : null
                        }

                        {
                            isLoggedIn ?
                                <li>
                                    <Link to={`/profile/${userDetails?._id}`}>
                                        <AccountCircleIcon sx={{ color: "#3772ff", fontSize: "32px" }} />
                                    </Link>
                                </li> :

                                <li>
                                    <Link to={'/login'} className='border border-gray-300 dark:border-[#808080] dark:text-[#808080] font-medium font-[poppins] py-[7px] px-[12px] text-sm rounded-lg hover:bg-gray-200 hover:dark:bg-[#202020] cursor-pointer'>
                                        <button className='cursor-pointer'>Login</button>
                                    </Link>
                                </li>
                        }



                    </ul>
                </div>
            </nav>

            <nav className='fixed z-20 w-full h-[8vh] bg-white shadow-xl dark:shadow-none dark:bg-[#000] sm:hidden flex items-center px-2 justify-center dark:border-b dark:border-b-gray-500'>

                <div className={`w-full h-full transition-all duration-300 space-x-2 pr-2 flex items-center justify-center bg-white absolute ${searchBarStatus ? "top-0" : "top-[-8vh]"} `}>

                    <form onSubmit={handleSearch} className='flex w-full items-center justify-center'>
                        <input type="text" onChange={handleInputChange} className='rounded-full w-full px-2 text-gray-600 dark:text-white font-[dmsans] outline-none h-[6vh] font-medium'
                            placeholder={searchQuery.trim() === "" ? "Search" : ""} value={searchQuery} />

                        <button className='bg-[#ffd400] cursor-pointer h-[6vh] w-[7vh] rounded-full flex justify-center items-center'><SearchIcon sx={{ fontSize: 24 }} /></button>
                    </form>

                    <button onClick={() => setSearchBarStatus(false)}><CloseIcon /></button>
                </div>

                <div className='w-full flex justify-between'>
                        <button onClick={handleLogoClick} className='font-[cookie] text-[30px] text-[#3772ff]'>Shop<span className='text-[#f8d525]'>Sphere</span></button>
                    <div className='flex space-x-2'>
                        <ul className='flex items-center space-x-1'>
                            <li>
                                <button onClick={() => setSearchBarStatus(true)}>
                                    <SearchIcon sx={{ color: "#121212", fontSize: "28px" }} />
                                </button>
                            </li>

                            {/* <li>
                                <button onClick={handleProfileClick}>
                                    <AccountCircleIcon sx={{ color: "#3772ff", fontSize: "32px" }} />
                                </button>
                            </li> */}
                            <li>
                                <button onClick={() => setMobileNavStatus(true)}>
                                    <MenuIcon sx={{ color: "#3772ff", fontSize: "32px" }} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>

            <div className={`w-[80%] z-50 h-screen transition-all duration-300 border-l border-gray-200 dark:border-[#212121] fixed bg-white dark:bg-[#141414] ${mobileNavStatus ? "right-0" : "right-[-80%]"} font-[poppins] flex flex-col justify-between`}>

                <div>
                    <div className='w-full flex justify-between items-center border-b border-gray-200 dark:border-[#212121] px-3 py-2'>
                        <button onClick={onChangeBtn}>
                            {theme == 'dark' ? <LightModeIcon sx={{ color: "#fff", fontSize: "32px" }} /> : <DarkModeIcon sx={{ color: "#000", fontSize: "32px" }} />}
                        </button>
                        <button onClick={() => setMobileNavStatus(false)} className='dark:text-white'>
                            <CloseIcon sx={{ fontSize: "30px" }} />
                        </button>
                    </div>

                    <div className='p-4 w-full flex flex-col '>
                        <div className='w-full'>
                            <button onClick={handleProfileClick} className='space-x-2   border-gray-200 rounded-md px-1 w-full flex items-center py-2'>
                                <AccountCircleIcon sx={{ color: "#3772ff", fontSize: "34px" }} />
                                <span className='dark:text-white'>Profile</span>
                            </button>
                        </div>
                        <div className='w-full'>
                            <button onClick={handleCartClick} className='space-x-2 border-gray-200 rounded-md px-1 w-full flex items-center py-2'>
                                <ShoppingCartIcon sx={{ color: "#ffd400", fontSize: "34px" }} />
                                <span className='dark:text-white'>Cart</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='w-full p-4'>
                    {
                        isLoggedIn ?
                            <button onClick={handleLogout} className='w-full bg-[#3772ff] text-white font-medium rounded-md py-2 text-lg'>Logout</button> :
                            <button onClick={() => navigate('/login')} className='w-full bg-[#3772ff] text-white font-medium rounded-md py-2 text-lg'>Login</button>
                    }
                </div>
            </div>

            {/* <footer className='fixed z-20 bottom-0 w-full h-[8vh] bg-white shadow-lg dark:shadow-none dark:bg-[#000] sm:hidden flex items-center px-2 justify-between dark:border-t dark:border-t-gray-500 rounded-t-3xl'>
                <ul className='flex w-full justify-evenly items-center'>
                    <li>
                        <HomeIcon sx={{ color: "#3772ff", fontSize: "30px" }} />
                    </li>
                    <li>
                        {
                            theme == 'dark' ?
                                <SearchIcon sx={{ fontSize: "30px", color: "#f8d525" }} />
                                : <SearchIcon sx={{ fontSize: "30px", color: "#000" }} />
                        }
                    </li>
                    <li className='relative'>
                        <Link to={'/'}>
                            <div className='absolute right-0 -top-1 w-[16px] h-[16px] bg-red-500 rounded-full font-dmsans text-[12px] text-[#212121] flex items-center justify-center font-bold'><span>5</span></div>
                            <ShoppingCartIcon sx={{ color: "#f8d525", fontSize: "30px" }} />
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'}>
                            <AccountCircleIcon sx={{ color: "#3772ff", fontSize: "30px" }} />
                        </Link>
                    </li>
                </ul>
            </footer> */}
        </>
    )
}

export default Navbar