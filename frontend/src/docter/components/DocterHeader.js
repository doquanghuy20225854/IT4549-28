import React, { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/DocterHeader.css";

const HeaderDocter = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="docter-header">
      <div className="docter-header_logo">Docter Panel</div>

      <nav className="docter-header_nav">
        <Link to="/docter" className="docter-header_nav-item">Trang chủ</Link>
        <Link to="/docter/boarding" className="docter-header_nav-item">Lưu trú</Link>
        <Link to="/docter/servicesing" className="docter-header_nav-item">Dịch vụ</Link>
        <Link to="/docter/appointments" className="docter-header_nav-item">Lịch Khám </Link>
        <Link to="/docter/store" className="docter-header_nav-item">Sản phẩm</Link>
      </nav>

      <div className="docter-header_actions">
        <button className="docter-header_notification">
          <Bell />
          <span className="docter-header_notification-badge">3</span>
        </button>

        <div
          className="docter-header_avatar-wrapper"
          onClick={toggleDropdown}
        >
          <img
            src="https://i.pravatar.cc/27"
            alt="avatar"
            className="docter-header_avatar"
          />
          {dropdownOpen && (
            <div className="docter-header_dropdown">
              <Link to="/docter/profile" className="docter-header_dropdown-item">
                Hồ sơ
              </Link>
              <Link
                to="/"
                className="docter-header_dropdown-item"
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

export default HeaderDocter;
