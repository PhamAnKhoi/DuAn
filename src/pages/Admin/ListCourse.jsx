import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import ReactPaginate from "react-js-pagination";

function ListCourse() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Số lượng khóa học hiển thị trên mỗi trang

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
  }
  // console.log(user);
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/course/list-owned-courses",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = response.data;

        setCourses(coursesData.course);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user.access_token]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  function handleEditCourse(e) {
    console.log(e);
    window.location.href = `/admin/edit-course/${e}`;
  }
  async function handleDelete(courseId) {
    // console.log(courseId);
    try {
      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/delete/" + courseId,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        alert("Bạn sẽ ẩn khóa học này");
        window.location.href = "/admin/list-course";
        // console.log("Course deleted successfully");
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error while deleting course:", error);
    }
  }

  const indexOfLastCourse = currentPage * perPage;
  const indexOfFirstCourse = indexOfLastCourse - perPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const getCourseIndex = (index) => {
    const currentCourseIndex = indexOfFirstCourse + index + 1;
    return currentCourseIndex;
  };
  return (
    <div className="Admin">
      <div className="container-fluid">
        <div className=" HeaderAdmin SidebarAdmin">
          <div className="row vh-100">
            <div className="col-lg-3 p-0">
              <SidebarAdmin />
            </div>
            <div className="col-lg-9">
              <HeaderAdmin />
              <div className="custom-border-top list-course">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="col-0 text-center">STT</th>
                      <th className="col-2 text-center">Hình ảnh</th>
                      <th className="col-2 text-center">Tên bài viết</th>
                      <th className="col-1 text-center">Giá</th>
                      <th className="col-3 text-center">Nội dung bài viết</th>
                      <th className="col-1 text-center">Tác giả</th>
                      <th className="col-1 text-center">Đã xem</th>
                      <th className="col-2 text-center">Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCourses.map((course, index) => (
                      <tr key={course.id}>
                        <td>{getCourseIndex(index)}</td>
                        <td>
                          <img
                            className="custom-img"
                            src={course.thumbnail}
                            alt=""
                          />
                        </td>
                        <td>{course.name}</td>
                        <td>{course.price}</td>
                        <td>
                          <p style={{ height: "100px", overflow: "hidden" }}>
                            {course.description}
                          </p>
                        </td>
                        <td>{course.creator}</td>
                        <td>
                          {course.views}
                          {"  "}
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning me-2"
                            onClick={() => handleDelete(course.id)}
                          >
                            <i
                              className="fa fa-eye-slash"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-success"
                            value={course.id}
                            onClick={() => handleEditCourse(course.id)}
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
                  activePage={currentPage}
                  itemsCountPerPage={perPage}
                  totalItemsCount={courses.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCourse;
