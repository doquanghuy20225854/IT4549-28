import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';

import DoctorLayout from '../doctor/components/DoctorLayout';
import DashboardDoctor from '../doctor/pages/DoctorDashboard';
import Appointments from '../admin/pages/Appointments';
import Boarding from '../doctor/pages/DoctorBoarding';
import Store from '../doctor/pages/DoctorStore';

const DoctorRoutes = () => (
  <ProtectedRoute allowedRoles={['doctor']}>
    <DoctorLayout>       
      <Routes>
        <Route path="" element={<DashboardDoctor />} /> 
        <Route path="appointments" element={<Appointments />} />
        <Route path="boarding" element={<Boarding />} />
        <Route path="store" element={<Store />} />
      </Routes>
    </DoctorLayout>
  </ProtectedRoute>
);

export default DoctorRoutes;
