import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DashboardUser from "../pages/Dashboard_user";
import DashboardAdmin from "../../admin/pages/Dashboard_admin";

import About from "../pages/About";
import Services from "../pages/severes/Servicesices";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Store from "../pages/Store";
import PostDetail from "../pages/PostDetail";
import ServiceDetail from "../pages/severes/ServiceDetailtail";
import Unauthorized from "./Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

import "../styles/Layout.css";
import "../styles/Header.css";
import "../styles/Sidebar.css";
import "../styles/Footer.css";
import "../styles/About.css";
import "../styles/Blog.css";
import "../styles/Contact.css";
import "../styles/Store.css";
import "../styles/PostDetail.css";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
       

        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="services/:slug" element={<ServiceDetail />} />

        <Route
          path="services"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="store"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Store />
            </ProtectedRoute>
          }
        />

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Dashboard;