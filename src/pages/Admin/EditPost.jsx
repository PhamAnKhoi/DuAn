import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";

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
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/post/" + postId
        );
        const postData = response.data.data;
        setTitle(postData.title);
        setContent(postData.content);
        setStatus(postData.status);
        setThumbnailUrl(postData.thumbnail);
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
      if (response.data) {
        alert("Chỉnh sửa bài viết thành công!");
        window.location.href = "/admin/list-post";
      }
      const { data } = response.data;
      setErrorMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Admin">
      <div className="container-fluid">
        <div className=" HeaderAdmin SidebarAdmin">
          <div className="row vh-100">
            <div className="col-lg-3 p-0">
              <SidebarAdmin />
            </div>

            <div className="col-lg-9">
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
                  <button className="btn btn-primary" type="submit">
                    Lưu chỉnh sửa
                  </button>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
