import React, { useState } from "react";
import "../../styles/Staff.css";
import Header from "../../components/Header";
import "../../styles/Header.css";

const Staff = () => {
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Nguyễn Văn A", role: "Bác sĩ", phone: "0123456789" },
    { id: 2, name: "Trần Thị B", role: "Bác sĩ", phone: "0987654321" },
    { id: 3, name: "Lê Văn C", role: "Nhân viên", phone: "0123334444" },
    { id: 4, name: "Nguyễn Thị D", role: "Nhân viên", phone: "0988887777" },
    { id: 5, name: "Ph m Minh E", role: "Lễ tân", phone: "0126668888" },
  ]);

  const [form, setForm] = useState({ name: "", role: "", phone: "" });
  const [editing, setEditing] = useState(null);

  const handleAdd = () => {
    if (!form.name || !form.role || !form.phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const newStaff = {
      id: Date.now(),
      ...form,
    };
    setStaffList([...staffList, newStaff]);
    setForm({ name: "", role: "", phone: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      setStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  const handleUpdate = () => {
    setStaffList(
      staffList.map((s) => (s.id === editing.id ? { ...editing } : s))
    );
    setEditing(null);
  };

  return (
    <div className="staff-container">
      <Header />
      <h2>Quản lý Nhân viên</h2>

      <div className="staff-form">
        <input
          type="text"
          placeholder="Tên nhân viên"
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
        <button onClick={handleAdd}>Thêm nhân viên</button>
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
          {staffList.map((staff, index) => (
            <tr key={staff.id}>
              <td>{index + 1}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.phone}</td>
              <td>
                <button onClick={() => setEditing(staff)}>Sửa</button>
                <button onClick={() => handleDelete(staff.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chỉnh sửa nhân viên</h3>
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

export default Staff;
