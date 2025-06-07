import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminHeader.css";
import { apiClient } from "../../lib/api-client";
import { LOGOUT_ROUTE } from "../../utils/constant";
import { useAppStore } from "../../store";

const HeaderAdmin = () => {
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
    <header className="admin-header">
      <div className="admin-header_logo">Admin Panel</div>

      <nav className="admin-header_nav">
        <Link to="/admin" className="admin-header_nav-item">Trang chủ</Link>
        <Link to="/admin/boarding" className="admin-header_nav-item">Lưu trú</Link>
        <Link to="/admin/servicesing" className="admin-header_nav-item">Dịch vụ</Link>
        <Link to="/admin/appointments" className="admin-header_nav-item">Đặt Lịch </Link>
        <Link to="/admin/store" className="admin-header_nav-item">Sản phẩm</Link>
        <Link to="/admin/users" className="admin-header_nav-item">Người dùng</Link>
      </nav>

      <div className="admin-header_actions">
        <button className="admin-header_notification">
          <Bell />
          <span className="admin-header_notification-badge">3</span>
        </button>

        <div
          className="admin-header_avatar-wrapper"
          onClick={toggleDropdown}
        >
          <img
            src="https://i.pravatar.cc/27"
            alt="avatar"
            className="admin-header_avatar"
          />
          {dropdownOpen && (
            <div className="admin-header_dropdown">
              <Link to="/admin/profile" className="admin-header_dropdown-item">
                Hồ sơ
              </Link>
              <button
                onClick={handleLogout}
                className="admin-header_dropdown-item"
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

export default HeaderAdmin;
