import React, { useState, useEffect } from 'react';
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import CourseSalesChart from "../../components/chart";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
// import { Link } from "react-router-dom";

function Admin() {
  var user = Cookies.get("user");
  if (user !== undefined) {
    user = JSON.parse(user);
    var auth = user.permission;
  }
  // console.log(user);
  if (auth !== "ADMIN" && auth !== "TEACHER") {
    window.location.href = "/login";
  }

  const [overview, setOverviewData] = useState([]);
  const [orders, setOrdersData] = useState([]);
  const [sold30d, setSold30dData] = useState([]);
  const [revenue, setRevenueData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://api.course-selling.id.vn/api/admin",
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      const data = response.data;
      if (data.status) {
        let dashboard = data.data
        setOverviewData(dashboard.overview)
        setOrdersData(dashboard.orders)
        setSold30dData(dashboard.sold30d)
        setRevenueData(dashboard.revenue)
      }

    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };
  return (
    <div className="Admin ">
      <div className="container-fluid p-0">
        <div className=" HeaderAdmin SidebarAdmin">
          <div className="row vh-100 mx-auto">
            <div className="col-lg-2 col-md-2 p-0">
              <SidebarAdmin page="/" />
            </div>

            <div className="col">
              <HeaderAdmin />
              <div className="custom-border-top">
                <div className="main-panel my-3">
                  {/* begin overview */}
                  <div className="row border border-primary rounded m-0 p-2">
                    <h4 className="mt-2">Tổng quan</h4>
                    <Link to={"/admin/list-course"} className="text-decoration-none col-lg-3 col-md-3 col-6 p-2">
                      <div className="card p-2 d-flex flex-row py-3 justify-content-center" style={{ backgroundColor: '#c6f6d5' }}>
                        <div className="me-3 shadow-sm rounded-circle text-center" style={{ backgroundColor: '#38a169', width: '60px', height: '60px' }}>
                          <i className="text-white fa fa-book" style={{ lineHeight: '60px', fontSize: '24px' }}></i>
                        </div>
                        <div className="d-flex flex-column">
                          <h5 className="text-center p-0 m-0">Số khóa học</h5>
                          <h4 className="text-center p-0 m-0">{overview.numCourses}</h4>
                        </div>
                      </div>
                    </Link>
                    <Link to={"/admin/list-post"} className="text-decoration-none col-lg-3 col-md-3 col-6 p-2">
                      <div className="card p-2 d-flex flex-row py-3 justify-content-center" style={{ backgroundColor: '#bee3f8' }}>
                        <div className="me-3 shadow-sm rounded-circle text-center" style={{ backgroundColor: '#3182ce', width: '60px', height: '60px' }}>
                          <i className="text-white fa fa-newspaper-o" style={{ lineHeight: '60px', fontSize: '24px' }}></i>
                        </div>
                        <div className="d-flex flex-column">
                          <h5 className="text-center p-0 m-0">Số bài viết</h5>
                          <h4 className="text-center p-0 m-0">{overview.numPosts}</h4>
                        </div>
                      </div>
                    </Link>
                    <Link to={"/admin/list-user"} className="text-decoration-none col-lg-3 col-md-3 col-6 p-2">
                      <div className="card p-2 d-flex flex-row py-3 justify-content-center" style={{ backgroundColor: '#fed7e2' }}>
                        <div className="me-3 shadow-sm rounded-circle text-center" style={{ backgroundColor: '#ed64a6', width: '60px', height: '60px' }}>
                          <i className="text-white fa fa-user-circle-o" style={{ lineHeight: '60px', fontSize: '24px' }}></i>
                        </div>
                        <div className="d-flex flex-column">
                          <h5 className="text-center p-0 m-0">Số người dùng</h5>
                          <h4 className="text-center p-0 m-0">{overview.numUsers}</h4>
                        </div>
                      </div>
                    </Link>
                    <div className="text-decoration-none col-lg-3 col-md-3 col-6 p-2">
                      <div className="card p-2 d-flex flex-row py-3 justify-content-center" style={{ backgroundColor: '#e9d8fd' }}>
                        <div className="me-3 shadow-sm rounded-circle text-center" style={{ backgroundColor: '#805ad5', width: '60px', height: '60px' }}>
                          <i className="text-white fa fa-certificate" style={{ lineHeight: '60px', fontSize: '24px' }}></i>

                        </div>
                        <div className="d-flex flex-column">
                          <h5 className="text-center p-0 m-0">Chứng chỉ đã cấp</h5>
                          <h4 className="text-center p-0 m-0">{overview.numCertificates}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end overview */}

                  {/* begin table and chart */}
                  <div className="row border border-primary rounded m-0 mt-3 p-2">
                    <div className="col-lg-6 col-md-6 col-12 p-2">
                      <h5>Đơn mua hàng</h5>
                      {/* table */}
                      <table id="admin-table" className="table table-light Info table-striped table-hover rounded m-0 overflow-hidden">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Người dùng</th>
                            <th className="text-center">Mã đơn hàng</th>
                            <th className="text-center">Tổng tiền</th>
                            <th className="text-center">Ngày tạo</th>
                            <th className="text-center">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            orders.map((v, i) => (
                              <tr key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-center">{v.username}</td>
                                <td className="text-center">{v.order_id}</td>
                                <td className="text-center">{Number(v.total_amount).toLocaleString("vi")}</td>
                                <td className="text-center">{v.created_at}</td>
                                {/* <td className="text-center">{new Date(v.created_at).toLocaleDateString()}</td> */}
                                <td className="text-center">
                                  {v.status ?
                                    (
                                      <span className="badge badge-success rounded-pill d-inline fw-medium">Đã thanh toán</span>
                                    ) : (
                                      <span className="badge badge-danger rounded-pill d-inline fw-medium">Chờ thanh toán</span>
                                    )}
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 p-2 d-flex flex-column">
                      <CourseSalesChart label={'Đã bán trong 30 ngày'} data={sold30d} margin={'mt-2'} />
                      <CourseSalesChart label={'Doanh thu trong 30 ngày'} data={revenue} type={'line'} margin={'mt-5'} />
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
