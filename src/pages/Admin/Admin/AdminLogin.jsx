
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";


function AdminLogin() {
  
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const url = process.env.REACT_APP_API_URL;
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://api.course-selling.id.vn/api/admin/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('AdminLogin failed');
      }

      const data = await response.json();

      // Assuming the API returns a token upon successful AdminLogin
      const user = data;
      if (user.permission == 'ADMIN' || user.permission == 'TEACHER') {
        Cookies.set('root', JSON.stringify(user));
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
      console.error('AdminLogin failed:', error);
      setErrorMessage('AdminLogin failed. Please check your credentials.');
    }
  }



return (
  <div>
    <h1>AdminLogin Form</h1>
    <form onSubmit={handleAdminLogin}>
      <label>
        Account:
        <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">AdminLogin</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  </div>
);

}
export default AdminLogin;
