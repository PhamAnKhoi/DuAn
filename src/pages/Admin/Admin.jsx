import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function Admin() {
  return (
    <div className="Admin">
      <div className="container-scroller">
      <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="container-fluid page-body-wrapper">
            <SidebarAdmin />
            <h1>Đây là trang chủ</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
