import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';

import DoctorLayout from '../doctor/components/DoctorLayout';
import DashboardDoctor from '../doctor/pages/DoctorDashboard';


const DoctorRoutes = () => (
  <ProtectedRoute allowedRoles={['doctor']}>
    <DoctorLayout>       
      <Routes>
        <Route path="" element={<DashboardDoctor />} /> 
      </Routes>
    </DoctorLayout>
  </ProtectedRoute>
);

export default DoctorRoutes;
