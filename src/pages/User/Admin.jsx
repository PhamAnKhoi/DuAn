import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Progress from './Progress';
// import Post from "./Post";
// import Course from "./Course";
// import Cart from "./Cart";
// import Pay from "./Pay";
import Header from "./Header.jsx";
import  Sidebar  from './Sidebar.jsx';
import Home from "./Home.jsx";
import Footer from "./Footer.jsx";


function Admin() {
  return (
    // <div>
    //   {/* <div><Header /></div> */}
    //   <div className="container-fluid">
    //     <div className="row Sidebar Home">
    //       <Sidebar /> <Home />
    //     </div>
    //   </div>
    //   {/* <div><Footer /></div> */}
    //   {/* <div><Progress /></div> */}
    //   <div>
    //     {/* <Post /> */}
    //     {/* <Course /> */}
    //     {/* <Pay /> */}
    //   </div>
    // </div>
    <BrowserRouter basename="/">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Admin;
