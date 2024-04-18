import React, { useState } from "react";
// import Cookies from "js-cookie";
import ToastMessage from "../../components/notifice";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avata, setAvata] = useState("");
  const [gender, setGender] = useState(1);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("avata_img", avata);
      formData.append("gender", gender);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("address", address);
      formData.append("role", role);
      console.log(formData);
      const response = await axios.post(
        "http://api.course-selling.id.vn/api/account/registerp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //upload file
          },
        }
      );

      if (response.data.status === true) {
        setShowToast(true);
        setToastMessage(response.data.message);
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000);
      } else {
        setShowToast(true);
        setToastMessage(response.data.message);
        setToastVariant("danger");
        console.log(response.data.errors);
      }
    } catch (error) {
      console.error("Fail to create Account: ", error);
    }

  };

  return (
    <div className="Register">
      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
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
                      placeholder="Avata_img"
                      onChange={(e) => setAvata(e.target.files[0])}
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
                      checked
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
                  <div className="form-floating mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary custom-button"
                    >
                      Register
                    </button>
                  </div>
                  <div className="mb-3">
                    <Link className="custom-link" to={"/login"}>
                      <p>Bạn đã có tài khoản?</p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
