import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../../services/operations/authApi'
import { setLoading } from "../../../slices/Auth";


const LoginForm = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth)
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const {email, password} = formData;

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
    dispatch(login(email, password,navigate,setLoading))
    
  }

  return (
    <form className="flex flex-col w-full gap-y-4 mt-6">
      <div className="flex flex-col gap-10">
        <label>
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
        </label>

        <label className="w-full relative ">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Password<sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />

          <span
            className="absolute right-3 bottom-[6px] cursor-pointer"
            onClick={() => setShowPassword((pre) => !pre)}
          >
            {showPassword ? (
              <FaRegEyeSlash fontSize={24} fill="#AFB2BF" />
            ) : (
              <FaRegEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
      </div>

      <Link to="/reset-password-token">
        <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
          Forgot Password ?
        </p>
      </Link>

      <button
        className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
        onClick={submitHandler}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
