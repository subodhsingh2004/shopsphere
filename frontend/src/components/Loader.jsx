import React from 'react';
import './style.css'

const Loader = ({ isActive }) => {
    if (isActive) return (
        <div className='absolute z-50 w-full h-screen flex flex-col items-center justify-center bg-transparent backdrop-blur-xs'>
            <div className='loader'></div>
            {/* <span className='font-[poppins] text-white font-medium'>Loading...</span> */}
        </div>

    );
};

export default Loader;
