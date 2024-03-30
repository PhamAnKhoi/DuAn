import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const limit = 8;
        const response = await axios.get(
          `http://api.course-selling.id.vn/api/course?sort=["created_at","desc"]&limit=${limit}`
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
        <div className="row">
          <Sidebar />
          <div className="col-lg-11">
            <div className="Home">
              <div className="container-fluid my-2">
                <div className="row box">
                  <div className="col-lg-6 custom-box">
                    <h2>
                      <a href="/#">Học HTML CSS cho người mới</a>
                    </h2>
                    <p className="text-slide">
                      Hình thức học Offline phù hợp nếu bạn muốn được hướng dẫn
                      và hỗ trợ trực tiếp tại lớp. Giờ học linh hoạt, phù hợp cả
                      sinh viên và người đi làm.
                    </p>
                    <button>Tham gia ngay</button>
                  </div>
                  <div className="col-lg-6">
                    <img
                      className="img-banner"
                      src="https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="custom-text">
                  <span className="text-1">Khóa học Pro</span>
                  <span className="text-2">Mới</span>
                  <span className="btn btn-secondary float-right">
                    <Link to={"/course"} className="text-white">
                      Xem tất cả khóa học
                    </Link>
                  </span>
                </div>
                <div className="row">
                  {courses.map((course) => (
                    <div key={course.id} className="col-lg-3">
                      <Link to={"/course/" + course.id}>
                        <div>
                          <img
                            className="img-item"
                            src={course.thumbnail}
                            alt={course.name}
                          />
                          <div className="name-course">{course.name}</div>
                          <span className="price">{course.price}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
