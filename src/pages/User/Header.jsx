import logo from "./logo.png";
import { Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice";

function Header() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti
  // console.log(userData.data.id);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setIsLoggedIn(true);
      setUserData(user);
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

    setShowToast(true);
    setToastMessage("Đăng xuất thành công");
    setToastVariant("success");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="Header">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
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
              {/* <div className="btn-login mx-1">
                <img className="img-avt" src={userData.avata} alt="" />
                {userData && userData.data.username}
                {userData && userData.permission}
              </div> */}
              <Link className="text-decoration-none text-black" to={"/profile-user/" + userData.data.id}>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="img-avt"
                  src={userData.avata}
                  alt=""
                />
                <div>
                  <p className="custom-p">Tên: <strong>{userData && userData.data.username}</strong></p>
                  <p className="">Chức vụ: <strong>{userData && userData.permission}</strong></p>
                </div>
              </div>
              </Link>
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
