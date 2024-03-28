import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function CreateCourse() {
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
    console.log(user.access_token);
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [views, setViews] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  // const [videoDemoUrl, setVideoDemoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    console.log(`Bearer ${user.access_token}`);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("views", views);
      formData.append("status", status);
      formData.append("thumbnail", thumbnail);
      // formData.append("video_demo_url", videoDemoUrl);

      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Fail to create course: ", error);
      setErrorMessage("Có xẩy ra lỗi khi tạo khóa học này.");
    }
  };
  return (
    <div className="Admin">
      <div className="container-scroller">
        <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="container-fluid page-body-wrapper">
            <SidebarAdmin />
            <form className="custom-form m-auto" onSubmit={handleCreateCourse}>
              <div className="custom-div-1">Tạo khóa học</div>
              <div className="mb-3">
                <label className="form-label">Tên khóa học: </label>
                <input
                  className="form-control"
                  placeholder="Tên khóa học"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mô tả: </label>
                <textarea
                  className="form-control"
                  placeholder="Mô tả nội dung khóa học"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giá: (VND)</label>
                <input
                  min={0}
                  className="form-control"
                  placeholder="Giá khóa học"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lượt xem: </label>
                <input
                  min={0}
                  className="form-control"
                  placeholder="Số lượt xem"
                  type="number"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ảnh minh họa: </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  required
                />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">
                  Video giới thiệu khóa học:{" "}
                </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setVideoDemoUrl(e.target.files[0])}
                />
              </div> */}
              <div className="mb-3">
                <div className="form-label"> Trạng thái: </div>
                <div className="mb-1">
                  <input
                    type="radio"
                    value="1"
                    checked={status === 1}
                    onChange={() => setStatus(1)}
                  />
                  <span className="mx-2">Hiển thị khóa học</span>
                </div>
                <div className="mb-1">
                  <input
                    type="radio"
                    value="0"
                    checked={status === 0}
                    onChange={() => setStatus(0)}
                  />
                  <span className="mx-2">Ẩn khóa học</span>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Lưu khóa học
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
