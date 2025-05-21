import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardHome.css";

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-home">
      <h1>Xin chào, Quản Trị Viên!</h1>
      <p>Chào mừng đến với hệ thống quản lý Trung Tâm Thú Cưng.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/admin/boarding")}>
          <h3>Thú cưng đang lưu trú</h3>
          <p>12 thú cưng</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/admin/appointments")}>
          <h3>Lịch hẹn khám</h3>
          <p>8 lịch hôm nay</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/admin/staff")}>
          <h3>Nhân viên</h3>
          <p>5 người</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/admin/servicesing")}>
          <h3>Dịch vụ đang hoạt động</h3>
          <p>6 dịch vụ</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/admin/bookings")}>
          <h3>Đơn đặt lịch</h3>
          <p>3 đơn chờ xử lý</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/admin/reports")}>
          <h3>Báo cáo hôm nay</h3>
          <p>2 báo cáo</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
