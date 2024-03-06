import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Admin/Home.jsx";
import Post from "../pages/Admin/Post.jsx";
import Header from "../pages/Admin/Header.jsx";
import Footer from "../pages/Admin/Footer.jsx";
import Progress from "../pages/Admin/Progress.jsx";
import Course from "../pages/Admin/Course.jsx";
import Pay from "../pages/Admin/Pay.jsx";
import Cart from "../pages/Admin/Cart.jsx";
import Video from "../pages/Admin/Video.jsx";
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
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default Dashboard;
