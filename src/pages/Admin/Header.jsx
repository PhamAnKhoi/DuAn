import logo from "./logo.png";
import { Input, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Header() {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="Header">
      <div className="row">
        <div className="col-lg-3 custom-div height-header">
          <Link className="custom-link" to={"/"}>
            <img className="logo mx-3" src={logo} alt="" />
            <span className="custom-text">
              Học lập trình để đi làm
            </span>
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
          <button className="btn-login mx-1">Login</button>
          <button className="btn-register mx-1 py-1 px-3">Register</button>
        </div>
      </div>
      <div className="border-bottom"></div>
    </div>
  );
}

export default Header;
