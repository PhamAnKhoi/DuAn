import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
import ToastMessage from "../../components/notifice";

function Lessons() {
  let param = useParams();
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
    // console.log(user.access_token);
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  const sessionId = param.sessionId;
  const [name, setName] = useState("");
  const [arrange, setArrange] = useState("");
  const [video, setVideo] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    // console.log(`Bearer ${user.access_token}`);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("arrange", arrange);
      formData.append("video_url", video);
      formData.append("session_id", sessionId);

      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/create-lesson",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.data.status) {
        setShowToast(true);
        setToastMessage("Tạo khóa học thành công!");
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = `/admin/list-course/list-session/add-video/` + sessionId;
        }, 3000);
      } else {
        setShowToast(true);
        setToastMessage("Có lỗi xảy ra khi tạo khóa học!");
        setToastVariant("danger");
      }
    } catch (error) {
    }
  };

  //   const handleEditorChange = (description) => {
  //     setDescription(description);
  //   };

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
            <SidebarAdmin page="createCourse" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />

            <div className="w-100">
              <form
                className="custom-form mt-3 w-100 py-3 px-4"
                onSubmit={handleCreateCourse}
              >
                <div className="custom-div-1 fs-4 mb-2">Thêm Lessons</div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Số thứ tự: </label>
                      <input
                        className="form-control"
                        placeholder="Số thứ tự session"
                        type="number"
                        min={0}
                        value={arrange}
                        onChange={(e) => setArrange(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Tên lessons: </label>
                      <input
                        className="form-control"
                        placeholder="Tên lessons"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3 col">
                      <label className="form-label">Video: </label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setVideo(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button className="btn bg-btn" type="submit">
                  Tạo lessons
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lessons;
