import React from 'react'
import Template from '../components/cors/auth/Templete'
import loginImg from '../assets/Images/login.webp'

const LogIn = () => {
  return (
      <div className='mt-20'>
        <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={'https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.jpg?s=612x612&w=0&k=20&c=Fnx06haU4IHYLcRpy9Po_TBknvBqVjicGuUWkGu8e6Y='}
      formtype="login"
      
    />
    </div>
  )
}

export default LogIn