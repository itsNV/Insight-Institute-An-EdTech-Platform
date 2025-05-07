import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const ViewCourseDetails = () => {

  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [progress, setProgress] = useState(null);
  const { subsectionData, ViewCourse,sectionData } = useSelector((state) => state.viewCourse);

  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const togglePlay = () => {

    const video = videoRef.current;

    console.log('video', video);
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    }
    else {
      video.pause();
      setIsPlaying(false);
    }


   



  }

  const handleTimeUpdate = () => {

    setDuration(subsectionData?.timeDuration);
    setCurrentTime(videoRef.current.currentTime);

    setProgress((currentTime / duration) * 100);

    console.log('duration', duration);
    console.log('current', currentTime);
    console.log('progress',progress)
  }

  useEffect(() => {
    console.log('subsec',subsectionData)
  },[])

  return (
    <div className='mt-32 text-white'>

<div className="flex flex-col gap-4 fixed bg-black top-[4rem] pt-16">
        <p className="text-richblack-500">
          Home / Dashboard / enrolled-courses / 
          <span className="text-yellow-100"> { ViewCourse?.CourseName}</span>
        </p>

        <p className="text-richblack-25 text-3xl font-semibold">
        { ViewCourse?.CourseName} - {sectionData?.sectionName}
        </p>

       

        <div className="h-[1px] lg:w-[75rem] bg-richblack-700"></div>
      </div>

      <div className='mt-60'>
        <p className='text-white text-2xl'>{subsectionData?.title}</p>
        
        <video
          src={subsectionData?.videoUrl}
          ref={videoRef}
          className="w-[60rem] rounded-lg "
          onTimeUpdate={handleTimeUpdate}
                  >
                  
        </video>


        <div className='w-[100%] h-[10px]  border border-richblack-300 rounded-lg'>

          <div
            style={{width: `${progress}%`}}
            className={`h-[10px] rounded-lg bg-blue-200`}></div>

        </div>
        

        <button
          className='text-black font-semibold text-lg bg-yellow-200 py-1 px-5 rounded-lg mt-10 w-[6rem] flex mx-auto justify-center'
          type="button" onClick={() => togglePlay()}>
          {
            isPlaying ? (currentTime > (parseFloat(duration) - 0.2) ? "Play" : "Pause") : "Play"
          }
        </button>


        <p className='text-richblack-400 mt-10 mb-5'>{ subsectionData?.description}</p>
      </div>
      
    </div>
  )
}

export default ViewCourseDetails