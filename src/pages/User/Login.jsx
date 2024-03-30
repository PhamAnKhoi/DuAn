import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import Cookies from "js-cookie";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const url = process.env.REACT_APP_API_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://api.course-selling.id.vn/api/account/loginp`,
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
        alert("Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại");
        window.location.href = "/login";
        // throw new Error("Login failed");
      } else {
        alert("Đăng nhập thành công");
        window.location.href = "/";
      }

      const data = await response.json();

      // Assuming the API returns a token upon successful login
      const user = data;

      // console.log(user);
      Cookies.set("user", JSON.stringify(user));
      // You can store the token in the state or context for future use (e.g., authentication)
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="Login">
      <div className="d-flex justify-content-center align-items-center vh-100 box-form">
        <form className="custom-form" onSubmit={handleLogin}>
          <h1 className="mb-3 custom-h1 text-center">Đăng nhập</h1>
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
          <div className="form-floating mb-3">
            <input type="checkbox" /> Remember me
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="mb-3">
            <Link className="custom-link" to={"/register"}>
              <p>Bạn chưa có tài khoản?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
