import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../services/operations/authApi';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const resetPasswordToken = location.pathname.split('/').at(-1)
    console.log('printing reset pasword token ',resetPasswordToken)
    
    function submitHandler(event) {
        event.preventDefault();
        dispatch(resetPassword(newPassword,confirmPassword,resetPasswordToken,navigate))
    }


  return (
      <div  className="w-full flex flex-col my-auto items-center">
          <div className="w-[30%] flex flex-col gap-4">
              <p className="text-richblack-5 text-4xl">Choose New Password
              </p>

              <p className="text-richblack-200 text-md">Almost done. Enter your new password and youre all set.</p>


              <form  onSubmit={submitHandler}>
          <label className="flex flex-col gap-2">
              <p className="text-richblack-50">
                New Password <sup className="text-pink-300">*</sup>
              </p>

              <input
                type="text"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[10px]"
              />
              </label>
              

              <label className="flex flex-col gap-2">
              <p className="text-richblack-50">
                Confirm Password <sup className="text-pink-300">*</sup>
              </p>

              <input
                type="text"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[10px]"
              />
              </label>

              <button
              className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 w-full py-2  mt-8"
              type="submit"
            >
              Reset Password
              </button>

              
          </form>
          </div>


          
    </div>
  )
}

export default ResetPassword