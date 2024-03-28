// import React, { useState } from "react";
// import axios from "axios";

// function EditCourse() {
//   const [course, setCourse] = useState({
//     name: "",
//     description: "",
//     price: "",
//     views: "",
//     status: "",
//     thumbnail: null,
//     videoDemo: null,
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourse((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setCourse((prevState) => ({
//       ...prevState,
//       [name]: files[0],
//     }));
//   };

//   const handleEditCourse = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", course.name);
//     formData.append("description", course.description);
//     formData.append("price", course.price);
//     formData.append("views", course.views);
//     formData.append("status", course.status);
//     formData.append("thumbnail", course.thumbnail);
//     formData.append("video_demo_url", course.videoDemo);

//     try {
//       const response = await axios.post(
//         "http://api.course-selling.id.vn/api/course/edit/id_course",
//         formData
//       );
//       const { data } = response.data;
//       setMessage(data.message);
//       // Xử lý dữ liệu trả về nếu cần thiết
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h3>Edit Course</h3>
//       <form onSubmit={handleEditCourse}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={course.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={course.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             type="number"
//             name="price"
//             value={course.price}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Views:</label>
//           <input
//             type="number"
//             name="views"
//             value={course.views}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Status:</label>
//           <select name="status" value={course.status} onChange={handleChange}>
//             <option value="1">Active</option>
//             <option value="0">Inactive</option>
//           </select>
//         </div>
//         <div>
//           <label>Thumbnail:</label>
//           <input type="file" name="thumbnail" onChange={handleFileChange} />
//         </div>
//         <div>
//           <label>Video Demo:</label>
//           <input type="file" name="videoDemo" onChange={handleFileChange} />
//         </div>
//         <button type="submit">Save</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default EditCourse;
