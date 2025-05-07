import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineLogo from "../../../assets/Images/TimelineImage.png";

const TimeLine = () => {
  const resource = [
    {
      logo: logo1,
      title: "Leadership",
      description: "Fully committed to the success company",
    },
    {
      logo: logo2,
      title: "Responsibility",
      description: "Students will always be our top priority",
    },
    {
      logo: logo3,
      title: "Flexibility",
      description: "The ability to switch is an important skills",
    },
    {
      logo: logo4,
      title: "Solve the problem",
      description: "Code your way to a solution",
    },
  ];

  return (
    <div className="timeLine flex flex-row lg:gap-10 w-11/12 max-w-maxContent lg:mx-auto mt-[10rem] ">
      <div className="timeLine_map flex flex-col w-[50%] gap-9">
        {resource.map((data, index) => {
          return (
            <div className="flex flex-col sm:{`flex-wrap items-center`}">
              <div className="flex flex-row gap-3 lg:mx-[5rem]  flex-wrap" key={index}>
                <img src={data.logo} alt="logo" />

                <div className="flex flex-col flex-wrap">
                  <p className="font-bold text-md">{data.title}</p>

                  <p className="text-sm text-richblack-500">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* for line */}
              {/* <div className='w-[1px] h-7 border border-dashed border-black'>

                                </div> */}
            </div>
          );
        })}
      </div>

      <div></div>

      <div className="flex flex-col w-[50%] justify-center lg:mr-16 lg:mb-10 relative">
        <div className="">
          <img src={timelineLogo} alt="timelineLogo" />
        </div>

        <div className="flex flex-row justify-center gap-10 h-20 w-[80%] bg-caribbeangreen-600 absolute -bottom-9 right-12">
          <div className="flex flex-row gap-5 items-center w-[30%]">
            <p className="font-bold text-3xl text-richblack-5">10</p>

            <p className="text-sm text-caribbeangreen-200">Years Experience</p>

            <div className="w-[10%] h-10 bg-richblack-400 "></div>
          </div>

          <div className="flex flex-row gap-2 items-center w-[30%]">
            <p className="font-bold text-3xl text-richblack-5">250</p>

            <p className="text-sm text-caribbeangreen-200">Types of courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
