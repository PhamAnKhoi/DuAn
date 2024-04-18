import { Link } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice";

function Login() {
  // show noti
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  //end shownoti
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

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
        setShowToast(true);
        setToastMessage("Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại");
        setToastVariant("danger");
      }


      const data = await response.json();
      if (data.status === true) {
        console.log(data);
        setShowToast(true);
        setToastMessage("Đăng nhập thành công");
        setToastVariant("success");
        const user = data;
        let exprire = user.expires_in === "7200 second" ? 2 / 24 : 7;
        Cookies.set("user", JSON.stringify(user), { expires: exprire });
        setTimeout(() => {
          window.location.href = '/'
        }, 1000);
      } else {
        setShowToast(true);
        setToastMessage("Sai tài khoản hoặc mật khẩu! Vui lòng đăng nhập lại");
        setToastVariant("danger");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setShowToast(true);
      setToastMessage("Có lỗi xẩy ra khi đăng nhập!");
      setToastVariant("danger");
    }
  };

  return (
    <div className="Login">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />

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
