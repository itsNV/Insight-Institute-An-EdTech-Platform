import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  deleteCourse,
  getInstructorCourses,
} from "../../../../services/operations/courseApi";
import { Table, Td, Th, Thead, Tr, Tbody } from "react-super-responsive-table";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { setEditCourse, setStep } from "../../../../slices/course";


const MyCourses = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { instructoreCourses } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    
  const navigate = useNavigate()
  

    

  useEffect(() => {
    setLoading(true);
    dispatch(getInstructorCourses(token));
    setLoading(false);
    // console.log("instructoreCourses", instructoreCourses);
  }, []);

  // delete course
  const handleDeleteCourse = (courseId) => {
    setLoading(true);
    dispatch(deleteCourse(courseId, token));

    setLoading(false);
  };

  return (
      <div className="text-white mt-32 w-full ">
          
          <div className="flex justify-between mb-32">
              <p className="text-3xl font-semibold">My Courses</p>

              <button
                  type="button"
          onClick={() => {
            dispatch(setEditCourse(false))
            dispatch(setStep(1))
            navigate('/dashboard/add-course')
          }}
                  className="flex items-center gap-3 border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
              >
                  Add Course
                  <IoIosAddCircleOutline className="text-lg text-black" />
              </button>
          </div>
      <div className="bg-richblack-800 p-6 rounded-xl border border-richblack-700">
        {instructoreCourses?.length === 0 ? (
          <div className="text-3xl font-bold text-richblack-400 flex justify-center ">You Have Not Created Courses Yet .....</div>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>Course</Th>
                <Th>Duration</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            {instructoreCourses?.map((course) => (
              <Tbody key={course._id}>
                <Tr>
                  <Td className="">
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
                    <p>2h 30m</p>
                  </Td>

                  <Td className=" text-center">
                    <p>{course.price}</p>
                  </Td>

                  <Td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          dispatch(setEditCourse(true));
                          navigate('/dashboard/add-course')
                        }}
                        type="button">
                        <MdModeEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(course._id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
