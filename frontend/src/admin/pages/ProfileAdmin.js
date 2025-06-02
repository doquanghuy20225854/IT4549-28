import React, { useState } from "react";
import "../styles/ProfileAdmin.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Admin Nguyễn",
    email: "admin@example.com",
    phone: "0909 123 456",
    address: "Số 1 Đường Quản Trị, TP.HCM",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Thực hiện lưu vào server ở đây nếu cần
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Có thể reset lại nếu cần
  };

  return (
    <div className="admin-profile-container">
      <h2>Trang Quản Trị</h2>
      <div className="admin-card">
        <img src={admin.avatar} alt="Admin Avatar" className="admin-avatar" />
        {editMode ? (
          <div className="admin-info">
            <input name="name" value={admin.name} onChange={handleChange} placeholder="Họ tên" />
            <input name="email" value={admin.email} onChange={handleChange} placeholder="Email" />
            <input name="phone" value={admin.phone} onChange={handleChange} placeholder="Số điện thoại" />
            <input name="address" value={admin.address} onChange={handleChange} placeholder="Địa chỉ" />
            <div className="admin-actions">
              <button onClick={handleSave}>💾 Lưu</button>
              <button onClick={handleCancel}>❌ Huỷ</button>
            </div>
          </div>
        ) : (
          <div className="admin-info">
            <p><strong>Họ tên:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Số điện thoại:</strong> {admin.phone}</p>
            <p><strong>Địa chỉ:</strong> {admin.address}</p>
            <button onClick={() => setEditMode(true)}>✏️ Chỉnh sửa</button>
          </div>
        )}
      </div>

      {/* Thêm phần thống kê hoặc quản lý nếu cần */}
      <div className="admin-stats">
        <h3>Thống kê hệ thống</h3>
        <ul>
          <li>👥 Tổng số người dùng: <strong>120</strong></li>
          <li>🐾 Tổng số thú cưng: <strong>300</strong></li>
          <li>📅 Lịch hẹn hôm nay: <strong>15</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;
