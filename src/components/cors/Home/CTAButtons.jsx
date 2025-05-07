import React from 'react'
import { Link } from 'react-router-dom'

const CTAButtons = ({linkto,children,active}) => {
  return (
      <div>
          
         
              
          <Link to={linkto}>
              
              <div className={`flex justify-center items-center 
                ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}
                border border-black rounded-md px-3 py-1  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2` }>
                  { children }
              </div>
               
          </Link>
              
         

          
         
          
          
      </div>
      
  )
}

export default CTAButtons