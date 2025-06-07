import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StaffHeader.css";
import { apiClient } from "../../lib/api-client";
import { LOGOUT_ROUTE } from "../../utils/constant";
import { useAppStore } from "../../store";

const HeaderStaff = () => {
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
    <header className="staff-header">
      <div className="staff-header_logo">Staff Panel</div>

      <nav className="staff-header_nav">
        <Link to="/staff" className="staff-header_nav-item">Trang chủ</Link>
        <Link to="/staff/boarding" className="staff-header_nav-item">Lưu trú</Link>
        <Link to="/staff/customers" className="staff-header_nav-item">Khách hàng</Link>
        <Link to="/staff/appointments" className="staff-header_nav-item">Đặt lịch</Link>
        <Link to="/staff/store" className="staff-header_nav-item">Sản phẩm</Link>
      </nav>

      <div className="staff-header_actions">
        <button className="staff-header_notification">
          <Bell />
          <span className="staff-header_notification-badge">3</span>
        </button>

        <div
          className="staff-header_avatar-wrapper"
          onClick={toggleDropdown}
        >
          <img
            src="https://i.pravatar.cc/27"
            alt="avatar"
            className="staff-header_avatar"
          />
          {dropdownOpen && (
            <div className="staff-header_dropdown">
              <Link to="/staff/profile" className="staff-header_dropdown-item">
                Hồ sơ
              </Link>
              <button
                onClick={handleLogout}
                className="staff-header_dropdown-item"
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

export default HeaderStaff;
