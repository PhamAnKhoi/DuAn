// import Cookies from "js-cookie";
// import React from "react";
// import { Link } from "react-router-dom";
// function Sidebar() {
//   var user = Cookies.get("user");
//   if (user !== undefined) {
//     user = JSON.parse(user);
//   }
//   return (
//     <div className=" col-lg-1">
//       <div className="Sidebar">
//         <ul className="list-unstyled">
          // {user &&
          //   (user.permission === "ADMIN" || user.permission === "TEACHER") && (
          //     <li className="custom-center my-2">
          //       <div className="custom-box-1">
          //         <Link className="custom-link text-black" to={"/admin"}>
          //           {/* <i
          //             className="fa fa-plus custom-center custom-icon"
          //             aria-hidden="true"
          //           ></i> */}
          //           <i className="fa fa-user-tie custom-center custom-icon" aria-hidden="true"></i>
          //           <p className="custom-center custom-text"><strong>ADMIN</strong></p>
          //         </Link>
          //       </div>
          //     </li>
          //   )}
          // <li className="custom-center my-2">
          //   <div className="custom-box-1">
          //     <Link className="custom-link" to={"/"}>
          //       <i
          //         className="fa fa-home custom-center custom-icon"
          //         aria-hidden="true"
          //       ></i>
          //       <p className="custom-center custom-text">Trang chủ</p>
          //     </Link>
          //   </div>
          // </li>
          // <li className="custom-center my-2">
          //   <div className="custom-box-1">
          //     <Link className="custom-link" to={"/progress"}>
          //       <i
          //         className="fa fa-road custom-center custom-icon"
          //         aria-hidden="true"
          //       ></i>
          //       <p className="custom-center custom-text">Lộ trình</p>
          //     </Link>
          //   </div>
          // </li>
          // <li className="custom-center my-2">
          //   <div className="custom-box-1">
          //     <Link className="custom-link" to={"/post"}>
          //       <i
          //         className="fa fa-newspaper-o custom-center custom-icon"
          //         aria-hidden="true"
          //       ></i>
          //       <p className="custom-center custom-text">Bài viết</p>
          //     </Link>
          //   </div>
          // </li>
          // <li className="custom-center my-2">
          //   <div className="custom-box-1">
          //     <Link className="custom-link" to={"/course"}>
          //       <i
          //         className="fa fa-graduation-cap custom-center custom-icon"
          //         aria-hidden="true"
          //       ></i>
          //       <p className="custom-center custom-text">Khóa học</p>
          //     </Link>
          //   </div>
          // </li>
          // <li className="custom-center my-2">
          //   <div className="custom-box-1">
          //     <Link className="custom-link" to={"/my-course"}>
          //       <i
          //         className="fa fa-graduation-cap custom-center custom-icon"
          //         aria-hidden="true"
          //       ></i>
          //       <p className="custom-center custom-text-my-course">Khóa học của tôi</p>
          //     </Link>
          //   </div>
          // </li>
          // <li className="custom-center my-2">
          //   <div className="custom-box-1">
          //     <Link className="custom-link" to={"/cart"}>
          //       <i
          //         className="fa fa-cart-plus custom-center custom-icon"
          //         aria-hidden="true"
          //       ></i>
          //       <p className="custom-center custom-text">Giỏ hàng</p>
          //     </Link>
          //   </div>
          // </li>
//         </ul>
//       </div>
//     </div>
//   );

// }

// export default Sidebar;

import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="col-lg-1">
      <div className="Sidebar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleMenuToggle}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse${isMenuOpen ? " show" : ""}`}
          >
            <ul className="navbar-nav flex-column">
              {/* {user &&
                (user.permission === "ADMIN" ||
                  user.permission === "TEACHER") && (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/admin"}>
                      <i
                        className="fa fa-user-tie"
                        aria-hidden="true"
                      />
                      <span>ADMIN</span>
                    </Link>
                  </li>
                )}
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  <i className="fa fa-home" aria-hidden="true" />
                  <span className="">Trang chủ</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/progress"}>
                  <i className="fa fa-road" aria-hidden="true" />
                  <span>Lộ trình</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/post"}>
                  <i className="fa fa-newspaper-o" aria-hidden="true" />
                  <span>Bài viết</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/course"}>
                  <i className="fa fa-graduation-cap" aria-hidden="true" />
                  <span>Khóa học</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/my-course"}>
                  <i className="fa fa-graduation-cap" aria-hidden="true" />
                  <span>Khóa học của tôi</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/cart"}>
                  <i className="fa fa-cart-plus" aria-hidden="true" />
                  <span>Giỏ hàng</span>
                </Link>
              </li>
              <li className="my-2">
             <div className="custom-center custom-box-1">
               <Link className="custom-link" to={"/cart"}>
                 <i
                   className="fa fa-cart-plus custom-center custom-icon"
                   aria-hidden="true"
                 ></i>
                 <p className="custom-center custom-text">Giỏ hàng</p>
               </Link>
             </div>
              </li> */}
              {user &&
            (user.permission === "ADMIN" || user.permission === "TEACHER") && (
              <li className="my-2">
                <div className="custom-center custom-box-1">
                  <Link className="custom-link text-black" to={"/admin"}>
                    {/* <i
                      className="fa fa-plus custom-center custom-icon"
                      aria-hidden="true"
                    ></i> */}
                    <i className="fa fa-user-tie custom-center custom-icon" aria-hidden="true"></i>
                    <p className="custom-center custom-text"><strong>ADMIN</strong></p>
                  </Link>
                </div>
              </li>
            )}
          <li className="my-2">
            <div className="custom-center custom-box-1">
              <Link className="custom-link" to={"/"}>
                <i
                  className="fa fa-home custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Trang chủ</p>
              </Link>
            </div>
          </li>
          <li className="my-2">
            <div className="custom-center custom-box-1">
              <Link className="custom-link" to={"/progress"}>
                <i
                  className="fa fa-road custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Lộ trình</p>
              </Link>
            </div>
          </li>
          <li className="my-2">
            <div className="custom-center custom-box-1">
              <Link className="custom-link" to={"/post"}>
                <i
                  className="fa fa-newspaper-o custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Bài viết</p>
              </Link>
            </div>
          </li>
          <li className="my-2">
            <div className="custom-center custom-box-1">
              <Link className="custom-link" to={"/course"}>
                <i
                  className="fa fa-graduation-cap custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Khóa học</p>
              </Link>
            </div>
          </li>
          <li className="my-2">
            <div className="custom-center custom-box-1">
              <Link className="custom-link" to={"/my-course"}>
                <i
                  className="fa fa-graduation-cap custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text-my-course">Khóa học của tôi</p>
              </Link>
            </div>
          </li>
          <li className="my-2">
            <div className="custom-center custom-box-1">
              <Link className="custom-link" to={"/cart"}>
                <i
                  className="fa fa-cart-plus custom-center custom-icon"
                  aria-hidden="true"
                ></i>
                <p className="custom-center custom-text">Giỏ hàng</p>
              </Link>
            </div>
          </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;