import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
// import ReactPaginate from "react-js-pagination";

function ListSession() {
  const [session, setSession] = useState([]);
  let param = useParams();
  let courseId = param.courseId;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/course/getSession/" + courseId,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        const sessionsData = response.data;

        setSession(sessionsData.sessions);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user.access_token, courseId]);
  
  function handleAddVideo(e) {
    console.log(e);
    window.location.href = `/admin/list-course/list-session/add-video/${e}`;
  }
  return (
    <div className="Admin">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SidebarAdmin page="listCourse" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />

            <div className="custom-border-top list-course">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center">#</th>
                    <th className="text-nowrap text-center">
                      Số thứ tự session
                    </th>
                    <th className="text-nowrap text-center">Tên session</th>
                    <th className="text-nowrap text-center">Nội dung</th>
                    <th className="text-nowrap text-center">
                      Ngày tạo session
                    </th>
                    <th className="text-nowrap text-center">Thêm khóa học</th>
                  </tr>
                </thead>
                <tbody>
                  {session.map((session, index) => (
                    <tr key={session.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <div className="text-center">{session.arrange}</div>
                      </td>
                      <td className="text-center">{session.name}</td>
                      <td className="text-center">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: session.description,
                          }}
                        />
                      </td>

                      <td className="text-center">
                        {new Date(session.created_at).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleAddVideo(session.id)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSession;
