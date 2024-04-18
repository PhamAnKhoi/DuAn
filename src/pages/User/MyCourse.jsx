import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function MyCourse() {
  const [courses, setCourses] = useState([]);
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  } else {
    alert("Bạn cần đăng nhập để thực hiện chức năng này.");
    window.location.href = "/login";
  }
  
  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/course/purchased_courses/", {
        headers: {
          "Content-Type": "multipart/form-data", //upload file
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        // Cập nhật danh sách khóa học trong giỏ
        let cart_items = response.data;
        if (cart_items.status === true) {
          setCourses(cart_items.courses);
          // console.log(cart_items.  courses);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [user.access_token]);
  
  return (
    <div>
      <div className="container-fluid">
        <Header />
        <div className="row Sidebar">
          <Sidebar />
          <div className="col-lg-11 Course">
            <div className="custom-text">
              <span className="text-1">Khóa học của tôi</span>
            </div>
            <div className="row">
              {courses.map((course) => (
                <div key={course.id} className="col-lg-3 p-0 mb-2">
                  <Link
                    className="text-decoration-none"
                    to={"/video"}
                  >
                    <div className="create-border mx-1">
                      <img
                        className="img-item"
                        src={course.thumbnail}
                        alt={course.name}
                      />
                      <div className="name-course text-center">
                        {course.name}
                      </div>
                      <span className="price">
                        <span className="custom-icon-cart">
                          Xem video khóa học
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyCourse;
