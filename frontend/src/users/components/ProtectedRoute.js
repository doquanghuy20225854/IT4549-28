import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { GET_USER_INFO_ROUTE } from '../../utils/constant';
import { useAppStore } from '../../store';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, setUserInfo, clearUserInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE, { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          setUserInfo(response.data);
        } else {
          throw new Error('No user data received');
        }
      } catch (error) {
        console.log('Auth check error:', error);
        // Xóa thông tin user và token khi có lỗi xác thực
        clearUserInfo();
        // Xóa cookie jwt nếu có
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Chuyển hướng về trang login
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    if (!userInfo) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [userInfo, setUserInfo, clearUserInfo, navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang kiểm tra xác thực...</p>
      </div>
    );
  }

  if (!userInfo || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
