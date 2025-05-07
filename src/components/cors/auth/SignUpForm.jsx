import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../services/operations/authApi";
import { setSignUpData } from "../../../slices/Auth";

const SignUpForm = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [accountType,setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
    password: "",
  });



// send data to slice to use in signup form
  const signupdata = {

    ...formData,
    accountType
  }



  function changeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,

        [event.target.name]: event.target.value,
      };
    });
  }

  
  function submitHandler(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password does not match")
    }
    console.log('email',formData.email)
    dispatch(sendOtp(formData.email, navigate));
    dispatch(setSignUpData(signupdata));
  }



  return (
    <div>
      <div  className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
        <button
          className={`${accountType === "Student" 
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => { setAccountType("Student") }}>Student</button>
        

        <button
          className={`${accountType === "Instructor" 
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => { setAccountType("Instructor") }}>Instructor</button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex gap-x-4 mt-[20px]">
    
        <label className='w-full'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="first name"
            onChange={changeHandler}
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

        <label className='w-full'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="last name"
            onChange={changeHandler}
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
          </label>
          </div>

        <label className='w-full mt-[20px]'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="asdfsd@gmail.com"
            onChange={changeHandler}
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

        <div className="flex gap-x-4 mt-[20px]">

        <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="enter password"
            onChange={changeHandler}
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />

          <span className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((pre) => !pre)}>
            {showPassword ? <FaRegEyeSlash fontSize={24} fill='#AFB2BF'/>
              : <FaRegEye fontSize={24} fill='#AFB2BF'/>}
          </span>
        </label>

        <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
          <input
            required
            type={showconfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="enter password"
            onChange={changeHandler}
             className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />

          <span className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowconfirmPassword((pre) => !pre)}>
            {showconfirmPassword ?
              <FaRegEyeSlash fontSize={24} fill='#AFB2BF' />
              : <FaRegEye fontSize={24} fill='#AFB2BF'/>}
            </span>
            

          </label>
          
          </div>

        
          <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'
            type="submit"
          >Create Account</button>
        
        
      </form>
    </div>
  );
};

export default SignUpForm;
