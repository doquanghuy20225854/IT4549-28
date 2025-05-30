import React, { useState } from "react";
import "../styles/Servicesing.css"; // Giữ nguyên file CSS

const initialAppointments = [
  { id: 1, serviceType: "Spa 5 Sao", staff: "Nguyễn Thị Anh", date: "2023-06-01", note: "Yêu cầu massage nhẹ nhàng" },
  { id: 2, serviceType: "Khám bệnh", staff: "Nguyễn Thị Bích", date: "2023-06-02", note: "Ho và bỏ ăn" },
  { id: 3, serviceType: "Tắm tại nhà", staff: "Nguyễn Thị Cúc", date: "2023-06-03", note: "Không thích nước lạnh" },
  { id: 4, serviceType: "Tiêm ngừa", staff: "Nguyễn Thị Duyên", date: "2023-06-04", note: "Chích vắc xin phòng dại" },
];

const CARE_SERVICES = ["Spa", "Tắm", "Chăm sóc", "Cạo lông", "Vệ sinh"];

const PetServiceAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [form, setForm] = useState({ serviceType: "", date: "", note: "", staff: "" });
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const isCareService = (type) =>
    CARE_SERVICES.some(keyword => type.toLowerCase().includes(keyword.toLowerCase()));

  const handleAdd = () => {
    if (!form.serviceType.trim()) return;
    setAppointments([...appointments, { ...form, id: Date.now() }]);
    setForm({ serviceType: "", date: "", note: "", staff: "" });
  };

  const handleEdit = (item) => setEditing(item);
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá lịch hẹn này?")) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const handleSaveEdit = () => {
    setAppointments(appointments.map(a => a.id === editing.id ? editing : a));
    setEditing(null);
  };

  return (
    <div className="admin-services">
      <h2>Dịch Vụ Chăm Sóc Thú Cưng</h2>

      {/* Form Thêm Mới */}
      <div className="service-form">
        <input
          type="text"
          placeholder="Loại dịch vụ"
          value={form.serviceType}
          onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nhân viên"
          value={form.staff}
          onChange={(e) => setForm({ ...form, staff: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ghi chú"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      {/* Bảng Lịch Hẹn */}
      <table className="services-table">
        <thead>
          <tr>
            <th>Dịch Vụ</th>
            <th>Nhân viên</th>
            <th>Ngày</th>
            <th>Ghi Chú</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter(item => isCareService(item.serviceType))
            .map(item => (
              <tr key={item.id}>
                <td>{item.serviceType}</td>
                <td>{item.staff}</td>
                <td>{item.date}</td>
                <td>{item.note}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Xoá</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal Sửa */}
      {editing && (
        <div className="edit-modal">
          <h3>Chỉnh sửa lịch</h3>
          <input
            type="text"
            value={editing.serviceType}
            onChange={(e) => setEditing({ ...editing, serviceType: e.target.value })}
          />
          <input
            type="text"
            value={editing.staff}
            onChange={(e) => setEditing({ ...editing, staff: e.target.value })}
          />
          <input
            type="date"
            value={editing.date}
            onChange={(e) => setEditing({ ...editing, date: e.target.value })}
          />
          <input
            type="text"
            value={editing.note}
            onChange={(e) => setEditing({ ...editing, note: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Lưu</button>
          <button onClick={() => setEditing(null)}>Huỷ</button>
        </div>
      )}

      {viewing && (
        <div className="edit-modal">
          <h3>Chi Tiết Lịch Hẹn</h3>
          <p><strong>Dịch vụ:</strong> {viewing.serviceType}</p>
          <p><strong>Nhân viên:</strong> {viewing.staff}</p>
          <p><strong>Ngày:</strong> {viewing.date}</p>
          <p><strong>Ghi chú:</strong> {viewing.note}</p>
          <button onClick={() => setViewing(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default PetServiceAppointments;
