import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
// import { Link } from "react-router-dom";

function ListCourse() {
  const [courses, setCourses] = useState('');
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
    // console.log(user.access_token);
  }
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
              "Content-Type": "multipart/form-data", //upload file
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = response.data;

        setCourses(coursesData.course);
        console.log(coursesData.course);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="Admin">
      <div className="container-scroller">
        <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="container-fluid page-body-wrapper">
            <SidebarAdmin />
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên bài viết</th>
                  <th>Giá khóa học</th>
                  <th>Nội dung bài viết</th>
                  <th>Tác giả</th>
                  <th>Trạng thái</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {/* {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={course.thumbnail} alt="" />
                    </td>
                    <td>{course.name}</td>
                    <td>{course.price}</td>
                    <td>{course.description}</td>
                    <td>{course.creator}</td>
                    <td>{course.status}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCourse;
