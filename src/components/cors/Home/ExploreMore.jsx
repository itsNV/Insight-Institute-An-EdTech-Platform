import React, { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import Card from "./Card";

const ExploreMore = () => {

  const [ course, setCourse ] = useState(HomePageExplore[0].courses);
  const [ tag, setTag ] = useState(HomePageExplore[0].tag);


  const courseHandler = (data) => {
    setCourse(data.courses);
    
    setTag(data.tag);
  }
    
  return (
    <div>
      <div className="text-richblack-5  text-4xl mt-[15rem] flex justify-center gap-2 font-semibold">
        <p>Unlock the</p>
        <HighlightText text={"Power of Code"} />
      </div>

      <div className="text-richblack-300 text-sm text-center mt-2">
        <p>Learn To Build Anything You Can Imagine</p>
      </div>

      <div
        className="flex flex-row gap-4 justify-center text-richblack-200 mt-10 bg-richblack-800 cursor-pointer w-[50%] mx-auto py-1 
          rounded-full "
      >
        {
          HomePageExplore.map((data, index) => {
          return (
            <div>
              <div key={index}>
                <div className={` rounded-full bg-richblack-800 px-4 py-1 
                  {
                  ${
                  tag === data.tag ?
                    "text-richblack-5 bg-richblack-900" :
                    "text-richblack-200 bg-richblack-800"
                  }
                  }
                  `}
                  onClick={() => courseHandler(data)}
                >
                
                  <p >{data.tag}</p>
                </div>
              </div>

             
            </div>
          );
        })}
          </div>
          

          <div className="text-richblack-25 flex flex-row gap-6 justify-center mt-6">
              
        {
          course.map((ele,index) => {
            return (
              <Card data={ele} key={index}/>
            )
          })
                }
             
                 
              
          </div>
    </div>
  );
};

export default ExploreMore;
