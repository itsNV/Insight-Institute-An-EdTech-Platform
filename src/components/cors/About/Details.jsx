import React from 'react'

const Details = () => {



    const data = [
        {
            number: '5K',
            text: "Active students"
        },
        {
            number: '10+',
            text: 'Mentors'
        },
        {
            number: '200+',
            text:"Courses"
        },
        {
            number: '50+',
            text:"Awards",
        }
]

  return (
      <div className='w-full'>
          
          <div className='flex justify-around p-20 '>
              {
                  data.map((ele, index) => {
                      
                      return (
                          <div key={ index} className='flex flex-col gap-3 items-center'>
                              <p className='text-2xl text-richblack-25 font-semibold'>{ele.number}</p>
                              

                              <p className='text-sm text-richblack-500'>{ ele.text}</p>
                          </div>
                      )
                  })
              }
          </div>

      </div>
      
  )
}

export default Details