import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { apiClient } from './../lib/api-client';
import { LOGIN_ROUTE } from '../utils/constant';
import { useAppStore } from '../store';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.role) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'user':
          navigate('/user', { replace: true });
          break;
        case 'staff':
          navigate('/staff', { replace: true });
          break;
        case 'doctor':
          navigate('/doctor', { replace: true });
          break;
        default:
          setUserInfo(null);
      }
    }
  }, [userInfo, navigate, setUserInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        LOGIN_ROUTE, 
        { username, password },
        { withCredentials: true }
      );
      
      setUserInfo(response.data.account);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Đã xảy ra lỗi trong quá trình đăng nhập');
      } else {
        setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.');
      }
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
