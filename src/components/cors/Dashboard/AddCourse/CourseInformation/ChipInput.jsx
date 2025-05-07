import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux'


const ChipInput = ({
    label,
    name,
    register,
    setValue,
    getValues,
    errors
}) => {


    const {course,editCourse} = useSelector((state)=> state.course)
    const [chips, setChips] = useState([])
    
    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter' || event.key === ',') {
            
            event.preventDefault();

            const chipValue = event.target.value.trim();

            if (chipValue && !chips.includes(chipValue)) { 

                const newChips = [...chips, chipValue]

                setChips(newChips);
                event.target.value = ""
            }
        }
    }


    const handleDeleteChips = (chipIndex) => {
        
        const newChips = chips.filter((_,index) => chipIndex !== index)

        setChips(newChips)
    }



    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag)
        }

        register(name, {required: true, validate:(value)=>  value?.length > 0})
    }, [])
    

    useEffect(() => {
        setValue(name,chips)
    },[chips])



  return (
      <div>
          <label htmlFor={ name}>{ label} <sup className='text-pink-200'>*</sup></label>
          
          <div className='flex gap-2 flex-wrap'>
          {
               chips?.length > 0 && 
               
              chips.map((chip, index) => (
                  <div key={index} className='flex gap-2 justify-center items-center px-2  p-1 rounded-3xl mt-2
                  bg-blue-500 w-auto'>
                {chip}
  
                <RxCross2 onClick={() => handleDeleteChips(index)} className='text-richblack-800'/>
            </div>
              ))
         }

         </div>
          
          <div>
              
              <input
                  type="text"
                  name={name}
                  id={name}
                  onKeyDown={handleKeyDown}
                   className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2"
              />

              {
                  errors[name] && <span className='text-pink-200'>{ label} is required</span>
              }
          </div>
    </div>
  )
}

export default ChipInput