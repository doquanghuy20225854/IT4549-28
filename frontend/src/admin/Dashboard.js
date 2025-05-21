import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import About from "./pages/About";
import Services from "./pages/Services";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import "./styles/Layout.css";
import "./styles/Header.css";
import "./styles/Sidebar.css";
import "./styles/Footer.css";
import "./styles/About.css";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="reports" element={<Reports />} />
        <Route path="loi" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Dashboard;
