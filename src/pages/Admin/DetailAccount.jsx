import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import { useParams } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import ToastMessage from "../../components/notifice";

function DetailAccount() {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [role, setRole] = useState([]);
  const [role_id, setRole_id] = useState(null);
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti

  let param = useParams();
  let userId = param.userId;
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
  }
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://api.course-selling.id.vn/api/admin/user/" + userId,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        const role = await axios.get(
          "http://api.course-selling.id.vn/api/admin/get-role",
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
        if (role.status !== 200) {
          throw new Error("Failed to fetch role");
        }

        const userData = response.data;
        const roleData = role.data;
        setRole(roleData.roles);
        setUsers(userData.data);
        setProfile(userData.data.profile);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, [user.access_token, userId]);

  const handleChangeRole = async (e) => {
    e.preventDefault();
    // console.log(`Bearer ${user.access_token}`);
    console.log(role_id);
    console.log(userId);

    if (role_id === null) {
      setShowToast(true);
      setToastMessage("Bạn chưa chọn vai trò khác");
      setToastVariant("danger");
    } else {
      try {
        const formData = new FormData();
        formData.append("role_id", role_id);
        formData.append("user_id", userId);
        const response = await axios.post(
          "http://api.course-selling.id.vn/api/admin/set-role",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", //upload file
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        if (response.data.status) {
          setShowToast(true);
          setToastMessage(response.data.message);
          setToastVariant("success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setShowToast(true);
          setToastMessage(response.data.message);
          setToastVariant("danger");
        }
      } catch (error) {}
    }
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
            <SidebarAdmin page="listUser" />
          </div>
          <div className="col py-1">
            <HeaderAdmin />
            <div className="custom-border-top detail-account">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-nowrap text-center">Ảnh đại diện</th>
                    <th className="text-nowrap text-center">Tên tài khoản</th>
                    <th className="text-nowrap text-center">Tên</th>
                    <th className="text-nowrap text-center">Họ</th>
                    <th className="text-nowrap text-center">Email</th>
                    <th className="text-nowrap text-center">Ngày tạo</th>
                    <th className="text-nowrap text-center">Giới tính</th>
                    <th className="text-nowrap text-center">Số điện thoại</th>
                    <th className="text-nowrap text-center">Địa chỉ</th>
                    <th className="text-nowrap text-center">Vai trò</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <img
                        className="img-avt"
                        src={profile["avata_img"]}
                        alt=""
                      />
                    </td>
                    <td className="text-center custom-table">
                      <div>{users.username}</div>
                    </td>
                    <td className="text-center custom-table">
                      <div>
                        <div>{profile["firstname"]}</div>
                      </div>
                    </td>
                    <td className="text-center custom-table">
                      <div>{profile["lastname"]}</div>
                    </td>
                    <td className="text-center custom-table">
                      <div>{users.email}</div>
                    </td>
                    <td className="text-center custom-table">
                      <div>
                        {new Date(users.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="text-center custom-table">
                      <div>{profile["gender"] === 1 ? "Nam" : "Nữ"}</div>
                    </td>
                    <td className="text-center custom-table">
                      <div>{profile["phone"]}</div>
                    </td>
                    <td className="text-center custom-table">
                      <div>{profile["address"]}</div>
                    </td>
                    <td className="text-center custom-table">
                      <select
                        value={role_id}
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setRole_id(e.target.value)}
                      >
                        {role.map((role, index) => (
                          <option
                            value={role.id}
                            key={role.id}
                            selected={role.name === users.permission}
                          >
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="button"
                className="btn bg-btn float-end"
                onClick={handleChangeRole}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailAccount;
