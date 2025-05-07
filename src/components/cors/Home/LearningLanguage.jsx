import React from 'react'
import HighlightText from './HighlightText'
import img1 from '../../../assets/Images/Know_your_progress.png'
import img2 from '../../../assets/Images/Compare_with_others.png'
import img3 from '../../../assets/Images/Plan_your_lessons.png'
import CTAButtons from './CTAButtons'

const LearningLanguage = () => {
  return (
      <div className='pr-[10rem] flex flex-col gap-5 w-11/12 items-center mr-[4rem] mt-24 flex-wrap'>
          
          <div className='flex flex-col gap-4 items-center flex-wrap'>
              
              <div className='text-center text-4xl font-semibold '>
              <p>Your Swiss knife for  <HighlightText text={"learning any language"}/></p>
              </div>

              <p className='w-[70%] text-center text-sm text-richblack-600 font-inter'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
              
          </div>


          <div className='flex flex-row w-11/12 max-w-maxContent justify-center lg:ml-[16rem] flex-wrap'>
              
              <div>
                  
                  <img src={img1} alt="image1" className='h-[20rem]'/>
       
              </div>

              <div>
              <img src={img2} alt="image2" className='lg:-translate-x-20 h-[20rem]'/>
              </div>

              <div>
              <img src={img3} alt="image3" className='lg:-translate-x-48 h-[20rem]'/>
              </div>

   
              
              
              
          </div>

          <div className='mt-10 mb-20'>
              <CTAButtons active={true} linkto={'/signUp'}>
                  Learn More
              </CTAButtons>
          </div>
    </div>
  )
}

export default LearningLanguage