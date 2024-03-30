import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";

function Cart(prop) {
  const { text } = prop;
  console.log(text);
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
                  {/* <div className="box-cart ">
                    <div className="custom-center">
                      Chưa có sản phẩm nào trong giỏ hàng
                    </div>
                    <div className="return-cart custom-center">
                      <Link to={"/"}>QUAY TRỞ LẠI CỬA HÀNG</Link>
                    </div>
                  </div> */}
                  <div>
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th className="col-1 text-center">STT</th>
                          <th className="col-3 text-center">Hình ảnh</th>
                          <th className="col-3 text-center">Tên bài viết</th>
                          <th className="col-2 text-center">Giá</th>
                          <th className="col-2 text-center">Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {courses.map((course, index) => ( */}
                        {/* <tr key={course.id}> */}
                        <tr>
                          <td>{1}</td>
                        </tr>
                        {/* ))} */}
                      </tbody>
                    </table>
                  </div>
                  <div className="custom-div-span">
                    <span className="custom-span-1">
                      <Link to={"/"}>
                        <a href="/#">Tiếp tục xem khóa học</a>
                      </Link>
                    </span>
                    <span className="custom-span-2">
                      <a href="/#">Cập nhật giỏ hàng</a>
                    </span>
                    <span>{text}</span>
                  </div>
                </div>
                <div className="col pay-0">
                  <div className="pay-1">Cộng giỏ hàng</div>
                  <div className="pay-2">
                    <span className="pay-2-1">Tổng đơn hàng</span>
                    <span className="pay-2-2">123123đ</span>
                  </div>
                  <Link to={"/pay"}>
                    <div className="pay-3">Tiến hành thanh toán</div>
                  </Link>
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
