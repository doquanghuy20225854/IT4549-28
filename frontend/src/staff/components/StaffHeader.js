import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/StaffHeader.css";

const HeaderStaff = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="staff-header">
      <div className="staff-header_logo">Staff Panel</div>

      <nav className="staff-header_nav">
        <Link to="/staff" className="staff-header_nav-item">Trang chủ</Link>
        <Link to="/staff/boarding" className="staff-header_nav-item">Lưu trú</Link>
        <Link to="/staff/servicesing" className="staff-header_nav-item">Dịch vụ</Link>
        <Link to="/staff/appointments" className="staff-header_nav-item">Đặt Lịch </Link>
        <Link to="/staff/store" className="staff-header_nav-item">Sản phẩm</Link>
        <Link to="/staff/users" className="staff-header_nav-item">Khách hàng</Link>
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
              <Link
                to="/"
                className="staff-header_dropdown-item"
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

export default HeaderStaff;
