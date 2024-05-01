import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
import ToastMessage from "../../components/notifice";

function EditPost() {
  let param = useParams();
  let postId = param.postId;
  const user = JSON.parse(Cookies.get("user"));
  if (!user) {
    alert("Please login");
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  // const [errorMessage, setErrorMessage] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/post/" + postId
        );
        const postData = response.data.data;
        if (response.data.status) {
          setTitle(postData.title);
          setContent(postData.content);
          setStatus(postData.status);
          setThumbnailUrl(postData.thumbnail);
        } else {
          setShowToast(true);
          setToastMessage(response.data.message);
          setToastVariant("danger");
          setTimeout(() => {
            window.location.href = "/admin/list-post";
          }, 1500);
        }
      } catch (error) {
        console.error("Failed to fetch post data: ", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(file);
        setThumbnailUrl(reader.result); // Cập nhật URL của thumbnail để hiển thị
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("status", status);
      if (thumbnail !== null) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await axios.post(
        "http://api.course-selling.id.vn/api/post/edit/" + postId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      // if (response.data) {
      //   alert("Chỉnh sửa bài viết thành công!");
      //   window.location.href = "/admin/list-post";
      // }
      if (response.data.status) {
        setShowToast(true);
        setToastMessage("Bạn đã chỉnh sửa bài viết này");
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = "/admin/list-post";
        }, 1500);
      } else {
        setShowToast(true);
        setToastMessage("Có lỗi trong quá trình chỉnh sửa bài viết");
        setToastVariant("danger");
      }
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
              <form className="custom-form m-auto" onSubmit={handleEditPost}>
                <div className="custom-div-1">Chỉnh sửa bài viết</div>
                <div className="mb-3">
                  <label className="form-label">Tên bài viết: </label>
                  <input
                    className="form-control"
                    placeholder="Tên bài viết"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nội dung: </label>
                  <textarea
                    className="form-control"
                    placeholder="Nội dung của bài viết"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                <button className="btn bg-btn" type="submit">
                  Lưu chỉnh sửa
                </button>
                {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
