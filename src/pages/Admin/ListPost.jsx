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
       <div className="container-fluid p-0">
        <div className=" HeaderAdmin SidebarAdmin">
          <div className="row vh-100 mx-auto">
            <div className="col-lg-2 col-md-2 p-0">
              <SidebarAdmin page="listPost" />
            </div>
            <div className="col">
              <HeaderAdmin />
              <div className="custom-border-top list-post">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Hình ảnh</th>
                      <th className="text-center">Tên bài viết</th>
                      <th className="text-center col-5">Nội dung bài viết</th>
                      <th className="text-center">Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr className="text-center" key={post.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            className="custom-img"
                            src={post.thumbnail}
                            alt=""
                          />
                        </td>
                        <td>{post.title}</td>
                        <td>
                          <p style={{ height: "100px", overflow: "hidden" }}>
                            {post.content}
                          </p>
                        </td>
                        <td className="text-center ">
                          <div className="d-flex align-items-center">
                            <button className="btn btn-warning me-2">
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                            <button
                              className="btn btn-success"
                              value={post.id}
                              onClick={() => handleEditPost(post.id)}
                            >
                              <i className="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                          </div>
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
    </div>
  );
}

export default ListPost;
