import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Banner from "../assets/Images/banner.mp4";
import instructorImage from "../assets/Images/Instructor.png";
import CodeBlocks from "../components/cors/Home/CodeBlocks";
import CTAButtons from "../components/cors/Home/CTAButtons";
import ExploreMore from "../components/cors/Home/ExploreMore";
import FooterData from "../components/cors/Home/FooterData";
import HighlightText from "../components/cors/Home/HighlightText";
import LearningLanguage from "../components/cors/Home/LearningLanguage";
import TimeLine from "../components/cors/Home/TimeLine";

const Home = () => {
  return (
    <div>
      <div className="sec1  w-full h-auto flex flex-col items-center mb-[10rem] mt-28">
        {/* section 1 */}
        <div className="flex flex-col items-center text-white">
          <div
            className="bg-richblack-800 mt-[38px] rounded-full w-[235px] h-[35px] 
              flex justify-center items-center shadow-sm shadow-richblack-50 gap-2
              hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            <div>
              <p>Become an instructor </p>
            </div>
            <FaArrowRight />
          </div>

          <div className="sec1_head mt-8 text-4xl ">
            <p>
              Empower Your future With{' '}
              <HighlightText text={"Coding Skills"} />
            </p>
          </div>

          <div className="sec1_text w-[70%] text-richblack-500 mt-5 font-inter text-center">
            <p>
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </p>
          </div>

          <div className="sec1_fbtns flex gap-5 mt-8 ">
            <CTAButtons linkto={"/signUp"} active={true}>
              Learn more
            </CTAButtons>
            <CTAButtons linkto={"login"} active={false}>
              Book Demo
            </CTAButtons>
          </div>
        </div>

        {/* video */}

        <div className="relative ">

          <video
            muted
            loop
            autoPlay
            className="w-[900px] mt-[7rem]   absolute right-2 left-4"
          >
            <source src={Banner} type="video/mp4" />
          </video>

          <div className="w-[900px] h-[30rem] bg-white  mt-[9rem] ml-[27px]"></div>
        </div>

        {/* code section 1 */}

        <div className=" flex justify-center">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your {' '}
                <HighlightText text={"coding potential"} />
                {" "}
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              text: "try it yourself",
              linkto: "/signUp",
              active: true,
            }}
            ctabtn2={{
              text: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeColor={""}
            codeContent={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a></h1>\n nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
          />
        </div>

        {/* code section 2 */}
        <div className="flex justify-center mt-10">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={" coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              text: "continue lesson",
              linkto: "/signUp",
              active: true,
            }}
            ctabtn2={{
              text: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeContent={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>/h1>\n nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
          />
        </div>

        {/* explore */}
        <ExploreMore />
      
      </div>


      {/* section 2 */}

      <div className="bg-richblack-5 flex flex-wrap mt-60">
        <div className="homepage_bg w-full h-[16rem] flex flex-row justify-center items-center gap-5 mb-24 flex-wrap">
          <CTAButtons active={true} linkto={"/signUp"}>
            Explore Full Catalog
            <FaArrowRight />
          </CTAButtons>

          <CTAButtons active={false} linkto={"/signUp"}>
            Learn More
          </CTAButtons>
        </div>

        <div className="sec2_first flex flex-row gap-10 w-[80%] mx-auto">
          <div className="w-[50%] flex flex-row gap-2 text-black text-4xl font-semibold mb-10">
            <p>
              Get the Skills you need for a{" "}
              <HighlightText text={"job That is in demand"} />
            </p>
          </div>

          <div className="flex flex-col gap-10 text-black w-[50%] flex-wrap">
            <p>
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>

            <div className="text-start flex ">
              <CTAButtons active={true} linkto={"/signUp"}>
                Learn More
              </CTAButtons>
            </div>
          </div>
        </div>

        <TimeLine />

        <div className="w-full flex justify-center">
        <LearningLanguage />
        </div>
        
      </div>

      {/* section 3 */}

      < div className="bg-richblack-900 mb-20">
        

      <div className="flex flex-row mt-20 mb-4 justify-center" >
        <div className="w-[35%] relative">
            <img src={instructorImage} alt="instructorImage"
              className="h-[20rem] w-[22rem] absolute top-4 left-4" />

            <div className="bg-richblack-5 h-[20rem] w-[22rem]">
              
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[30%] justify-center">
          <p className=" text-4xl font-semibold text-richblack-5 gap-2 flex flex-col">
              Become an 
              <HighlightText text={"instructor"} />
          </p>
            
            

            <p className="text-richblack-500">Instructors from around the world teach millions of students on Insight-Institute. We provide the tools and skills to teach what you love.</p>
            

            <div className="flex gap-2 justify-center md:justify-start">
            <CTAButtons active={true} linkto={'/signUp'}>
              Start Teaching Today
              <FaArrowRight/>
              </CTAButtons>
            </div>
           
        </div>
        </div>
        

        {/*reviews from other learners*/}
        <div></div>

 

      </div>

      <FooterData/>
      
    </div>
  );
};

export default Home;
