import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ProfilePageNav from '../../components/ProfilePageNav'


function ProfilePage() {
    const { userId } = useParams()

    return (
        <div className='relative bg-white dark:bg-[#111] min-h-[91vh] top-[8vh] sm:top-[9vh] flex justify-center items-center font-[poppins]'>

            <div className='h-full w-[90%] xl:w-[80%] flex items-center flex-col lg:flex-row space-y-5 py-4 lg:space-x-12'>
                <ProfilePageNav/>
                <Outlet/>
            </div>

        </div>
    )
}

export default ProfilePage