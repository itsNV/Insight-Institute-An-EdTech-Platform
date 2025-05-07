import React from 'react'

const LearningGrid = () => {


    const data = [
        {
            order: -1,
            description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide."
        },
        {
            order: 1,
            heading:"Curriculum Based on Industry Needs",
            description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:'The learning process uses the namely online and offline.'
        },
        {
            order: 3,
            heading: 'Certification',
            description:'You will get a certificate that can be used as a certification during job hunting.'
        },
        {
            order: 4,
            heading: 'Rating "Auto-grading"',
            description:'You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.'
        },
        {
            order: 5,
            heading: 'Ready to Work',
            description:'Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.'
        }
]

  return (
      <div className='flex justify-center'>
          
          <div className='grid grid-cols-4 w-[70%] '>
              
              {
                  data.map((ele,index) => {
                      
                      
                      return (
                        <div key={ index} className={`flex justify-center w-[100%] ${
                            ele.order == -1 ? "col-span-2" : "col-span-1"
                            }
                        ${
                            ele.order % 2 ==1 ? "bg-richblack-700" : "bg-richblack-800"
                            }
                        ${
                            ele.order == 3 && "col-start-2"
                            }`}>
                            
                            {
                                ele.order < 0 ?
                                    (
                                
                                        <div className='flex flex-col bg-richblack-900 '>
                                            <p className='text-richblack-50 text-3xl  font-semibold'>World-Class Learning for </p>
                                            <p className='text-3xl font-semibold text-blue-200'>Anyone ,
                                                <span className='text-3xl font-semibold text-blue-500'>Anywhare</span>
                                            </p>
    
                                            <p className='text-sm text-richblack-500 mt-3 w-[90%]'>{ ele.description}</p>
                                    </div>
                                
                                    ) : (
                                        
                                        <div className='flex flex-col gap-7 w-[70%] h-fit pb-14 pt-7 '>
    
                                            <p className='text-lg text-richblack-50'>{ele.heading}</p>
                                            
                                            <p className='text-sm text-richblack-300'>{ ele.description}</p>
                                        </div>
                                )
                            }
                            
              
              
                        </div>
                      )
                      
                  }
                  )
                  
                }

         </div>
          
         

      </div>
  )
}

export default LearningGrid