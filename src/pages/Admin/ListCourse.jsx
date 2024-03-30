import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function ListCourse() {
  const [courses, setCourses] = useState([]);

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
  function handleEditCourse(e) {
    console.log(e);
    window.location.href = `/admin/edit-course/${e}`;
  }
  return (
    <div className="Admin">
      <div className="container-fluid">
        <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="row">
            <div className="col-lg-3 p-0">
              <SidebarAdmin />
            </div>
            <div className="col custom-border-top">
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
                  {courses.map((course, index) => (
                    <tr key={course.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          className="custom-img"
                          src={course.thumbnail}
                          alt=""
                        />
                      </td>
                      <td>{course.name}</td>
                      <td>{course.price}</td>
                      <td>{course.description}</td>
                      <td>{course.creator}</td>
                      <td>
                        {course.views}
                        {"  "}
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </td>
                      <td>
                        <button>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCourse;
