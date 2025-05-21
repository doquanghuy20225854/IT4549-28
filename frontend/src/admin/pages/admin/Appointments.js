import React, { useState } from "react";
import "../../styles/Appointments.css";
import Header from "../../components/Header";
import "../../styles/Header.css";
import AppointmentDetailModal from "../detaimodal/AppointmentDetailModal"; // Đảm bảo đúng tên thư mục và file

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      petName: "Mia",
      ownerName: "Nguyễn Văn A",
      time: "2025-05-21T10:00",
      reason: "Khám tổng quát",
    },
    {
      id: 2,
      petName: "Tom",
      ownerName: "Trần Thị B",
      time: "2025-05-21T14:30",
      reason: "Tiêm phòng",
    },
    {
      id: 3,
      petName: "Miu",
      ownerName: "Nguyễn Văn C",
      time: "2025-05-21T16:00",
      reason: "Khám da liễu",
    },
    {
      id: 4,
      petName: "Rex",
      ownerName: "Trần Thị D",
      time: "2025-05-22T10:00",
      reason: "Khám tổng quát",
    },
    {
      id: 5,
      petName: "Mun",
      ownerName: "Lê Văn E",
      time: "2025-05-22T14:00",
      reason: "Tiêm phòng",
    },
    {
      id: 6,
      petName: "Xe",
      ownerName: "Nguyễn Văn F",
      time: "2025-05-23T10:00",
      reason: "Khám da liễu",
    },
    {
      id: 7,
      petName: "Sữa",
      ownerName: "Trần Thị G",
      time: "2025-05-23T14:30",
      reason: "Khám tổng quát",
    },
    {
      id: 8,
      petName: "Hoàng",
      ownerName: "Lê Văn H",
      time: "2025-05-24T10:00",
      reason: "Tiêm phòng",
    },
  ]);

  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    time: "",
    reason: "",
  });

  const [selected, setSelected] = useState(null);

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
    setForm({ petName: "", ownerName: "", time: "", reason: "" });
  };

  const handleUpdate = () => {
    if (!selected) return;

    setAppointments((prev) =>
      prev.map((app) => (app.id === selected.id ? { ...selected } : app))
    );
    setSelected(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lịch hẹn này?")) {
      setAppointments((prev) => prev.filter((app) => app.id !== id));
    }
  };

  return (
    <div className="appointments-container">
      <Header />
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
                <button className="btn-view" onClick={() => setSelected(app)}>
                  <i className="fa fa-eye"></i>
                </button>
                <button className="btn-delete" onClick={() => handleDelete(app.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết lịch hẹn */}
      <AppointmentDetailModal
        appointment={selected}
        onChange={setSelected}
        onUpdate={handleUpdate}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default Appointments;
