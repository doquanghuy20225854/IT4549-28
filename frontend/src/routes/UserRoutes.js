import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../users/components/ProtectedRoute';

import Layout from '../users/components/Layout'; 
import DashboardUser from '../users/pages/Dashboard_user';
import About from '../users/pages/About';
import PetStatus from '../users/pages/PetStatus';
import Services from '../users/pages/severes/Services';
import ServiceDetail from '../users/pages/severes/ServiceDetail';
import BookingPage from '../users/pages/severes/BookingPage';
import Contact from '../users/pages/Contact';
import Store from '../users/pages/Store';
import PostDetail from '../users/pages/PostDetail';
import UserProfile from '../users/pages/UserProfile';

const UserRoutes = () => (
  <ProtectedRoute allowedRoles={['user']}>
    <Layout>
      <Routes>
        <Route path="" element={<DashboardUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/petstatus" element={<PetStatus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/booking/:slug" element={<BookingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Layout>
  </ProtectedRoute>
);

export default UserRoutes;
