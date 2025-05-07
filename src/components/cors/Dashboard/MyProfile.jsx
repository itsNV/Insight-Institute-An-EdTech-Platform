import React, { useEffect } from "react";
import { matchRoutes, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { GrEdit } from "react-icons/gr";
import Spinner from "../../common/Spinner";
import EdditBtn from "./EdditBtn";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user} = useSelector((state) => state.profile);

  // console.log("printing user from myprofile", user);
  // console.log("printing user.additionaldetails",additionalDetails.contactNo)

  

  return (
    <div>
      
        <div className="w-full mt-20">
         

          <div className="flex flex-col text-white w-full ">
            <div className="mt-12 text-3xl text-richblack-50 ">
              <h1>My Profile</h1>
            </div>

            <div className="flex flex-col gap-4  mt-14 bg-richblack-800  py-8 rounded-lg  border border-richblack-700">
              <div className="flex gap-2  items-center px-6">
                <img src={user.image} className="h-[80px] w-[70px] rounded-full" />

                <div>
                  <p className="text-xl font-semibold  text-richblack-50">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-richblack-500">{user.email}</p>
                </div>

                  <div className="ml-[19rem]">
                    <Link to='/dashboard/settings'>
                    <EdditBtn/>
                    </Link>
                
                </div>
              </div>
              </div>
              

              {/* Personal details */}

            <div className="flex flex-col gap-4  mt-6 bg-richblack-800  h-[40%] rounded-lg   border border-richblack-700 py-4">
              <div className="flex justify-between mt-4 mx-5 w-[70%]  ">
                <p className="text-xl font-semibold">Personal Details</p>
                <div className="">
                <Link to='/dashboard/settings'>
                      <EdditBtn  />
                    </Link>
                </div>
              </div>

              <div className="ml-4 flex gap-8">
                <div className="flex flex-col w-[70%] gap-7">
                  <div>
                    <p className="text-richblack-600 text-sm">First Name</p>

                    <p>{user.firstName}</p>
                  </div>

                  <div>
                    <p className="text-richblack-600 text-sm">Email</p>
                    <p>{user.email}</p>
                    </div>
                    
                    {
                      user?.additionalDetails?.about &&
                      <div>
                      <p className="text-richblack-600 text-sm">About</p>
                      <p>{user?.additionalDetails?.about}</p>
                      </div>
                    }
                </div>

                <div className="flex flex-col w-[70%] gap-7">
                  <div>
                    <p className="text-richblack-600 text-sm">Last Name</p>

                    <p>{user.lastName}</p>
                  </div>

                  <div>
                    <p className="text-richblack-600 text-sm">Phone Number</p>
                    <p>
                      {user?.additionalDetails?.contactNo ??
                        "write your contact no."}
                    </p>
                    </div>
                    
                    {
                      user?.additionalDetails?.profession &&
                      <div>
                      <p className="text-richblack-600 text-sm">Profession</p>
                      <p>{user?.additionalDetails?.profession}</p>
                      </div>
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default MyProfile;
