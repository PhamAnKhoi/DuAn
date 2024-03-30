import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function ListPost() {
  const [posts, setPosts] = useState([]);
  // console.log(posts);

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  // useEffect(() => {
  //   axios
  //     .get("http://api.course-selling.id.vn/api/post/list-owned-posts")
  //     .then((response) => {
  //       setPosts(response.data.posts);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/post/list-owned-posts",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch posts");
        }

        const postsData = response.data;
        // console.log(postsData);
        setPosts(postsData.posts);
      } catch (error) {
        console.error("Error while fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user.access_token]);
  function handleEditPost(e) {
    console.log(e);
    window.location.href = `/admin/edit-post/${e}`;
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
                    <th className="col-1 text-center">STT</th>
                    <th className="col-2 text-center">Hình ảnh</th>
                    <th className="col-2 text-center">Tên bài viết</th>
                    <th className="col-3 text-center">Nội dung bài viết</th>
                    {/* <th className="col-1 text-center">Tác giả</th> */}
                    {/* <th className="col-1 text-center">Đã xem</th> */}
                    <th className="col-2 text-center">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={post.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          className="custom-img"
                          src={post.thumbnail}
                          alt=""
                        />
                      </td>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td>
                        <button>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button
                          value={post.id}
                          onClick={() => handleEditPost(post.id)}
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

export default ListPost;
