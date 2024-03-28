import React from "react";
import { Link } from "react-router-dom";

function SidebarAdmin() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-category mt-3 mb-3">Thanh công cụ</li>
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
        <Link className="custom-link" to={"/admin/edit-post"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span>
              <span className="menu-title">Chỉnh sửa bài viết</span>
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
        <Link className="custom-link" to={"/admin/edit-course"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span>
              <span className="menu-title">Chỉnh sửa khóa học</span>
            </a>
          </li>
        </Link>
        <li className="nav-item sidebar-user-actions">
          <div className="sidebar-user-menu">
            <a href="/admin" className="nav-link">
              <span className="btn btn-primary">
                <i className="mx-2 fa fa-chevron-left" aria-hidden="true"></i>
                <span>Quay về trang User</span>
              </span>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
export default SidebarAdmin;
