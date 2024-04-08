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
    // <div className="Admin">
    //    <div className="container-fluid p-0">
    //     <div className=" HeaderAdmin SidebarAdmin">
    //       <div className="row vh-100 mx-auto">
    //         <div className="col-lg-2 col-md-2 p-0">
    //           <SidebarAdmin page="listCourse" />
    //         </div>
    //         <div className="col">
    //           <HeaderAdmin page="2"/>
    //           <div className="custom-border-top list-course">
    //             <table className="table table-striped table-bordered">
    //               <thead>
    //                 <tr>
    //                   <th className="text-center">#</th>
    //                   <th className="text-center">Ảnh bìa</th>
    //                   <th className="text-center">Tên khóa học</th>
    //                   <th className="text-center">Giá (VNĐ)</th>
    //                   <th className="text-center col-4">Nội dung khóa học</th>
    //                   <th className="text-center">Tác giả</th>
    //                   <th className="text-center">Lượt xem</th>
    //                   <th className="text-center">Chức năng</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {currentCourses.map((course, index) => (
    //                   <tr key={course.id}>
    //                     <td>{getCourseIndex(index)}</td>
    //                     <td className="p-2 text-center">
    //                       <img
    //                         className="custom-img"
    //                         src={course.thumbnail}
    //                         alt=""
    //                       />
    //                     </td>
    //                     <td>{course.name}</td>
    //                     <td className="text-end">{Number(course.price).toLocaleString("vi")}</td>
    //                     <td>
    //                       <p style={{ height: "100px", overflow: "hidden" }}>
    //                         {course.description}
    //                       </p>
    //                     </td>
    //                     <td>{course.creator}</td>
    //                     <td className="text-center">
    //                       {course.views}
    //                       <i className="fa fa-eye ms-1" aria-hidden="true"></i>
    //                     </td>
    //                     <td className="text-center">
    //                       <button
    //                         className="btn btn-warning me-2"
    //                         onClick={() => handleDelete(course.id)}
    //                       >
    //                         <i
    //                           className="fa fa-eye-slash"
    //                           aria-hidden="true"
    //                         ></i>
    //                       </button>
    //                       <button
    //                         className="btn btn-success"
    //                         value={course.id}
    //                         onClick={() => handleEditCourse(course.id)}
    //                       >
    //                         <i className="fa fa-pencil" aria-hidden="true"></i>
    //                       </button>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //             <ReactPaginate
    //               activePage={currentPage}
    //               itemsCountPerPage={perPage}
    //               totalItemsCount={courses.length}
    //               pageRangeDisplayed={5}
    //               onChange={handlePageChange}
    //               itemClass="page-item"
    //               linkClass="page-link"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="Admin">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SidebarAdmin page="listCourse" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />

            <div className="custom-border-top list-course">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center">#</th>
                    <th className="text-nowrap text-center">Ảnh bìa</th>
                    <th className="text-nowrap text-center">Khóa học</th>
                    <th className="text-nowrap text-center">Giá (VNĐ)</th>
                    <th className="text-nowrap text-center col-4">
                      Nội dung khóa học
                    </th>
                    {/* <th className="text-nowrap text-center">Tác giả</th> */}
                    <th className="text-nowrap text-center">Lượt xem</th>
                    <th className="text-nowrap text-center">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course, index) => (
                    <tr key={course.id}>
                      <td>{getCourseIndex(index)}</td>
                      <td className="p-2 text-center">
                        <img
                          className="custom-img"
                          src={course.thumbnail}
                          alt=""
                        />
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div>Tên: {course.name}</div>
                          <div>Tạo bởi: {course.creator}</div>
                        </div>
                      </td>
                      <td className="text-end">
                        {Number(course.price).toLocaleString("vi")}
                      </td>
                      <td>
                        <p style={{ height: "100px", overflow: "hidden" }}>
                          {course.description}
                        </p>
                      </td>
                      {/* <td>{course.creator}</td> */}
                      <td className="text-center">
                        {course.views}
                        <i className="fa fa-eye ms-1" aria-hidden="true"></i>
                      </td>
                      <td className="text-center">
                        <div className="d-flex">
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
                        </div>
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
  );
}

export default ListCourse;
