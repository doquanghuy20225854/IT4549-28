import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Unauthorized from './users/components/Unauthorized';
import NotFound from './users/pages/NotFound';

import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import StaffRoutes from './routes/StaffRoutes';
import DoctorRoutes from './routes/DoctorRoutes';

function App() {
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
