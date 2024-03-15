import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function Course() {
  const [collapsed, setCollapsed] = useState([false, false]);
  const [allCollapsed, setAllCollapsed] = useState(false);

  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !collapsed[index];
    setCollapsed(updatedCollapsed);
  };

  const toggleCollapseAll = () => {
    const updatedCollapsed = collapsed.map(() => !allCollapsed);
    setCollapsed(updatedCollapsed);
    setAllCollapsed(!allCollapsed);
  };
  return (
    <div className="row Sidebar">
      <Sidebar />
      <div className="col-lg-11 Course">
        <div className="row">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-lg-8">
                <div className="text-div1">Kiến Thức Nhập Môn IT</div>
                <div className="text-div2">
                  Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn
                  nên xem các videos tại khóa này trước nhé.
                </div>
                <div className="text-div3">Bạn sẽ học được gì?</div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="text-div4">
                      <i className="fa fa-check" aria-hidden="true"></i>
                      <span className="margin-left">
                        Authentication & Authorization trong ReactJS
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="text-div4">
                      <i className="fa fa-check" aria-hidden="true"></i>
                      <span className="margin-left">
                        Hiểu chi tiết về các khái niệm cơ bản trong JS
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="text-div4">
                      <i className="fa fa-check" aria-hidden="true"></i>
                      <span className="margin-left">
                        Tự tin khi phỏng vấn với kiến thức vững chắc
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="text-div4">
                      <i className="fa fa-check" aria-hidden="true"></i>
                      <span className="margin-left">
                        Xây dựng được website đầu tiên kết hợp JS
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-div5">Nội dung khóa học</div>
                <div>
                  <span>
                    <strong>4</strong> chương
                  </span>
                  <span> - </span>
                  <span>
                    <strong>4</strong> bài học
                  </span>
                  <span> - </span>
                  <span>
                    <strong>100</strong> phút
                  </span>
                </div>
                <div>
                  <button onClick={toggleCollapseAll}>
                    {allCollapsed ? "Mở rộng" : "Thu nhỏ"}
                  </button>
                  <br />
                  <button onClick={() => toggleCollapse(0)}>
                    {collapsed[0] ? "+" : "-"}{" "}
                    <span>Khái niệm kỹ thuật cần biết</span>
                  </button>
                  <ul className={`my-list ${collapsed[0] ? "collapsed" : ""}`}>
                    <Link to={"/video"}>
                      <li>1. Mô hình Client - Server là gì?</li>
                    </Link>
                    <Link to={"/video"}>
                      <li>2. Domain là gì? Tên miền là gì?</li>
                    </Link>
                  </ul>
                  <button onClick={() => toggleCollapse(1)}>
                    {collapsed[1] ? "+" : "-"} <span>Môi trường</span>
                  </button>
                  <ul className={`my-list ${collapsed[1] ? "collapsed" : ""}`}>
                    <Link to={"/"}>
                      <li>1. Mô hình Client - Server là gì?</li>
                    </Link>
                    <Link to={"/"}>
                      <li>2. Domain là gì? Tên miền là gì?</li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 margin-top-bottom">
                <div>
                  <img
                    className="img-propose"
                    src="https://files.fullstack.edu.vn/f8-prod/banners/25/63dc61d4caec2.png"
                    alt=""
                  />
                </div>
                <div>
                  <div className="custom-div-1">Miễn phí</div>
                  <div className="custom-div-2 m-auto">Đăng ký học</div>
                  <div className="custom-div">
                    <div>
                      <i
                        className="fa fa-level-up size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Trình độ cơ bản</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-film size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Tổng số ... bài học</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-clock-o size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Thời lượng 29 giờ 12 phút</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-battery-full size-item"
                        aria-hidden="true"
                      ></i>
                      <span>Học mọi lúc mọi nơi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
