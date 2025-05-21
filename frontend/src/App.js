import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Dashboard from './admin/Dashboard';
import About from './admin/pages/About';
import Services from './admin/pages/Services';
import Reports from './admin/pages/Reports';
import NotFound from './admin/pages/NotFound';

import Boarding from './admin/pages/admin/Boarding';
import Appointments from './admin/pages/admin/Appointments';
import Staff from './admin/pages/admin/Staff';
import Bookings from './admin/pages/admin/Bookings';
import Servicesing from './admin/pages/admin/Servicesing'; 
import AdminReports from './admin/pages/admin/Reports';
import AdminRoute from './admin/components/AdminRoute';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reports" element={<Reports />} />

        <Route
          path="/admin/boarding"
          element={<AdminRoute><Boarding /></AdminRoute>}
        />
        <Route
          path="/admin/appointments"
          element={<AdminRoute><Appointments /></AdminRoute>}
        />
        <Route
          path="/admin/staff"
          element={<AdminRoute><Staff /></AdminRoute>}
        />
        <Route
          path="/admin/bookings"
          element={<AdminRoute><Bookings /></AdminRoute>}
        />
        <Route
          path="/admin/servicesing"
          element={<AdminRoute><Servicesing /></AdminRoute>}
        />
        <Route
          path="/admin/reports"
          element={<AdminRoute><AdminReports /></AdminRoute>}
        />

        {/* Not Found  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
