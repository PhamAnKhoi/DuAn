import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ToastMessage from "../../components/notifice.jsx";
import Header from "./Header.jsx";
import logo from "./logo.png";

function Video() {
  let param = useParams();
  let courseId = param.courseId;
  const numOfArrays = 99;
  const defaultCollapsed = [];
  for (let i = 0; i < numOfArrays; i++) {
    defaultCollapsed.push(true);
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Your code to start playing the video here
  };
  const [course, setCourse] = useState([]);
  console.log(course);
  const [sessions, setSessions] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentLesson, setCurrentLesson] = useState("");
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !collapsed[index];
    // console.log(index);
    setCollapsed(updatedCollapsed);
  };


  useEffect(() => {
    // console.log(courseId);
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
      }, 1500);
    }
    axios
      .get("http://api.course-selling.id.vn/api/course/purchased_courses/" + courseId, {
        headers: {
          "Content-Type": "multipart/form-data", //upload file
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        //lession_video_url
        if (response.data.status) {
          setCourse(response.data.data);
          setSessions(response.data.sessions);
          setCurrentLesson(response.data.sessions[0].lessons[0]); //lession_video_url  
        } else {
          setShowToast(true);
          setToastMessage(response.data.message);
          setToastVariant("danger");
          setTimeout(() => {
            window.location.href = "/my-course";
          }, 1500);

        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [courseId]);

  return (
    <div className="container-fluid Video">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <Header />
      <div className="mt-2 mb-2">
        <Link className="custom-text-video" to={"/my-course"}><i className="fa fa-arrow-left me-2" aria-hidden="true"></i>Quay lại khóa học</Link>
      </div>
      <div className="row">
        {/* <div className="col-lg-8 p-2">
          <div className="relative-video">
            <div className="custom-video absolute-video rounded">
              <iframe
                className="play-video rounded m-0"
                title="Video"
                src={currentLesson.lession_video_url}
              ></iframe>
            </div>
          </div>
          <div>
            <h5>{currentLesson.lession_name}</h5>
          </div>
        </div> */}
        <div className="col-lg-8 p-2">
          <div className="video-player">
            {!isPlaying && (
              <div className="video-overlay border-radius-10px" onClick={handlePlayVideo}>
                <img src={logo} alt="Video Thumbnail" />
                <div className="play-button-container">
                  <i className="bi bi-play-circle"></i>
                  <i className="fa fa-play play-button" aria-hidden="true"></i>
                </div>
              </div>
            )}
            {isPlaying && (
              <div className="relative-video border-radius-10px">
                <div className="custom-video absolute-video rounded">
                  <iframe
                    className="play-video rounded m-0"
                    title="Video"
                    src={currentLesson.lession_video_url}
                  ></iframe>
                </div>
              </div>
            )}
            <div className="custom-text-namels">
              {currentLesson.lession_name}
            </div>
            <div className="bg-quiz border-radius-10px">
              <div className="ms-3">
                <div className="custom-text-namels pt-2">Bài tập Quiz</div>
                <label className="form-check-label">
                  Câu hỏi 1
                </label>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" />
                  <label className="form-check-label">
                    Đáp án 1
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" />
                  <label className="form-check-label">
                    Đáp án 2
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" />
                  <label className="form-check-label">
                    Đáp án 3
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" />
                  <label className="form-check-label">
                    Đáp án 4
                  </label>
                </div>
                <button className="btn bg-btn mt-3 mb-3">Gửi câu trả lời</button>
              </div>
            </div>
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
                      className={`my-list ${collapsed[index] ? "collapsed" : ""
                        } lesson-list`}
                    >
                      {session.lessons.map((lesson) => (
                        <li className="margin-top-bottom" key={'ls' + lesson.lession_id}
                          onClick={() => setCurrentLesson(lesson)}

                        >
                          <Link className="text-black text-decoration-none">{lesson.lession_name}</Link>
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
    </div>
  );
}

export default Video;
