import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="row">
      <Sidebar />
      <div className="col-lg-11">
        <div className="Home">
          <div className="container-fluid my-2">
            <div className="row box">
              <div className="col-lg-6 custom-box">
                <h2>
                  <a href="/#">Học HTML CSS cho người mới</a>
                </h2>
                <p className="text-slide">
                  Hình thức học Offline phù hợp nếu bạn muốn được hướng dẫn và
                  hỗ trợ trực tiếp tại lớp. Giờ học linh hoạt, phù hợp cả sinh
                  viên và người đi làm.
                </p>
                <button>Tham gia ngay</button>
              </div>
              <div className="col-lg-6">
                <img className="img-banner"
                  src="https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png"
                  alt=""
                />
              </div>
            </div>
            <div className="custom-text">
              <span className="text-1">Khóa học Pro</span>
              <span className="text-2">Mới</span>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://topviecit.vn/blog/wp-content/uploads/2021/11/thumb-5.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://topviecit.vn/blog/wp-content/uploads/2021/11/thumb-5.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://topviecit.vn/blog/wp-content/uploads/2021/11/thumb-5.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://topviecit.vn/blog/wp-content/uploads/2021/11/thumb-5.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS ProHTML</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
            </div>
            <div className="custom-text">
              <span className="text-1">Khóa học miễn phí</span>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://marketingai.mediacdn.vn/wp-content/uploads/2021/04/html-la-gi-1.png"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <Link to={"/course"}>
                    <img
                      className="img-item"
                      src="https://marketingai.mediacdn.vn/wp-content/uploads/2021/04/html-la-gi-1.png"
                      alt=""
                    />
                    <div className="name-course">HTML, CSS Pro</div>
                    <del className="custom-del">2.500.000đ</del>
                    <span className="price">1.800.000đ</span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://marketingai.mediacdn.vn/wp-content/uploads/2021/04/html-la-gi-1.png"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://marketingai.mediacdn.vn/wp-content/uploads/2021/04/html-la-gi-1.png"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS ProHTML</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
            </div>
            <div className="custom-text">
              <span className="text-1">Sale khóa học</span>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://blog.internshala.com/wp-content/uploads/2018/09/What-is-HTML-and-how-to-learn-it-The-complete-guide-on-HTML-basics.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://blog.internshala.com/wp-content/uploads/2018/09/What-is-HTML-and-how-to-learn-it-The-complete-guide-on-HTML-basics.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://blog.internshala.com/wp-content/uploads/2018/09/What-is-HTML-and-how-to-learn-it-The-complete-guide-on-HTML-basics.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS Pro</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div>
                  <img
                    className="img-item"
                    src="https://blog.internshala.com/wp-content/uploads/2018/09/What-is-HTML-and-how-to-learn-it-The-complete-guide-on-HTML-basics.jpg"
                    alt=""
                  />
                  <div className="name-course">HTML, CSS ProHTML</div>
                  <del className="custom-del">2.500.000đ</del>
                  <span className="price">1.800.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
