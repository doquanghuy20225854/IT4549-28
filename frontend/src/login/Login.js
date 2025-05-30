import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const users = [
    { username: 'admin', password: '123456', role: 'admin' },
    { username: 'user', password: '123456', role: 'user' },
    { username: 'staff', password: '123456', role: 'staff' },
    { username: 'doctor', password: '123456', role: 'doctor' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));

      switch (foundUser.role) {
        case 'admin':
          navigate('/admin'); 
          break;
        case 'user':
          navigate('/user'); 
          break;
        case 'staff':
          navigate('/staff'); 
          break;
        case 'doctor':
          navigate('/doctor'); 
          break;
        default:
          navigate('/unauthorized');
      }
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
            placeholder="Nhập tài khoản..."
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
