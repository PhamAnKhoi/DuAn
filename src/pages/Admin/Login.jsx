import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";


function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const url = process.env.REACT_APP_API_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://api.course-selling.id.vn/api/account/loginp`, {
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
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Assuming the API returns a token upon successful login
      const user = data;
      
      // console.log(user);
      Cookies.set('user', JSON.stringify(user));
      // You can store the token in the state or context for future use (e.g., authentication)
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  }



return (
  <div>
    <h1>Login Form</h1>
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  </div>
);

}
export default Login;
