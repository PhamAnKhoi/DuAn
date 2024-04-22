import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import ReactPaginate from "react-js-pagination";
import { Link } from "react-router-dom";

function Post() {
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const postsPerPage = 3;

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

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
                    {currentPosts.map((post) => (
                      <div key={post.id}>
                        <div className="row box">
                          <div className="text-div3">
                            <Link
                              className="custom-decoration"
                              to={"/detail-post/" + post.id}
                            >
                              {post.title}
                            </Link>
                          </div>
                          <div className="col-lg-8">
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  post.content.length > 499
                                    ? post.content.substring(0, 700)
                                    : post.content,
                              }}
                            />
                            {post.content.length > 499 && (
                              <span>
                                <Link
                                  className="custom-decoration"
                                  to={"/detail-post/" + post.id}
                                >
                                  <span> ...Xem thêm</span>
                                </Link>
                              </span>
                            )}
                          </div>
                          <div className="col-lg-4">
                            <Link
                              className="custom-decoration"
                              to={"/detail-post/" + post.id}
                            >
                              <img
                                className="img-content"
                                src={post.thumbnail}
                                alt="thumbnail"
                              />
                            </Link>
                          </div>
                          <div className="text-div-a">
                            <span className="custom-div">
                              <strong>{post.creator}</strong>
                            </span>
                            <span className="custom-div ms-2">
                              Ngày viết:{" "}
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="pagination-container custom-paginate">
              <ReactPaginate
                activePage={activePage}
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
      <Footer />
    </div>
  );
}

export default Post;
