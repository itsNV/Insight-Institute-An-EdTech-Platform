import React from 'react'
import HighlightText from '../Home/HighlightText'

const Quate = () => {
  return (
      <div className='flex flex-row text-richblack-5 text-3xl w-[67%] font-semibold text-center'> 
          <p>
             
              <span className='text-richblack-700 text-[3rem]'>"</span>
              We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"} /> ,
              <span className='text-pink-300'>experties</span>
              
              ,
              and community to create an
              <span className='text-yellow-100'> unparalleled educational experience.
                  <span className='text-richblack-700 text-[3rem]'>"</span></span>
              
          </p>
      </div>
      
  )
}

export default Quate