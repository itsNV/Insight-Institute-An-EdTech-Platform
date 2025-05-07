import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import * as Icons from "react-icons/vsc";
import * as Icons2 from 'react-icons/io5'
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authApi";
import ConfirmationModal from "../../common/ConfirmationModal";
import { setModal } from "../../../slices/profile";
import { setStep } from "../../../slices/course";

const Sidebar = () => {

  
  const { user } = useSelector((state) => state.profile);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  const matchRoutes = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="bg-richblack-800 w-[15%] flex flex-col items-center h-full fixed mt-20">
      <div className="flex flex-col  gap-4 pt-10 w-full">
        {sidebarLinks.map((link) => {
          // import icons
          const Icon = Icons[link.icon] || Icons2[link.icon];

          if (user?.accountType !== link.type && link.type) return null
          
          return (
            <div key={link.id}>
              { 
                <div
                  
                  className={`flex bg-yellow-800 ${
                    matchRoutes(link.path) ? "bg-opacity-100" : "bg-opacity-0"
                  }`}
                >
                  {matchRoutes(link.path) && (
                    <span className="w-[2px]  bg-yellow-300 "></span>
                  )}

                  
                    {/* <Icon className="text-lg" /> */}

                    <NavLink to={link.path} >
                      <p className={`text-richblack-5 text-md
                           pl-5 py-2 flex gap-3 items-center ${link.path === '/dashboard/add-course' && dispatch(setStep(1))}`}> <Icon className="text-lg" /> {link.name}</p>
                    </NavLink>
                  
                </div>
              }
            </div>
          );
        })}
      </div>

      {/* for line */}
      <div className="h-[1px] bg-richblack-500 mt-6 mb-6 w-[85%]"></div>

      
      <div
        className={`flex w-full text-richblack-5 text-md
                            bg-yellow-800
                           ${
                             matchRoutes("/dashboard/settings")
                               ? "bg-opacity-100"
                               : "bg-opacity-0"
                           }`}
      >
        {matchRoutes("/dashboard/settings") && (
          <span className="w-[2px]  bg-yellow-300 "></span>
        )}

        <div className="flex gap-3 pl-5 py-2 items-center">
          <FcSettings />
          <NavLink to="/dashboard/settings">
            <span className={``}>Settings</span>
          </NavLink>
        </div>
      </div>

      <button
        className="flex gap-3 w-full text-richblack-5 text-md
                           pl-5 py-2 items-center mt-3"
        onClick={(e) =>
        {
          e.preventDefault()
          // setModal is for setting z-index of add course for displaying confirmation modal 
          dispatch(setModal(true))
          setConfirmationModal({
            text1: "Are you Sure?",
            text2: "You'll be logged out from your account....",
            btn1text: "Log out",
            btn2text: "Cancle",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => {
              setConfirmationModal(null) 
              dispatch(setModal(null))
            },
          })
        }
         
        }
      >
        <GrLogout />
        <button>Logout</button>
      </button>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
