import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import ReactPaginate from "react-js-pagination";
import axios from "axios";

function Course() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <div className="container-fluid">
        <Header />
        <div className="row Sidebar">
          <Sidebar />
          <div className="col-lg-11  Course">
            <div className="custom-text">
              <span className="text-1">Khóa học miễn phí</span>
            </div>
            <div className="row">
              {paginatedCourses.map((course) => (
                <div key={course.id} className="col-lg-3 p-0 mb-2">
                  <Link
                    className="text-decoration-none"
                    to={"/detail-course/" + course.id}
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
                        <span className="me-auto">
                          {Number(course.price).toLocaleString("vi")} VND
                        </span>
                        <span className="custom-icon-cart">
                          Thêm vào giỏ hàng
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="custom-paginate">
              <ReactPaginate
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={courses.length}
                pageRangeDisplayed={5}
                onChange={setCurrentPage}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Course;
