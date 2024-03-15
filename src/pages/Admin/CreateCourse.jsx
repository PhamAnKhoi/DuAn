// import { useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";

// function CreateCourse() {
//   const user = Cookies.get("user");
//   var auth = null;
//   if (user !== undefined) {
//     auth = user.permission;
//     if (auth !== "ADMIN" || auth !== "TEACHER") {
//       alert(
//         `Bạn là ${user.permission}. Tài khoản của bạn không có quyền truy cập chức năng này`
//       );
//       document.location.href = "/";
//     }
//   } else {
//     alert(
//         `Hãy đăng nhập trước khi truy cập chức năng này.`
//       );
//     document.location.href = "/admin/login";
//   }
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [status, setStatus] = useState(1);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleCreateCourse = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       formData.append("status", status);
//       formData.append("thumbnail", thumbnail);

//       const response = await axios.post(
//         "http://api.course-selling.id.vn/api/post/create",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", //upload file
//             Authorization: `Bearer ${user.access_token}`,
//           },
//         }
//       );

//       if (response.data) {
//         console.log(response.data);
//       }

//       // Clear form after successful submission
//       setTitle("");
//       setContent("");
//       setStatus(1);
//       setThumbnail(null);
//       setErrorMessage("");
//     } catch (error) {
//       console.error("Fail to create post: ", error);
//       setErrorMessage("Có xẩy ra lỗi khi tạo bài viết.");
//     }
//   };

//   return (
//     <div>
//       <h1>Create Course</h1>
//       <form onSubmit={handleCreateCourse}>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Content:
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Thumbnail:
//           <input
//             type="file"
//             onChange={(e) => setThumbnail(e.target.files[0])}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Status:
//           <input
//             type="radio"
//             value="1"
//             checked={status === 1}
//             onChange={() => setStatus(1)}
//           />{" "}
//           Hiện
//           <input
//             type="radio"
//             value="0"
//             checked={status === 0}
//             onChange={() => setStatus(0)}
//           />{" "}
//           Ẩn
//         </label>
//         <br />
//         <button type="submit">Lưu bài viết</button>
//         {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default CreateCourse;



import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function CreateCourse() {
    var user = Cookies.get("root");
    var auth = null;
    if (user !== undefined) {
        user = JSON.parse(user);
        // console.log(user.permission);
        auth = user.permission;
        // console.log(auth !== "ADMIN");
        // console.log(auth !== "TEACHER");
        if (auth !== "ADMIN" && auth !== "TEACHER") {
            alert(
                `Bạn là ${auth}. Tài khoản của bạn không có quyền truy cập chức năng này`
            );
            document.location.href = "/";
        }
    } else {
        alert(
            `Hãy đăng nhập trước khi truy cập chức năng này.`
        );
        document.location.href = "/admin/login";
    }
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [views, setViews] = useState("");
    const [status, setStatus] = useState(1);
    const [thumbnail, setThumbnail] = useState(null);
    const [videoDemoUrl, setVideoDemoUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateCourse = async (e) => {
        e.preventDefault();
console.log(`Bearer ${user.access_token}`);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("views", views);
            formData.append("status", status);
            formData.append("thumbnail", thumbnail);
            formData.append("video_demo_url", videoDemoUrl);

            const response = await axios.post(
                "http://api.course-selling.id.vn/api/course/create",
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

            // Clear form after successful submission
            // setName("");
            // setDescription("");
            // setPrice("");
            // setViews("");
            // setStatus(1);
            // setThumbnail(null);
            // setVideoDemoUrl("");
            // setErrorMessage("");
        } catch (error) {
            console.error("Fail to create course: ", error);
            setErrorMessage("Có xẩy ra lỗi khi tạo khóa học này.");
        }
    };

    return (
        <div>
          <h1>Create Course</h1>
          <form onSubmit={handleCreateCourse}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Views:
              <input
                type="number"
                value={views}
                onChange={(e) => setViews(e.target.value)}
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
              Video Demo:
              <input
                type="file"
                onChange={(e) => setVideoDemoUrl(e.target.files[0])}
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
            <button type="submit">Lưu khóa học</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        </div>
      );
}

export default CreateCourse;
