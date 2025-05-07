import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import contrycode from '../../../data/countrycode.json'
import { useDispatch } from "react-redux";
import { contactUs } from "../../../services/operations/contact";

const ContactUsForm = () => {


  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();
  

    const submitHandler = (data) => {
        
      console.log('logging data: ', data);

      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('countryCode', data.dropdown)
      formData.append('phNo', data.phoneNumber)
      formData.append('message',data.message)

        

      dispatch(contactUs(formData))
            
        
           
            
        
        
  };

    useEffect(() => {
      
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                message: "",
              });
        }

  }, [reset, isSubmitSuccessful]);

  return (
    <div className="w-[76%]">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-4">
          <div className="flex  gap-8">
            {/* first name */}
            <label className="flex flex-col gap-3">
              <p className="text-sm text-richblack-50">First Name</p>

              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className="bg-richblack-800 text-richblack-50 px-4 py-2 rounded-lg"
                {...register("firstName", { required: true })}
              />

              {errors.firstName && <span className='text-pink-500  text-md'>Enter Your Name</span>}
            </label>

            {/* last name */}
            <label className="flex flex-col gap-3">
              <p className="text-sm text-richblack-50">Last Name</p>

              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="bg-richblack-800 text-richblack-50 px-4 py-2 rounded-lg "
                {...register("lastName")}
              />
            </label>
          </div>

          {/* email */}

          <div>
            <label className="flex flex-col gap-3">
              <p className="text-sm text-richblack-50">Email Address</p>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="bg-richblack-800 text-richblack-50 px-4 py-2 rounded-lg "
                {...register("email", { required: true })}
              />

              {errors.email && <span className='text-pink-500 text-md'>Enter Email Address</span>}
            </label>
                  </div>
                  

                  {/* phone no. */}

                  <div className="flex flex-col gap-3">
                      
                      <label className=" text-sm text-richblack-50" htmlFor="phNo">Phone Number </label>

                      <div className="flex gap-4">
                          
                          <select
                              name="dropdown"
                              id="dropdown"
                              className="bg-richblack-800 text-richblack-50 px-4 py-2 rounded-lg 
                            w-[20%]"
                          >
                              {
                                  contrycode.map((data, index) => {
                                      
                                      return (
                                        <option key={index} value={data.code}>
                                        {data.code} - {data.country}
                                    </option>
                                      )
                                      
                                  })
                              }
                          </select>



                          <input
                              type="number"
                              name="phNo"
                              id="phoneNumber"
                              placeholder="12345 67890"
                              className="bg-richblack-800 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[90%]"
                              {...register("phoneNumber", {
                                  required: {value:true, message:"Please enter phone number"},
                                  maxLength: { value: 10, message:"Invalid phone number" },
                                  minLength: { value: 8, message:"Invalid phone number"}
                              },)}
              />
              
              {
                errors.phNo && <span className='text-pink-500 text-md'>Please enter phone number</span>
              }
                          
                      </div>
                          
                          
                          
                     
                      
                  </div>


                  {/* message */}

                  <div>
                      
                      <label className="flex flex-col gap-3">
                          
                          <p className="text-sm text-richblack-50">Message</p>
                          
                          <textarea
                              name="message"
                              placeholder="Enter Message"
                              cols={56}
                              rows={4}
                                className="bg-richblack-800 text-richblack-50 px-4 py-2 rounded-lg "
                              {...register("message",{required: true})}
                          />

                          {
                              errors.message && <span className='text-pink-500  text-md'>Enter Message</span>
                          }

                      </label>
                      
                  </div>

                  <button
                  type="submit"
                  className="bg-yellow-50 text-richblack-900 font-semibold text-sm px-4 py-2 rounded-lg "
                  >Send Message</button>
                  
              </div>
              
              
      </form>
    </div>
  );
};

export default ContactUsForm;
