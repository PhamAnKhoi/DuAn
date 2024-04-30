import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="col-lg-1">
      <div className="Sidebar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-1">
          <div className="col-lg custom-div height-header d-lg-none d-md-flex d-sm-flex d-flex">
            <Link className="custom-link" to={"/"}>
              <img className="logo me-3" src={logo} alt="" width={30} />
              <span className="custom-text">Học lập trình để đi làm</span>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleMenuToggle}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse${isMenuOpen ? " show" : ""}`}
          >
            <ul className="navbar-nav flex-column">
              {user &&
                (user.permission === "ADMIN" || user.permission === "TEACHER") && (
                  <li className="my-2">
                    <div className="custom-center custom-box-1">
                      <Link className="custom-link text-black" to={"/admin"}>
                        <i className="fa fa-user-tie custom-center custom-icon" aria-hidden="true"></i>
                        <p className="custom-center custom-text"><strong>ADMIN</strong></p>
                      </Link>
                    </div>
                  </li>
                )}
              <li className="my-2">
                <div className="custom-center custom-box-1">
                  <Link className="custom-link" to={"/"}>
                    <i
                      className="fa fa-home custom-center custom-icon"
                      aria-hidden="true"
                    ></i>
                    <p className="custom-center custom-text">Trang chủ</p>
                  </Link>
                </div>
              </li>
              <li className="my-2">
                <div className="custom-center custom-box-1">
                  <Link className="custom-link" to={"/progress"}>
                    <i
                      className="fa fa-road custom-center custom-icon"
                      aria-hidden="true"
                    ></i>
                    <p className="custom-center custom-text">Lộ trình</p>
                  </Link>
                </div>
              </li>
              <li className="my-2">
                <div className="custom-center custom-box-1">
                  <Link className="custom-link" to={"/post"}>
                    <i
                      className="fa fa-newspaper-o custom-center custom-icon"
                      aria-hidden="true"
                    ></i>
                    <p className="custom-center custom-text">Bài viết</p>
                  </Link>
                </div>
              </li>
              <li className="my-2">
                <div className="custom-center custom-box-1">
                  <Link className="custom-link" to={"/course"}>
                    <i
                      className="fa fa-graduation-cap custom-center custom-icon"
                      aria-hidden="true"
                    ></i>
                    <p className="custom-center custom-text">Khóa học</p>
                  </Link>
                </div>
              </li>
              <li className="my-2">
                <div className="custom-center custom-box-1">
                  <Link className="custom-link" to={"/my-course"}>
                    <i
                      className="fa fa-graduation-cap custom-center custom-icon"
                      aria-hidden="true"
                    ></i>
                    <p className="custom-center custom-text-my-course">Khóa học của tôi</p>
                  </Link>
                </div>
              </li>
              <li className="my-2">
                <div className="custom-center custom-box-1">
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
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;