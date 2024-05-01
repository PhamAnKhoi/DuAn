import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
import ToastMessage from "../../components/notifice";

function EditCourse() {
  let param = useParams();
  let courseId = param.courseId;
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
  const [video, setVideo] = useState(null);
  const [videoDemoUrl, setVideoDemoUrl] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
// show noti
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [toastVariant, setToastVariant] = useState("");
//end shownoti
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/course/show-edit/" + courseId,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const courseData = response.data.data;
        setName(courseData.name);
        setDescription(courseData.description);
        setPrice(courseData.price);
        setViews(courseData.views);
        setStatus(courseData.status);
        setThumbnailUrl(courseData.thumbnail);
        setVideo(courseData.video_demo_url);
      } catch (error) {
        console.error("Failed to fetch course data: ", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(file);
        // setThumbnailUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoDemoUrl(file);
        setVideo(reader.result);
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
    // formData.append("video_demo_url", videoDemoUrl);
    if (thumbnail !== null) {
      formData.append("thumbnail", thumbnail);
    }
    if (videoDemoUrl !== null) {
      formData.append("video_demo_url", videoDemoUrl);
    }


    try {
      const response = await axios.post(
        "http://api.course-selling.id.vn/api/course/edit/" + courseId,
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
        setToastMessage("Chỉnh sửa khóa học thành công!");
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = `/admin/list-course`;
        }, 1500);
      }else {
        setShowToast(true);
        setToastMessage("Có lỗi xảy ra khi chỉnh sửa khóa học!");
        setToastVariant("danger");
      }
      // const { data } = response.data;
      // setErrorMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

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
            <SidebarAdmin page="/" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />
            <div className="custom-border-top">
                <form
                  className="custom-form m-auto"
                  onSubmit={handleEditCourse}
                >
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
                      className="form-control mb-3"
                      type="file"
                      onChange={handleThumbnailChange}
                    />
                    <img
                      src={thumbnailUrl || thumbnail}
                      alt=""
                      width={200}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Video chỉnh sửa: </label>
                    <input
                      className="form-control mb-3"
                      type="file"
                      onChange={handleVideoChange}
                    />
                    <video
                    tabindex="-1"
                    className="img-propose"
                    controls
                    src={video || videoDemoUrl}
                    style={{ width: "100%", objectFit: "cover" }}
                  ></video>
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
                  <button className="btn bg-btn" type="submit">
                    Lưu chỉnh sửa
                  </button>
                  {/* {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )} */}
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
