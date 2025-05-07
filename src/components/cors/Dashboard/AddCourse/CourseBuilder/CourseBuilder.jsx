import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux"; 
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseApi";
import { setEditCourse, setStep } from "../../../../../slices/course";
import toast from "react-hot-toast";

const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [ editSectionName, setEditSectionName ]= useState(null);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const gotoNext = () => {
    if (course.CourseContent.length === 0) {
      toast.error("Add at least one section to the course");
      return;
    }

    if (course.CourseContent.some((section) => section.length === 0)) {
      toast.error("Add at least one lecture to the section");
      return;
    }
    dispatch(setStep(3));
  };

  const onSubmit = (data) => {
    
    if (editSectionName) {
      setLoading(true)
       dispatch(
        updateSection(
          {
            sectionName: data.sectionName,
                sectionId: editSectionName,
            courseId: course._id
          },
          token
        )
       );
      
       setLoading(false)
    } else {

      setLoading(true)
      dispatch(
        createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        )
      );

      setLoading(false)
    }

      // course is updated also but set that in the courseApi cause here it sent as promise
      setEditSectionName(null);
      setValue("sectionName", "");
   
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };
    
    const handleChangeEditSectionName = (sectionId, sectionName) => {

        console.log('sectionId: ' + sectionId)
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId)
        setValue("sectionName", sectionName);


    }

  return (
    <>
      <p className="text-2xl text-richblack-5 mt-10 mr-14 ">Course Builder</p>
      <div className="mt-10 bg-richblack-800 w-[70%] pt-4 pl-6 pr-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="sectionName">
              Section Name<sup>*</sup>
            </label>

            <input
              type="text"
              name="sectionName"
              id="sectionName"
              placeholder="Enter a section name"
              {...register("sectionName", { required: true })}
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2"
            />
            {errors.sectionName && <span>Enter section name</span>}
          </div>

          <div className="mt-10 pb-10">
            {editSectionName ? (
              <div className="flex items-center gap-4 ">
                <button
                  type="submit"
                  className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
                >
                  Edit Section Name
                </button>

                <button
                  type="button"
                  className="text-richblack-400 underline cursor-pointer"
                  onClick={cancelEdit}
                >
                  Cancle Edit
                </button>
              </div>
            ) : (
                <button
                  disabled={loading}
                type="submit"
                className="flex items-center gap-3 border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
              >
                Add Section 
                <IoIosAddCircleOutline className="text-lg text-" />
              </button>
            )}
          </div>
        </form>

              {/* NestedView */}
              
              {
                  course?.CourseContent?.length > 0 && 
                  <NestedView handleChangeEditSectionName={ handleChangeEditSectionName} />
              }

        <div className="flex gap-3 justify-end pb-5 mt-5">
          <button
            disabled={ loading}
            type="button"
            onClick={() => goBack()}
            className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-richblack-800 text-richblack-50 font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
          >
            Back
          </button>
          <button
            disabled={ loading}
            type="button"
            onClick={() => gotoNext()}
            className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseBuilder;
