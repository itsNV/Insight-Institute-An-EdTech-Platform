import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Td, Th, Thead, Tr, Tbody } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const EnrollCourses = () => {


  const { user } = useSelector((state) => state.profile);
  
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const navigate = useNavigate();
  
  let totalTime = 0;
  

    useEffect(() => {
      setEnrolledCourses(user?.course);
     
      
      console.log("enrolledCourses", user);
      console.log('mapping',enrolledCourses)
    }, []);


  return (
    <div className=' text-blue-200 relative mt-[23rem]'>
        <div className="flex flex-col gap-4 fixed bg-black top-[4rem] pt-16">
        <p className="text-richblack-500">
          Home / Dashboard /{" "}
          <span className="text-yellow-100"> Enrolled Courses</span>
        </p>

        <p className="text-richblack-25 text-3xl font-semibold">
         Enrolled Courses
        </p>

        <p className="text-richblack-400 text-lg font-semibold mt-10">
          You have Enrolled in {" "}
          <span className="text-yellow-200">{enrolledCourses?.length}</span>{" "}
          Courses
        </p>

        <div className="h-[1px] lg:w-[75rem] bg-richblack-700"></div>
      </div>


      <div>
        {
          enrolledCourses?.length === 0
            ? (<p className="text-3xl font-bold text-richblack-400 flex justify-center ">You have not enrrolled in any course yet.</p>)
            : 
            (
              <Table>
                <Thead>
                  <Tr>
                    <Th>Course</Th>
                    <Th>Duration</Th>
                    <Th>Progress</Th>
                  </Tr>
                </Thead>


                
                {
                  enrolledCourses?.map((course) => (
                   
                    <Tbody>
                      
                      <Tr onClick={()=> navigate(`viewcourse/${course._id}/${course.CourseContent[0]._id}/${course.CourseContent[0].subsection[0]._id}`)}>

                        <Td>
                        <div className="flex gap-5 justify-start p-5">
                      <div>
                        <img
                          src={course.thumbnail}
                          alt="courseImage"
                          className="h-[200px] w-[250px]"
                        />
                      </div>

                      <div> 
                        <p className="text-2xl font-semibold mt-3">{course.CourseName}</p>
                        <p className="mt-4 text-md text-richblack-400">{course.description}</p>
                        <p className="mt-10">Today</p> {/* date inclusion pending */}
                                    <p className={`mt-5 font-semibold  text-lg
                            ${course.status === 'Draft' ? 'text-pink-400' : 'text-caribbeangreen-400'}
                            
                            `}>{course?.status}</p>
                      </div>
                    </div>
                        </Td>

                        <Td className=" text-center">
                          <p>
                          {
                      course?.CourseContent?.forEach((section) => {
                        section?.subsection?.forEach((subsec) => {
                          totalTime = 0;
                          totalTime += parseInt(subsec?.timeDuration)
                          console.log('totaltime',totalTime)
                        })
                      })
                   }
                            {totalTime} min

                          </p>
                        </Td>


                        <Td className=" text-center">
                          <p>34%</p>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))
               }
                

              
              
              </Table>
            )
        }
      </div>
    </div>
  )
}

export default EnrollCourses