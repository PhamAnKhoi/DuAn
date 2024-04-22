import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "./logo.png";

function DetailPost() {
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const createdDate = new Date(post.created_at);
  const currentDate = new Date();

  const monthsPassed =
    (currentDate.getFullYear() - createdDate.getFullYear()) * 12 +
    (currentDate.getMonth() - createdDate.getMonth());
  let param = useParams();
  let postId = param.postId;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }

  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/post/" + postId)
      .then((response) => {
        setPost(response.data.data);
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
                    <div>{monthsPassed} tháng trước</div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="me-5">
                    Lượt xem: {Number(post.views).toLocaleString("vi")}{" "}
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                  <span className="">
                    Lượt yêu thích: {Number(post.likes).toLocaleString("vi")}{" "}
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
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
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Đánh giá của tôi"
                        />
                      </div>
                      <button className="btn btn-primary">Gửi đánh giá</button>
                    </div>
                  </div>
                </div>
                <div className="comment mt-4">
                  <div className="text-div6">Đánh giá</div>
                  <div className="row border-bottom">
                    <div className="col-lg-1">
                      <img
                        className="img-comment"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2NrzklKfv3rlFqGQXsGpTZfrY2Obu0cvSvvmVPMf3Xg&s"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-3">
                      <div>Khôi</div>
                      <div>
                        <span>1 tháng trước</span>
                      </div>
                      <div className="mb-3">Nội dung comment</div>
                    </div>
                  </div>
                  <div className="row border-bottom">
                    <div className="col-lg-1">
                      <img
                        className="img-comment"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2NrzklKfv3rlFqGQXsGpTZfrY2Obu0cvSvvmVPMf3Xg&s"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-3">
                      <div>Khôi</div>
                      <div>
                        <span>1 tháng trước</span>
                      </div>
                      <div className="mb-3">Nội dung comment</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col border-left">
                <div style={{ marginTop: "30px" }}>
                  <div className="text-div1">Các bài viết mới</div>
                  {posts.slice(-15).map((post) => (
                    <div key={post.id}>
                      <div className="row">
                        <Link
                          className="text-decoration-none"
                          to={"/detail-post/" + post.id}
                        >
                          <div className="form-control box-title">
                            {/* {post.title} */}
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
