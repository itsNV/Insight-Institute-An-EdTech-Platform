import React from "react";
import ContactUsForm from "../components/cors/About/ContactUsForm";
import { IoIosChatbubbles } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import FooterData from "../components/cors/Home/FooterData";

const ContactUs = () => {
  const data = [
    {
      icon: <IoIosChatbubbles className="h-[1.5rem] w-[1.5rem]" />,
      heading: "Chat on us",
      description1: "Our friendly team is here to help.",
      description2: "@mail address",
    },
    {
      icon: <FaEarthAfrica className="h-[1.5rem] w-[1.5rem]" />,
      heading: "Visit Us",
      description1: "Come and say hello at our office HQ.",
      description2: "Here is the location/ address",
    },
    {
      icon: <IoCall className="h-[1.5rem] w-[1.5rem]" />,
      heading: "Call Us",
      description1: "Mon - Fri From 8am to 5pm",
      description2: "+123 456 7890",
    },
  ];

  return (
    <div className="flex flex-col mt-20">
      <div className="mt-28 mb-20 flex mx-auto gap-11">
        <div className="flex flex-col gap-9 bg-richblack-800 w-[40%]  h-fit py-12 px-14 rounded-2xl">
          {data.map((ele, index) => {
            return (
              <div className="flex gap-2">
                <div className="text-richblack-50 pt-1">{ele.icon}</div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl text-richblack-50 font-semibold">
                    {ele.heading}
                  </p>

                  <p className="text-sm text-richblack-300 font-semibold">
                    {ele.description1}
                  </p>

                  <p className="text-sm text-richblack-300 font-semibold">
                    {ele.description2}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 w-[66%] border border-richblack-700 rounded-2xl items-center py-14">
          <div className="flex flex-col gap-2 w-[80%]">
            <p className="text-richblack-50 text-3xl font-semibold">
              Got a Idea? We’ve got the skills. Let’s team up
            </p>

            <p className="text-richblack-500 text-sm">
              Tell us more about yourself and what you’re got in mind
            </p>
          </div>

          <ContactUsForm />
        </div>
      </div>
      {/* footer */}
      <FooterData />
    </div>
  );
};

export default ContactUs;
