import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';

import DocterLayout from '../docter/components/DocterLayout';
import DashboardDocter from '../docter/pages/DocterDashboard';


const DocterRoutes = () => (
  <ProtectedRoute allowedRoles={['doctor']}>
    <DocterLayout>       
      <Routes>
        <Route path="" element={<DashboardDocter />} /> 
      </Routes>
    </DocterLayout>
  </ProtectedRoute>
);

export default DocterRoutes;
