import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Player } from 'video-react';
import {FiUploadCloud} from 'react-icons/fi'
import { useSelector } from 'react-redux';

const Upload = ({
    label,
    name,
    register,
    errors,
    setValue,
    video = null,
    viewData = null,
    editData = null,
}) => {

    const {course,editCourse} = useSelector((state)=> state.course)
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    );
    
    const inputref = useRef(null);

    const onDrop = (acceptedFile) => {
        const file = acceptedFile[0];

        if (file) {
            setSelectedFile(file);
            previewFile(file);
        }
        
    }


    const previewFile = (file) => {
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result) // set souurce to file source(path)
        } 
    }

    const { getRootProps, getInputProps,isDragActive } = useDropzone({
        accept: !video ? 
            { "image/*": ['.jpg', '.jpeg', '.png'] }
            : { "video/*": ['.mp4'] },
        onDrop,
    })


    useEffect(() => {
        if (editCourse) {
            setSelectedFile(course?.thumbnail)
        }
    },[])


    useEffect(() =>{
        register(name, {required: true})
    }, [register])
    

    useEffect(() => {
        setValue(name, selectedFile)
    },[setValue,selectedFile])


  return (
      <div >
          
          <label htmlFor={name}>
              {label} { !viewData && <sup className='text-pink-200'>*</sup>}
              
          </label>

          <div    className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
                
              {
                  previewSource ? (
                      <div>
                          {
                              !video ?
                                  (
                                      <img
                                          src={previewSource}
                                          alt="courseImage"
                                          className="h-full w-full rounded-md object-cover"
                                      />
                                  ) :
                                  (
                                      <Player aspectRatio='16:9' playsInline src={ previewSource} />
                                  )
                          }

                          {
                              !viewData && <button
                                  type='button'
                                  onClick={() => {
                                      setPreviewSource(null);
                                      setSelectedFile(null);
                                      setValue(name,null)
                                  }}

                                   className="mt-3 text-richblack-400 underline"
                              >
                                  Cancle
                                  
                              </button>
                          }
                      </div>
                  )
                      :
                      ( // if not previewSource or at the time of creation
                          
                          <div {...getRootProps()} className="flex w-full flex-col items-center p-6">
                              
                              <input ref={inputref} {...getInputProps()} />

                              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                <FiUploadCloud className="text-2xl text-yellow-50" />
                              </div>
                              
                              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                                <span className="font-semibold text-yellow-50">Browse</span> a
                                file
                                </p>
                                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>

                          </div>
                  )
              } 
          </div>
          {
              errors[name] && <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
          }
          

      </div>
      
  )
}

export default Upload