import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { setStep } from '../../../../../slices/course'
import { useDispatch, useSelector } from 'react-redux'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseApi';
const Publish = () => {


    const {
        handleSubmit,
        setValue,
        getValues,
        register
    } = useForm()

    const dispatch = useDispatch()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()


    const gotoCourses = () => {

        
        navigate('/dashboard/my-courses')
    }

    const handleCoursePublish = () => {
        
        // check if form is updated or not
        console.log('inside publish handlecoursepublish')

        if (course?.status === "Published" && getValues('public') === true
            || course?.status === "Draft" && getValues('public') === false
        ) {
            console.log('inside publish handlecoursepublish if statement')
            // form is not updated no need to call api
           return gotoCourses();
        }
        
        const formData = new FormData()
        const courseStatus = getValues().checked ? "Published" : "Draft"
        console.log('courseStatus: ' ,courseStatus)
        formData.append('status', courseStatus)
        formData.append('courseId',course._id)


        // api call for update status
        setLoading(true)
        dispatch(editCourseDetails(formData, token))
        setLoading(false)

        return gotoCourses();
    }


    const OnSubmit = (data) => {
        
        console.log('inside publish submit')
        handleCoursePublish(data)
    }


  return (
    
      <div className=' w-[70%] '>
              <div className='bg-richblack-800 p-5 mt-16 flex flex-col gap-5 rounded-xl border border-richblack-700'>
          <p className='text-white text-3xl font-semibold'>Publish Settings</p>


              <form onSubmit={handleSubmit(OnSubmit)}>
              <label htmlFor="public" className='flex gap-3 mt-5'>
              
              <input
                  type="checkbox"
                  name='public'
                  id='public'
                  {...register('checked')}
                      className='bg-richblack-800 border border-richblack-500 text-richblack-500 ' 
                      
              />

              <p className='text-richblack-500 font-semibold'>Make this course public</p>
                  </label>
                  

                  <div className='flex justify-between mt-20'>
              
              <button
                  type='button'
                      onClick={() => dispatch(setStep(2))}
                      className="flex gap-2 items-center border border-richblack-900 shadow-sm shadow-richblack-100 text-lg bg-richblack-800 text-richblack-5 font-semibold rounded-lg px-5 py-2 hover:scale-110 transition-all duration-200 "
                  >
                      <MdKeyboardArrowLeft className='text-2xl'/>
                      Back
                  </button>
                  
    
                  <div className='flex gap-4'>
                      <button
                          type='button'
                          onClick={() => gotoCourses()}
                          className="border border-richblack-900 shadow-sm shadow-richblack-100 text-lg bg-richblack-800 text-richblack-5 font-semibold rounded-lg px-5 py-2 hover:scale-110 transition-all duration-200 "
                      >
                          Save as a Draft
                      </button>
    
    
                      <button
                          type="submit"
                          className="border border-richblack-900 shadow-sm shadow-richblack-100 text-lg bg-yellow-100 text-black font-semibold rounded-lg px-5 py-2 hover:scale-110 transition-all duration-200 "
                      >
                          Save and Publish
                      </button>
                  </div>
              </div>
         </form>

         

          
          </div>
          
          
      </div>
      
  )
}

export default Publish