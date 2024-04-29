import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice.jsx";

function Cart() {
  const [courses, setCourse] = useState([]);
  const [payment, setPayment] = useState("MOMO_ATM");
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti

  let totalAmount = 0;
  for (let i = 0; i < courses.length; i++) {
    totalAmount += courses[i].price;
  }

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
        if (cart_items.status === true) {
          setCourse(cart_items.courses);
          // console.log(cart_items.  courses);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [user.access_token]);
  // Gửi yêu cầu GET đến API
  function removeItem(id) {
    // console.log(user.access_token);
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
        setShowToast(true);
        setToastMessage(response.data.message);
        let variant = response.data.status === true ? "success" : "danger";
        setToastVariant(variant);
        // console.log(response);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
        if (response.data.CheckOut !== null) {
          setShowToast(true);
          setToastMessage(
            "Đơn hàng đã được tạo thành công.  Đang chuyển hướng đến trang thanh toán..."
          );
          setToastVariant("success");
          setTimeout(() => {
            window.location.href = response.data.CheckOut;
          }, 2000);
        }
      })
      .catch((error) => {
        // handle error
        setShowToast(true);
        setToastMessage("Có xẩy ra lỗi khi tạo đơn hàng vui lòng thử lại sau.");
        setToastVariant("danger");
        console.error("Error removing item:", error);
      });
  }

  return (
    <div className="container-fluid">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <Header />
      <div className="container">
        <div className="Cart">
          <div className="row">
            <div className=" col-lg-12 margin-bottom-50px">
              <p className="custom-p">Giỏ hàng</p>
              <div className="mt-2 mb-3">
                <Link className="text-black" to={"/"}><i className="fa fa-arrow-left me-2" aria-hidden="true"></i>Quay lại trang chủ</Link>
              </div>
              <div className="row">
                <div className="col-lg-7 border-cart">
                  {courses.length === 0 && (
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
                                  className="rounded object-fit-cover"
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
                </div>
                <div className="col pay-0">
                  <div className="pay-1">Cộng giỏ hàng</div>
                  <div className="pay-2">
                    <span className="pay-2-1">Tổng đơn hàng</span>
                    <span className="pay-2-2">
                      {totalAmount.toLocaleString("vi")} vnđ
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="momoatm"
                        checked={payment === "MOMO_ATM"}
                        onChange={() => setPayment("MOMO_ATM")}
                      />
                      <label
                        className="form-check-label"
                        for="momoatm"
                        onChange={() => setPayment("MOMO_ATM")}
                      >
                        MOMO ATM
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="vnpatm"
                        checked={payment === "VNPAY"}
                        onChange={() => setPayment("VNPAY")}
                      />
                      <label className="form-check-label" for="vnpatm">
                        VNPAY ATM
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="momoqr"
                        checked={payment === "MOMO"}
                        onChange={() => setPayment("MOMO")}
                      />
                      <label className="form-check-label" for="momoqr">
                        MOMO QR
                      </label>
                    </div>
                  </div>
                  <Link>
                    <div className="pay-3" onClick={() => order(payment)}>
                      Tiến hành thanh toán
                    </div>
                  </Link>
                  <div className="pay-1">
                    <i className="fa fa-tag" aria-hidden="true">
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
