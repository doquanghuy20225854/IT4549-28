import React, { useState } from "react";
import "../styles/DoctorAppointments.css";

const STATUS_OPTIONS = ["Chờ xử lý", "Đã xác nhận", "Hoàn tất", "Đã hủy"];

const initialAppointments = [
  {
    id: 1,
    petName: "Mia",
    ownerName: "Nguyễn Văn A",
    time: "2025-06-03T10:00",
    reason: "Khám tổng quát",
    status: "Chờ xử lý",
    diagnosis: "",
    prescription: "",
    recheck: "",
    medicalHistory: ["Khám tổng quát - 2025-05-01: Khỏe mạnh"],
  },
  {
    id: 2,
    petName: "Tom",
    ownerName: "Trần Thị B",
    time: "2025-06-03T14:30",
    reason: "Tiêm phòng",
    status: "Đã xác nhận",
    diagnosis: "Khỏe mạnh, cần tiêm phòng dại",
    prescription: "Vắc-xin phòng dại",
    recheck: "2025-12-03",
    medicalHistory: ["Tiêm phòng - 2024-12-01: Vắc-xin tổng hợp"],
  },
  {
    id: 3,
    petName: "Miu",
    ownerName: "Nguyễn Văn C",
    time: "2025-06-03T16:00",
    reason: "Khám da liễu",
    status: "Hoàn tất",
    diagnosis: "Viêm da dị ứng",
    prescription: "Thuốc bôi Cortisone, tắm thuốc 2 lần/tuần",
    recheck: "2025-06-10",
    medicalHistory: ["Khám da liễu - 2025-04-15: Viêm da nhẹ"],
  },
];

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  // Hàm tìm kiếm lịch hẹn
  const filteredAppointments = appointments.filter(
    (app) =>
      app.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm cập nhật thông tin khám
  const handleEdit = (app) => setEditing({ ...app });

  const handleSaveEdit = () => {
    if (!editing.diagnosis || !editing.prescription) {
      alert("Vui lòng điền đầy đủ chẩn đoán và đơn thuốc!");
      return;
    }
    setAppointments(appointments.map((a) => (a.id === editing.id ? editing : a)));
    setEditing(null);
  };

  // Hàm thay đổi trạng thái
  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  // Hàm gửi thông báo
  const handleSendNotification = (app) => {
    alert(`Đã gửi thông báo đến ${app.ownerName} về lịch tái khám: ${app.recheck || "Không có"}`);
    // Gọi API gửi thông báo nếu có backend
  };

  return (
    <div className="doctor-appointments">
      <h2>Quản lý lịch hẹn khám bệnh</h2>

      {/* Thanh tìm kiếm */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm theo tên thú cưng hoặc chủ nuôi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng lịch hẹn */}
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
          {filteredAppointments.map((app, index) => (
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
                <button className="edit-btn" onClick={() => handleEdit(app)}>
                  Cập nhật
                </button>
                <button className="view-btn" onClick={() => setViewing(app)}>
                  Xem
                </button>
                <button
                  className="notify-btn"
                  onClick={() => handleSendNotification(app)}
                >
                  Gửi thông báo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal cập nhật kết quả khám */}
      {editing && (
        <div className="edit-modal">
          <h3>Cập nhật kết quả khám</h3>
          <p><strong>Thú cưng:</strong> {editing.petName}</p>
          <p><strong>Chủ nuôi:</strong> {editing.ownerName}</p>
          <p><strong>Lý do khám:</strong> {editing.reason}</p>
          <input
            type="text"
            placeholder="Chẩn đoán"
            value={editing.diagnosis}
            onChange={(e) => setEditing({ ...editing, diagnosis: e.target.value })}
          />
          <input
            type="text"
            placeholder="Đơn thuốc"
            value={editing.prescription}
            onChange={(e) => setEditing({ ...editing, prescription: e.target.value })}
          />
          <input
            type="date"
            placeholder="Lịch tái khám"
            value={editing.recheck}
            onChange={(e) => setEditing({ ...editing, recheck: e.target.value })}
          />
          <textarea
            placeholder="Lịch sử bệnh án (thêm mới)"
            value={editing.medicalHistory.join("\n")}
            onChange={(e) =>
              setEditing({ ...editing, medicalHistory: e.target.value.split("\n") })
            }
          />
          <button onClick={handleSaveEdit}>Lưu</button>
          <button onClick={() => setEditing(null)}>Hủy</button>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {viewing && (
        <div className="view-modal">
          <h3>Chi tiết lịch hẹn</h3>
          <p><strong>Thú cưng:</strong> {viewing.petName}</p>
          <p><strong>Chủ nuôi:</strong> {viewing.ownerName}</p>
          <p><strong>Thời gian:</strong> {viewing.time.replace("T", " ")}</p>
          <p><strong>Lý do khám:</strong> {viewing.reason}</p>
          <p><strong>Chẩn đoán:</strong> {viewing.diagnosis || "Chưa có"}</p>
          <p><strong>Đơn thuốc:</strong> {viewing.prescription || "Chưa có"}</p>
          <p><strong>Lịch tái khám:</strong> {viewing.recheck || "Không có"}</p>
          <p><strong>Lịch sử bệnh án:</strong></p>
          <ul>
            {viewing.medicalHistory.length > 0 ? (
              viewing.medicalHistory.map((record, index) => (
                <li key={index}>{record}</li>
              ))
            ) : (
              <li>Chưa có lịch sử bệnh án</li>
            )}
          </ul>
          <button onClick={() => setViewing(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;