import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/DoctorHeader.css";
import { apiClient } from "../../lib/api-client";
import { LOGOUT_ROUTE } from "../../utils/constant";
import { useAppStore } from "../../store";

const HeaderDoctor = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { clearUserInfo } = useAppStore();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      clearUserInfo();
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Logout error:", error?.response?.data?.message || error.message);
      clearUserInfo();
      navigate('/', { replace: true });
    }
  };

  return (
    <header className="doctor-header">
      <div className="doctor-header_logo">Doctor Panel</div>

      <nav className="doctor-header_nav">
        <Link to="/doctor" className="doctor-header_nav-item">Trang chủ</Link>
        <Link to="/doctor/boarding" className="doctor-header_nav-item">Lưu trú</Link>
        <Link to="/doctor/services" className="doctor-header_nav-item">Dịch vụ</Link>
        <Link to="/doctor/appointments" className="doctor-header_nav-item">Lịch Khám </Link>
        <Link to="/doctor/store" className="doctor-header_nav-item">Sản phẩm</Link>
      </nav>

      <div className="doctor-header_actions">
        <button className="doctor-header_notification">
          <Bell />
          <span className="doctor-header_notification-badge">3</span>
        </button>

        <div
          className="doctor-header_avatar-wrapper"
          onClick={toggleDropdown}
        >
          <img
            src="https://i.pravatar.cc/27"
            alt="avatar"
            className="doctor-header_avatar"
          />
          {dropdownOpen && (
            <div className="doctor-header_dropdown">
              <Link to="/doctor/profile" className="doctor-header_dropdown-item">
                Hồ sơ
              </Link>
              <button
                onClick={handleLogout}
                className="doctor-header_dropdown-item"
              >
                <LogOut /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderDoctor;
