import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/AdminHeader.css";

const HeaderAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
              <Link
                to="/"
                className="admin-header_dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 300);
                }}
              >
                <LogOut /> Đăng xuất
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
