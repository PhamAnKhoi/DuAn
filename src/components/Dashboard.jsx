import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/User/Home.jsx";
import Post from "../pages/User/Post.jsx";
import Progress from "../pages/User/Progress.jsx";
import Course from "../pages/User/Course.jsx";
import Pay from "../pages/User/Pay.jsx";
import Cart from "../pages/User/Cart.jsx";
import Video from "../pages/User/Video.jsx";
import Login from "../pages/User/Login.jsx";
import CreatePost from "../pages/Admin/CreatePost.jsx";
import EditPost from "../pages/Admin/EditPost.jsx";
import CreateCourse from "../pages/Admin/CreateCourse.jsx";
import EditCourse from "../pages/Admin/EditCourse.jsx";
import Register from "../pages/User/Register.jsx";
import CourseDetails from "../pages/User/DetailCourse.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import ListCourse from "../pages/Admin/ListCourse.jsx";
import ListPost from "../pages/Admin/ListPost.jsx";
import Cookies from "js-cookie";
import MyCourse from "../pages/User/MyCourse.jsx";
import DetailPost from "../pages/User/DetailPost.jsx";
function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (Cookies.get("user") !== undefined) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* User */}
        <Route path="/" exact element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/post" element={<Post />} />
        <Route path="/course" element={<Course />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/video" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-course" element={<MyCourse />} />
        <Route path="/detail-course/:courseId" element={<CourseDetails />} />
        <Route path="/detail-post/:postId" element={<DetailPost />} />
        {/* Admin */}
        {isLoggedIn ?
          (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/list-course" element={<ListCourse />} />
              <Route path="/admin/list-post" element={<ListPost />} />
              <Route path="/admin/create-post" element={<CreatePost />} />
              <Route path="/admin/edit-post/:postId" element={<EditPost />} />
              <Route path="/admin/create-course" element={<CreateCourse />} />
              <Route path="/admin/edit-course/:courseId" element={<EditCourse />} />
            </>
          ) : ('')
        }
      </Routes>
    </BrowserRouter>
  );
}

export default Dashboard;
