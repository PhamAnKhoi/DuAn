import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice.jsx";
import ReactPaginate from "react-js-pagination";

function DetailCourse() {
  const [collapsed, setCollapsed] = useState(Array(99).fill(true));
  const [allCollapsed, setAllCollapsed] = useState(true);
  const [course, setCourse] = useState([]);
  const [sessions, setSessions] = useState([]);
  //Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let param = useParams();
  let courseId = param.courseId;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [ratings, setRating] = useState([]);
  const [valueRating, setRatingHandle] = useState(0);
  const [ratingValue, setRatingValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const handleSendReview = () => {
    axios
      .post(
        "http://api.course-selling.id.vn/api/course/rating-course/" + courseId,
        {
          rating: ratingValue,
          content: inputValue,
          course_id: courseId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        window.location.href = "/detail-course/" + course.id;
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleRating = (value) => {
    setRatingHandle(value);
    setRatingValue(value);
  };

  //end shownoti
  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/course/" + courseId)
      .then((response) => {
        setCourse(response.data.data);
        setSessions(response.data.sessions);
        setRating(response.data.ratings);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = ratings.slice(startIndex, endIndex);

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
                <div className="text-div2">
                  <span
                    dangerouslySetInnerHTML=
                    {
                      {
                        __html: course.description
                      }
                    }
                    >
                  </span>
                  {/* {{  }} */}
                </div>
                <div className="text-div3">
                  Lượt xem: {Number(course.views).toLocaleString("vi")}{" "}
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </div>
                <div className="text-div5">Nội dung khóa học</div>
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
                            <span className="right color-text">
                              {session.lessons.length}
                            </span>
                          </button>
                          <ul
                            className={`my-list ${
                              collapsed[index] ? "collapsed" : ""
                            } lesson-list`}
                          >
                            {session.lessons.map((lesson) => (
                              <li
                                className="margin-top-bottom cursor pointer color-text"
                                key={"ls" + lesson.lession_id}
                              >
                                {/* {session.session_arrange} */}
                                {/* {". "} */}
                                {lesson.lession_name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  "Không có nội dung"
                )}
                <div className="evaluation">
                  <div className="text-div5">Phản hồi của học viên</div>
                  <div>
                    <div>Đánh giá: {valueRating} sao</div>
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <Link
                          key={starValue}
                          className={`star ${
                            starValue <= ratingValue ? "active" : ""
                          } text-decoration-none`}
                          onClick={() => handleRating(starValue)}
                        >
                          &#9733;
                        </Link>
                      );
                    })}
                    <div>
                      <div className="my-2 col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Đánh giá của tôi"
                          value={inputValue}
                          onChange={handleInput}
                        />
                      </div>
                      <button
                        className="btn bg-btn"
                        onClick={handleSendReview}
                      >
                        Gửi đánh giá
                      </button>
                    </div>
                  </div>
                </div>
                <div className="comment mt-4">
                  <div className="text-div6">Đánh giá</div>
                  {currentItems.map((item) => (
                    <div className="row mt-4" key={item.id}>
                      <div className="col-lg-1 border-bottom">
                        <img className="img-comment" src={item.avata} alt="" />
                      </div>
                      <div className="col-lg-10 border-bottom">
                        <div>
                          <strong>{item.user}</strong>
                          <span className="ms-2 span-date">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div></div>
                        <div>
                          {Array.from({ length: item.rating }, (_, index) => (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          ))}
                        </div>
                        <div className="mb-3">{item.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="custom-paginate">
                  <ReactPaginate
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={ratings.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </div>
              <div className="col-lg border-top-none">
                <div>
                  <img className="img-propose" src={course.thumbnail} alt="" />
                  {/* <video className="img-propose" src={course.video_demo_url}></video> */}
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

export default DetailCourse;
