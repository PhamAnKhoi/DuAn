// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
import React, { useState } from "react";
import Cookies from "js-cookie";

function AdminLogin() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const url = process.env.REACT_APP_API_URL;
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://api.course-selling.id.vn/api/admin/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AdminLogin failed");
      }

      const data = await response.json();

      // Assuming the API returns a token upon successful AdminLogin
      const user = data;
      if (user.permission === "ADMIN" || user.permission === "TEACHER") {
        Cookies.set("root", JSON.stringify(user));
        // chuyển trang về dashboard
        // document.location.href = "/admin/";
      } else {
        alert(
          `Bạn là ${user.permission}. Tài khoản của bạn không có quyền truy cập chức năng này`
        );
        // document.location.href = "/";
      }

      // console.log(user);
      // You can store the token in the state or context for future use (e.g., authentication)
    } catch (error) {
      console.error("AdminLogin failed:", error);
      setErrorMessage("AdminLogin failed. Please check your credentials.");
    }
  };

  return (
    <div className="AdminLogin">
      <div className="d-flex justify-content-center align-items-center vh-100 box-form">
        <form className="custom-form" onSubmit={handleAdminLogin}>
          <h1 className="mb-3 custom-h1">ADMIN</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <label htmlFor="">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {/* dòng này có thể bỏ */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;
