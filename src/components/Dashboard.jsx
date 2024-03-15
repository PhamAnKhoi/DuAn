import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/User/Home.jsx";
import Post from "../pages/User/Post.jsx";
import Header from "../pages/User/Header.jsx";
import Footer from "../pages/User/Footer.jsx";
import Progress from "../pages/User/Progress.jsx";
import Course from "../pages/User/Course.jsx";
import Pay from "../pages/User/Pay.jsx";
import Cart from "../pages/User/Cart.jsx";
import Video from "../pages/User/Video.jsx";
import Login from "../pages/User/Login.jsx";
import CreatePost from "../pages/User/CreatePost.jsx";
import EditPost from "../pages/User/EditPost.jsx";
import AdminLogin from "../pages/Admin/AdminLogin.jsx";
import CreateCourse from "../pages/Admin/CreateCourse.jsx";
import EditCourse from "../pages/Admin/EditCourse.jsx";
// import CreateCourse from 
function Dashboard() {
  return (
    <BrowserRouter basename="/">
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/post" element={<Post />} />
          <Route path="/course" element={<Course />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/video" element={<Video />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/create-post" element={<CreatePost />} /> 
          <Route path="/edit-post" element={<EditPost />} /> 

          {/* admin */}
          {/* <Route path="/admin/login" element={<AdminLogin />} /> 
          <Route path="/admin/create-course" element={<CreateCourse />} /> 
          <Route path="/admin/edit-course" element={<EditCourse />} />  */}

        </Routes>
      </div>
      <Routes>
          <Route path="/admin/login" element={<AdminLogin />} /> 
          <Route path="/admin/create-course" element={<CreateCourse />} /> 
          <Route path="/admin/edit-course" element={<EditCourse />} /> 
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Dashboard;
