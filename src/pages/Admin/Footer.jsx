import React from "react";
import logo from "./logo.png";

function Footer() {
  return (
    <div className="Footer">
      <div className="bg-black text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <div className="row my-5">
                <div className="col-lg-3">
                  <div className="custom-text m-footer">
                    <a href="/#">
                      <img className="logoBEE" src={logo} alt="" />
                    </a>
                    <span className="mx-2">Học lập trình để đi làm</span>
                  </div>
                  <div className="color-text">
                    <div>
                      Điện thoại: <a href="/#">0391231234</a>
                    </div>
                    <div>
                      Email: <a href="/#">khoi123@gmail.com</a>
                    </div>
                    <div>
                      Địa chỉ: Đường Trung Mỹ Tây - Phường Trung Mỹ Tây - Quận
                      12 - Thành Phố Hồ Chí Minh.
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="m-footer">VỀ BEE UNI</div>
                  <div>
                    <div>
                      <a href="/#">Giới thiệu</a>
                    </div>
                    <div>
                      <a href="/#">Liên hệ</a>
                    </div>
                    <div>
                      <a href="/#">Điều khoản</a>
                    </div>
                    <div>
                      <a href="/#">Bảo mật</a>
                    </div>
                    <div>
                      <a href="/#">Cơ hội việc làm</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="m-footer">CÔNG CỤ</div>
                  <div>
                    <div className="color-text">
                      <a href="/#">Tạo CV</a>
                    </div>
                    <div>
                      <a href="/#">Rút gọn link</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="m-footer">CÁC SẢN PHẨM</div>
                  <div>
                    <a href="/#">Chưa update</a>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="m-footer">
                    CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC BEE
                  </div>
                  <div>
                    <div className="color-text">Mã số thuế: 123123</div>
                    <div className="color-text">Ngày thành lập: 03/01/2024</div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-lg-6 color-text">
                  © 2018 - 2024 BEE. Nền tảng học lập trình hàng đầu Việt Nam.
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-2">
                  <a href="/#">
                    <img
                      className="logofb-gmail"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                      alt=""
                    />
                  </a>
                  <a href="/#">
                    <img
                      className="logofb-gmail"
                      src="https://logowik.com/content/uploads/images/gmail-new-icon5198.jpg"
                      alt=""
                    />
                  </a>
                  <a href="/#">
                    <img className="logofb-gmail" src={logo} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
