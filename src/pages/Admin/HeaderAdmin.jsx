import React, { useState, useEffect } from "react";
// import logo from "./logo.png";
// import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function HeaderAdmin() {
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
  };
  return (
    <nav className="navbar default-layout-navbar row">
      <div className="col">
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
              <div className="nav-link">
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">
                    {isLoggedIn ? (
                      <>
                        <button className="btn-login mx-1">
                          <i
                            className="fa fa-user-circle-o mx-1"
                            aria-hidden="true"
                          ></i>
                          {userData && userData.username}
                        </button>
                        <button
                          className="btn-logout mx-1 py-1 px-3"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
