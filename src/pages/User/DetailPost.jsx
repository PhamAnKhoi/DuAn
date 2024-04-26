import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "./logo.png";
import ReactPaginate from "react-js-pagination";

function DetailPost() {
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const createdDate = new Date(post.created_at);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());
  const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));
  let param = useParams();
  let postId = param.postId;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }

  //Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [inputValue, setInputValue] = useState("");
  const handleSendReview = () => {
    // console.log('inputValue');
    axios
      .post(
        "http://api.course-selling.id.vn/api/post/comment/" + postId,
        {
          content: inputValue,
          post_id: postId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        window.location.href = "/detail-post/" + post.id;
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/post/" + postId)
      .then((response) => {
        setPost(response.data.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
    axios
      .get("http://api.course-selling.id.vn/api/post/")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  return (
    <div>
      <div className="container-fluid">
        <Header />
        <div className="row Sidebar">
          <Sidebar />
          <div className="col-lg-11 detail-post">
            <div className="row">
              <div className="col-lg-8">
                <div className="text-div1">{post.title}</div>
                <div className="author-container mt-2">
                  <img className="img-logo" src={logo} alt="" />
                  <div className="author-info">
                    <div>Tác giả: {post.creator}</div>
                    <div>{daysPassed} ngày trước</div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="me-5">
                    Lượt xem: {Number(post.views).toLocaleString("vi")}{" "}
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                  <span className="">
                    Lượt yêu thích: {Number(post.likes).toLocaleString("vi")}{" "}
                    <i className="fa fa-heart text-danger" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="mt-2">
                  Chỉnh sửa lần cuối:{" "}
                  {new Date(post.updated_at).toLocaleDateString()}
                </div>
                <div className="col-lg-6 m-auto">
                  <div>
                    <img className="img-propose" src={post.thumbnail} alt="" />
                  </div>
                </div>
                <div className="text-div5 mt-4">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post.content,
                    }}
                  />
                </div>
                <div className="evaluation">
                  <div className="text-div5">Phản hồi của học viên</div>
                  <div>
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
                  {currentComments.map((item) => (
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
                    totalItemsCount={comments.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              </div>
              <div className="col border-top-none">
                <div className="mb-2" style={{ marginTop: "30px" }}>
                  <div className="text-div1">Các bài viết mới</div>
                  {posts.slice(-15).map((post) => (
                    <div key={post.id}>
                      <div className="row">
                        <Link
                          className="text-decoration-none"
                          to={"/detail-post/" + post.id}
                        >
                          <div className="form-control box-title">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: post.title,
                              }}
                            />
                          </div>
                        </Link>
                      </div>
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

export default DetailPost;
