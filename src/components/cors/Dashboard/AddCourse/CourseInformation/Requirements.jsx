import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Requirements = ({ label,name, register, setValue,errors }) => {
    
    const [requirement, setRequirement] = useState('');
    const [requirementList, setRequirementList] = useState([]);

    const {course,editCourse} = useSelector((state)=> state.course)
    

    useEffect(() => {

        if (editCourse) {
            setRequirementList(course?.instructions)
        }
       register(name,{required: true})
    }, [])
    
    useEffect(() => {
        setValue(name, requirementList);
    },[requirementList])


    const AddRequirements=()=>{

        if (requirement) {
            setRequirementList([...requirementList, requirement]);
        }
    }

    const RemoveRequirements = (index) => {
        const updatedRequirement = [...requirementList];
        updatedRequirement.splice(index, 1)
        setRequirementList([...updatedRequirement])
    }

  return (
      <div>
          <label htmlFor={name}>{label}</label>
          
          <input
              type="text"
              name={name}
              id={name}
              onChange={(e)=> setRequirement(e.target.value)}
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] pl-8 mt-2"
          />

         

          <button
              type='button'
              onClick={()=>AddRequirements()}
              className='text-yellow-300 mt-3'>
              Add
          </button>


          <div>
              {
                  requirementList.length > 0 &&
                  requirementList.map((requirement,index) => (
                      <div key={index} className='flex gap-5'>
                          <p>{requirement}</p>
                          
                          <button
                              type='button'
                              onClick={()=> RemoveRequirements(index)}
                              className='text-richblack-400  text-md'
                          >
                              clear
                          </button>
                      </div>
                  ))
              }
          </div>
          {
              errors[name] && <span>Enter requirements**</span>
          }
      </div>
      
  )
}

export default Requirements