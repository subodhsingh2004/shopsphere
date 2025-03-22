import { Link } from "react-router-dom"
import CopyrightIcon from '@mui/icons-material/Copyright';

function Footer() {
  const isAdminPage = location.pathname.includes('/admin')

  return (
    <>
      <footer className={`${isAdminPage? "hidden" : "flex"} relative top-[8vh] sm:top-[9vh] w-full h-[25vh] bg-white dark:bg-[#000] flex-col justify-center items-center border-t border-gray-300 dark:border-gray-600  font-[poppins]`}>

        <Link to={"/"}>
          <h1 className='font-[cookie] text-[40px] text-[#3772ff] leading-10'>Shop<span className='text-[#f8d525]'>Sphere</span></h1>
        </Link>

        <p className="text-gray-600 text-center text-sm md:text-[16px]">Discover, Explore, Shop - all in the sphere</p>
        <span className="text-[13px] text-gray-400 flex items-center space-x-1">
          <CopyrightIcon sx={{ fontSize: "13px" }} />
          <p>All rights reserved</p>
        </span>

      </footer>
    </>
  )
}

export default Footer