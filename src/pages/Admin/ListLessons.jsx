import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-js-pagination";
import ToastMessage from "../../components/notifice";

function ListLessons() {
  const [session, setSession] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  let param = useParams();
  let session_id = param.session_id;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/course/getLesson/" + session_id,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        const sessionsData = response.data;

        setSession(sessionsData.lessons);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user.access_token, session_id]);

  async function handleDelete(courseId) {
    // console.log(courseId);
    try {
      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/delete/lesson/" + courseId,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      if (response.data.status) {
        setShowToast(true);
        setToastMessage("Bạn đã xóa lesson này");
        setToastVariant("success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setShowToast(true);
        setToastMessage("Có lỗi trong quá trình xóa lesson");
        setToastVariant("danger");
      }
    } catch (error) {
      console.error("Error while deleting session:", error);
    }
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  function handleCreateQuiz(e) {
    // console.log(e);
    window.location.href = `/admin/list-course/list-session/list-lessons/quiz-create/${e}`;
  }

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = session.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="Admin">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SidebarAdmin page="listCourse" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />
            <div className="custom-border-top list-course">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center">#</th>
                    <th className="text-nowrap text-center">Số thứ tự</th>
                    <th className="text-nowrap text-center">Tên lessons</th>
                    <th className="text-nowrap text-center">
                      Ngày tạo lessons
                    </th>
                    <th className="text-nowrap text-center">Video khóa học</th>
                    <th className="text-nowrap text-center">Chức năng</th>
                    <th className="text-nowrap text-center">Quiz</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((lesson, index) => (
                    <tr key={lesson.id}>
                      <td className="text-center">
                        {(activePage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td>
                        <div className="text-center">{lesson.arrange}</div>
                      </td>
                      <td className="text-center">{lesson.name}</td>
                      <td className="text-center">
                        {new Date(lesson.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="text-center">
                          <iframe title="Video" src={lesson.video_url}></iframe>
                        </div>
                      </td>
                      <td className="text-center">
                        {/* <button
                          className="btn bg-btn me-2"
                          onClick={() => handleCreateQuiz(lesson.id)}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button> */}
                        <button
                          className="btn bg-btn"
                          onClick={() => handleDelete(lesson.id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn bg-btn"
                          onClick={() => handleCreateQuiz(lesson.id)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="custom-paginate">
                <ReactPaginate
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={session.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLessons;
