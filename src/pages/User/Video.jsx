import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ToastMessage from "../../components/notifice.jsx";
import Header from "./Header.jsx";
import logo from "./bg-my-course.png";

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
  // const [course, setCourse] = useState([]);
  const [quiz_id, setQuiz_id] = useState(null);
  const [answer_id, setAnswer_id] = useState(null);
  const [question_id, setQuestion_id] = useState(null);
  const [user, setUser] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentLesson, setCurrentLesson] = useState("");
  const [quiz_progress, setQuiz_progress] = useState(0);
  const [learned_progress, setLearned_progress] = useState(0);
  // console.log(currentLesson.quizs);
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
      setUser(user);
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
      .get(
        "http://api.course-selling.id.vn/api/course/purchased_courses/" +
        courseId,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        //lession_video_url
        if (response.data.status) {
          // setCourse(response.data.data);
          setSessions(response.data.sessions);
          setQuiz_progress(response.data.quiz_progress)
          setLearned_progress(response.data.learned_progress)
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

  function handleQuiz(quiz_id, question_id, answer_id) {
    setQuiz_id(quiz_id)
    setAnswer_id(answer_id)
    setQuestion_id(question_id)
  }
  function submitQuiz() {
    console.log(quiz_id, question_id, answer_id);
    axios
      .post(
        "http://api.course-selling.id.vn/api/course/do-quiz",
        {
          quiz_id: quiz_id,
          answer_id: answer_id,
          course_id: courseId,
          question_id: question_id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        //lession_video_url
        if (response.data.status) {
          setShowToast(true);
          setToastMessage(response.data.message);
          setToastVariant("success");
        } else {
          setShowToast(true);
          setToastMessage(response.data.message);
          setToastVariant("danger");
          // setTimeout(() => {
          //   window.location.reload;
          // }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error do quiz:", error);
      });
  }



  return (
    <div className="container-fluid Video">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <Header />
      <div className="mt-2 mb-2 d-flex justify-content-between align-items-center">
        <Link className="custom-text-video text-nowrap" to={"/my-course"}>
          <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>Quay lại
          khóa học
        </Link>
        <div className="d-flex w-100 gap-1" id="progress-course">
          <div className="d-flex w-50 p-2 ">
            <span className="fw-medium text-nowrap pe-2">Tiến độ học:</span>
            <div className="h-full w-100 border rounded-pill overflow-hidden">
              <div className="bg-success text-center text-white fw-medium d-lg-block d-md-block d-sm-block d-none" style={{ width: `${learned_progress}%` }}>{`${learned_progress}%`}</div>
              <div className="fw-medium d-lg-none d-md-none d-sm-none d-block">{`${learned_progress}%`}</div>
            </div>
          </div>
          <div className="d-flex w-50 p-2 ">
            <span className="fw-medium text-nowrap pe-2">Tiến độ quiz:</span>
            <div className="h-full w-100 border rounded-pill overflow-hidden">
              <div className="bg-primary text-center text-white fw-medium d-lg-block d-md-block d-sm-block d-none" style={{ width: `${quiz_progress}%` }}>{`${quiz_progress}%`}</div>
              <div className="fw-medium d-lg-none d-md-none d-sm-none d-block">{`${quiz_progress}%`}</div>
            </div>
          </div>
        </div>
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
              <div
                className="video-overlay border-radius-10px"
                onClick={handlePlayVideo}
              >
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
            <div className="bg-quiz border-radius-10px p-2">
              {currentLesson.quizs ? (
                currentLesson.quizs.length ? (
                  <div className="ms-3">
                    <div className="custom-text-namels pt-2">Bài tập Quiz</div>
                    {currentLesson.quizs.map((quiz, index) => (
                      <div key={`quiz_${index}`}>
                        <label
                          className="form-check-label"
                          key={`question_${index}`}
                        >
                          {quiz.question}
                        </label>
                        {quiz.anwsers.map((anwsers, index) => (
                          <div className="form-check mt-2" key={`answer_${index}`}>
                            <label className="form-check-label">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`answer_${index}`}
                                value={anwsers.id}
                                disabled={anwsers.status}
                                checked={quiz.correct_answer === anwsers.answer}
                                onClick={(e) => handleQuiz(quiz.quiz_id, anwsers.question_id, (e.target.value))}
                              />
                              {anwsers.answer}
                            </label>
                          </div>
                        ))}

                        {
                          (quiz.correct_answer) ? (
                            <div className="text-success fw-bold">Đáp án: '{quiz.correct_answer}'</div>
                          ) : (
                            <button className="btn bg-btn mt-3 mb-3" onClick={() => submitQuiz()}>
                              Gửi câu trả lời
                            </button>
                          )
                        }
                      </div>
                    ))}
                  </div>
                ) : (
                  "Không có Quiz cho bài học này"
                )
              ) : (
                "Không có Quiz cho bài học này"
              )}
            </div>
          </div>
        </div>
        <div className="col">
          <p>Nội dung khóa học</p>
          <div>
            {sessions.length !== 0 ? (
              <div className="mb-2">
                {sessions.map((session, index) => (
                  <div key={`session_${session.id}_${index + 1}`}>
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
                      className={`my-list${collapsed[index] ? " collapsed " : " "
                        }lesson-list`}
                    >
                      {session.lessons.map((lesson) => (
                        <li
                          className="margin-top-bottom"
                          key={"ls" + lesson.lession_id}
                          onClick={() => setCurrentLesson(lesson)}
                        >
                          <Link className="text-black text-decoration-none">
                            {lesson.lession_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              "Không có quiz cho bài học này"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
