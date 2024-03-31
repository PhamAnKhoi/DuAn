import React from "react";
function Pay() {
  return (
    <div className="Pay">
      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-10 margin-bottom-50px">
          <p className="custom-p">Thanh toán</p>
          <div className="row">
            <div className="col-lg-7">
              <div className="custom-div-1">Thông tin thanh toán</div>
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Name"
                  />
                  <label for="floatingName">Tên khách hàng</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Địa chỉ Email</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Mật khẩu</label>
                </div>
              </div>
            </div>
            <div className="col pay-0">
              <div className="pay-1">Đơn hàng của bạn</div>
              <table className="table">
                <thead className="border-n">
                  <tr className="thead-tr">
                    <th className="border-n">Sản phẩm</th>
                    <th className="border-n">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="thead-tr">
                    <td className="border-n">sp1</td>
                    <td className="border-n">123</td>
                  </tr>
                  <tr className="thead-tr">
                    <td className="border-n">sp2</td>
                    <td className="border-n">345</td>
                  </tr>
                </tbody>
                <thead>
                  <tr className="thead-tr">
                    <th className="border-n">Thành tiền</th>
                    <th className="border-n">123123đ</th>
                  </tr>
                </thead>
              </table>
              <div>Phương thức thanh toán </div>
              <div>
                <input type="checkbox" /> Quét mã Momo
              </div>
              <div>
                <input type="checkbox" /> Quét mã Techcombank
              </div>
              <div className="pay-3">Thanh toán</div>
            </div>
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}
export default Pay;
