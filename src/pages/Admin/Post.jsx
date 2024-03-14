import React from "react";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";

function Post() {
  return (
    <div className="row">
      <Sidebar />
      <div className="col-lg-11 Post">
        <div className="row">
          <div className="col-lg-11">
            <div className="text-div1">Bài viết nổi bật 
            <a className="custom-link">
            <Link to={"/create-post"}>
                <p className="custom-center custom-text">Create-Post</p>
              </Link>
            </a>
            </div>
            <div className="text-div2">
              Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình
              online và các kỹ thuật lập trình web.
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="row box">
                  <div className="col-lg-8">
                    <div className="text-div3">
                      Authentication & Authorization trong ReactJS
                    </div>
                    <div className="my-3">
                      Authentication và Authorization là một phần quan trọng
                      trong việc phát triển phần mềm, giúp chúng ta xác thực
                      và phân quyền...
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <img
                      className="img-content"
                      src="https://files.fullstack.edu.vn/f8-prod/blog_posts/7242/64424fe6e225f.jpg"
                      alt=""
                    />
                  </div>
                  <div className="text-div-a">
                    <span className="custom-div">Ngôn ngữ</span>
                    <span className="item-1">Thời gian</span>
                    <span className="item-1">Tác giả</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 mx-3">
                <div className="title-1">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</div>
                <div>
                  <div className="custom-div">Front-end / Mobile</div>
                  <div className="custom-div">UX / UI / Design</div>
                  <div className="custom-div">Back-end / Devops</div>
                  <div className="custom-div">Others</div>
                </div>
                <div>
                  <img
                    className="img-propose"
                    src="https://files.fullstack.edu.vn/f8-prod/banners/25/63dc61d4caec2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
