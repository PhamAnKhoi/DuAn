import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Course() {
  const [collapsed, setCollapsed] = useState(Array(99).fill(true));
  const [allCollapsed, setAllCollapsed] = useState(true);
  const [course, setCourse] = useState([]);
  let param = useParams();
  let courseId = param.courseId;
  console.log(course);

  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/course/" + courseId)
      .then((response) => {
        // Cập nhật danh sách khóa học
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [courseId]);
  // Gửi yêu cầu GET đến API

  const addToCart = (id) => {
    var user = Cookies.get("user");
    if (user !== undefined) {
      user = JSON.parse(user);
    } else {
      alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      window.location.href = "/login";
    }
    axios
      .post(
        `http://api.course-selling.id.vn/api/cart/add-item/${id}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        // handle response
        // console.log(response.data);
        alert(response.data.message);
      })
      .catch((error) => {
        // handle error
        console.error("Error removing item:", error);
      });
  };
  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !collapsed[index];
    setCollapsed(updatedCollapsed);
  };

  const toggleCollapseAll = () => {
    const updatedCollapsed = collapsed.map(() => !allCollapsed);
    setCollapsed(updatedCollapsed);
    setAllCollapsed(!allCollapsed);
  };
  return (
    <div>
      <div className="container-fluid">
        <Header />
        <div className="row Sidebar">
          <Sidebar />
          <div className="col-lg-11 Course">
            <div className="row">
              <div className="col-lg-8">
                <div className="text-div1">{course.name}</div>
                <div className="text-div2">{course.description}</div>
                <div className="text-div3">
                  Lượt xem: {course.views}{" "}
                  <i className="fa fa-users" aria-hidden="true"></i>
                </div>
                <div className="text-div5">Nội dung khóa học</div>
                <div className="d-flex">
                  <span>
                    <strong>4</strong> chương
                  </span>
                  <span> - </span>
                  <span>
                    <strong>4</strong> bài học
                  </span>
                  <span> - </span>
                  <span>
                    <strong>100</strong> phút
                  </span>
                  <span className="ml-auto">
                    <button
                      className="custom-button"
                      onClick={toggleCollapseAll}
                    >
                      {allCollapsed ? "Mở rộng tất cả" : "Thu nhỏ tất cả"}
                    </button>
                  </span>
                </div>
                <div>
                  <div>
                    <button
                      className="custom-button-item"
                      onClick={() => toggleCollapse(0)}
                    >
                      <div className="div-css-left">
                        <span className="custom-span-icon">
                          {collapsed[0] ? "\u002B" : "\u2212"}
                        </span>
                        <span>Khái niệm kỹ thuật cần biết</span>
                      </div>
                      <span className="right">Số bài học</span>
                    </button>
                    <ul
                      className={`my-list ${collapsed[0] ? "collapsed" : ""}`}
                    >
                      <li className="margin-top-bottom">
                        1. Mô hình Client - Server là gì?
                      </li>
                      <li className="margin-top-bottom">
                        2. Domain là gì? Tên miền là gì?
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      className="custom-button-item"
                      onClick={() => toggleCollapse(1)}
                    >
                      <div className="div-css-left">
                        <span className="custom-span-icon">
                          {collapsed[1] ? "\u002B" : "\u2212"}
                        </span>
                        <span>Khái niệm kỹ thuật cần biết</span>
                      </div>
                      <span className="right">Số bài học</span>
                    </button>
                    <ul
                      className={`my-list ${collapsed[1] ? "collapsed" : ""}`}
                    >
                      <li className="margin-top-bottom">
                        1. Mô hình Client - Server là gì?
                      </li>
                      <li className="margin-top-bottom">
                        2. Domain là gì? Tên miền là gì?
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      className="custom-button-item"
                      onClick={() => toggleCollapse(2)}
                    >
                      <div className="div-css-left">
                        <span className="custom-span-icon">
                          {collapsed[2] ? "\u002B" : "\u2212"}
                        </span>
                        <span>Khái niệm kỹ thuật cần biết</span>
                      </div>
                      <span className="right">Số bài học</span>
                    </button>
                    <ul
                      className={`my-list ${collapsed[2] ? "collapsed" : ""}`}
                    >
                      <li className="margin-top-bottom">
                        1. Mô hình Client - Server là gì?
                      </li>
                      <li className="margin-top-bottom">
                        2. Domain là gì? Tên miền là gì?
                      </li>
                      <li className="margin-top-bottom">
                        3. Domain là gì? Tên miền là gì?
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 margin-top">
                <div>
                  <img className="img-propose" src={course.thumbnail} alt="" />
                </div>
                <div>
                  <div className="custom-div-1">{course.price} VND</div>
                  <Link to={"/video"} className="text-decoration-none">
                    <div className="custom-div-2 m-auto">Đăng ký học</div>
                  </Link>
                  <div
                    className="custom-div-2 m-auto"
                    onClick={() => addToCart(courseId)}
                  >
                    Thêm vào giỏ hàng
                  </div>
                  <div className="custom-div">
                    <div>
                      <i
                        className="fa fa-level-up size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Trình độ cơ bản</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-film size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Kho kiến thức vững chắc</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-clock-o size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Thời gian học linh hoạt</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-battery-full size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Học mọi lúc mọi nơi</span>
                    </div>
                  </div>
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

export default Course;
