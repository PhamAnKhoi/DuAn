import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import axios from "axios";
import Cookies from "js-cookie";

function Cart(prop) {
  const [courses, setCourse] = useState([]);
  const [payment, setPayment] = useState("MOMO_ATM");

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  } else {
    alert("Bạn cần đăng nhập để thực hiện chức năng này.");
    window.location.href = "/login";
  }
  // const { text } = prop;

  useEffect(() => {
    axios
      .get("http://api.course-selling.id.vn/api/cart/", {
        headers: {
          "Content-Type": "multipart/form-data", //upload file
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        // Cập nhật danh sách khóa học trong giỏ
        let cart_items = response.data;
        if (cart_items.status === "ok") {
          setCourse(cart_items.courses);
        }
        console.log(cart_items.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);
  // Gửi yêu cầu GET đến API
  function removeItem(id) {
    console.log(user.access_token);
    axios
      .post(
        `http://api.course-selling.id.vn/api/cart/delete-item/${id}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        // handle response
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.error("Error removing item:", error);
      });
  }
  function order(payment) {
    // console.log(user.access_token);
    axios
      .get(
        `http://api.course-selling.id.vn/api/order/pay?payment=${payment}`,
        // {},
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        // handle response
        console.log(response.data);
        if (response.data.CheckOut !== null) {
          window.location.href = response.data.CheckOut;
        }
      })
      .catch((error) => {
        // handle error
        console.error("Error removing item:", error);
      });
  }

  return (
    <div className="container-fluid">
      <Header />
      <div className="container">
        <div className="Cart">
          <div className="row">
            <div className="col-lg-12 margin-bottom-50px">
              <p className="custom-p">Giỏ hàng</p>
              <div className="row">
                <div className="col-lg-7 border-cart">
                  {courses.length == 0 && (
                    <div className="box-cart ">
                      <div className="custom-center">
                        Chưa có sản phẩm nào trong giỏ hàng
                      </div>
                      <div className="return-cart custom-center">
                        <Link to={"/"}>QUAY TRỞ LẠI CỬA HÀNG</Link>
                      </div>
                    </div>
                  )}

                  {courses.length > 0 && (
                    <div>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th className="col-1 text-center">STT</th>
                            <th className="col-3 text-center">Hình ảnh</th>
                            <th className="col-3 text-center">Tên sản phẩm</th>
                            <th className="col-2 text-center">Giá</th>
                            <th className="col-2 text-center"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((v, i) => (
                            <tr key={i}>
                              <td className="align-content-center text-center">
                                {i + 1}
                              </td>
                              <td className="align-content-center text-center">
                                <img
                                  src={v.thumbnail}
                                  width={120}
                                  class="rounded object-fit-cover"
                                  alt=""
                                />
                              </td>
                              <td className="align-content-center text-center">
                                {v.name}
                              </td>
                              <td className="align-content-center text-center">
                                {Number(v.price).toLocaleString("vi")} vnđ
                              </td>
                              <td className="align-content-center text-center">
                                <button
                                  onClick={() => removeItem(v.id)}
                                  className="align-content-center text-center"
                                  style={{ width: "50%" }}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {/* <div className="custom-div-span">
                    <span className="custom-span-1">
                      <Link to={"/"}>
                        <a href="/#">Tiếp tục xem khóa học</a>
                      </Link>
                    </span>
                    <span className="custom-span-2">
                      <a href="/#">Cập nhật giỏ hàng</a>
                    </span>
                    <span>{text}</span>
                  </div> */}
                </div>
                <div className="col pay-0">
                  <div className="pay-1">Cộng giỏ hàng</div>
                  <div className="pay-2">
                    <span className="pay-2-1">Tổng đơn hàng</span>
                    <span className="pay-2-2">123123đ</span>
                  </div>
                  <div className="mt-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment"
                        id="momoatm"
                        checked={payment === "MOMO_ATM"}
                        onChange={() => setPayment("MOMO_ATM")}
                      />
                      <label
                        class="form-check-label"
                        for="momoatm"
                        onChange={() => setPayment("MOMO_ATM")}
                      >
                        MOMO ATM
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment"
                        id="vnpatm"
                        checked={payment === "VNPAY"}
                        onChange={() => setPayment("VNPAY")}
                      />
                      <label class="form-check-label" for="vnpatm">
                        VNPAY ATM
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment"
                        id="momoqr"
                        checked={payment === "MOMO"}
                        onChange={() => setPayment("MOMO")}
                      />
                      <label class="form-check-label" for="momoqr">
                        MOMO QR
                      </label>
                    </div>
                  </div>
                  <div className="pay-3" onClick={() => order(payment)}>
                    Tiến hành thanh toán
                  </div>
                  <div className="pay-1">
                    <i class="fa fa-tag" aria-hidden="true">
                      {" "}
                    </i>
                    <span> Phiếu ưu đãi</span>
                  </div>
                  <div className="pay-4">
                    <input type="text" placeholder="Mã ưu đãi" />
                  </div>
                  <button type="submit" value="">
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
