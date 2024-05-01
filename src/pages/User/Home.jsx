import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice.jsx";

function Home() {
  const [courses, setCourses] = useState([]);

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }

  // console.log(user);
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti

  useEffect(() => {
    const fetchCourses = async () => {
      var header = {};
      var user = Cookies.get("user");
      if (user !== undefined) {
        user = JSON.parse(user);
        header = {
          headers: {
            // "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      }
      try {
        const response = await axios.get(
          `http://api.course-selling.id.vn/api/course?sort=["created_at","desc"]`,
          header
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = response.data.courses;

        setCourses(coursesData);
      } catch (error) {
        console.error("Error while fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const addToCart = (id) => {
    var user = Cookies.get("user");
    if (user !== undefined) {
      user = JSON.parse(user);
    } else {
      // alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      setShowToast(true);
      setToastMessage("Bạn cần đăng nhập để thực hiện chức năng này.");
      setToastVariant("warning");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    axios
      .post(
        `http://api.course-selling.id.vn/api/cart/add-item/${id}`,
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
        // console.log(response.data);
        // alert(response.data.message);
        // console.log(response.data);
        setShowToast(true);
        setToastMessage(response.data.message);
        let variant = response.data.status === true ? "success" : "danger";
        setToastVariant(variant);
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage("Có xẩy ra lỗi khi thêm sản phẩm vào giỏ hàng");
        setToastVariant("danger");
        console.error("Error to add item:", error);
      });
  };

  return (
    <div>
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-lg-11 ">
            <div className="Home">
              <div className="container-fluid my-2">
                <div className="row box">
                  <div className="col-lg-6 custom-box">
                    <h2>
                      <a href="/#">Học HTML CSS cho người mới</a>
                    </h2>
                    <p className="text-slide">
                      Hình thức học Offline phù hợp nếu bạn muốn được hướng dẫn
                      và hỗ trợ trực tiếp tại lớp. Giờ học linh hoạt, phù hợp cả
                      sinh viên và người đi làm.
                    </p>
                    <button>Tham gia ngay</button>
                  </div>
                  <div className="col-lg-6">
                    <img
                      className="img-banner"
                      src="https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="custom-text">
                  <span className="text-1">Khóa học Pro</span>
                  <span className="text-2">Mới</span>
                  <span className="text-3 bg-btn">
                    <Link className="text-4" to={"/course"}>
                      Xem tất cả khóa học
                    </Link>
                  </span>
                </div>
                <div className="row">
                  {courses.slice(-8).map((course) => (
                    <div key={course.id} className="col-lg-3 p-0 mb-2">
                      <div className="create-border mx-1">
                        <Link to={"/detail-course/" + course.id}>
                          <img
                            className="img-item"
                            src={course.thumbnail}
                            alt={course.name}
                          />
                          <div className="name-course text-center">
                            {course.name}
                          </div>
                        </Link>
                        <span className="price">
                          <span className="me-auto">
                            {Number(course.price).toLocaleString("vi")} VND
                          </span>
                          <span
                            className="custom-icon-cart"
                            onClick={() => addToCart(course.id)}
                          >
                            <Link className="text-white">Thêm vào giỏ hàng</Link>
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
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

export default Home;
