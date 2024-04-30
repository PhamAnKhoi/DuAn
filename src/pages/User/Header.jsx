import logo from "./logo.png";
import { Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

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
      <div className="d-flex flex-row justify-content-between">
        <div className="col-lg my-2 custom-div height-header d-none d-lg-flex">
          <Link className="custom-link" to={"/"}>
            <img className="logo mx-3" src={logo} alt="" />
            <span className="custom-text">Học lập trình để đi làm</span>
          </Link>
        </div>
        <div className="col-lg-4 col-lg-5 col-sm-5 col-5 d-flex align-items-center justify-content-center">
          <Space direction="vertical" className="custom-space w-100">
            <Search
              placeholder="Tìm kiếm khóa học"
              allowClear
              onSearch={onSearch}
            />
          </Space>
        </div>
        <div className="col-lg my-2 d-flex align-items-center justify-content-center" id="logIn_Out_btn">
          {isLoggedIn ? (
            <>
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
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button className="btn-login mx-3">
                <Link className="custom-link" to={"/login"}>
                  Đăng nhập
                </Link>
              </button>
              <button className="btn-register mx-3 py-1 px-3">
                <Link className="custom-link-2" to={"/register"}>
                  Đăng ký
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