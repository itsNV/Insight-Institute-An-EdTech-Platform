import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";

const PurchasedHistory = () => {
  const { user } = useSelector((state) => state.profile);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  useEffect(() => {
    setEnrolledCourses(user?.course);
    console.log("enrolledCourses", user);
  }, []);

  return ( 
    <div className=" text-blue-200  relative">
      <div className="flex flex-col gap-4 fixed bg-black top-[4rem] pt-16">
        <p className="text-richblack-500">
          Home / Dashboard /{" "}
          <span className="text-yellow-100"> Purchase History</span>
        </p>

        <p className="text-richblack-25 text-3xl font-semibold">
          Purchase History
        </p>

        <p className="text-richblack-400 text-lg font-semibold mt-10">
          You have Purchased {" "}
          <span className="text-yellow-200">{enrolledCourses?.length}</span>{" "}
          Courses
        </p>

        <div className="h-[1px] lg:w-[75rem] bg-richblack-700"></div>
      </div>

      <div className="mt-[21rem]">
        {enrolledCourses?.map((course) => (
          <div className="flex justify-between items-center" key={course._id}>
            <div className="flex gap-5 mt-8"> 
            <img
              src={course?.thumbnail}
              alt="courseImage"
              className="w-[15rem] h-[10rem]"
            />

            <div className="flex flex-col w-[80%] ml-4">
              <p className="text-richblack-25 text-2xl">{course?.CourseName}</p>

              <p className="text-richblack-400 text-lg mt-2">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>

              <p className="text-richblack-25 mt-2">Ratings pending</p>

              <p className="flex gap-3 text-richblack-400 text-md font-semibold mt-2">
                {course?.CourseContent?.length} Sections
                <span className="flex  items-center">
                  {" "}
                  <GoDotFill /> Beginner
                </span>
              </p>
            </div>
            </div>
            
            <div>
            <p className="text-2xl text-yellow-50 font-semibold">
                    Rs. {course?.price}
                  </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedHistory;
