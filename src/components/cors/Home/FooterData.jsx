import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { MdOutlineCopyright } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
// import logo2 from '../../../assets/Images/insight-institute.jpg'
import logo from '../../../assets/Images/logo_no_bg.png' 


const FooterData = () => {
  const resource = [
    // {

    //     title: 'Company',
    //     data: [
    //         "Company","Carrirers","Affiliates"

    //     ],

    // },
    {
      title: "Resources",
      data: [
        "Articles",
        "Blog",
        "Chart sheet",
        "Code challenges",
        "Docs",
        "projects",
        "Videos",
        "Workspaces",
      ],
    },

    {
      title: "Plans",
      data: ["Paid memebership", "For students", "Business solutions"],
    },
    {
      title: "Support",
      data: ["Help Center"],
    },
    {
      title: "Community",
      data: ["Forums", "Chapters", "Events"],
    },
  ];

  return (
    <div className="bg-richblack-800 h-auto w-full mt-10 flex flex-col justify-center">
      <div className=" mt-10 flex flex-row justify-center">
        <div className="flex flex-row gap-10 mt-10 text-sm w-[90%]">
          <div className="pl-9 flex flex-row gap-8 mr-16 ">
            <div className="flex flex-col gap-3">
              <img src={logo} alt="studynotionImage" className="h-[3rem] w-[22rem] text-richblack-800"/>

              <p className="text-richblack-100 font-semibold">Comapany</p>

              <div className="text-richblack-500 flex flex-col gap-3">
                <p>About</p>
                <p>Carriers</p>
                <p>Affiliates</p>
              </div>
            </div>

            <div className="grid grid-cols-2 h-[60%] gap-16">
              {resource.map((ele) => {
                return (
                  <div className="flex flex-col gap-3">
                    <p className="text-richblack-100 font-semibold">
                      {ele.title}
                    </p>

                    <div>
                      {ele.data.map((data) => {
                        return (
                          <div className="flex flex-col gap-3">
                            <p className="text-richblack-500">{data}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* for line */}
          <div className="h-[85%] bg-richblack-700 w-[1px] mt-16 ml-8 mr-5"></div>

          {/* subject data */}

          <div className="flex flex-row gap-5 w-[90%]">
            {FooterLink2.map((data) => {
              return (
                <div className="flex flex-col gap-3">
                  <p className="text-richblack-100 font-semibold">
                    {data.title}
                  </p>

                  {data.links.map((ele, index) => {
                    return <p className="text-richblack-500">{ele.title}</p>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

          <div>
              

              {/* for line */}

          <div className="w-[85%] bg-richblack-700 h-[1px] mb-5 mt-7 mx-auto"></div>
          </div>

          {/* footer text */}
          <div className="flex flex-row justify-between w-[80%] translate-x-24 mb-8 text-richblack-500 text-sm">
              
          <div className="flex flex-row gap-3">
            <p className="border-r border-richblack-700 h-5 pr-3">Privacy Policy</p>
            <p className="border-r border-richblack-700 h-5 pr-3">Cookie Policy</p>
            <p>Terms</p>
          </div>

              <div className="flex flex-row gap-2">
                  <p>Made with </p>
                    <FaHeart className="mt-1 text-pink-200"/>
                  <p>Myself</p>
                  <MdOutlineCopyright className="mt-1"/>
                  <p>2025 Insight-Institute</p>
              </div>
              
        </div>
      </div>

      
  );
};

export default FooterData;
