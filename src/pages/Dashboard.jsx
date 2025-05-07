import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/cors/Dashboard/Sidebar'

const Dashboard = () => {
  return (
      <div className='flex w-full  relative'>
          
          <div className='w-[25%]'>
             <Sidebar />
          </div>

          <div className='w-[50%]'>
              <Outlet />
          </div>
          
      </div>
      
  )
}

export default Dashboard