import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function CreateCourse() {
    const user = Cookies.get('user');
    var auth = null;
    if (user !== undefined) {
        auth = user.permission;
        if (auth !== "ADMIN" || auth !== 'TEACHER') {
            alert(`Bạn là ${user.permission}. Tài khoản của bạn không có quyền truy cập chức năng này`);
            document.location.href = '/'
        }
    } 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(1);
    const [thumbnail, setThumbnail] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    console.log(`Bearer ${user.access_token}`);
    const handleCreateCourse = async (e) => {
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
                        "Content-Type": "multipart/form-data",//upload file
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
            );

            if (response.data) {
                console.log(response.data);
            }

            // Clear form after successful submission
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
        <div>
            <h1>Create Course</h1>
            <form onSubmit={handleCreateCourse}>
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
                    <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
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
                <button type="submit">Lưu bài viết</button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default CreateCourse;