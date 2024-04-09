import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  var user = Cookies.get("user");
  // var showCreatePost = null;
  if (user !== undefined) {
    user = JSON.parse(user);
    // showCreatePost = user.permission;
    // console.log(user.permission);
  }
  return (
    <div className="col-lg-1">
      <div className="Sidebar">
        <ul className="list-unstyled">
          {user &&
            (user.permission === "ADMIN" || user.permission === "TEACHER") && (
              <li className="custom-center my-2">
                <div className="custom-box-1">
                  <Link className="custom-link text-black" to={"/admin"}>
                    <i
                      className="fa fa-plus custom-center custom-icon"
                      aria-hidden="true"
                    ></i>
                    <p className="custom-center custom-text">Trang ADMIN</p>
                  </Link>
                </div>
              </li>
            )}
          <li className="custom-center my-2">
            <div className="custom-box-1">
              <Link className="custom-link" to={"/"}>
                <i
                  className="fa fa-home custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Trang chủ</p>
              </Link>
            </div>
          </li>
          <li className="custom-center my-2">
            <div className="custom-box-1">
              <Link className="custom-link" to={"/progress"}>
                <i
                  className="fa fa-road custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Lộ trình</p>
              </Link>
            </div>
          </li>
          <li className="custom-center my-2">
            <div className="custom-box-1">
              <Link className="custom-link" to={"/post"}>
                <i
                  className="fa fa-newspaper-o custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Bài viết</p>
              </Link>
            </div>
          </li>
          <li className="custom-center my-2">
            <div className="custom-box-1">
              <Link className="custom-link" to={"/course"}>
                <i
                  className="fa fa-graduation-cap custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Khóa học</p>
              </Link>
            </div>
          </li>
          <li className="custom-center my-2">
            <div className="custom-box-1">
              <Link className="custom-link" to={"/my-course"}>
                <i
                  className="fa fa-graduation-cap custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text-my-course">Khóa học của tôi</p>
              </Link>
            </div>
          </li>
          <li className="custom-center my-2">
            <div className="custom-box-1">
              <Link className="custom-link" to={"/cart"}>
                <i
                  className="fa fa-cart-plus custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Giỏ hàng</p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
