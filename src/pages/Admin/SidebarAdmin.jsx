import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
function SidebarAdmin() {
  return (
    <div className="">
      <div className="col-lg-3 p-0">
        
      </div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
        <Link className="text-decoration-none" to={"/admin"}>
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo" href="/#">
              <img className="logo mx-3" src={logo} alt="logo" />
              <span className="custom-text">Học lập trình để đi làm</span>
            </a>
          </div>
        </Link>
          <li className="nav-item nav-category mt-3 mb-3 custom-nav-item">
            Thanh công cụ
          </li>
          <Link className="custom-link" to={"/admin"}>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <span className="icon-bg">
                  <i class="fa fa-home" aria-hidden="true"></i>
                </span>
                <span className="menu-title">Trang chủ</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/create-post"}>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <span className="icon-bg">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <span className="menu-title ">Tạo bài viết</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/list-post"}>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <span className="icon-bg">
                  <i class="fa fa-list" aria-hidden="true"></i>
                </span>
                <span className="menu-title">Danh sách bài viết</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/create-course"}>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <span className="icon-bg">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <span className="menu-title">Tạo khóa học</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/list-course"}>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <span className="icon-bg">
                  <i className="fa fa-list" aria-hidden="true"></i>
                </span>
                <span className="menu-title">Danh sách khóa học</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/list-user"}>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                <span className="icon-bg">
                  <i className="fa fa-list" aria-hidden="true"></i>
                </span>
                <span className="menu-title">Danh sách tài khoản</span>
              </a>
            </li>
          </Link>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="/" className="nav-link">
                <span className="btn btn-dark custom-btn">
                  <i className="mx-2 fa fa-chevron-left" aria-hidden="true"></i>
                  <span>Quay về trang User</span>
                </span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default SidebarAdmin;
