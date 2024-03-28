import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
function HeaderAdmin() {
  return (
    <div>
      <nav className="navbar default-layout-navbar col-lg-12 p-0">
        <Link to={"/admin"}>
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo" href="/#">
              <img src={logo} alt="logo" />
            </a>
          </div>
        </Link>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <div className="search-field d-none d-xl-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify" />
                </div>
                <input
                  type="text"
                  className="form-control bg-transparent border-0"
                  placeholder="Tìm kiếm"
                />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link"
                href="/#"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="nav-profile-img">
                  <img src={logo} alt="" />
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">Henry Klein</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default HeaderAdmin;
