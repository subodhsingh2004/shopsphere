import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

function AdminPageLayout() {
  return (
    <>
      <div className='w-full h-auto relative top-[8vh] md:top-[9vh] bg-white dark:bg-black flex'>

        <AdminNavbar />

        <div className='h-full w-full bg-white dark:bg-black'>
          <Outlet />
        </div>

      </div>
    </>
  )
}

export default AdminPageLayout