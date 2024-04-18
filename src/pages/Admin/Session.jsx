import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import TinyEditor from "../../components/editor";
import { useParams } from "react-router-dom";

function Session() {
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
  const courseId = param.courseId
//   const [courseId, setCourseId] = useState(param.courseId);
  const [name, setName] = useState("");
  const [arrange, setArrange] = useState("");
  const [description, setDescription] = useState("description");
  // const [price, setPrice] = useState("");
  // const [views, setViews] = useState("");
  // const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  // const [videoDemoUrl, setVideoDemoUrl] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    // console.log(`Bearer ${user.access_token}`);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("arrange", arrange);
      formData.append("description", description);
      // formData.append("price", price);
      // formData.append("views", views);
      // formData.append("status", status);
      formData.append("thumbnail", thumbnail);
      formData.append("course_id", courseId);
      // formData.append("video_demo_url", videoDemoUrl);

      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/create-session",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.data) {
        alert("Tạo khóa học thành công!");
        // window.location.href = "/admin/create-course";
      }
    } catch (error) {
      // console.error("Fail to create course: ", error);
      // setErrorMessage("Có xảy ra lỗi khi tạo khóa học này.");
    }
  };

  const handleEditorChange = (description) => {
    setDescription(description);
  };

  return (
    <div className="Admin">
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
                <div className="custom-div-1 fs-4 mb-2">Thêm Session</div>
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
                      <label className="form-label">Tên session: </label>
                      <input
                        className="form-control"
                        placeholder="Tên session"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3 col">
                      <label className="form-label">Ảnh minh họa: </label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mô tả: </label>
                  <TinyEditor
                    initialValue={description}
                    onChange={handleEditorChange}
                    height={300}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Tạo session
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Session;
