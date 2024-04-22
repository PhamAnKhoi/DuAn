import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "./logo.png";

function DetailPost() {
  const [post, setPost] = useState([]);
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
                <div className="text-div5 mt-4">{post.content}</div>
              </div>
              <div className="col-lg-4">
                <div>
                  <img className="img-propose" src={post.thumbnail} alt="" />
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
