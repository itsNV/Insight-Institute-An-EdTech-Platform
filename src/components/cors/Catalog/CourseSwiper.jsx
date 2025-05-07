import React, { useEffect } from 'react'
import {Swiper} from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'




const CourseSwiper = ({data}) => {

    const navigate = useNavigate();
    
  return (
      <div className='mt-5'>
          
          <Swiper
              modules={[Pagination, Navigation]}
              navigation = {true}
              pagination ={true}
              loop={true}
              direction='horizontal'
              slidesPerView={3}
              

      
          >
              
              {
                  
                  data?.map((course,index) => (
                      <SwiperSlide key={index} className=' w-[50%]' >
                          <div onClick={()=> navigate(`/differentCourses/${course._id}`)}>
                          <div>
                           <img src={course.thumbnail} alt="courseImage" className='w-[80%] rounded-lg'/>
                          </div>

                          <div className='mt-3 flex flex-col gap-1'>
                              
                              <p className='text-lg font-semibold text-richblack-25'>{course.CourseName}</p>

                              <p className='text-md text-richblack-400'>
                                  <span>{course.instructor.firstName}</span>  <span>{course.instructor.lastName}</span>
                              </p>

                              <p className='text-richblack-50'>Ratings pending</p>
                              
                              <p className='text-lg font-semibold text-richblack-5'>Rs. { course.price}</p>
                          </div>
                         </div>

                      </SwiperSlide>
                  ))
              }
          </Swiper>
    </div>
  )
}

export default CourseSwiper