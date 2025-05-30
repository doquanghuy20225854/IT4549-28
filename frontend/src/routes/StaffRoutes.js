import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';

import StaffLayout from '../staff/components/StaffLayout';
import DashboardStaff from '../staff/pages/StaffDashboard';


const StaffRoutes = () => (
  <ProtectedRoute allowedRoles={['staff']}>
    <StaffLayout>   
      <Routes>
        <Route path="" element={<DashboardStaff />} />
      </Routes>
    </StaffLayout>
  </ProtectedRoute>
);

export default StaffRoutes;
