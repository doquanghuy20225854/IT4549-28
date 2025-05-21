import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const admin = {
    username: 'admin',
    password: '123456'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === admin.username && password === admin.password) {
      localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
      navigate('/dashboard');
    } else {
      setError('Tài khoản hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🐾 Đăng nhập - Pet Care Center</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="login-label">Tài khoản</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="login-label">Mật khẩu</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
