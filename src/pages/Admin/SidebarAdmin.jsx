import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
const SidebarAdmin = ({page = '/'}) => {
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav d-flex flex-column">
          <Link className="text-decoration-none" to={"/admin"}>
            {/* <div className="navbar-brand-wrapper d-flex align-items-center">

            </div> */}
            <a className="navbar-brand brand-logo w-100 m-0" href="/#">
              <img className="logo mx-3" src={logo} alt="logo" />
              <span className="custom-text">Quản lí Website</span>
            </a>
          </Link>
          {/* <li className="nav-item nav-category mt-3 mb-3 custom-nav-item">
            Thanh công cụ
          </li> */}
          <Link className="custom-link" to={"/admin"}>
            <li className="nav-item px-3">
              <a className={`nav-link ${page ==='/' ? 'active' : ''}`} href="/#">
                <span className="icon-bg">
                  <i class="fa fa-home" aria-hidden="true"></i>
                </span>
                <span className="menu-title fs-5">Trang chủ</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/create-post"}>
            <li className="nav-item px-3">
              <a className={`nav-link ${page === 'createPost' ? 'active' : ''}`} href="/#">
                <span className="icon-bg">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <span className="menu-title fs-5">Tạo bài viết</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/list-post"}>
            <li className="nav-item px-3">
              <a className={`nav-link ${page === 'listPost' ? 'active' : ''}`} href="/#">
                <span className="icon-bg">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
                <span className="menu-title fs-5">Danh sách bài viết</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/create-course"}>
            <li className="nav-item px-3">
              <a className={`nav-link ${page === 'createCourse' ? 'active' : ''}`} href="/#">
                <span className="icon-bg">
                  <i class="fa fa-book" aria-hidden="true"></i>
                </span>
                <span className="menu-title fs-5">Tạo khóa học</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/list-course"}>
            <li className="nav-item px-3">
              <a className={`nav-link ${page === 'listCourse' ? 'active' : ''}`} href="/#">
                <span className="icon-bg">
                  <i className="fa fa-book" aria-hidden="true"></i>
                </span>
                <span className="menu-title fs-5">Danh sách khóa học</span>
              </a>
            </li>
          </Link>
          <Link className="custom-link" to={"/admin/list-user"}>
            <li className="nav-item px-3">
              <a className={`nav-link ${page === 'listUser' ? 'active' : ''}`} href="/#">
                <span className="icon-bg">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                <span className="menu-title fs-5">Danh sách người dùng</span>
              </a>
            </li>
          </Link>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="/" className={`nav-link ${page === '' ? 'active' : ''}`}>
                <span className="btn btn-dark custom-btn">
                  <i className="mx-2 fa fa-chevron-left" aria-hidden="true"></i>
                  <span>Quay về trang User</span>
                </span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default SidebarAdmin;
