import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";

function Admin() {
  return (
    <div className="Admin ">
      <div className="container-fluid">
        <div className="HeaderAdmin SidebarAdmin">
          <HeaderAdmin />
          <div className="row">
            <div className="col-lg-3 p-0">
              <SidebarAdmin />
            </div>
            <div className="col custom-border-top">
              <div className="row">
                <div className="col-lg-4">
                  <div>h1</div>
                </div>
                <div className="col-lg-4">
                  <div>h1</div>
                </div>
                <div className="col-lg-4">
                  <div>h1</div>
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
