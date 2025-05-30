import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';

import AdminLayout from '../admin/components/AdminLayout';
import DashboardAdmin from '../admin/pages/Dashboard_admin';
import Boarding from '../admin/pages/Boarding';
import Servicesing from '../admin/pages/Servicesing';
import Appointments from '../admin/pages/Appointments';
import Users from '../admin/pages/Users';
import Store from '../admin/pages/Store';
import ProfileAdmin from '../admin/pages/ProfileAdmin';

const AdminRoutes = () => (
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminLayout>
      <Routes>
        <Route path="" element={<DashboardAdmin />} />
        <Route path="/boarding" element={<Boarding />} />
        <Route path="/servicesing" element={<Servicesing />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/users" element={<Users />} />
        <Route path="/store" element={<Store />} />
        <Route path="/profile" element={<ProfileAdmin />} />
      </Routes>
    </AdminLayout>
  </ProtectedRoute>
);

export default AdminRoutes;
