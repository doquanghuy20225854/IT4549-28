import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';
import StaffLayout from '../staff/components/StaffLayout';

import DashboardStaff from '../staff/pages/StaffDashboard';
import StaffAppointments from '../staff/pages/StaffAppointments';
import StaffBoarding from '../staff/pages/StaffBoarding';
import StaffCustomers from '../staff/pages/StaffCustomers';
import StaffStore from '../staff/pages/StaffStore';
import StaffServices from '../staff/pages/StaffServices';

const StaffRoutes = () => (
  <ProtectedRoute allowedRoles={['staff']}>
    <StaffLayout>   
      <Routes>
        <Route path="" element={<DashboardStaff />} />
        <Route path="/appointments" element={<StaffAppointments />} />      
        <Route path="/boarding" element={<StaffBoarding />} />
        <Route path="/customers" element={<StaffCustomers />} />
        <Route path="/store" element={<StaffStore />} />
        <Route path="/services" element={<StaffServices />} />
      </Routes>
    </StaffLayout>
  </ProtectedRoute>
);

export default StaffRoutes;
