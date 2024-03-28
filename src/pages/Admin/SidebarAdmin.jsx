import React from "react";
import { Link } from "react-router-dom";

function SidebarAdmin() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-category">Main</li>
        <Link to={"/admin"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i class="fa fa-home" aria-hidden="true"></i>
              </span>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
        </Link>
        <Link to={"/admin/create-post"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </span>
              <span className="menu-title ">Create Post</span>
            </a>
          </li>
        </Link>
        <Link to={"/admin/edit-post"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span>
              <span className="menu-title">Edit Post</span>
            </a>
          </li>
        </Link>
        <Link to={"/admin/create-course"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </span>
              <span className="menu-title">Create Course</span>
            </a>
          </li>
        </Link>
        <Link to={"/admin/edit-course"}>
          <li className="nav-item">
            <a className="nav-link" href="/#">
              <span className="icon-bg">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </span>
              <span className="menu-title">Edit Course</span>
            </a>
          </li>
        </Link>
        <li className="nav-item sidebar-user-actions">
          <div className="sidebar-user-menu">
            <a href="/admin" className="nav-link">
              <i className="mdi mdi-logout menu-icon" />
              <span className="menu-title">Log Out</span>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
export default SidebarAdmin;
