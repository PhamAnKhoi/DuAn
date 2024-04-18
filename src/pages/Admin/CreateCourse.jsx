import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import TinyEditor from "../../components/editor";

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
  const [description, setDescription] = useState("description");
  const [price, setPrice] = useState("");
  const [views, setViews] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  // const [videoDemoUrl, setVideoDemoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    // console.log(`Bearer ${user.access_token}`);
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
        alert("Tạo khóa học thành công!");
        window.location.href = "/admin/create-course";
      }
    } catch (error) {
      // console.error("Fail to create course: ", error);
      setErrorMessage("Có xảy ra lỗi khi tạo khóa học này.");
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
                <div className="custom-div-1 fs-4 mb-2">Thêm khóa học mới</div>
                <div className="row">
                  <div className="col">
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
                  </div>
                  <div className="col">
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

                <div className="row">
                  <div className="mb-3 col">
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
                  <div className="mb-3 col">
                    <label className="form-label">Ảnh minh họa: </label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      required
                    />
                  </div>
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
    </div>
  );
}

export default CreateCourse;
