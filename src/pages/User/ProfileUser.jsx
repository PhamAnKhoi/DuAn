import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactPaginate from "react-js-pagination";
import ToastMessage from "../../components/notifice";

function ProfileUser() {
  const [users, setUsers] = useState(JSON.parse(Cookies.get("user")));
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [current_password, setCurrent_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  useEffect(() => {
    var user = Cookies.get("user");
    if (user !== undefined) {
      user = JSON.parse(user);
      setUsers(user);
      setProfile(user.data.profile);
    }
    axios
      .get("http://api.course-selling.id.vn/api/account/myOrder", {
        headers: {
          "Content-Type": "multipart/form-data", //upload file
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        setData(response.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleChangePass = async (e) => {
    if (new_password.length < 6) {
      setShowToast(true);
      setToastMessage("Mật khẩu ít nhất 6 kí tự!");
      setToastVariant("danger");
    } else {
      if (new_password !== confirm_password) {
        setShowToast(true);
        setToastMessage("Mật khẩu không trùng khớp!");
        setToastVariant("danger");
      } else {
        var user = Cookies.get("user");
        if (user !== undefined) {
          user = JSON.parse(user);
          setUsers(user);
          setProfile(user.data.profile);
        }
        e.preventDefault();
        // console.log(`Bearer ${user.access_token}`);
        try {
          const formData = new FormData();
          formData.append("current_password", current_password);
          formData.append("new_password", new_password);

          const response = await axios.post(
            "http://api.course-selling.id.vn/api/account/change-pass",
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
            setCurrent_password("");
            setNew_password("");
            setConfirm_password("");
            
          } else {
            setShowToast(true);
            setToastMessage(response.data.message);
            setToastVariant("danger");
          }
        } catch (error) {}
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-lg-11 Profile">
            <div className="box-wrapper">
              <div className="box-1"></div>
              <div className="box-2 pt-5 position-relative">
                <div
                  style={{ top: "-50px", left: "50px" }}
                  className="position-absolute col-6 d-flex align-items-center flex-row"
                >
                  <img
                    className="img-avt"
                    src={users.avata}
                    height={150}
                    alt=""
                  />
                  <h1 className="ms-3">{users.data.username}</h1>
                </div>
                <div>
                  <div className="row py-4 mt-5">
                    <div className="col-lg-3 mb-3 box-into">
                      <p className="custom-p">
                        <strong>Thông tin cá nhân</strong>
                      </p>
                      <p>
                        Họ và tên: {profile.lastname} {profile.firstname}
                      </p>
                      <p>Tên đăng nhập: {users.data.username}</p>
                      <p>Email: {users.data.email}</p>
                      <p>Số điện thoại: {profile.phone}</p>
                      <p>Giới tính: {profile.gender === 1 ? "Nam" : "Nữ"}</p>
                      <p>Địa chỉ: {profile.address}</p>
                      <p>
                        Ngày tạo:{" "}
                        {new Date(users.data.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col mb-3 ms-3">
                      <div className="col-lg-12 mb-3 box-into">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col" className="text-center">
                                #
                              </th>
                              <th scope="col" className="text-center">
                                Mã đơn hàng
                              </th>
                              <th scope="col" className="text-center">
                                Mã giảm giá
                              </th>
                              <th scope="col" className="text-center">
                                Thanh toán
                              </th>
                              <th scope="col" className="text-center">
                                Tổng tiền
                              </th>
                              <th scope="col" className="text-center">
                                Trạng thái
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((order, index) => (
                              <tr key={order.id}>
                                <th className="text-center" scope="row">
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </th>
                                <td className="text-center">
                                  {order.order_id}
                                </td>
                                <td className="text-center">{order.voucher}</td>
                                <td className="text-center">
                                  {order.payment_method}
                                </td>
                                <td className="text-center">
                                  {Number(order.total_amount).toLocaleString(
                                    "vi"
                                  )}
                                  đ
                                </td>
                                <td className="text-center">
                                  {order.status === 1 ? (
                                    <div className="custom-status-1">
                                      Đã thanh toán
                                    </div>
                                  ) : (
                                    <div className="custom-status-2">
                                      <a
                                        className="text-white text-decoration-none"
                                        href={order.checkoutUrl}
                                      >
                                        Chưa thanh toán
                                      </a>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="custom-paginate">
                          <ReactPaginate
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={data.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                          />
                        </div>
                      </div>
                      <form
                        className="col-lg-12 box-into"
                        
                      >
                        <div className="custom-p">
                          <strong>Thay đổi thông tin</strong>
                        </div>
                        <div className="mb-3 mx-3">
                          <label className="form-label">Nhập mật khẩu cũ</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu cũ"
                            value={current_password}
                            onChange={(e) =>
                              setCurrent_password(e.target.value)
                            }
                          />
                        </div>
                        <div className="mb-3 mx-3">
                          <label className="form-label">Nhập mật mới</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu mới"
                            value={new_password}
                            onChange={(e) => setNew_password(e.target.value)}
                          />
                        </div>
                        <div className="mb-3 mx-3">
                          <label className="form-label">
                            Xác nhận mật khẩu
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Xác nhận mật khẩu"
                            value={confirm_password}
                            onChange={(e) =>
                              setConfirm_password(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <button type="button" onClick={handleChangePass} className="mb-3 mx-3 btn-center btn bg-btn">
                            Đổi mật khẩu
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileUser;
