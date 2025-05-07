import React from 'react'
import CTAButtons from './CTAButtons'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const codeBlocks = ({
    position,heading,subheading,ctabtn1,ctabtn2,backgroundGradient,codeContent
}) => {
  return (
      <div className={`sec1_code1 flex ${position} w-[79%] mt-20 justify-between gap-20`}>
          
          {/* section 1 */}
          <div className='w-[60%] px-3 flex flex-col text-white mt-10'>
              <p>{heading}</p>

              <p className='mt-3 text-richblack-300'>{subheading}</p>
              
              <div className='btns flex gap-3 mt-12'>
                  <CTAButtons linkto={ctabtn1.linkto} active={ctabtn1.active}
                  className='flex'
                  >
                      {ctabtn1.text}
                      <FaArrowRight />
                  </CTAButtons>
                 
              <CTAButtons linkto={ctabtn2.linkto} active={ctabtn2.active}>
              {ctabtn2.text}
              </CTAButtons>
              </div>
             
          </div>


          {/* section 2 */}

          <div className='typeAnimation mt-10 flex text-white h-fit w-[700px] border border-black bg-richblack-800 '>
              <div className='numbering w-[10%] text-richblack-400 flex-col lg:pl-3 '>
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                  <p>5</p>
                  <p>6</p>
                  <p>7</p>
                  <p>8</p>
                  <p>9</p>
                  <p>10</p>
                  <p>11</p>
              </div>

              <div className={`code w-[60%] gap-5`}>
                  <TypeAnimation
                      sequence={[codeContent, 2000,""]}
                      repeat={Infinity}
                      cursor={true}

                      style={{
                          whiteSpace: "pre-line",
                          display: "block"
                      }}
                      omitDeletionAnimation={true}
                  />
                      
                  
              </div>
              
          </div>
          
      </div>
      
  )
}

export default codeBlocks