import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function EditCourse() {
  const user = JSON.parse(Cookies.get("user"));
  if (!user) {
    alert("Please login");
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [views, setViews] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/course/edit/id_course"
        );
        const courseData = response.data;
        setName(courseData.name);
        setDescription(courseData.description);
        setPrice(courseData.price);
        setViews(courseData.views);
        setStatus(courseData.status);
        setThumbnailUrl(courseData.thumbnail);
      } catch (error) {
        console.error("Failed to fetch course data: ", error);
      }
    };

    fetchCourse();
  }, []);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(file);
        setThumbnailUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("views", views);
    formData.append("status", status);
    formData.append("thumbnail", thumbnail);
    // formData.append("video_demo_url", videoDemo);

    try {
      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/edit/id_course",
        formData
      );
      const { data } = response.data;
      setErrorMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Admin">
      <div className="container-scroller">
        <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="container-fluid page-body-wrapper">
            <SidebarAdmin />
            <form className="custom-form m-auto" onSubmit={handleEditCourse}>
              <div className="custom-div-1">Chỉnh sửa khóa học</div>
              <div className="mb-3">
                <label className="form-label">Tên khóa học: </label>
                <input
                  className="form-control"
                  placeholder="Chỉnh sửa tên"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mô tả: </label>
                <textarea
                  className="form-control"
                  placeholder="Chỉnh sửa mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giá: (VND)</label>
                <input
                  min={0}
                  className="form-control"
                  placeholder="Chỉnh sửa giá"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lượt xem: </label>
                <input
                  min={0}
                  className="form-control"
                  placeholder="Chỉnh sửa lượt xem"
                  type="number"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hình ảnh chỉnh sửa: </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={handleThumbnailChange}
                />
                <img
                  src={thumbnailUrl || thumbnail}
                  alt=""
                  width={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
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
                Lưu chỉnh sửa
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
