import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Unauthorized from './users/components/Unauthorized';
import NotFound from './users/pages/NotFound';

import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import StaffRoutes from './routes/StaffRoutes';
import DoctorRoutes from './routes/DoctorRoutes';

import { useAppStore } from './store';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO_ROUTE } from './utils/constant';

const App = () => {
  const [loading, setLoading] = useState(true);
  const { setUserInfo } = useAppStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO_ROUTE, { withCredentials: true });
        setUserInfo(response.data);
      } catch (error) {
        console.log('Initial auth check error:', error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/staff/*" element={<StaffRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
