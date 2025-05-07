import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../slices/cart";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../services/operations/buyCourse";
import { GoDotFill } from "react-icons/go";

const Cart = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile)
  
  const [totalCartItems, settotalCartItems] = useState(null);
  // const [currentCourse, setCurrentCourse] = useState(null);

  const courses = totalItems?.map((item) => item?._id)
  const userDetails = user;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let totalAmount = 0;
  totalCartItems?.forEach((item)=> totalAmount = totalAmount + parseInt(item?.price))
  

  const ForPrintingBottomLine = totalCartItems?.length - 1;


  const buyCourseHandler = () => {
    dispatch(buyCourse(token,courses,userDetails,navigate,dispatch))  
  }

  const removeFromCartHandler = (courseId) => {
    console.log('item id ',courseId)
    dispatch(removeFromCart(courseId))
  }



  useEffect(() => {
    console.log('inside Useeffect of cart',totalItems)
    settotalCartItems(totalItems);
  },[])

  return (
    <div className="mt-32">
      <div className="flex flex-col gap-4 fixed bg-black">
        <p className="text-richblack-500">
          Home / Dashboard / <span className="text-yellow-100"> Wishlist</span>
        </p>

        <p className="text-richblack-25 text-3xl font-semibold">My Wishlist</p>

        <p className="text-richblack-400 text-lg font-semibold mt-10">
          {totalCartItems?.length} Courses in wishlist
        </p>

        <div className="h-[1px] lg:w-[75rem] bg-richblack-700"></div>
      </div>

      <div className="flex flex-col">
        

        <div className="mt-44">
          {totalCartItems?.map((item) => (
            <form
              key={item._id} className="flex flex-col">
              <div className="flex mt-7 w-[85%]">
                <img 
                  onClick={() => navigate(`/differentCourses/${item?._id}`)}
                  src={item.thumbnail}
                  alt="thumbnail"
                  className="h-[10rem] w-[15rem] rounded-xl"
                />

                <div
                  onClick={() => navigate(`/differentCourses/${item?._id}`)}
                  className="flex flex-col w-[80%] ml-4">
                  <p className="text-richblack-25 text-2xl">
                    {item?.CourseName}
                  </p>

                  <p className="text-richblack-400 text-lg mt-2">
                    {item?.instructor.firstName} {item?.instructor.lastName}
                  </p>

                  <p className="text-richblack-25 mt-2">Ratings pending</p>

                  <p className="flex gap-3 text-richblack-400 text-md font-semibold mt-2">
                    {item?.CourseContent?.length} Sections
                    <span className="flex  items-center"> <GoDotFill /> Beginner</span>
                  </p>
                </div>

                <div className="flex flex-col gap-5 items-center">
                  <button
                    onClick={()=> removeFromCartHandler(item?._id)}
                    type="button"
                    className="flex gap-2 items-center text-pink-300 font-semibold text-lg bg-richblack-800 border border-richblack-700 px-5 py-3 rounded-xl max-w-maxContent hover:scale-110 transition-all duration-200"
                  >
                    <MdDelete />
                    Remove
                  </button>

                  <p className="text-2xl text-yellow-50 font-semibold">
                    Rs. {item?.price}
                  </p>
                </div>
              </div>

              {ForPrintingBottomLine > totalCartItems.indexOf(item._id) && (
                <div className="h-[1px] w-[90%] bg-richblack-700 mt-5"></div>
              )}
            </form>
          ))}
        </div>

        <div className="fixed bg-richblack-800 h-auto w-[16%] right-36 mt-52 pl-8 pt-4 pb-7 rounded-lg border border-richblack-700">

          <p className="text-richblack-200 text-sm font-semibold">Total : </p>

          <p className="text-2xl text-yellow-100 font-semibold mt-3">Rs.  {parseInt(totalAmount)}</p>
          
          <button
            onClick={()=> buyCourseHandler()}
            className="flex justify-center items-center w-[85%] text-lg font-semibold
                bg-yellow-50 text-black 
                border border-black rounded-md px-3 py-2  shadow-sm shadow-richblack-50
                hover:scale-110
                transition-all duration-200 
                gap-2 mt-5"
            type="button">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
