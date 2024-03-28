// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import Cookies from "js-cookie";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const url = process.env.REACT_APP_API_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://api.course-selling.id.vn/api/account/registerp`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            phone,
            avatar,
            gender,
            firstname,
            lastname,
            address,
            role,
          }),
        }
      );

      if (!response.ok) {
        // alert("Đăng ký thành công");
        // window.location.href = "/login";
      } else {
        alert("Đăng ký thành công");
        window.location.href = "/login";
      }

      const data = await response.json();

      // Assuming the API returns a token upon successful login
      const user = data;

      // console.log(user);
      Cookies.set("user", JSON.stringify(user));
      // You can store the token in the state or context for future use (e.g., authentication)
    } catch (error) {
      console.error("Login failed:", error);
      // setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="Register">
      <div className="vh-100 box-form">
        <div className="d-flex justify-content-center align-items-center">
          <div className="custom-form">
            <div className="d-flex justify-content-center">
              <h1 className="mb-3 custom-h1">TẠO TÀI KHOẢN</h1>
            </div>
            <form className="" onSubmit={handleLogin}>
              <div className="row">
                <div className="col">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="">Tên đăng nhập</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="">Mật khẩu</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="">Số điện thoại</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Avatar"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                    />
                    <label htmlFor="">Avatar</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="">Tên</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="">Họ</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="">Address</label>
                  </div>
                  <div className="form-floating custom-input-radio">
                    <span className="custom-span">Giới tính:</span>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio1"
                        value="1"
                        checked={gender === 1}
                        onChange={() => setGender(1)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Nam
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="0"
                        checked={gender === 0}
                        onChange={() => setGender(0)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Nữ
                      </label>
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="hidden"
                      className="form-control"
                      placeholder="Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <div className="form-floating">
                    <button
                      type="submit"
                      className="btn btn-primary custom-button"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>

              {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
