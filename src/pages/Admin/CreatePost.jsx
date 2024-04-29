import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import TinyEditor from "../../components/editor";
import ToastMessage from "../../components/notifice";

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
  const [likes, setLike] = useState("");
  const [views, setView] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti
  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("likes", likes);
      formData.append("views", views);
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
      console.log(response.data);
      if (response.data.status) {
        // console.log(response.data);
        // alert("Tạo bài viết thành công!");
        setShowToast(true);
        setToastMessage("Tạo bài viết thành công!");
        setToastVariant("success");
        // window.location.href = "/admin/create-post";
        setTimeout(() => {
          window.location.href = "/admin/create-post";
        }, 1000);
      } else {
        setShowToast(true);
        setToastMessage("Có lỗi xẩy ra khi đăng nhập!");
        setToastVariant("danger");
      }
      setTitle("");
      setContent("");
      setLike("");
      setView("");
      setStatus(1);
      setThumbnail(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Fail to create post: ", error);
      // setErrorMessage("Có xẩy ra lỗi khi tạo bài viết.");
      setShowToast(true);
      setToastMessage("Có xẩy ra lỗi khi tạo bài viết");
      setToastVariant("danger");
    }
  };
  const handleEditorChange = (Content) => {
    setContent(Content);
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
            <SidebarAdmin page="createPost" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />

            <div className="w-100">
              <form
                className="custom-form w-100 m-0 mt-3 w-100 py-3 px-4"
                onSubmit={handleCreatePost}
              >
                <div className="row">
                  <div className="custom-div-1 fs-4">Tạo bài viết</div>
                  <div className="col-lg-4 ps-0">
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
                      <label className="form-label">Lượt yêu thích: </label>
                      <input
                        className="form-control"
                        placeholder="Lượt yêu thích"
                        type="number"
                        value={likes}
                        onChange={(e) => setLike(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Lượt xem: </label>
                      <input
                        className="form-control"
                        placeholder="Lượt xem"
                        type="number"
                        value={views}
                        onChange={(e) => setView(e.target.value)}
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
                    <button className="btn bg-btn" type="submit">
                      Lưu bài viết
                    </button>
                  </div>
                  <div className="col-lg pe-0">
                    <div className="mb-3">
                      <label className="form-label">Nội dung bài viết: </label>
                      <TinyEditor
                        initialValue={content}
                        onChange={handleEditorChange}
                        height={600}
                      />
                    </div>
                  </div>
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
