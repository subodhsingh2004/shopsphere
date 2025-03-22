import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
};

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
};


function ReviewCard({ reviewUserId, userId, username, rating, review, createdAt }) {

    const stars = [];

    // Add filled stars (StarIcon)
    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<StarIcon key={i} sx={{ color: "#ffd400", fontSize: "18px" }} />);
    }

    // Add empty stars (StarBorderIcon)
    for (let i = Math.floor(rating); i < 5; i++) {
        stars.push(<StarBorderIcon key={i} sx={{ color: "#ffd400", fontSize: "18px" }} />);
    }

    const date = new Date(createdAt);

    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);

    return (
        <div className='w-full h-[200px] px-3 md:px-0 md:h-[130px] flex flex-col md:flex-row justify-center'>

            <div className='space-x-2 md:space-x-0 md:space-y-1 flex md:flex-col items-center justify-between md:justify-center w-full md:w-1/4'>
                {/* Picture */}
                <div className='flex space-x-2 items-center md:items-start'>
                    <div className='w-[50px] h-[50px] rounded-full bg-[#ffd400] flex items-center justify-center font-medium text-2xl'>{username?.charAt(0)}</div>
                    <div className='leading-none flex flex-col'>
                        {/* Name */}
                        <h1 className='text-sm font-medium'>{username || 'Anonymous'}</h1>
                        {/* Date */}
                        <div className='flex flex-col'>
                            <span className='text-xs text-[#637381]'>{formattedDate}</span>
                            <span className='text-xs text-[#637381]'>{formattedTime}</span>
                        </div>
                    </div>
                </div>

                {
                    reviewUserId &&
                    reviewUserId === userId &&
                    <div className='flex md:hidden items-center justify-center'>
                        <button className='text-sm text-red-500 font-medium cursor-pointer'>
                            <DeleteForeverIcon sx={{ fontSize: "28px" }} />
                            {/* <span>Delete</span> */}
                        </button>
                    </div>
                }
            </div>

            <div className='w-full md:w-3/4 flex flex-col justify-center space-y-1'>

                <div className="flex items-center">
                    <div>
                        {stars}
                    </div>
                </div>

                {/* Badge */}
                {/* <div className='flex items-center'>
                    <VerifiedIcon sx={{ color: "#22c55e", fontSize: "16px" }} />
                    <span className='text-[#22c55e] text-xs font-medium'>Verified purchase</span>
                </div> */}

                <p className='text-sm text-[#1c252e] dark:text-[#e9e9e9]'>{review}</p>

            </div>

            {
                reviewUserId === userId &&
                <div className='hidden md:flex items-center justify-center w-full md:w-1/4'>
                    <button className='text-sm text-red-500 font-medium cursor-pointer'>
                        <DeleteForeverIcon sx={{ fontSize: "28px" }} />
                        {/* <span>Delete</span> */}
                    </button>
                </div>
            }

        </div>
    )
}

export default ReviewCard

