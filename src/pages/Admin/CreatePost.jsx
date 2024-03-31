import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import TinyEditor from '../../components/editor'

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
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      if (response.data) {
        // console.log(response.data);
        alert("Tạo bài viết thành công!");
        window.location.href = "/admin/create-post";
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
  const handleEditorChange = (Content) => {
    setContent(Content);
  };
  return (
    <div className="Admin">
      <div className="container-fluid p-0">
        <div className=" HeaderAdmin SidebarAdmin">
          <div className="row vh-100 w-100">
            <div className="col-lg-2 col-md-2 p-0">
              <SidebarAdmin page="createPost" />
            </div>

            <div className="col">
            <HeaderAdmin page="create"/>
              <div className="custom-border-top w-100">
                <form
                  className="custom-form w-100 m-0 mt-3 w-100 py-3 px-4"
                  onSubmit={handleCreatePost}
                >
                  <div className="row">
                    <div className="col-4 ps-0">
                    <div className="custom-div-1 fs-4">Tạo bài viết</div>
                      <div className="mb-3">
                        <label className="form-label">Tên bài viết: </label>
                        <input
                          className="form-control"
                          placeholder="Tên bài viết"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Ảnh minh họa:</label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => setThumbnail(e.target.files[0])}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <div className="form-label">Trạng thái: </div>
                        <div className="mb-1">
                          <input
                            type="radio"
                            value="1"
                            checked={status === 1}
                            onChange={() => setStatus(1)}
                          />
                          <span className="mx-2">Hiển thị bài viết</span>
                        </div>
                        <div className="mb-1">
                          <input
                            type="radio"
                            value="0"
                            checked={status === 0}
                            onChange={() => setStatus(0)}
                          />
                          <span className="mx-2">Ẩn bài viết</span>
                        </div>
                      </div>

                      <button className="btn btn-primary" type="submit">
                        Lưu bài viết
                      </button>

                    </div>
                    <div className="col-8 pe-0">
                      <div className="mb-3 pt-4">
                        <label className="form-label mt-3">Nội dung bài viết: </label>
                        {/* <textarea
                      className="form-control"
                      placeholder="Nội dung của bài viết"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    /> */}
                        <TinyEditor initialValue={content} onChange={handleEditorChange} height={600} />

                      </div>
                    </div>
                  </div>



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

export default CreatePost;
