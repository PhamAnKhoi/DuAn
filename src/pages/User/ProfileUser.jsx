import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactPaginate from "react-js-pagination";

function ProfileUser() {
  const [users, setUsers] = useState(JSON.parse(Cookies.get("user")));
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    var user = Cookies.get("user");
    if (user !== undefined) {
      user = JSON.parse(user);
      console.log(user);
      console.log(user.data.profile);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
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
                    <div className="col-lg-3 box-into">
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
                    <div className="col ms-3 box-into">
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
                              <td className="text-center">{order.order_id}</td>
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
