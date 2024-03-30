import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
// import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="Admin ">
      <div className="container-fluid p-0">
        <div className=" HeaderAdmin SidebarAdmin">
          <div className="row vh-100 mx-auto">
            <div className="col-lg-2 col-md-2 p-0">
              <SidebarAdmin page="/"/>
            </div>

            <div className="col">
              <HeaderAdmin />
              <div className="custom-border-top">
                <div className="main-panel my-3">
                  <div className="content-wrapper">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-sm-flex justify-content-between align-items-center transaparent-tab-border {">
                          <ul
                            className="nav nav-tabs tab-transparent"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <div className="nav-link active" href="/#">
                                Trang chủ
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-content tab-transparent-content">
                          <div className="tab-pane fade show active">
                            <div className="row mb-3">
                              <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                                <div className="card">
                                  <div className="card-body text-center">
                                    <h5 className="mb-2 text-dark font-weight-normal">
                                      Tổng số khóa học
                                    </h5>
                                    <h2 className="mb-4 text-dark font-weight-bold">
                                      10 khóa
                                    </h2>
                                    <div className="dashboard-progress dashboard-progress-1 d-flex align-items-center justify-content-center item-parent">
                                      <i className="mdi mdi-lightbulb icon-md absolute-center text-dark" />
                                    </div>
                                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                                      <i
                                        className="fa fa-book"
                                        aria-hidden="true"
                                      ></i>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                                <div className="card">
                                  <div className="card-body text-center">
                                    <h5 className="mb-2 text-dark font-weight-normal">
                                      Khóa học đã bán
                                    </h5>
                                    <h2 className="mb-4 text-dark font-weight-bold">
                                      20
                                    </h2>
                                    <div className="dashboard-progress dashboard-progress-2 d-flex align-items-center justify-content-center item-parent">
                                      <i className="mdi mdi-account-circle icon-md absolute-center text-dark" />
                                    </div>
                                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                                      <i
                                        className="fa fa-check custom-center custom-icon"
                                        aria-hidden="true"
                                      ></i>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                                <div className="card">
                                  <div className="card-body text-center">
                                    <h5 className="mb-2 text-dark font-weight-normal">
                                      Tổng số bài viết
                                    </h5>
                                    <h2 className="mb-4 text-dark font-weight-bold">
                                      49 bài
                                    </h2>
                                    <div className="dashboard-progress dashboard-progress-3 d-flex align-items-center justify-content-center item-parent">
                                      <i className="mdi mdi-eye icon-md absolute-center text-dark" />
                                    </div>
                                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                                      <i
                                        className="fa fa-newspaper-o"
                                        aria-hidden="true"
                                      ></i>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                                <div className="card">
                                  <div className="card-body text-center">
                                    <h5 className="mb-2 text-dark font-weight-normal">
                                      Tổng số user
                                    </h5>
                                    <h2 className="mb-4 text-dark font-weight-bold">
                                      3 tài khoản
                                    </h2>
                                    <div className="dashboard-progress dashboard-progress-4 d-flex align-items-center justify-content-center item-parent">
                                      <i className="mdi mdi-cube icon-md absolute-center text-dark" />
                                    </div>
                                    <h3 className="mb-0 font-weight-bold mt-2 text-dark">
                                      <i
                                        className="fa fa-user"
                                        aria-hidden="true"
                                      ></i>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="row">
                              <div className="col-sm-4 grid-margin stretch-card">
                                <div className="card card-danger-gradient">
                                  <div className="card-body mb-4">
                                    <h4 className="card-title text-white">
                                      Account Retention
                                    </h4>
                                    <canvas id="account-retension" />
                                  </div>
                                  <div className="card-body bg-white pt-4">
                                    <div className="row pt-4">
                                      <div className="col-sm-6">
                                        <div className="text-center border-right border-md-0">
                                          <h4>Conversion</h4>
                                          <h1 className="text-dark font-weight-bold mb-md-3">
                                            $306
                                          </h1>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="text-center">
                                          <h4>Cancellation</h4>
                                          <h1 className="text-dark font-weight-bold">
                                            $1,520
                                          </h1>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-8  grid-margin stretch-card">
                                <div className="card">
                                  <div className="card-body">
                                    <div className="d-xl-flex justify-content-between mb-2">
                                      <h4 className="card-title">
                                        Thống kê doanh thu
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
