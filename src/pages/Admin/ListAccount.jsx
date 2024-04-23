import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { Link } from "react-router-dom";
import ReactPaginate from "react-js-pagination";


function ListAccount() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage] = useState(5); // Số bài viết trên mỗi trang

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/admin/users/",
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

        const userData = response.data;

        setUsers(userData.users);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user.access_token]);

  return (
    <div className="Admin">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <SidebarAdmin page="listUser" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />
            <div className="custom-border-top list-course">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center">#</th>
                    <th className="text-nowrap text-center">Email</th>
                    <th className="text-nowrap text-center">Username</th>
                    <th className="text-nowrap text-center">Ngày tạo</th>
                    <th className="text-nowrap text-center">Vai trò</th>
                    <th className="text-nowrap text-center">
                      Chi tiết người dùng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2 text-center">
                        <div>{user.email}</div>
                      </td>
                      <td className="p-2 text-center">
                        <div>{user.username}</div>
                      </td>
                      <td className="p-2 text-center">
                        <div>
                          {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div>{user.permission}</div>
                      </td>
                      <td className="p-2 text-center">
                        <Link to={"/admin/detail-account/" + user.id}>
                          <button className="btn bg-btn-2">Xem chi tiết</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="custom-paginate">
                <ReactPaginate
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={users.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  containerClassName={"pagination"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListAccount;
