import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import "../styles/Header.css";
import { apiClient } from "../../lib/api-client";
import { LOGOUT_ROUTE } from "../../utils/constant";
import { useAppStore } from "../../store";

const Header = () => {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { clearUserInfo } = useAppStore();

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
      // Nếu có lỗi vẫn clear state và chuyển về trang login
      clearUserInfo();
      navigate('/', { replace: true });
    }
  };

  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setProfileOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">N28</Link>
          <Link to="/user">User</Link>
        </div>
      </div>

      <div className="header-middle">
        <nav className="nav-menu">
          <NavLink to="/user" className={({ isActive }) => (isActive ? "active-link" : "")}>
            TRANG CHỦ
          </NavLink>
          <NavLink to="/user/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
            GIỚI THIỆU
          </NavLink>

          <div className="dropdown">
            <div className="dropdown-header">
              <NavLink to="/user/services" className={({ isActive }) => (isActive ? "active-link" : "")}>
                DỊCH VỤ
              </NavLink>
              <button
                className="toggle-btn"
                onClick={toggleServices}
                aria-label="Toggle services menu"
              >
                {servicesOpen ? "▲" : "▼"}
              </button>
            </div>
            {servicesOpen && (
              <div className="dropdown-content">
                <Link to="/user/services/spa">Spa thú cưng chuẩn 5 sao</Link>
                <Link to="/user/services/hotel">Khách sạn thú cưng chuẩn 5 sao</Link>
                <Link to="/user/store">Cung cấp sản phẩm, phụ kiện</Link>
                <Link to="/user/services/vet">Đặt lịch khám chữa bệnh thú cưng</Link>
              </div>
            )}
          </div>

          <NavLink to="/user/store" className={({ isActive }) => (isActive ? "active-link" : "")}>
            CỬA HÀNG
          </NavLink>
          <NavLink to="/user/petstatus" className={({ isActive }) => (isActive ? "active-link" : "")}>
            TÌNH TRẠNG
          </NavLink>
          <NavLink to="/user/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
            LIÊN HỆ
          </NavLink>
        </nav>

        <div className="user-header_actions">
          <button className="user-header_notification">
            <Bell />
            <span className="user-header_notification-badge">3</span>
          </button>

          <div className="user-header_avatar-wrapper" onClick={toggleProfileDropdown}>
            <img
              src="https://i.pravatar.cc/27"
              alt="avatar"
              className="user-header_avatar"
            />
            {profileOpen && (
              <div className="user-header_dropdown">
                <Link to="/user/profile" className="user-header_dropdown-item">
                  Hồ sơ
                </Link>
                <button onClick={handleLogout} className="user-header_dropdown-item">
                  <LogOut /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
