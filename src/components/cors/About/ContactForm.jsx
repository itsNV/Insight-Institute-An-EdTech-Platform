import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {


  return (
      <div className='flex justify-center'>

          <div className='flex flex-col gap-4 items-center'>
              
              <div className='text-center flex flex-col gap-3'>
              <p className='text-3xl text-richblack-50 font-semibold'>Get In Touch</p>
              
              <p className='text-xs text-richblack-400 '>We'd love to here for you, please fill this form</p>
              </div>
              
              
              <ContactUsForm />
          </div>
          

      </div>
      
  )
}

export default ContactForm