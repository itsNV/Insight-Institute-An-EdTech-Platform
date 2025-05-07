import React from 'react'
import RenderSteps from './RenderSteps'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AddCourse = () => {

  
  const {modal} = useSelector((state)=> state.profile)

  return (
    <div className={`text-white mt-32 relative ${modal ? 'z-[-1]' : 'z-[0]'}`}>
      
      <div>
        <RenderSteps />
      </div>

      <div className='fixed flex flex-col gap-3 border border-richblack-700 rounded-lg bg-richblack-800 right-28 top-28
       p-5 outline-2 w-[26%] text-sm'>

        <p className='text-lg font-semibold'>Course Creation Tips :</p>
        <li className='flex flex-col gap-2'>
          <li>Set the Course Price option or make it free</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </li>
      </div>
    </div>
   
  )
}

export default AddCourse