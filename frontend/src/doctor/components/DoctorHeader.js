import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/DoctorHeader.css";

const HeaderDoctor = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
              <Link
                to="/"
                className="doctor-header_dropdown-item"
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

export default HeaderDoctor;
