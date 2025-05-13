import React, { useEffect, useState } from "react";
import { COURSE_APIS } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import FooterData from '../components/cors/Home/FooterData'
import { addToCart, removeFromCart, resetCart } from "../slices/cart";
import { GoDotFill } from "react-icons/go";
import { buyCourse } from "../services/operations/buyCourse";

const { GET_FULL_COURSE_DETAILS } = COURSE_APIS;
const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state)=> state.cart)
  const courseId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [showSubSec, setShowSubSec] = useState(false);
  const [showSubSecDesc, setShowSubSecDesc] = useState(false);
  const [sectionTime, setsectionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  let totalSubsec = 0;
  courseData?.CourseContent?.map((section) => {

    totalSubsec = totalSubsec + section?.subsection?.length
  })



  const userDetails = user;
  let courses = []
  courses.push(courseId.courseId)

  // buy course handler
  const buyCourseHandler = () => {
    
    dispatch(buyCourse(token,courses,userDetails,navigate,dispatch))

  }


  const fetchCourseDetails = async () => {
    try {
      const result = await apiConnector(
        "GET",
        GET_FULL_COURSE_DETAILS,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        courseId
      );

      console.log("RESULT FETCHING FULL COURSE DETAILS ", result);

      setCourseData(result?.data?.courseDetails);
      console.log('COURSE DATA : ',courseData)


    } catch (error) {
      console.log("Error Fetching coursedetails", error);
    }
  };


  const AddToCartHandler = (courseId) => {

    console.log('courseId',courseId)
    dispatch(addToCart(courseId));
    console.log('totalitems',totalItems)

  }




  useEffect(() => {
    console.log('INSIDE COURSE DETAILS')
    console.log('courses',courses)

    fetchCourseDetails();
  }, []);


  useEffect(() => {
    
    
    courseData?.CourseContent?.map((section) => {

     
      // console.log("subsections", section?.subsection?.length + totalSubsec)
      
      let SectionTime = 0;
      section?.subsection?.map((data) => {
        // console.log('time duration',data.timeDuration)
        setsectionTime(sectionTime + data.timeDuration)
        
          // SectionTime += data.timeDuration
        console.log('SECTION TIME',parseInt(sectionTime))
      })

     
      
      setTotalTime(totalTime + sectionTime)

      
      // console.log('TOTAL TIME',parseInt(totalTime))
      
    })
    
    

   
  },[courseData])

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex flex-col bg-richblack-800 items-center">
        <div className="relative w-[78%] text-white mt-32 p-3 pb-14  flex">
          <div className="w-[70%]">
            <p className="text-richblack-500">
              Home / Leanings /{"  "}
              <span className="text-yellow-50">{courseData?.CourseName}</span>
            </p>

            <p className="text-3xl font-semibold mt-7">
              {courseData?.CourseName}
            </p>

            <p className="text-md text-richblack-400 font-semibold mt-4">
              {courseData?.description}
                      </p>
                      
                      <p className="text-md text-richblack-100 mt-2">
                          Created By <span>{ courseData?.instructor?.firstName}  { courseData?.instructor?.lastName}</span>
                      </p>

            <p className="text-md text-richblack-100 mt-3 flex gap-2 items-center">
            <IoMdInformationCircleOutline/>
               <span>Created at  {courseData?.CreatedAt.split('T')[0]}
              </span>
                      </p>
          </div>

          {/* for line */}
          <div className="h-[13rem] w-[1px] bg-richblack-50"></div>

          
          {/* box for buy course */}
          <div className="absolute bg-richblack-700 h-[35rem] w-[20rem]  rounded-lg right-16 top-1 flex flex-col items-center">

            <img src={courseData?.thumbnail} alt="thumbnail"  className="rounded-t-lg w-full h-[12rem]"/>
            
            <div className="w-[90%] mt-4">

              <p className="text-xl font-semibold">Rs. <span>{courseData?.price}</span></p>

              {
                totalItems?.some((item)=> item._id === courseData?._id) ? (<button
                onClick={()=> navigate('/dashboard/wishlist')}
                className=" mt-3 flex justify-center items-center bg-yellow-50 text-black w-full
                rounded-md px-3 py-2  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2">Go to Cart</button>)
                  
                  :

                  (<button
                onClick={()=> AddToCartHandler(courseData)}
                className=" mt-3 flex justify-center items-center bg-yellow-50 text-black w-full
                rounded-md px-3 py-2  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2">Add to Cart</button>)
              }
              

              <button
                onClick={()=> buyCourseHandler()}
                className=" mt-3 flex justify-center items-center bg-richblack-900 text-white w-full
                rounded-md px-3 py-2  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2">Buy Now</button>
              
              <p className="text-center mt-3 text-richblack-200 text-md">30 days money back guarantee</p>

              <p className="text-md mt-3 text-richblack-25">This course includes : </p>

              <ul className="text-sm text-caribbeangreen-200">
                <li>Full lifetime access</li>
                <li>Access on mobile and Tv</li>
                <li>Completion certificate</li>
              </ul>


              <p className="text-center text-md text-yellow-100 mt-8">Share</p>
              
            </div>
          </div>

        </div>
      </div>


      {/* second section */}
      <div className="w-[54%] flex flex-col mt-10 lg:ml-[14rem]">

        <div className="border border-richblack-600 w-full min-h-[10rem] max-h-max p-10">

          <p className="text-4xl font-semibold text-richblack-25">What You Will Learn</p>

          <ul className="text-richblack-400 mt-5 text-lg">
            {/* {
              courseData?.whatYouWillLearn?.map((line) => (
                <li>{ line}</li>
              ))
            } */}

            <li>{ courseData?.whatYouWillLearn}</li>
          </ul>

        </div>


        {/* course content */}
        <div>

          <p className="text-4xl font-semibold text-richblack-25 mt-20">Course Content</p>

          <div className="flex items-center gap-3">
            <p className="text-richblack-100 text-lg mt-3 ">  {courseData?.CourseContent?.length} Sections</p>
            <p className="text-richblack-100 text-lg mt-3 flex items-center gap-2"> <GoDotFill/> { totalSubsec} Lessons</p>
            
                <p className="text-richblack-100 text-lg mt-3 flex items-center gap-2"><GoDotFill/> { parseInt(totalTime)} minits</p>
           
          </div>  


        <div className="border border-richblack-600 w-full min-h-fit max-h-max mt-3">

            {
              courseData?.CourseContent?.map((section) => (
                <div key={section?._id}>

                  {/* section */}
                  <div className="h-[5rem] w-full bg-richblack-700 border border-richblack-600 flex justify-between items-center p-10">
                    <p
                      onClick={()=> setShowSubSec((pre)=> !pre)}
                      className="text-xl text-richblack-5 cursor-pointer flex items-center gap-3">
                      
                      {
                        showSubSec ? <FaAngleUp/> : <FaAngleDown/>
                      }

                      {section?.sectionName}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <p className="text-xl text-yellow-100">{section?.subsection?.length} Lectures</p>
                      
                      <p className="text-xl text-richblack-50">{ parseInt(sectionTime)} minutes</p>
                    </div>
                  </div>


                  {/* subsection */}
                  <div>
                    {
                      showSubSec &&
                      section?.subsection?.map((subsec) => (
                        
                          <div className="flex justify-between px-10 py-3" key={subsec?._id}>

                            <div>
                            <p
                              onClick={() => setShowSubSecDesc((pre) => !pre)}
                              className="text-richblack-25 text-xl cursor-pointer flex items-center gap-3">
                              
                             
                              <HiMiniComputerDesktop />
                              
                              {subsec?.title}

                              {
                                  showSubSecDesc ? <FaAngleUp/> : <FaAngleDown/>
                              }

                            </p>
                            
                            {
                              showSubSecDesc && <p className="text-richblack-200 text-xl">{subsec?.description}</p>
                            }
                            
                            </div>

                                <p className="text-richblack-25 text-xl">{parseInt(subsec?.timeDuration)} min</p>

                                
                          </div>

                          
                        
                      ))
                    }
                  </div>
                </div>
              ))
            }

        </div>

        </div>

      </div>

      <FooterData/>
    </div>
  );
};

export default CourseDetails;
