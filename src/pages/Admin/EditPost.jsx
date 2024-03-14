import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function EditPost() {
  const user = JSON.parse(Cookies.get('user'));
  if (!user) {
    alert('Please login');
  }
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(1);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // State để lưu trữ URL của thumbnail
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the post data to be edited
    const fetchPost = async () => {
      try {
        const response = await axios.get("http://api.course-selling.id.vn/api/post/26"); // Replace 25 with the actual post ID
        const postData = response.data; // Assuming the response contains the post data
        setTitle(postData.title);
        setContent(postData.content);
        setStatus(postData.status);
        // Assuming thumbnail is a URL to the image
        // You may need to handle thumbnail differently if it's a file
        setThumbnailUrl(postData.thumbnail);
      } catch (error) {
        console.error("Failed to fetch post data: ", error);
      }
    };

    fetchPost();
  }, []); // Run once when component mounts

  // Hàm xử lý khi người dùng chọn hình ảnh mới
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
      formData.append("thumbnail", thumbnail);

      const response = await axios.post(
        "http://api.course-selling.id.vn/api/post/edit/26", // Replace 25 with the actual post ID
        // "http://nkduy.vn:88/api/post/edit/25", // Replace 25 with the actual post ID
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user.access_token}`
          }
        }
      );

      if (response.data) {
        console.log(response.data);
      }


      // Clear form after successful submission
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Có xẩy ra lỗi khi chỉnh sửa bài viết.");
      throw new Error("Có xẩy ra lỗi khi chỉnh sửa bài viết");
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleEditPost}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Thumbnail: 
          <br />
          <img src={thumbnailUrl || thumbnail} alt="" width={200} style={{ objectFit: 'cover' }} />
          <br />
          <input
            type="file"
            onChange={handleThumbnailChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="radio"
            value="1"
            checked={status === 1}
            onChange={() => setStatus(1)}
          />{" "}
          Hiện
          <input
            type="radio"
            value="0"
            checked={status === 0}
            onChange={() => setStatus(0)}
          />{" "}
          Ẩn
        </label>
        <br />
        <button type="submit">Lưu chỉnh sửa</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EditPost;
