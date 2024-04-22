import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice.jsx";

function Course() {
  const [collapsed, setCollapsed] = useState(Array(99).fill(true));
  const [allCollapsed, setAllCollapsed] = useState(true);
  const [course, setCourse] = useState([]);
  const [sessions, setSessions] = useState([]);

  let param = useParams();
  let courseId = param.courseId;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }
  // console.log(user);
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

//   const handleAddComment = () => {
//     if (newComment.trim() !== "") {
//       setComments([...comments, newComment]);
//       setNewComment("");
//     }
//   };
  //end shownoti
  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/course/" + courseId)
      .then((response) => {
        setCourse(response.data.data);
        setSessions(response.data.sessions);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [courseId]);

  const addToCart = (id) => {
    var user = Cookies.get("user");
    if (user !== undefined) {
      user = JSON.parse(user);
    } else {
      // alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      setShowToast(true);
      setToastMessage("Bạn cần đăng nhập để thực hiện chức năng này.");
      setToastVariant("warning");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
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
        // alert(response.data.message);
        // console.log(response.data);
        setShowToast(true);
        setToastMessage(response.data.message);
        let variant = response.data.status === true ? "success" : "danger";
        setToastVariant(variant);
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage("Có xẩy ra lỗi khi thêm sản phẩm vào giỏ hàng");
        setToastVariant("danger");
        console.error("Error to add item:", error);
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
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
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
                  Lượt xem: {Number(course.views).toLocaleString("vi")}{" "}
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </div>
                <div className="text-div5">Nội dung khóa học</div>
                {/* <button className="custom-button" onClick={toggleCollapseAll}>
                  {allCollapsed ? "Mở rộng tất cả" : "Thu nhỏ tất cả"}
                </button>
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
                </div> */}
                {sessions.length !== 0 ? (
                  <div className="w-full">
                    <button
                      className="custom-button"
                      onClick={toggleCollapseAll}
                    >
                      {allCollapsed ? "Mở rộng tất cả" : "Thu nhỏ tất cả"}
                    </button>
                    <div>
                      {sessions.map((session, index) => (
                        <div key={session.session_id}>
                          <button
                            className="custom-button-item"
                            onClick={() => toggleCollapse(index)}
                          >
                            <div className="div-css-left">
                              <span className="custom-span-icon">
                                {collapsed[index] ? "\u002B" : "\u2212"}
                              </span>
                              <span>{session.session_name}</span>
                            </div>
                            <span className="right">
                              {session.lessons.length}
                            </span>
                          </button>
                          <ul
                            className={`my-list ${
                              collapsed[0] ? "collapsed" : ""
                            } lesson-list`}
                          >
                            {session.lessons.map((lesson) => (
                              <li className="margin-top-bottom cursor pointer" key={'ls' + lesson.lession_id}>
                                {lesson.lession_name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                    </div>
                  </div>
                ) : (
                  "Dell có nội dung"
                )}
                <div className="evaluation">
                  <div className="text-div5">Đánh giá khóa học</div>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        <span className="star">&#9733;</span>
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 margin-top">
                <div>
                  <img className="img-propose" src={course.thumbnail} alt="" />
                </div>
                <div>
                  <div className="custom-div-1">
                    {Number(course.price).toLocaleString("vi")} VND
                  </div>
                  <div
                    className="custom-div-2 m-auto"
                    onClick={() => addToCart(courseId)}
                  >
                    <a href="/cart" className="text-white text-decoration-none">
                      Thêm vào giỏ hàng
                    </a>
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
