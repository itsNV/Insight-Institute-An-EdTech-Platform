import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authApi";
import { signup } from "../../../services/operations/authApi";
import OtpInput from "react-otp-input";

const VerifyEmail = () => {

    const [otp, setOtp] = useState('');
    const { SignUpData } = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    //destructure data from signup data ehich is in the auth slice
    const {
        firstName,
        lastName,
        email,
        accountType,
        password,
        confirmPassword

    }  = SignUpData

    function resendHandler() {
    dispatch(sendOtp(email,navigate));
  }
    
    
    function clickHandler() {
        dispatch(signup(firstName,lastName,email,accountType,password,confirmPassword,otp,navigate));
    }
    
    

  return (
    <div className="w-full flex flex-col my-auto items-center">
      <div className="w-[30%] flex flex-col gap-4">
        <p className="text-richblack-5 text-4xl">Verify Email</p>

        <p className="text-richblack-200 text-md">
          A verification code has been sent to you. Enter the code below
              </p>
              


              {/* otp input */}

              <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className="text-richblack-50 mr-3">-</span>}
                  renderInput={(props) => <input {...props} className="bg-richblack-600  mr-3 rounded-lg text-richblack-50" />}
                  
                 
    />

        <button
          className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 w-full py-2  mt-8"
                  type="button"
                  onClick={clickHandler}
        >
          Verify Email
        </button>

        <div className="mt-7 flex justify-between">
          <Link to="/login">
            <p className="text-richblack-25 flex items-center gap-3">
              <FaArrowLeft />
              Back to Login
            </p>
          </Link>

                  
                  <button onClick={resendHandler} >
                  <p  className="text-blue-300 cursor-pointer">
            Resend it
          </p>
                  </button>
          
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
