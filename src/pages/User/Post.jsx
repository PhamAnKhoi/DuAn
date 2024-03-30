import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/post/")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const handleDelete = async (postId) => {
  //   const confirmDelete = window.confirm(
  //     "Bạn có chắc chắn muốn xóa bài viết này?"
  //   );

  //   if (confirmDelete) {
  //     try {
  //       const response = await axios.post(
  //         `http://api.course-selling.id.vn/api/post/delete/${postId}`
  //       );

  //       const { status, message } = response.data;

  //       if (status) {
  //         alert(message);
  //         setPosts((prevPosts) =>
  //           prevPosts.filter((post) => post.id !== postId)
  //         );
  //       } else {
  //         alert("Có lỗi xảy ra khi xóa bài viết");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       alert("Có lỗi xảy ra khi xóa bài viết");
  //     }
  //   }
  // };

  return (
    <div>
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-lg-11 Post">
            <div className="row">
              <div className="col-lg-11">
                <div className="text-div1">Bài viết nổi bật</div>
                <div className="text-div2">
                  Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình
                  online và các kỹ thuật lập trình web.
                </div>
                <div className="row">
                  <div className="col">
                    {posts.map((post) => (
                      <div key={post.id}>
                        <div className="row box">
                          <div className="text-div3">{post.title}</div>
                          <div className="col-lg-8">
                            <div className="my-3">{post.content}</div>
                            <div className="my-3">
                              Lượt yêu thích: {post.likes}
                            </div>
                            <div className="my-3">Lượt xem: {post.views}</div>
                            <div className="my-3">
                              Chỉnh sửa lần cuối:{" "}
                              {new Date(post.updated_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <img
                              className="img-content my-3"
                              src={post.thumbnail}
                              alt="thumbnail"
                            />
                          </div>
                          <div className="text-div-a">
                            <span className="custom-div">Ngôn ngữ</span>
                            <span className="item-1">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <span className="item-1">Tác giả</span>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Post;
