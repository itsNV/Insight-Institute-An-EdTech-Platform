import "./App.css";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import ResetPassword from "./components/cors/auth/ResetPassword";
import ResetPasswordToken from "./components/cors/auth/ResetPasswordToken";
import VerifyEmail from "./components/cors/auth/VerifyEmail";
import MyProfile from "./components/cors/Dashboard/MyProfile";
import Settings from "./components/cors/Dashboard/Settings/Settings";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { useSelector } from "react-redux";
import { PrivateRoute } from "./components/cors/auth/PrivateRoute";
import AddCourse from "./components/cors/Dashboard/AddCourse/AddCourse";
import Publish from "./components/cors/Dashboard/AddCourse/Publish/Publish";
import MyCourses from "./components/cors/Dashboard/MyCourses/MyCourses";
import ViewCourseDetails from './components/cors/ViewCourse/ViewCourseDetails';
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import CourseDetails from "./pages/CourseDetails";
import EnrollCourses from "./pages/EnrollCourses";
import PurchasedHistory from "./pages/PurchasedHistory";
import ViewCourse from "./pages/ViewCourse";

function App() {
  

  const { user } = useSelector((state) => state.profile)
  
  return (
    <div className="w-screen min-h-screen flex flex-col bg-richblack-900 relative overflow-x-hidden">
      <Navbar />

      
      
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />

        {/* About us */}
        <Route path="about" element={<About />} />

        {/* catalog */}
        <Route path="category/:catalogName" element={
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        } />
        <Route path="differentCourses/:courseId" element={ <CourseDetails/>} />

        {/* contact us */}
        <Route path="contact" element={<ContactUs />} />

        {/* signup */}
        <Route path="signup" element={<SignUp />} />

        {/* verify-email or otp verification */}
        <Route path="verify-email" element={<VerifyEmail />} />

        {/* login */}
        <Route path="login" element={<Login />} />

        {/* reset-password token*/}
        <Route path="reset-password-token" element={<ResetPasswordToken />} />

        {/* reset-password */}
        <Route path="/update-password/:id" element={<ResetPassword />} />

        {/* dashboard */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

          {
            user?.accountType === 'Instructor' &&
            (
              <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/publish" element={<Publish />} />
                <Route path="dashboard/my-courses" element={<MyCourses/> } />
              </>
            )
          
        
          }

          {
            user?.accountType === 'Student' &&
            (
              <>
                <Route path="dashboard/purchase-history" element={<PurchasedHistory />} />
                <Route path="dashboard/wishlist" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrollCourses />} />
                
              </>
            )
          }
         
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
        >

          <>
          <Route path="dashboard/enrolled-courses/viewcourse/:courseId/:sectionId/:subsectionId" element={<ViewCourseDetails/>} />
          </>

        </Route> 

        {/* error page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
