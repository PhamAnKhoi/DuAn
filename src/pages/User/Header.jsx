import logo from "./logo.png";
import { Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
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

  const { Search } = Input;

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const handleLogout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <div className="Header">
      <div className="row">
        <div className="col-lg-3 custom-div height-header">
          <Link className="custom-link" to={"/"}>
            <img className="logo mx-3" src={logo} alt="" />
            <span className="custom-text">Học lập trình để đi làm</span>
          </Link>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <Space direction="vertical" className="custom-space">
            <Search
              placeholder="Tìm kiếm khóa học, bài viết, video,..."
              allowClear
              onSearch={onSearch}
            />
          </Space>
        </div>
        <div className="col-lg-3 d-flex align-items-center justify-content-end">
          {isLoggedIn ? (
            <>
              <button className="btn-login mx-1">
                <i className="fa fa-user-circle-o mx-1" aria-hidden="true"></i>
                {userData && userData.username}
              </button>
              <button
                className="btn-register mx-1 py-1 px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn-login mx-1">
                <Link className="custom-link" to={"/login"}>
                  Login
                </Link>
              </button>
              <button className="btn-register mx-1 py-1 px-3">
                <Link className="custom-link-2" to={"/register"}>
                  Register
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="border-bottom"></div>
    </div>
  );
}

export default Header;
