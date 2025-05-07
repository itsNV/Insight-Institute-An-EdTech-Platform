import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
      <div className=' fixed inset-0 grid place-items-center bg-white bg-opacity-10 
      z-[10000] backdrop-blur-sm'>
          <div className='h-[10rem] w-[20rem] border border-richblack-400 bg-richblack-50
          flex flex-col items-center pt-4 rounded-lg text-md font-semibold font-mono pl-3'>
              <p>{ modalData.text1}</p>
              <p>{ modalData.text2}</p>

              <div className='mt-4 flex flex-row gap-5'>
                  <button
                        className="border border-black rounded-md px-3 py-1  shadow-sm shadow-richblack-50
                    hover:scale-110
                    transition-all duration-200 
                    gap-2 bg-richblack-800 text-white hover:bg-yellow-50 hover:text-black"
                      onClick={modalData.btn1Handler}>{modalData.btn1text}</button>
                  

                  <button
                      className="border border-black rounded-md px-3 py-1  shadow-sm shadow-richblack-50
                      hover:scale-110 
                      transition-all duration-200 
                      gap-2 bg-richblack-800 text-white hover:bg-yellow-50 hover:text-black"
                      onClick={modalData.btn2Handler}>{modalData.btn2text}</button>
                  
                  
              </div>
          </div>
      </div>
      
  )
}

export default ConfirmationModal