import React, { useState } from "react";
import "../styles/Users.css";
import "../styles/AdminHeader.css";
const Users = () => {
  const [usersList, setUsersList] = useState([
    { id: 1, name: "Nguyễn Văn A", role: "Bác sĩ", phone: "0123456789" },
    { id: 2, name: "Trần Thị B", role: "Bác sĩ", phone: "0987654321" },
    { id: 3, name: "Lê Văn C", role: "Nhân viên", phone: "0123334444" },
    { id: 4, name: "Nguyễn Thị D", role: "Nhân viên", phone: "0988887777" },
    { id: 5, name: "Ph m Minh E", role: "Lễ tân", phone: "0126668888" },
    { id: 6, name: "Nguyễn Văn F", role: "Bác sĩ", phone: "0129876543" },
    { id: 7, name: "Trần Thanh G", role: "Bác sĩ", phone: "0123456789" },
    { id: 8, name: "Nguyễn Thị H", role: "Nhân viên", phone: "0987654321" },
    { id: 9, name: "Lê Văn I", role: "Lễ tân", phone: "0123334444" },
    { id: 10, name: "Nguyễn Văn J", role: "Bác sĩ", phone: "0126668888" },
    { id: 11, name: "Nguyễn Văn K", role: "Khách hàng", phone: "0123456789" },
    { id: 12, name: "Nguyễn Văn L", role: "Khách hàng", phone: "0987654321" },
  ]);

  const [form, setForm] = useState({ name: "", role: "", phone: "" });
  const [editing, setEditing] = useState(null);

  const handleAdd = () => {
    if (!form.name || !form.role || !form.phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const newUser = {
      id: Date.now(),
      ...form,
    };
    setUsersList([...usersList, newUser]);
    setForm({ name: "", role: "", phone: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsersList(usersList.filter((s) => s.id !== id));
    }
  };

  const handleUpdate = () => {
    setUsersList(
      usersList.map((s) => (s.id === editing.id ? { ...editing } : s))
    );
    setEditing(null);
  };

  return (
    <div className="staff-container">
      <h2>Quản lý Người dùng</h2>

      <div className="staff-form">
        <input
          type="text"
          placeholder="Tên người dùng"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Chức vụ"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button onClick={handleAdd}>Thêm người dùng</button>
      </div>

      <table className="staff-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Chức vụ</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => setEditing(user)}>Sửa</button>
                <button onClick={() => handleDelete(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chỉnh sửa người dùng</h3>
            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <input
              value={editing.role}
              onChange={(e) => setEditing({ ...editing, role: e.target.value })}
            />
            <input
              value={editing.phone}
              onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
            />
            <button onClick={handleUpdate}>Cập nhật</button>
            <button onClick={() => setEditing(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
