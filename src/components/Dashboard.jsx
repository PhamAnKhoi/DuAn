import React from "react";
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
import AdminLogin from "../pages/Admin/AdminLogin.jsx";
import CreateCourse from "../pages/Admin/CreateCourse.jsx";
import EditCourse from "../pages/Admin/EditCourse.jsx";
import Register from "../pages/User/Register.jsx";
import CourseDetails from "../pages/User/DetailCourse.jsx";
import Admin from "../pages/Admin/Admin.jsx";
function Dashboard() {
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
        <Route path="/course/:courseId" element={<CourseDetails />} />
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create-post" element={<CreatePost />} />
        <Route path="/admin/edit-post/:postId" element={<EditPost />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create-course" element={<CreateCourse />} />
        <Route path="/admin/edit-course" element={<EditCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Dashboard;
