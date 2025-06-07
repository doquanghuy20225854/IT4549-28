import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { GET_USER_INFO_ROUTE } from '../../utils/constant';
import { useAppStore } from '../../store';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE, { withCredentials: true });
        setUserInfo(response.data);
      } catch (error) {
        console.log('Auth check error:', error);
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userInfo) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
