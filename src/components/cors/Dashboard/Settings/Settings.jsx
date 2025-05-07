import React, { useEffect } from "react";
import ChangeImage from "./ChangeImage";
import CTAButtons from "../../Home/CTAButtons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import countrycode from "../../../../data/countrycode.json";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  changePassword,
  changePicture,
} from "../../../../services/operations/profileApi";
import { updateProfile } from "../../../../services/operations/profileApi";
import Spinner from "../../../common/Spinner";
import { setAdditionalDetails } from "../../../../slices/profile";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Settings = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  
  const [showoldPassword, setShowoldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // data updated or not
  const isUpdated = () => {
    const currentValues = getValues();
    // console.log('current values:', currentValues)
    // console.log('additionalDetails', user?.additionalDetails);
    
    if (
      currentValues.dateOfBirth != user?.additionalDetails?.dateOfBirth ||
      currentValues.about != user?.additionalDetails?.about ||
      currentValues.gender != user?.additionalDetails?.gender ||
      currentValues.countrycode != user?.additionalDetails?.countryCode ||
      currentValues.contactNo != user?.additionalDetails?.contactNo ||
      currentValues.profession != user?.additionalDetails?.profession
    ) {
      return true;
    } else {
      return false;
    }
  };

  // submit handler
  const profileSubmitHandler = (data) => {
    // console.log('printing form data', profileData);
    // console.log('token', token);

    console.log('isUpdated',isUpdated());
    if (isUpdated()) {
      const currentValues = getValues();

      const formData = new FormData();
      
      console.log("printng data", data);

      if (currentValues.dateOfBirth !== user?.additionalDetails?.dateOfBirth) {
        formData.append("dateOfBirth", data.dateOfBirth);
      }

      if (currentValues.about !== user?.additionalDetails?.about) {
        formData.append("about", data.about);
      }

      if (currentValues.gender !== user?.additionalDetails?.gender) {
        formData.append("gender", data.gender);
      }

      if (currentValues.countrycode !== user?.additionalDetails?.countryCode) {
        formData.append("countryCode", data.countrycode);
      }

      if (currentValues.contactNo !== user?.additionalDetails?.contactNo) {
        formData.append("contactNo", data.contactNo);
      }

      if (currentValues.profession !== user?.additionalDetails?.profession) {
        formData.append("profession", data.profession);
      }

      // fro updating password
      if (currentValues.oldPassword || currentValues.newPassword) {
        setLoading(true);
        dispatch(
          changePassword(
            currentValues.oldPassword,
            currentValues.newPassword,
            token
          )
        );
        setLoading(false);
      }

      // api call for update details
      setLoading(true);
      dispatch(updateProfile(formData, token));
      setLoading(false);

      return;
    } else {
      return toast.error("No changes made so far");
    }
  };

  useEffect(() => {
    setValue("dateOfBirth", user?.additionalDetails?.dateOfBirth);
    setValue("about", user?.additionalDetails?.about);
    setValue("gender", user?.additionalDetails?.gender);
    setValue("countrycode", user?.additionalDetails?.countryCode);
    setValue("contactNo", user?.additionalDetails?.contactNo);
    setValue("profession", user?.additionalDetails?.profession);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-black">Loading ......</div>
      ) : (
        <div>
          <div className="text-3xl text-richblack-5 mt-32 mr-14 ">
            <p>Edit Profile</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(profileSubmitHandler)}
          >
            {/* change image */}
            <ChangeImage />

            <div
              className="bg-richblack-800 py-3 rounded-lg  border border-richblack-700
      pl-5 flex flex-col gap-4"
            >
              <p className="text-xl font-semibold text-richblack-5  ">
                Profile Information
              </p>

              {/* fname and profession */}
              <div className="flex gap-[10.7rem]">
                <label className="flex flex-col gap-2">
                  <p className="text-richblack-50 text-sm">Display Name</p>

                  <input
                    type="text"
                    name="firstName"
                    value={`${user.firstName} ${user.lastName}`}
                    className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[21rem]"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <label
                    htmlFor="profession"
                    className="text-richblack-50 text-sm"
                  >
                    Profession
                  </label>

                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    {...register("profession")}
                    className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[18rem]"
                  />
                </label>
              </div>

              {/* date of birth and gender */}
              <div className="flex  gap-[10.7rem]">
                <label className="flex flex-col gap-2">
                  <p className="text-richblack-50 text-sm">Date Of Birth</p>

                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="dd/mm/yyyy"
                    {...register("dateOfBirth")}
                    className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[21rem]"
                  />
                </label>

                {/* gender radio */}
                <div className="flex flex-col gap-2">
                  <p className="text-richblack-50 text-sm">Gender</p>
                  <div
                    className="px-4 py-2 rounded-lg h-10 flex items-center
                                w-[18rem] bg-richblack-700  gap-5"
                  >
                    <div className="flex gap-3 items-center">
                      <label
                        htmlFor="gender"
                        className="text-richblack-50 text-sm"
                      >
                        Male
                      </label>

                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        {...register("gender")}
                      />
                    </div>

                    <div className="flex gap-3 items-center">
                      <label
                        htmlFor="gender"
                        className="text-richblack-50 text-sm"
                      >
                        Female
                      </label>

                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        {...register("gender")}
                      />
                    </div>

                    <div className="flex gap-3 items-center">
                      <label
                        htmlFor="other"
                        className="text-richblack-50 text-sm"
                      >
                        Other
                      </label>

                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        {...register("gender")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* phone no. and about */}

              <div className="flex">
                <label className="flex flex-col gap-2  w-[54%]">
                  <p className="text-richblack-50 text-sm">Phone Number</p>

                  <div className="flex gap-3">
                    <select
                      name="countrycode"
                      id="countrycode"
                      {...register("countrycode")}
                      className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[18%]"
                    >
                      {countrycode.map((data, index) => {
                        return (
                          <option value={data.code} key={index}>
                            {data.code} - {data.country}
                          </option>
                        );
                      })}
                    </select>

                    <input
                      type="number"
                      id="contactNo"
                      name="contactNo"
                      {...register("contactNo")}
                      placeholder="12345 67890"
                      className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[47%]"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-2">
                  <p className="text-richblack-50 text-sm">About</p>

                  <input
                    type="text"
                    name="about"
                    id="about"
                    {...register("about")}
                    className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                w-[18rem]"
                  />
                </label>
              </div>
            </div>

            {/* <ChangePass /> */}

            <div>
              <div className="flex flex-col gap-4 mb-14 bg-richblack-800  py-5 rounded-lg  border border-richblack-700 pl-5">
                <p className="text-xl font-semibold text-richblack-5  ">
                  Password
                </p>

                <div className="flex gap-20">
                  <label className="flex flex-col gap-2">
                    <p className="text-richblack-50 text-sm">
                      Current Password
                    </p>

                    <div className="flex relative">
                      <input
                        type={`${showoldPassword ? "text" : "password"}`}
                        name="oldPassword"
                        id="oldPassword"
                        {...register("oldPassword")}
                        className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                              w-[18rem]"
                      />

                      <div
                        onClick={() => setShowoldPassword((pre) => !pre)}
                        className="text-white absolute top-3 right-4"
                      >
                        {showoldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </div>
                    </div>
                  </label>

                  <label className="flex flex-col gap-2">
                    <p className="text-richblack-50 text-sm">New Password</p>

                    <div className="flex relative">
                      <input
                        type={`${showNewPassword ? "text" : "password"}`}
                        name="newPassword"
                        {...register("newPassword")}
                        className="bg-richblack-700 text-richblack-50 px-4 py-2 rounded-lg 
                                              w-[18rem]"
                      />

                      <div
                        onClick={() => setShowNewPassword((pre) => !pre)}
                        className="text-white absolute top-3 right-4"
                      >
                        {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* btns */}

            <div className="flex justify-center gap-4">
              <CTAButtons linkto={"/dashboard/my-profile"} active={false}>
                Cancle
              </CTAButtons>

              <button
                type="submit"
                className="bg-yellow-50 text-richblack-900 px-5 py-1 rounded-lg flex border border-black items-center font-semibold shadow-sm shadow-richblack-25 hover:scale-110 transition-all duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
