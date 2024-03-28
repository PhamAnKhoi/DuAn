// import React, { useState } from "react";
// import axios from "axios";
// import HeaderAdmin from "./HeaderAdmin";
// import SidebarAdmin from "./SidebarAdmin";

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
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="Admin">
//       <div className="container-scroller">
//         <div className="HeaderAdmin SidebarAdmin">
//           <HeaderAdmin />
//           <div className="container-fluid page-body-wrapper">
//             <SidebarAdmin />
//             <form className="custom-form m-auto" onSubmit={handleEditCourse}>
//               <div className="custom-div-1">Chỉnh sửa khóa học</div>
//               <div className="mb-3">
//                 <label className="form-label">Tên bài viết: </label>
//                 <input
//                   className="form-control"
//                   placeholder="Chỉnh sửa khóa học"
//                   type="text"
//                   name="name"
//                   value={course.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Giá: </label>
//                 <input
//                   className="form-control"
//                   placeholder="Chỉnh sửa giá khóa học"
//                   type="number"
//                   name="price"
//                   value={course.price}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Mô tả: </label>
//                 <textarea
//                   className="form-control"
//                   placeholder="Chỉnh sửa mô tả"
//                   name="description"
//                   value={course.description}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Lượt xem: </label>
//                 <input
//                   className="form-control"
//                   placeholder="Chỉnh sửa lượt xem"
//                   type="number"
//                   name="views"
//                   value={course.views}
//                   onChange={handleChange}
//                 />
//               </div>
//               {/* <div className="mb-3">
//                 <div className="form-label"> Trạng thái: </div>
//                 <div className="mb-1">
//                   <input
//                     type="radio"
//                     value="1"
//                     checked={status === 1}
//                     onChange={() => setStatus(1)}
//                   />
//                   <span className="mx-2">Hiển thị khóa học</span>
//                 </div>
//                 <div className="mb-1">
//                   <input
//                     type="radio"
//                     value="0"
//                     checked={status === 0}
//                     onChange={() => setStatus(0)}
//                   />
//                   <span className="mx-2">Ẩn khóa học</span>
//                 </div>
//               </div> */}
//               <div>
//                 <select
//                   name="status"
//                   value={course.status}
//                   onChange={handleChange}
//                 >
//                   <option value="1">Active</option>
//                   <option value="0">Inactive</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Thumbnail:</label>
//                 <input
//                   type="file"
//                   name="thumbnail"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <div>
//                 <label>Video Demo:</label>
//                 <input
//                   type="file"
//                   name="videoDemo"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <button className="btn btn-primary" type="submit">
//                 Save
//               </button>
//               {message && <p>{message}</p>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditCourse;
