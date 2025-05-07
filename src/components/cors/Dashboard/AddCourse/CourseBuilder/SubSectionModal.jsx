import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Upload from "../Upload";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  editSubSection,
} from "../../../../../services/operations/courseApi";
import { GiToken } from "react-icons/gi";

const SubSectionModal = ({
  modalData,
  setModalData,
  viewData = null,
  editData = null,
  addData = null,
}) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    register,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [video, setVideo] = useState(null);

   
  // edit subsection
    const handleEditSubSection = () => {
      
        
        const currentValues = getValues();
        
        const formData = new FormData();
        formData.append('courseId', course._id);
        formData.append('sectionId', modalData.sectionId)
        formData.append('subsectionId',modalData.subsec._id)

    if (currentValues.title !== modalData.subsec.title) {
      formData.append("title", currentValues.title);
    }

    if (currentValues.description !== modalData.subsec.description) {
      formData.append("description", currentValues.description);
    }
        
        

    if (currentValues.lectureVideo !== modalData.subsec.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }
    

    // call api
    dispatch(editSubSection(formData, token));

    setModalData(null); // to close the modal
  };

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureVideo !== modalData.subsec.videoUrl ||
      currentValues.title !== modalData.subsec.title ||
      currentValues.description !== modalData.subsec.description
    ) {
      return true;
    } else {
      return false;
    }
  };



  const onSubmit = (data) => {
    if (editData) {
        if (!isFormUpdated()) {
            
        return toast.error("No chnages made so far");
      } else {
        return handleEditSubSection();
        }
        
    }

    // add or create subsection
    const formData = new FormData();
    
    formData.append("sectionId", modalData); // we sent section._id as --->  modalData
    formData.append("courseId", course._id);
    formData.append("title", data.title);
      formData.append("description", data.description);
      console.log('data.lectureVideos', data.lectureVideo);
    formData.append("videoFile", data.lectureVideo);

    // api call
    dispatch(createSubSection(formData, token));

    setModalData(null);
  };

  useEffect(() => {
    if (editData ) {
      setValue("title", modalData.subsec.title);
        setValue("description", modalData.subsec.description);
        console.log("lectureVideo", modalData.subsec.videoUrl)
      setValue("lectureVideo", modalData.subsec.videoUrl); // saved as videoUrl in modal
    }
      
      // else is viewData --> because we only need subsection._id to view data so we only sent that unlike the view Data
      if (viewData) {
        setValue("title", modalData.title);
          setValue("description", modalData.description);
          console.log("lectureVideo", modalData.videoUrl)
        setValue("lectureVideo", modalData.videoUrl); // saved as videoUrl in modal
      }
      
      
  }, []);

  return (
    <div>
      <div className="w-full  bg-richblack-800 flex flex-col gap-3 items-center p-2 rounded-lg mt-10">
        <p className="text-white bg-richblack-700 w-[60%] text-center rounded-lg font-semibold py-1">
          {viewData ? "Viewing " : editData ? "Editing " : "Adding "}
          Lecture
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* title */}

          <div>
            <label htmlFor="title">
              Title<sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              {...register("title", { required: true })}
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2"
            />

            {errors.name && (
              <span className="text-pink-200">Title is required</span>
            )}
          </div>

          <div>
            <Upload
              label="Lecture Video"
                          name="lectureVideo"
                          id="lectureVideo"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              editData={editData ? modalData.videoUrl : null}
              viewData={viewData ? modalData.videoUrl : null}
            />
          </div>

          <div>
            <label htmlFor="description">
              Discription<sup className="text-pink-200">*</sup>
            </label>

            <textarea
              name="description"
              id="description"
              placeholder="Enter short description"
              {...register("description", { required: true })}
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2 min-h-[130px]"
            />
          </div>

          {editData ? (
            <button
              type="submit"
              className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
            >
              Edit
            </button>
          ) : (
            !viewData && (
              <button
                type="submit"
                className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
              >
                Save
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => setModalData(null)}
            className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-richblack-600 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
