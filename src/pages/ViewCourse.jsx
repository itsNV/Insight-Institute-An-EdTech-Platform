import React from 'react'
import Sidebar from '../components/cors/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import CourseBar from '../components/cors/ViewCourse/CourseBar'

const ViewCourse = () => {
  return (
    <div className='flex w-full  relative'>
          
    <div className='w-[25%]'>
       <CourseBar />
    </div>

    <div className='w-[50%]'>
        <Outlet />
    </div>
    
</div>
  )
}

export default ViewCourse