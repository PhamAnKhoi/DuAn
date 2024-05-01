import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";

function Progress() {
  return (
    <div>
      <div className="container-fluid">
        <Header />
        <div className="row Sidebar">
          <Sidebar />
          <div className="col-lg-11 Progress">
            <div className="row">
              <div className="col-lg-11">
                <div className="text-div1">Lộ trình học</div>
                <div className="">
                  Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ
                  trình học. Ví dụ: Để đi làm với vị trí "Lập trình viên
                  Front-end" bạn  nên tập trung vào lộ trình "Front-end".
                </div>
                <div className="row">
                  <div className="col-lg-5 box">
                    <div className="text-div3">Lộ trình học Front-end</div>
                    <div className="row">
                      <div className="col-lg-8 my-3">
                        Lập trình viên Front-end là người xây dựng ra giao diện
                        websites. Trong phần này BEE sẽ chia sẻ cho bạn lộ trình
                        để trở thành lập trình viên Front-end nhé.
                      </div>
                      <div className="col-lg-3 image my-4">
                        <img
                          className=""
                          src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-div-a">
                      <a href="/#" className="box-a">
                        Xem chi tiết
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-5 box mx-3">
                    <div className="text-div3">Lộ trình học Back-end</div>
                    <div className="row">
                      <div className="col-lg-8 my-3">
                        Trái với Front-end thì lập trình viên Back-end là người
                        làm việc với dữ liệu, công việc thường nặng tính logic
                        hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học
                        Back-end nhé.
                      </div>
                      <div className="col-lg-3 image my-4">
                        <img
                          className=""
                          src="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-div-a">
                      <a href="/#" className="box-a">
                        Xem chi tiết
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-10">
                    <div className="text-div4">
                      Tham gia cộng đồng học viên BEE trên Facebook
                    </div>
                    <div className="text-div5">
                      Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy
                      tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình
                      học nhé.
                    </div>
                    <div className="text-div-a-none">
                      <a href="/#" className="box-a">
                        Tham gia ngay
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="img-decorate">
                      <img
                        src="https://fullstack.edu.vn/static/media/fb-group-cards.4bd525b1b8baf7b1e5a2.png"
                        alt=""
                      />
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

export default Progress;
