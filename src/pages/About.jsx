
import React from 'react'
import HighlightText from '../components/cors/Home/HighlightText'
import aboutimg1 from '../assets/Images/aboutus1.webp'
import aboutimg2 from '../assets/Images/aboutus2.webp'
import aboutimg3 from '../assets/Images/aboutus3.webp'
import Quate from '../components/cors/About/Quate'
import storyimage from '../assets/Images/FoundingStory.png'
import Details from '../components/cors/About/Details'
import LearningGrid from '../components/cors/About/LearningGrid'
import ContactForm from '../components/cors/About/ContactForm'
import FooterData from '../components/cors/Home/FooterData'

const About = () => {
  return (
      <div className='flex flex-col items-center mx-auto mt-16'>
          
          {/* section 1 */}
          <section>
              <div className='flex flex-col items-center bg-richblack-800'>
                  
                  <p className='text-richblack-200 text-sm font-semibold pt-16'>About Us</p>

                  
                  <p className='text-richblack-25 text-3xl font-bold flex flex-col text-center mt-[4rem]'>
                    Driving Innovation in Online Education for a
                      <HighlightText text={ "Brighter Future"} />
                  </p>

                  <p className='text-richblack-400 text-sm text-center mt-[1rem] w-[55%]
                  mb-14'>
                  Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                  </p>

                  <div className='flex flex-row gap-4 pb-16'>
                      <img src={aboutimg1} width={ 300} height={300} />

                      <img src={aboutimg2} width={ 300} height={300}/>

                      <img src={aboutimg3} width={ 300} height={300}/>
                      
                  </div>


                  
              </div>
          </section>


          {/* section 2 */}
          <section className='flex justify-center mt-16 mb-20'>
          <Quate />
          </section>


          {/* for line */}
          <div className='h-[1px] w-full bg-richblack-700 mb-20'>
              
          </div>

          {/* section 3 */}
          <section className='flex flex-col '>
              <div className='flex items-center justify-center gap-16  '>
                  
                  <div className='flex flex-col gap-3  w-[30%] '>
                      <p className='text-3xl text-pink-400 font-semibold'>Our Founding Story</p>

                      <p className='text-sm text-richblack-300 w-[100%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                      <p className='text-sm text-richblack-300 w-[100%]'>
                      As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                      </p>
                  </div>


                  <div className='w-[30%] '>
                      
                        <img src={storyimage} height={350} width={350}/>
                      
                  </div>
              </div>


              <div className='flex flex-row gap-20 justify-center mt-32'>
                  <div className='w-[30%] flex flex-col gap-3'>
                      
                      <p className='text-yellow-200 text-3xl font-semibold'>Our Vision</p>

                      <p className='text-sm text-richblack-300 w-[100%]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                  </div>


                  <div className='w-[30%] flex flex-col gap-3'>
                      
                      <p className='text-blue-200 text-3xl font-semibold'>Our Mission</p>

                      <p className='text-sm text-richblack-300 w-[100%]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                  </div>
              </div>
          </section>



          {/* section 4 */}
          
          <section className='flex justify-center bg-richblack-800 w-full mt-20'>
            <Details />
          </section>



          {/* section 5 */}
          <section className='flex justify-center  w-full mt-20'>
              <LearningGrid />
          </section>
          

          {/* section 6 */}
          <section className='flex justify-center  w-full mt-40 mb-10'> 
              
              <ContactForm />
              
          </section>


          {/* footer */}
            <FooterData />
          
      </div>
      
  )
}

export default About