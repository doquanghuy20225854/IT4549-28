import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  // Chuyển đổi trạng thái mở/đóng menu dịch vụ
  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/">N28</Link>
          <Link to="/dashboard">Admin</Link>
        </div>
      </div>

      <div className="header-middle">
        <nav className="nav-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            TRANG CHỦ
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            GIỚI THIỆU
          </NavLink>

          <div className="dropdown">
            <div className="dropdown-header">
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                DỊCH VỤ
              </NavLink>
              {/* Nút nhỏ bên cạnh */}
              <button
                className="toggle-btn"
                onClick={toggleServices}
                aria-label="Toggle services menu"
              >
                {servicesOpen ? "▲" : "▼"}
              </button>
            </div>

            {/* Dropdown menu hiển thị khi servicesOpen = true */}
            {servicesOpen && (
              <div className="dropdown-content">
                <Link to="/services/spa-thu-cung">Spa thú cưng chuẩn 5 sao</Link>
                <Link to="/services/khach-san-thu-cung">Khách sạn thú cưng chuẩn 5 sao</Link>
                <Link to="/services/san-pham-phu-kien">Cung cấp sản phẩm, phụ kiện</Link>
                <Link to="/services/">Đặt lịch khám chữa bệnh thú cưng</Link>
              </div>
            )}
          </div>

          <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            CỬA HÀNG
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            BLOG
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            LIÊN HỆ
          </NavLink>
        </nav>

        <div className="header-buttons">
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
