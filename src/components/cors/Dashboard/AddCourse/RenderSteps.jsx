import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseInfo from "./CourseInformation/CourseInfo";
import { FiCheckCircle, FiCheckSquare } from "react-icons/fi";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import Publish from "./Publish/Publish";
import { BiSolidErrorCircle } from "react-icons/bi";

const RenderSteps = () => {

  const{isSaved} = useSelector((state)=> state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.course);

  return (
    <>
      <div className="w-[60%]">
        <p className="text-3xl text-richblack-5 mt-32  mb-7">Add Course</p>
        <div className="flex ">
          {steps.map((data) => (
            <div className="w-full flex items-center ">
              <div
                key={data.id}
                className={`rounded-full w-10 h-10 flex flex-col items-center justify-center mx-auto cursor-pointer font-semibold text-lg ${
                  data.id === step
                    ? "text-white border border-yellow-25 bg-yellow-300 shadow-yellow-300 shadow-md  scale-125"
                    : "text-richblack-300 bg-richblack-700"
                }`}
              >
                {
                  !(step > data.id) ?  data.id : isSaved ? <FiCheckCircle className="text-yellow-25 border border-yellow-25  bg-yellow-600 rounded-full w-10 h-10" /> : <BiSolidErrorCircle className="text-yellow-25 border border-yellow-25  bg-yellow-600 rounded-full w-10 h-10"/>
                }
                
              </div>

              {/* //   dashed line */}
              
                {/* {steps.length > data.id && (
                  <span className={`h-[1px] w-[16rem] border border-dashed  mr-[-6rem] 
                    
                    ${
                      step > data.id ? 'bg-yellow-25' : 'bg-richblack-700'
                    }`}></span>
                )} */}
              
            </div>
          ))}
        </div>

        <div className="flex items-center gap-20 mt-3  ">
          {steps.map((data) => (
              <div key={data.id} className="flex mr-1 gap-4 pl-4
           ">
              <p>{data.title}</p>
            </div>
          ))}
        </div>
          </div>
          
          {
              step === 1 && <CourseInfo />
      }
      {
        step === 2 && <CourseBuilder />
      }
      {
        step===3 && <Publish/>
      }
    </>
  );
};

export default RenderSteps;
