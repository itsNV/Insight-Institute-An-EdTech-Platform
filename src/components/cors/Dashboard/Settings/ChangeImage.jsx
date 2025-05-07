import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CTAButtons from "../../Home/CTAButtons";
import { FiUpload } from "react-icons/fi";
import { changePicture } from "../../../../services/operations/profileApi";

const ChangeImage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageSource, setImageSource] = useState(null);

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  function fileChangeHandler(event) {
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);
      previewImage(file);
    }
  }

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      setImageSource(reader.result); // set image source to sent it to img
  };

  function handleFileUpload(event) {
    event.preventDefault();
    setLoading(true);
    try {
      
      const formData = new FormData();
      formData.append("displayimage", imageFile);

      dispatch(changePicture(formData, token));

      setLoading(false);
    } catch (error) {
      console.log("error uploading file: " + error.message);
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewImage(imageFile);
    }
  }, [imageFile]);

  return (

    
    <div>
      <div className="flex flex-col gap-4  mt-14 bg-richblack-800  py-5 rounded-lg  border border-richblack-700">
        <div className="flex gap-2  items-center px-6">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={fileChangeHandler}
          />

          <img
            src={imageSource || user.image}
            className="h-[70px] w-[60px] rounded-full"
          />

          <div>
            <p className="text-md font-semibold  text-richblack-50">
              Change Profile Picture
            </p>

            <div className="flex gap-3">
              <div className="w-[70%] mt-4">
                <button
                  type="button"
                  className={`flex justify-center items-center 
                ${
                  active
                    ? "bg-yellow-50 text-black"
                    : "bg-richblack-800 text-white"
                }
                border border-black rounded-md px-3 py-1  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2`}
                  onClick={handleClick}
                >
                  Select
                </button>
              </div>

              <div className="w-[70%] mt-4 bg-richblack-800">
                <button
                  type="button"
                  className={`flex justify-center items-center 
                ${
                  active
                    ? "bg-yellow-50 text-black"
                    : "bg-richblack-800 text-white"
                }
                border border-black rounded-md px-3 py-1  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2`}
                  onClick={handleFileUpload}
                >
                  {!loading && <FiUpload className="text-white" />}
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeImage;
