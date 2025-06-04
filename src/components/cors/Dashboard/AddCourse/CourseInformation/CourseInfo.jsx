import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbCoinRupee } from "react-icons/tb";
import { editCourseDetails, getAllCategories } from "../../../../../services/operations/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../../../../services/apiConnector";
import Requirements from "./Requirements";
import toast from "react-hot-toast";
import { setCourse, setIsSaved, setStep } from "../../../../../slices/course";
import { createCourse } from "../../../../../services/operations/courseApi";
import Upload from "../Upload";
import ChipInput from "./ChipInput";

const CourseInfo = () => {
    const [categories, setCategories] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course)
  const {token} = useSelector((state)=> state.auth)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();


    // form is updated or not
    const isUpdated = () => {
      const currentValues = getValues();
      console.log('printong current values from isUpdated: ', currentValues)
      console.log('printong course from isUpdated: ', course)
      console.log('curre.category',currentValues.category)
      // console.log('curre.category._id',currentValues.category._id)

      if (currentValues.courseTitle !== course.CourseName ||
        currentValues.courseDescription !== course.description ||
        currentValues.price !== course.price ||
        currentValues.category !== course.category ||
        currentValues.coursebenefits !== course.whatYouWillLearn ||
        currentValues.tag !== course.tag ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.requirements !== course.instructions
      )
        return true
      
      else {
        return false
      }
    }
  
  
  
  // next without savig
  const handleNextWithoutSaving = () => {
    if (isUpdated()) {

      dispatch(setIsSaved(false))
      dispatch(setStep(2));
    }
    else {

      toast.error("No chnages Made so far")
      dispatch(setIsSaved(true));
      dispatch(setStep(2));
    }
  }
  
  
  
  

  const onSubmit = async (data) => { 
      console.log('data', data)
    console.log('isUpdated',isUpdated())
        if (editCourse) {
            console.log('inside edit course')
            if (isUpdated()) {
              const currentValues = getValues();
              console.log('currentValues form onsubmit', currentValues);
              console.log('perinting course from onsubmit', course);
                const formData = new FormData();

                formData.append('courseId', course._id)
                
                if (currentValues.courseTitle !== course.CourseName) {
                    formData.append('CourseName', data.courseTitle)
                }

                if (currentValues.courseDescription !== course.description) {
                    formData.append("description", data.courseDescription)
                }

                if (currentValues.price !== course.price) {
                    formData.append("price", data.price);
                }

                if (currentValues.category !== course.category) {
                    formData.append("category", data.category)
                }

                if (currentValues.coursebenefits !== course.whatYouWillLearn) {
                    formData.append('whatYouWillLearn',data.coursebenefits)
                    
                }

                // if (currentValues.requirements.toString() !== course.instructions.toString()) {
                //     formData.append('instructions', currentValues.requirements)
                // }
              
              if (currentValues.courseTag !== course.tag) {
                formData.append('tag', JSON.stringify(data.courseTag))
              }

              if (currentValues.requirements !== course.instructions) {
                formData.append('instructions', JSON.stringify(data.requirements));
              }

              if (currentValues.courseImage !== course.thumbnail) {
                formData.append('thumbnailFile', data.courseImage)
              }

              formData.append("status", "Draft");

              // to print value in formData
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
              
              // setIsSaved is at api call 
              setLoading(true);

              dispatch(editCourseDetails(formData, token))
              
              setLoading(false);
             
              
            }
            else {
              return toast.error("NO changes made so far")
            }
          
          return;
        }
      
      
    if (!editCourse) {
        // create new course
        console.log('at the create course')
        const formData = new FormData()
        formData.append('CourseName', data.courseTitle)
        formData.append("description", data.courseDescription)
        formData.append("price", data.price);
        formData.append("category", data.category)
        formData.append('whatYouWillLearn', data.coursebenefits)
        formData.append('instructions', JSON.stringify(data.requirements))
        formData.append('thumbnailFile', data.courseImage)
        formData.append('tag', JSON.stringify(data.courseTag))
        formData.append('status', 'Draft');

        // to print value in formData
        //   for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
      
        
        // api call
        setLoading(true);
        dispatch(createCourse(formData, token))
        setLoading(false);
        
        
        //  dispatch(setStep(2)) --> stted at api call
          // dispatch(setCourse(result)) --> set inside the api call cause here returning promise not data
            
      }
        
      
    };
    

  

  useEffect(() => {
    const  getAllCategories = async ()=> {
      
        let result = [];

        try {
          const response = await apiConnector(
            "GET",
            process.env.REACT_APP_BASE_URL
          );

          if (!response.data.success) {
            throw new Error("Failed to fetch categories");
          }

          // console.log('result of category', response)
          result = response.data.allCategorys;
          
        } catch (error) {
          // console.log(error.response.data.message)
          console.log("error occurred", error);
        }

        // console.log("printing result ", result);
        setCategories(result);
    };
    
    if (editCourse) {
    
      setValue("courseTitle", course.CourseName);
      setValue("courseDescription", course.description);
      setValue('price', course.price);
      console.log('course.category',course.category)
      
      setValue('category', course.category);
      setValue('coursebenefits', course.whatYouWillLearn);
      setValue('requirements',course.instructions)
      setValue('courseTag',course.tag)
      setValue('courseImage', course.thumbnail);
     
    }
    

    getAllCategories();
  }, []);

  // console.log("categories: ", categories);

  return (
    <div className="mt-10 bg-richblack-800 w-[70%] pt-4 pl-6 pr-6 rounded-lg ">

      {
        loading && toast.success("Loading......")
      }
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mb-10 pb-4">
        {/* course title */}
        <div className="flex flex-col ">
          <label htmlFor="courseTitle">
            Course Title<sup className="text-pink-200">*</sup>
          </label>

          <input
            type="text"
            name="courseTitle"
            id="courseTitle"
            placeholder="Enter course title"
            {...register("courseTitle", { required: true })}
            className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2"
          />
          {errors.courseTitle && <span>Enter course title **</span>}
        </div>

        {/* course description */}
        <div className="flex flex-col ">
          <label htmlFor="courseDescription">
            course Description<sup className="text-pink-200">*</sup>
          </label>

          <textarea
            type="text"
            name="courseDescription"
            id="courseDescription"
            placeholder="Enter course title"
            {...register("courseDescription", { required: true })}
            className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2 min-h-[130px]"
          />
          {errors.courseDescription && <span>Enter course desc. **</span>}
        </div>

        {/* course price */}
        <div className="flex flex-col relative">
          <label htmlFor="price">
            Price<sup className="text-pink-200">*</sup>
          </label>

          <div className="relative">
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Enter course price"
            {...register("price", { required: true })}
            className="bg-richblack-700 rounded-[0.5rem] text-black w-full p-[7px] pl-8 mt-2"
          />
          <TbCoinRupee className="absolute bottom-2 ml-2 text-xl " />
          {errors.price && <span>Enter course price **</span>}
          </div>
 
        </div>

        {/* category */}
        <div>
          <label htmlFor="category">Category<sup className="text-pink-200">*</sup></label>
                  <select
                      
                      id="category"
                  defaultValue=""
                      {...register("category", { required: true })}
                       className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px]  mt-2"
                  >
                      <option value="" disabled>Select a category</option>
            {!loading && categories?.map((cat, index) => (
              <option value={cat?._id} key={index}>
                {cat?.categoryName}
              </option>
            ))}
                      
                     
                  </select>
                  
                  {
                          errors.category && <span>Enter category</span>
                      }
              </div>
              
        {/* tags */}
        <ChipInput
          label='Tags'
          name='courseTag'
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />





        {/* thumbnail */}
        
        <Upload
          label='Course Image'
          name="courseImage"
          register={ register}
          setValue={setValue}
          errors={errors}
          video={false}
          editData ={editCourse ? course?.thumbnail : null}

        />


              {/* benefits of the course */}
              <div className="flex flex-col ">
          <label htmlFor="coursebenefits">
            course Benefits<sup className="text-pink-200">*</sup>
          </label>

          <textarea
            type="text"
            name="coursebenefits"
            id="coursebenefits"
            placeholder="Enter course title"
            {...register("coursebenefits", { required: true })}
            className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[7px] mt-2 min-h-[130px]"
          />
          {errors.coursebenefits && <span>Enter course benefits **</span>}
              </div>
              
              <Requirements
                  label="Requirements"
                  name='requirements'
                  register={register}
                  setValue={setValue}
                  errors={errors}

              />


              <div className="flex gap-6 justify-end">
                  
                  {
                      editCourse && (
                          <div className="flex gap-6 justify-end">
                <button
                  type="button"
                  onClick={() => handleNextWithoutSaving()}
                                   className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-richblack-700 text-richblack-50 font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
                              >
                              Next Without Saving
                          </button>

                             
                          </div>
                      )
                  }


                  {
                      !editCourse  ? 
            <button
                type="submit"
                              className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
              >Next</button>
              :
              <button
                type="submit"
              className="border border-richblack-900 shadow-sm shadow-richblack-100 bg-yellow-100 text-black font-semibold rounded-lg px-2 py-1 hover:scale-110 transition-all duration-200 "
          >
              Save Changes
      </button>
                  }
              </div>
      </form>
    </div>
  );
};

export default CourseInfo;
