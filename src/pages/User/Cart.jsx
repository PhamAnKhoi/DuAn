import React from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="/#">{text}</a>,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Thành tiền",
    dataIndex: "total",
    key: "total",
    render: (text, record) => record.price * record.quantity,
  },
  {
    title: "Trạng thái",
    key: "action",
    render: () => (
      <Space size="middle">
        <a href="/#">Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    price: 92,
    quantity: 2,
  },
  {
    key: "1",
    name: "John Brown",
    price: 92,
    quantity: 2,
  },
  {
    key: "1",
    name: "John Brown",
    price: 92,
    quantity: 2,
  },
  {
    key: "1",
    name: "John Brown",
    price: 92,
    quantity: 2,
  },
  {
    key: "2",
    name: "Jim Green",
    price: 42,
    quantity: 1,
  },
];
function Cart(prop) {
  const { text } = prop;
  console.log(text);
  return (
    <div className="Cart">
      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-10 margin-bottom-50px">
          <p className="custom-p">Giỏ hàng</p>
          <div className="row">
            <div className="col-lg-7 border-cart">
              {/* <div className="box-cart ">
                <div className="custom-center">
                  Chưa có sản phẩm nào trong giỏ hàng
                </div>
                <div className="return-cart custom-center">
                  <a href="/#">QUAY TRỞ LẠI CỬA HÀNG</a>
                </div>
              </div> */}
              <Table columns={columns} dataSource={data} pagination={false} />
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
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}
export default Cart;
