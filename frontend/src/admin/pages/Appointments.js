import React, { useState } from "react";
import "../styles/Appointments.css";

const STATUS_OPTIONS = ["Chờ xử lý", "Đã xác nhận", "Hoàn tất", "Đã huỷ"];

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      petName: "Mia",
      ownerName: "Nguyễn Văn A",
      time: "2025-05-21T10:00",
      reason: "Khám tổng quát",
      status: "Chờ xử lý",
    },
    {
      id: 2,
      petName: "Tom",
      ownerName: "Trần Thị B",
      time: "2025-05-21T14:30",
      reason: "Tiêm phòng",
      status: "Đã xác nhận",
    },
    {
      id: 3,
      petName: "Miu",
      ownerName: "Nguyễn Văn C",
      time: "2025-05-21T16:00",
      reason: "Khám da liễu",
      status: "Hoàn tất",
    },
  ]);

  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    time: "",
    reason: "",
    status: "Chờ xử lý",
  });

  const handleAdd = () => {
    const { petName, ownerName, time, reason } = form;

    if (!petName || !ownerName || !time || !reason) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      ...form,
    };

    setAppointments([...appointments, newAppointment]);
    setForm({ petName: "", ownerName: "", time: "", reason: "", status: "Chờ xử lý" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lịch hẹn này?")) {
      setAppointments((prev) => prev.filter((app) => app.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="appointments-container">
      <h2>Quản lý lịch hẹn khám</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Tên thú cưng"
          value={form.petName}
          onChange={(e) => setForm({ ...form, petName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tên chủ nuôi"
          value={form.ownerName}
          onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
        />
        <input
          type="datetime-local"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lý do khám"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Thêm lịch hẹn</button>
      </div>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Thú cưng</th>
            <th>Chủ nuôi</th>
            <th>Thời gian</th>
            <th>Lý do</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app, index) => (
            <tr key={app.id}>
              <td>{index + 1}</td>
              <td>{app.petName}</td>
              <td>{app.ownerName}</td>
              <td>{app.time.replace("T", " ")}</td>
              <td>{app.reason}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(app.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
