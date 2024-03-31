import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function HeaderAdmin({ page = '' }) {
  if (Cookies.get("user") === undefined) {
    window.location.href = '/login'
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
      window.location.href = '/'
    }, 1000);
  };

  // Xác định xem liệu input có nên bị tắt (disabled) hay không
  const isInputDisabled = page === 'edit' || page === 'create';

  return (
    <nav className="navbar default-layout-navbar row">
      <div className="col">
        <div className="navbar-menu-wrapper d-flex align-items-stretch p-0">
          <div className="search-field d-none d-xl-block">
            <form className="d-flex align-items-center h-100" action="#">
              {/* {isInputDisabled && (
              )} */}
                <div className="input-group rounded">
                  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" disabled={isInputDisabled} />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fa fa-search"></i>
                  </span>
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
                          <i className="fa fa-user-circle-o mx-1" aria-hidden="true"></i>
                          {userData && userData.username}
                        </button>
                        <button className="btn-logout mx-1 py-1 px-3" onClick={handleLogout}>
                          Logout
                        </button>
                      </>
                    ) : null}
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
