import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { apiConnector } from '../../../services/apiConnector';
import { COURSE_APIS } from '../../../services/apis';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSectionData, setSubSectionData, setViewCourse } from '../../../slices/ViewCourse';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";


const CourseBar = () => {

    const { GET_FULL_COURSE_DETAILS } = COURSE_APIS
    
    const {token} = useSelector((state)=> state.auth)
    const [course, setCourse] = useState(null);
    const [activeSection,setActiveSection] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {courseId,subsectionId,sectionId} = useParams();
   

    const getFullCourseDetails = async () => {
        
        try {

            const result = await apiConnector('GET', GET_FULL_COURSE_DETAILS, null,
                {
                    Authorization : 'Bearer ' + `${token}`
                },{courseId})
            
            console.log('FULL COURSE DETAILS', result)
            
        
            if (!result.data.success) {
                return toast.error("Error fetching full course details");
            }

            
            setCourse(result.data.courseDetails);
            toast.success("Course Details fetched successfully");

            
            dispatch(setViewCourse(result.data.courseDetails))
            dispatch(setSubSectionData(result.data.courseDetails?.CourseContent[0].subsection[0]))
            dispatch(setSectionData(result.data.courseDetails?.CourseContent[0]))
            // console.log(course?.CourseContent[0]?.subsection[0])
            setActiveSection(result.data.courseDetails?.CourseContent[0]?._id)

            
        } catch (error) {

            console.log('ERROR WHILE FETCHING FULL COURSE DETAILS', error);
            
        }
    }

    useEffect(() => {
        
        console.log('sectionId', sectionId);
        console.log('courseID', courseId);
        console.log('COURSE DATA', course)
        
        course?.CourseContent?.map((section) => {
                
            if (section?._id === sectionId) {
                dispatch(setSectionData(section))
                setActiveSection(sectionId)
                console.log('active section',activeSection)
                console.log('SECTION FROM COURSE BAR',section)
            }
            
           
            

            section?.subsection?.map((subsec) => {

                
                if (subsec?._id === subsectionId) {
                    dispatch(setSubSectionData(subsec))
                    console.log('SUBSEC FROM COURSE BAR',subsec)
                }
            })
        })
    }, [sectionId, subsectionId,courseId])
    

    useEffect(() => {
        getFullCourseDetails();
    },[])

  return (
      <div className="bg-richblack-800 w-[15%] flex flex-col items-center h-full fixed mt-20">
          <div className='text-white flex gap-5 mt-10 justify-between w-full px-4 items-center'>
              <p className='text-2xl font-semibold'>{course?.CourseName}</p>
              
              <p>Add Ratings</p>
          </div>

          <div className='text-white mt-10 text-start w-full px-4'>
              {
                   course?.CourseContent?.map((section)=>(
              
                       <div key={section?._id} className='bg-richblack-800 border border-richblack-600 rounded-lg pl-3 mt-3'>
                           <p className='mb-2 cursor-pointer flex justify-between items-center '
                               onClick={()=> navigate(`dashboard/enrolled-courses/viewcourse/${courseId}/${section._id}/${section.subsection[0]._id}`)}
                           >{section.sectionName}
                              <span className='mr-3'> {
                                   activeSection===section?._id ?   <FaChevronDown/> : <FaChevronLeft/>
                               }</span>
                           </p>

                           {
                               (sectionId === section?._id) && 
                               <div onClick={() => {
                                       dispatch(setSubSectionData(section));
                                       
                               }}>
                                       {
                                           section?.subsection?.map((subsec) => (
                                               <NavLink to={`dashboard/enrolled-courses/viewcourse/${courseId}/${section._id}/${subsec._id}`}
                                                   key={subsec?._id}
                                               
                                               >
                                                   <p 
                                               
                                                   className={`mb-2 cursor-pointer rounded-lg pl-3 max-w-[70%] ${ (subsectionId === subsec?._id) ? 'bg-yellow-50 text-richblack-900': 'bg-richblack-800'}`}    
                                               >{subsec?.title}</p>
                                               </NavLink>
                                           ))
                                       }
                               </div>
                           }
                       </div>
                       
                    
                   ))
             }
          </div>
      </div>
  )
}

export default CourseBar