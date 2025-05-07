import React from 'react'
import { MdPeople } from "react-icons/md";
import { PiArrowsSplitLight } from "react-icons/pi";
const Card = ({data}) => {
  return (
      <div className='flex flex-col bg-richblack-800 mt-10 w-[25%] h-[14rem]
      pl-6 pt-4 pr-6'>
          <div>
              <p>{data.heading}</p>
              
              <p className='text-richblack-500 mt-3'>{ data.description}</p>
          </div>

          <div className='h-[1px] w-full border border-richblack-500 border-dashed
          mt-8'></div>

          <div className='flex flex-row justify-between text-richblack-600
          pt-4'>
              <p className='flex flex-row gap-2 items-center'>
                  <MdPeople />
                  {data.level}</p>
              
              <p className='flex flex-row gap-2 items-center'>
                  <PiArrowsSplitLight />
                  {data.lessionNumber} Lessons</p>
          </div>

      </div>
      
  )
}

export default Card