import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/Images/cropped-logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa6";
import { apiConnector } from "../../services/apiConnector";
import { COURSE_APIS } from "../../services/apis";
import { logout } from "../../services/operations/authApi";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state)=> state.auth)
  const [subLinks, setSubLinks] = useState([])
  const [catalogColor,setCatalogColor] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  console.log('printing user,', user)
  
 
  const { GET_ALL_CATEGORIES } = COURSE_APIS;

  
  const fetchData = async () => {

    const result = await apiConnector("GET", GET_ALL_CATEGORIES);
    console.log('printing result of all categories : ', result.data.allCategorys);

    setSubLinks(result.data.allCategorys)
  }


  function logOutHandler() {

    dispatch(logout(navigate));

  }

  useEffect(() => {
    fetchData();
  }, []);

  const mathchRoute = (route) => {
  
    return matchPath({ path: route }, location.pathname);
  };




 

  
  
  return (
    <div className="flex justify-center fixed bg-richblack-800 z-40 w-full">
      <div className="flex mt-4 w-11/12 max-w-maxContent items-center justify-between border-b border-richblack-700 py-3">
        <div className="w-[12rem] md:w-auto">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-[3rem] w-[22rem] object-contain"/>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-50 text-sm">
            {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div className="relative group">
                  <div className={`flex items-center gap-2  cursor-pointer ${catalogColor ? 'text-blue-300' : 'text-richblack-50'}`}>
                    <p>{link.title}</p>
                    <FaAngleDown />

                    <div
                      className="flex flex-col gap-1 invisible h-auto w-[14rem] rounded-md bg-richblack-5 absolute top-[2rem] opacity-0
                          group-hover:opacity-100 group-hover:visible
                          transition-all  text-richblack-900
                          "
                    >

{
                        !subLinks.length && <span className="text-black text-center text-xl ">Loading.....</span>
                      }
                      
                      <div
                        className=" h-4 w-8 bg-richblack-5 rotate-45 absolute z-[-1]
                            left-[23%] "
                      ></div>

                      
                      {
                        
                        subLinks.map((data, index) => (
                        
                        <Link to={`category/${data.categoryName}`} key={index}>  
                            <p
                              onClick={() => setCatalogColor(true)}
                              className='mt-2 pl-1 pb-1 font-medium border-b border-richblack-700 shadow-lg hover:text-blue-200'
                            
                          >{data.categoryName}
                          </p>
                        </Link>
                      ))}
                    </div>

                    {/*  */}
                  </div>
                </div>
              )
                : (
                <Link to={link.path}>
                    <p
                      onClick={() => setCatalogColor(false)}
                      className={
                      mathchRoute(link.path)
                        ? "text-blue-300"
                        : "text-richblack-50"
                    }
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </div>
          ))}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-x-4 items-center text-richblack-50">
          {!token && (
            <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700">
              <Link to="/login">Log In</Link>
            </button>
          )}

          {!token && (
            <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700">
              <Link to="/signUp">Sign Up</Link>
            </button>
          )}

          {token && (
            <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700">
              <Link to="/dashboard/my-profile">Dashboard</Link>
            </button>
          )}

          {token && (
            <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700"
            onClick={logOutHandler}>
              Log Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-richblack-50 text-2xl">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 w-full bg-richblack-800 border-t border-richblack-700 py-4 transition-all duration-300 ease-in-out transform origin-top">
            <ul className="flex flex-col items-center gap-y-4 text-richblack-50 text-base">
              {NavbarLinks.map((link, index) => (
                <li key={index} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.title === "Catalog" ? (
                    <div className="relative group">
                      <div className={`flex items-center gap-2 cursor-pointer ${catalogColor ? 'text-blue-300' : 'text-richblack-50'}`}>
                        <p>{link.title}</p>
                        <FaAngleDown />
                        <div className="flex flex-col gap-1 invisible h-auto w-[14rem] rounded-md bg-richblack-5 absolute top-[2rem] opacity-0 group-hover:opacity-100 group-hover:visible transition-all text-richblack-900">
                          {!subLinks.length && <span className="text-black text-center text-xl">Loading.....</span>}
                          <div className="h-4 w-8 bg-richblack-5 rotate-45 absolute z-[-1] left-[23%]"></div>
                          {subLinks.map((data, index) => (
                            <Link to={`category/${data.categoryName}`} key={index}>
                              <p onClick={() => setCatalogColor(true)} className='mt-2 pl-1 pb-1 font-medium border-b border-richblack-700 shadow-lg hover:text-blue-200'>
                                {data.categoryName}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p onClick={() => setCatalogColor(false)} className={mathchRoute(link.path) ? "text-blue-300" : "text-richblack-50"}>
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
              {/* Mobile Buttons */}
              {!token && (
                <li>
                  <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700">
                    <Link to="/login">Log In</Link>
                  </button>
                </li>
              )}

              {!token && (
                <li>
                  <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700">
                    <Link to="/signUp">Sign Up</Link>
                  </button>
                </li>
              )}

              {token && (
                <li>
                  <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700">
                    <Link to="/dashboard/my-profile">Dashboard</Link>
                  </button>
                </li>
              )}

              {token && (
                <li>
                  <button className="rounded-md bg-richblack-800 px-[12px] py-[8px] text-richblack-5 border border-richblack-700"
                  onClick={logOutHandler}>
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
