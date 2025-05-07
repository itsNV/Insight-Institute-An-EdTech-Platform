import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordToken } from "../../../services/operations/authApi";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [tokenSent, setTokenSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submithandler = (event) => {
    console.log("printing email", email);
    event.preventDefault();
    dispatch(resetPasswordToken(email, navigate));
    setTokenSent(true);
  };

  return (
    <div className="w-full flex flex-col my-auto items-center">
      <div className="w-[30%] flex flex-col gap-4">
        {tokenSent ? (
          <p className="text-richblack-5 text-4xl"> Check Your Email </p>
        ) : (
          <p className="text-richblack-5 text-4xl"> Reset Your Password </p>
        )}

        {tokenSent ? (
          <p className="text-richblack-200 text-md">
            We have sent the reset email to your email account {email}
          </p>
        ) : (
          <p className="text-richblack-200 text-md">
            Have no fear. We’ll email you instructions to reset your password.
            If you dont have access to your email we can try account recovery
          </p>
        )}

        {tokenSent ? (

          <div>

            <form onSubmit={submithandler}>


            <button
              className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 w-full py-2  mt-8"
              type="submit"
            >
              Resend Email
            </button>
            </form>
            

            <Link to="/login">
            <p className="text-richblack-25 mt-7 flex items-center gap-3"
            >
              <FaArrowLeft />
                Back to Login</p>
            </Link>
           
          </div>
          

          
        ) : (
          <form onSubmit={submithandler}>
            <label className="flex flex-col gap-2">
              <p className="text-richblack-50">
                Email Address <sup className="text-pink-300">*</sup>
              </p>

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[10px]"
              />
            </label>

            <button
              className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 w-full py-2  mt-8"
              type="submit"
            >
              Reset Password
              </button>
              
              <Link to="/login">
            <p className="text-richblack-25 mt-7 flex items-center gap-3"
            >
              <FaArrowLeft />
                Back to Login</p>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
