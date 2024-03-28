import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function CreatePost() {
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
    console.log(user.access_token);
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("status", status);
      formData.append("thumbnail", thumbnail);

      const response = await axios.post(
        "http://api.course-selling.id.vn/api/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            "Authorization": `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.data) {
        console.log(response.data);
      }
      setTitle("");
      setContent("");
      setStatus(1);
      setThumbnail(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Fail to create post: ", error);
      setErrorMessage("Có xẩy ra lỗi khi tạo bài viết.");
    }
  };

  return (
    <div className="Admin">
      <div className="container-scroller">
        <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="container-fluid page-body-wrapper">
            <SidebarAdmin />
            <form className="custom-form m-auto" onSubmit={handleCreatePost}>
              <div>
                <div className="custom-div-1">Create Post</div>
                <div className="mb-3">
                  <label className="form-label">Tiêu đề: </label>
                  <input
                    className="form-control"
                    placeholder="Tiêu đề"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content: </label>
                  <textarea
                    className="form-control"
                    placeholder="Nội dung"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thumbnail:</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label"> Status: </label> <br />
                  <input
                    type="radio"
                    value="1"
                    checked={status === 1}
                    onChange={() => setStatus(1)}
                  />
                  Hiện
                  <input
                    type="radio"
                    value="0"
                    checked={status === 0}
                    onChange={() => setStatus(0)}
                  />
                  Ẩn
                </div>
                <button className="btn btn-primary" type="submit">
                  Lưu bài viết
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
