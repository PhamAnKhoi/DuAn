import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import ReactPaginate from "react-js-pagination";
import ToastMessage from "../../components/notifice";

function ListPost() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  async function handleDelete(postId) {
    try {
      const response = await axios.post(
        "http://api.course-selling.id.vn/api/post/delete/" + postId,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      if (response.data.status) {
        setShowToast(true);
        setToastMessage("Bạn đã xóa bài viết này");
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = "/admin/list-post";
        }, 1500);
      } else {
        setShowToast(true);
        setToastMessage("Có lỗi trong quá trình xóa bài viết");
        setToastVariant("danger");
      }
    } catch (error) {
      console.error("Error while deleting course:", error);
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="Admin">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SidebarAdmin page="listPost" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />

            <div className="custom-border-top list-post">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center">#</th>
                    <th className="text-nowrap text-center col-lg-3">
                      Hình ảnh
                    </th>
                    <th className="text-nowrap text-center col-lg-3">
                      Tên bài viết
                    </th>
                    <th className="text-nowrap text-center col-lg-5">
                      Nội dung bài viết
                    </th>
                    <th className="text-nowrap text-center">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((post, index) => (
                    <tr className="text-center" key={post.id}>
                      <td>{(currentPage - 1) * postsPerPage + index + 1}</td>
                      <td>
                        <img
                          className="custom-img"
                          src={post.thumbnail}
                          alt=""
                        />
                      </td>
                      <td>{post.title}</td>
                      <td>
                        <p
                          style={{
                            height: "100px",
                            maxWidth: "455px",
                            overflow: "hidden",
                          }}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: post.content,
                            }}
                          />
                        </p>
                      </td>
                      <td className="text-center ">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn bg-btn me-2"
                            onClick={() => handleDelete(post.id)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                          <button
                            className="btn bg-btn"
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
              <div className="custom-paginate">
                <ReactPaginate
                  activePage={currentPage}
                  itemsCountPerPage={postsPerPage}
                  totalItemsCount={posts.length}
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
    </div>
  );
}

export default ListPost;
