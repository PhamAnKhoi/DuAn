import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
function Video() {
  const numOfArrays = 99;
  const defaultCollapsed = [];
  for (let i = 0; i < numOfArrays; i++) {
    defaultCollapsed.push(true);
  }

  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !collapsed[index];
    setCollapsed(updatedCollapsed);
  };
  const [showQuestions, setShowQuestions] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 phút = 900 giây

  useEffect(() => {
    let timer;

    if (showQuestions && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showQuestions, countdown]);

  const handleStartClick = () => {
    alert("Bạn muốn bắt đầu làm Quiz");
    setShowQuestions(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="container-fluid Video">
      <div className="row">
        <div className="col-lg-8">
          <div className="relative-video">
            <div className="custom-video absolute-video">
              <iframe
                className="play-video"
                title="Video"
                src="https://www.youtube.com/embed/SPTUEeGW50E"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="col">
          <p>Nội dung khóa học</p>
          <div>
            <div>
              <button
                className="custom-button-item"
                onClick={() => toggleCollapse(0)}
              >
                <div className="div-css-left">
                  <span className="custom-span-icon">
                    {collapsed[0] ? "\u002B" : "\u2212"}
                  </span>
                  <span>Khái niệm kỹ thuật cần biết</span>
                </div>
              </button>
              <ul className={`my-list ${collapsed[0] ? "collapsed" : ""}`}>
                <li className="margin-top-bottom">
                  1. Mô hình Client - Server là gì?
                </li>
                <li className="margin-top-bottom">
                  2. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </div>
            <div>
              <button
                className="custom-button-item"
                onClick={() => toggleCollapse(1)}
              >
                <div className="div-css-left">
                  <span className="custom-span-icon">
                    {collapsed[1] ? "\u002B" : "\u2212"}
                  </span>
                  <span>Khái niệm kỹ thuật cần biết</span>
                </div>
              </button>
              <ul className={`my-list ${collapsed[1] ? "collapsed" : ""}`}>
                <li className="margin-top-bottom">
                  1. Mô hình Client - Server là gì?
                </li>
                <li className="margin-top-bottom">
                  2. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </div>
            <div>
              <button
                className="custom-button-item"
                onClick={() => toggleCollapse(2)}
              >
                <div className="div-css-left">
                  <span className="custom-span-icon">
                    {collapsed[2] ? "\u002B" : "\u2212"}
                  </span>
                  <span>Khái niệm kỹ thuật cần biết</span>
                </div>
              </button>
              <ul className={`my-list ${collapsed[2] ? "collapsed" : ""}`}>
                <li className="margin-top-bottom">
                  1. Mô hình Client - Server là gì?
                </li>
                <li className="margin-top-bottom">
                  2. Domain là gì? Tên miền là gì?
                </li>
                <li className="margin-top-bottom">
                  3. Domain là gì? Tên miền là gì?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Bài tập Quiz</h1>
        {!showQuestions ? (
          <button onClick={handleStartClick}>Bắt đầu</button>
        ) : (
          <p>Thời gian còn lại: {formatTime(countdown)}</p>
        )}
        {showQuestions && (
          <>
            <p>Câu hỏi 1</p>
            <input type="radio" name="option" /> Oke <br />
            <input type="radio" name="option" /> Oke <br />
            <input type="radio" name="option" /> Oke <br />
            <input type="radio" name="option" /> Oke
          </>
        )}
      </div>
    </div>
  );
}

export default Video;
