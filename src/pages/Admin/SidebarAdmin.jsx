import React from "react";
import { Link } from "react-router-dom";

const SidebarAdmin = ({ page = "/" }) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start p-0 text-white min-vh-100">
        <Link to={"/admin"} className="text-dark text-decoration-none d-block text-center w-100 p-2">
          <span className="fs-5 d-none d-sm-inline text-dark fw-medium text-center">Quản lí Website</span>
        </Link>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
          <li className="nav-item w-100">
            <Link to={"/admin"} className={`nav-link px-0 align-middle ps-2 ${page === '/' ? 'active' : ''}`}>
              <i className="fas fa-tachometer-alt"></i>
              <span className="ms-1 d-none d-sm-inline">Bảng điều khiển</span>
            </Link>
          </li>
          <span className="hr-tag"></span>
          <li className="nav-item w-100">
            <Link to={"/admin/create-course"} className={`nav-link px-0 align-middle ps-2 ${page === 'createCourse' ? 'active' : ''}`}>
              <i className="fas fa-book"></i>
              <span className="ms-1 d-none d-sm-inline">Tạo khóa học</span>
            </Link>
          </li>
          <li className="nav-item w-100">
            <Link to={"/admin/list-course"} className={`nav-link px-0 align-middle ps-2 ${page === 'listCourse' ? 'active' : ''}`}>
              <i className="fas fa-list"></i>
              <span className="ms-1 d-none d-sm-inline">Danh sách khóa học</span>
            </Link>
          </li>
          <span className="hr-tag"></span>
          <li className="nav-item w-100">
            <Link to={"/admin/create-post"} className={`nav-link px-0 align-middle ps-2 ${page === 'createPost' ? 'active' : ''}`}>
              <i className="fas fa-blog"></i>
              <span className="ms-1 d-none d-sm-inline">Tạo bài viết</span>
            </Link>
          </li>
          <li className="nav-item w-100">
            <Link to={"/admin/list-post"} className={`nav-link px-0 align-middle ps-2 ${page === 'listPost' ? 'active' : ''}`}>
              <i className="fas fa-clipboard-list"></i>
              <span className="ms-1 d-none d-sm-inline">Danh sách bài viết</span>
            </Link>
          </li>
          <span className="hr-tag"></span>
          <li className="nav-item w-100">
            <Link to={"/admin/list-user"} className={`nav-link px-0 align-middle ps-2 ${page === 'listUser' ? 'active' : ''}`}>
              <i className="fas fa-users"></i>
              <span className="ms-1 d-none d-sm-inline">Khách hàng</span>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a href="/admin" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
            <span className="d-none d-sm-inline mx-1">loser</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="/admin">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/admin">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/admin">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/admin">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
