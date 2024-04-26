import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ToastMessage from "../../components/notifice.jsx";

// import { Link } from "react-router-dom";
function Video() {
  let param = useParams();
  let courseId = param.courseId;

  const numOfArrays = 99;
  const defaultCollapsed = [];
  for (let i = 0; i < numOfArrays; i++) {
    defaultCollapsed.push(true);
  }

  const [course, setCourse] = useState([]);
  console.log(course);

  const [sessions, setSessions] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const [currentLesson, setCurrentLesson] = useState("");
  console.log(currentLesson);

  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !collapsed[index];
    console.log(index);
    setCollapsed(updatedCollapsed);
  };
  // const [showQuestions, setShowQuestions] = useState(false);
  // const [countdown, setCountdown] = useState(900); // 15 phút = 900 giây

  useEffect(() => {
    console.log(courseId);
    var user = Cookies.get("user");
    if (user !== undefined) {
      user = JSON.parse(user);
    } else {
      // alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      setShowToast(true);
      setToastMessage("Bạn cần đăng nhập để thực hiện chức năng này.");
      setToastVariant("warning");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
    axios
      .get("http://api.course-selling.id.vn/api/course/" + courseId)
      .then((response) => {
        setCourse(response.data.data);
        setSessions(response.data.sessions);
        setCurrentLesson(response.data.sessions[0].lessons[0]); //lession_video_url
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });

    // let timer;
    // if (showQuestions && countdown > 0) {
    //   timer = setTimeout(() => {
    //     setCountdown(countdown - 1);
    //   }, 1000);
    // }

    // return () => {
    //   clearTimeout(timer);
    // };
  }, [courseId]);

  // const handleStartClick = () => {
  //   alert("Bạn muốn bắt đầu làm Quiz");
  //   // setShowQuestions(true);
  // };

  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };
  return (
    <div className="container-fluid Video">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <div className="row">
        <div className="col-lg-8 p-2">
          <div className="relative-video">
            <div className="custom-video absolute-video rounded">
              <iframe
                className="play-video rounded m-0"
                title="Video"
                src={currentLesson.lession_video_url}
              ></iframe>
              {/* <video
                tabindex="-1"
                class=""
                controls
                src={currentLesson.lession_video_url}
              ></video> */}
            </div>
          </div>
          <div>
            <h5>{currentLesson.lession_name}</h5>
          </div>
        </div>
        <div className="col">
          <p>Nội dung khóa học</p>
          <div>
            {sessions.length !== 0 ? (
              <div className="mb-2">
                {sessions.map((session, index) => (
                  <div key={session.id}>
                    <button
                      className="custom-button-item"
                      onClick={() => toggleCollapse(index)}

                    >
                      <div className="div-css-left">
                        <span className="custom-span-icon">
                          {collapsed[index] ? "\u002B" : "\u2212"}
                        </span>
                        <span>{session.session_name}</span>
                      </div>
                    </button>

                    <ul
                      className={`my-list ${
                        collapsed[index] ? "collapsed" : ""
                      } lesson-list`}
                    >
                      {session.lessons.map((lesson) => (
                        <li className="margin-top-bottom" key={'ls'+ lesson.lession_id}
                        onClick={() => setCurrentLesson(lesson)}

                        >
                          {lesson.lession_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              "Không có nội dung"
            )}
          </div>
        </div>
      </div>
      <div>
        <h1>Bài tập Quiz</h1>
        {/* {!showQuestions ? (
          <button onClick={handleStartClick}>Bắt đầu</button>
        ) : (
          <p>Thời gian còn lại: {formatTime(countdown)}</p>
        )} */}
        {/* {showQuestions && (
          <>
            <p>Câu hỏi 1</p>
            <input type="radio" name="option" /> Oke <br />
            <input type="radio" name="option" /> Oke <br />
            <input type="radio" name="option" /> Oke <br />
            <input type="radio" name="option" /> Oke
          </>
        )} */}
      </div>
    </div>
  );
}

export default Video;
