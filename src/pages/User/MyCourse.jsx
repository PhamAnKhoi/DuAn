import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function MyCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/course"
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = response.data.courses;

        setCourses(coursesData);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
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
                    to={"/"}
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
