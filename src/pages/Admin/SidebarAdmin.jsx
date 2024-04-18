import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const SidebarAdmin = ({ page = "/" }) => {
  if (Cookies.get("user") === undefined) {
    window.location.href = "/login";
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setIsLoggedIn(true);
      setUserData(user.data);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData(null);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start p-0 text-white min-vh-100">
        <Link
          to={"/admin"}
          className="text-dark text-decoration-none d-block text-center w-100 p-2"
        >
          <span className="fs-5 d-none d-sm-inline text-dark fw-medium text-center">
            Quản lí Website
          </span>
        </Link>
        <ul
          className="nav nav-pills flex-column align-items-center align-items-sm-start w-100"
          id="menu"
        >
          <li className="nav-item w-100">
            <Link
              to={"/admin"}
              className={`nav-link px-0 align-middle ps-2 ${
                page === "/" ? "active" : ""
              }`}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span className="ms-1 d-none d-sm-inline">Bảng điều khiển</span>
            </Link>
          </li>
          <span className="hr-tag"></span>
          <li className="nav-item w-100">
            <Link
              to={"/admin/create-course"}
              className={`nav-link px-0 align-middle ps-2 ${
                page === "createCourse" ? "active" : ""
              }`}
            >
              <i className="fas fa-book"></i>
              <span className="ms-1 d-none d-sm-inline">Tạo khóa học</span>
            </Link>
          </li>
          <li className="nav-item w-100">
            <Link
              to={"/admin/list-course"}
              className={`nav-link px-0 align-middle ps-2 ${
                page === "listCourse" ? "active" : ""
              }`}
            >
              <i className="fas fa-list"></i>
              <span className="ms-1 d-none d-sm-inline">
                Danh sách khóa học
              </span>
            </Link>
          </li>
          <span className="hr-tag"></span>
          <li className="nav-item w-100">
            <Link
              to={"/admin/create-post"}
              className={`nav-link px-0 align-middle ps-2 ${
                page === "createPost" ? "active" : ""
              }`}
            >
              <i className="fas fa-blog"></i>
              <span className="ms-1 d-none d-sm-inline">Tạo bài viết</span>
            </Link>
          </li>
          <li className="nav-item w-100">
            <Link
              to={"/admin/list-post"}
              className={`nav-link px-0 align-middle ps-2 ${
                page === "listPost" ? "active" : ""
              }`}
            >
              <i className="fas fa-clipboard-list"></i>
              <span className="ms-1 d-none d-sm-inline">
                Danh sách bài viết
              </span>
            </Link>
          </li>
          <span className="hr-tag"></span>
          <li className="nav-item w-100">
            <Link
              to={"/admin/list-account"}
              className={`nav-link px-0 align-middle ps-2 ${
                page === "listUser" ? "active" : ""
              }`}
            >
              <i className="fas fa-users"></i>
              <span className="ms-1 d-none d-sm-inline">Tài khoản</span>
            </Link>
          </li>
        </ul>
        <span className="hr-tag"></span>
        {isLoggedIn ? (
          <>
            <div className="dropdown mt-2">
              <a
                href="/admin"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://web2web.fr/wp-content/uploads/2016/09/demo.webmaster541295de29059.png"
                  alt=""
                  width="30"
                  height="30"
                  className="rounded-circle me-2"
                />
                <span className="d-none text-black d-sm-inline mx-1">
                  <strong>{userData && userData.username}</strong>
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" href="/admin">
                    Đổi mật khẩu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/admin">
                    Thông tin tài khoản
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={handleLogout}
                    href="/admin"
                  >
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : null}
          <li className="nav-item w-100 mt-3">
            <Link to={"/"}>
              <button className="btn btn-primary">
              <span className="ms-1 d-none d-sm-inline">Quay về trang User</span>
              </button>
            </Link>
          </li>
      </div>
    </>
  );
};

export default SidebarAdmin;
