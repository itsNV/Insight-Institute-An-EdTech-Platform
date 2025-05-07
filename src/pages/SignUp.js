import React from 'react'
import Template from '../components/cors/auth/Templete'
import signupImg from '../assets/Images/signup.webp'

const SignUp = () => {
  return (
      <div className='mt-20'>
          <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT66WroToZsLnym-e9sSDbgDTz8-6bpBQcCdg&s'}
      formtype="signup"
      
    />
    </div>
  )
}

export default SignUp