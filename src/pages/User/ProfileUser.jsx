import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import axios from "axios";
// import ReactPaginate from "react-js-pagination";

function ProfileUser() {
  const [users, setUsers] = useState(JSON.parse(Cookies.get("user")));
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);
  console.log(data);

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
                      <p className=""><strong>Giới thiệu</strong></p>
                      <p>
                        Họ và tên: {profile.lastname} {profile.firstname}
                      </p>
                      <p>Tên đăng nhập: {users.data.username}</p>
                      <p>Email: {users.data.email}</p>
                      <p>Số điện thoại: {profile.phone}</p>
                      <p>Giới tính: {profile.gender === 1 ? "Nam" : "Nữ"}</p>
                      <p>Địa chỉ: {profile.address}</p>
                    </div>
                    <div className="col ms-3 box-into">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Mã giảm giá</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thanh toán</th>
                            <th scope="col">Tổng tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((order, index) => (
                            <tr key={order.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{order.username}</td>
                              <td>{order.order_id}</td>
                              <td>{order.voucher}</td>
                              <td>
                                {order.status === 1 ? (
                                  <div>Đã thanh toán</div>
                                ) : (
                                  <a href={order.checkoutUrl}>Chưa thanh toán</a>
                                )}
                              </td>
                              <td>{order.payment_method}</td>
                              <td>{order.total_amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
