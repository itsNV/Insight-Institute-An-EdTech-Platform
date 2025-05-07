import React from 'react'
import { GrEdit } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const EdditBtn = () => {
    const navigate = useNavigate();
    return (
      
        <button className="flex gap-3 items-center bg-yellow-100 px-3 py-2 rounded-md text-richblack-900 text-sm font-semibold cursor-pointer"
        onClick={()=>navigate('/dashboard/settings')}>
            <GrEdit />
            Edit
        </button>
  )
}

export default EdditBtn