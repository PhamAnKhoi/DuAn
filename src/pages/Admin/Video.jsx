import React, { useState } from "react";
import { Link } from "react-router-dom";
function Video() {
  const [collapsed, setCollapsed] = useState([false, false]);

  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !collapsed[index];
    setCollapsed(updatedCollapsed);
  };
  return (
    <div className="Video">
      <div className="row">
        <div className="col-lg-8">
          <div className="relative-video">
            <video
              className="custom-video absolute-video"
              src="/videos/video-demo.mp4"
              controls
            ></video>
          </div>
        </div>
        <div className="col">
          <p>Nội dung khóa học</p>
          <div>
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

            {/* <button onClick={() => toggleCollapse(1)}>
              {collapsed[1] ? "+" : "-"} <span>Môi trường</span>
            </button>
            <ul className={`my-list ${collapsed[1] ? "collapsed" : ""}`}>
              <Link to={"/"}>
                <li>1. Mô hình Client - Server là gì?</li>
              </Link>
              <Link to={"/"}>
                <li>2. Domain là gì? Tên miền là gì?</li>
              </Link>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
