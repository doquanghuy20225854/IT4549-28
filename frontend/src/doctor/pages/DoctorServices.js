import React, { useState } from "react";
import "../styles/DoctorServices.css"; // Import CSS riêng cho doctor

const MEDICAL_SERVICES = ["Khám tổng quát", "Tiêm phòng", "Điều trị", "Phẫu thuật", "Khám da liễu"];
const STATUS_OPTIONS = ["Chờ xử lý", "Đang thực hiện", "Hoàn tất"];

const initialServices = [
  {
    id: 1,
    petName: "Mia",
    ownerName: "Nguyễn Văn A",
    serviceType: "Khám tổng quát",
    staff: "BS. Nguyễn Thị Anh",
    date: "2025-06-03",
    note: "Kiểm tra sức khỏe định kỳ",
    status: "Chờ xử lý",
    diagnosis: "",
    prescription: "",
    recheck: "",
  },
  {
    id: 2,
    petName: "Tom",
    ownerName: "Trần Thị B",
    serviceType: "Tiêm phòng",
    staff: "BS. Nguyễn Thị Bích",
    date: "2025-06-04",
    note: "Tiêm vắc-xin phòng dại",
    status: "Hoàn tất",
    diagnosis: "Khỏe mạnh",
    prescription: "Vắc-xin phòng dại",
    recheck: "2025-12-04",
  },
  {
    id: 3,
    petName: "Miu",
    ownerName: "Nguyễn Văn C",
    serviceType: "Khám da liễu",
    staff: "BS. Nguyễn Thị Cúc",
    date: "2025-06-05",
    note: "Ngứa và rụng lông",
    status: "Đang thực hiện",
    diagnosis: "Viêm da dị ứng",
    prescription: "Thuốc bôi Cortisone, tắm thuốc 2 lần/tuần",
    recheck: "2025-06-12",
  },
];

const DoctorServices = () => {
  const [services, setServices] = useState(initialServices);
  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    serviceType: "",
    staff: "",
    date: "",
    note: "",
    status: "Chờ xử lý",
    diagnosis: "",
    prescription: "",
    recheck: "",
  });
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm kiểm tra dịch vụ y tế
  const isMedicalService = (type) =>
    MEDICAL_SERVICES.some((keyword) => type.toLowerCase().includes(keyword.toLowerCase()));

  // Hàm thêm dịch vụ
  const handleAdd = () => {
    const { petName, ownerName, serviceType, staff, date } = form;
    if (!petName || !ownerName || !serviceType || !staff || !date) {
      alert("Vui lòng điền đầy đủ thông tin: Tên thú cưng, Chủ nuôi, Loại dịch vụ, Nhân viên, Ngày!");
      return;
    }
    setServices([...services, { ...form, id: Date.now() }]);
    setForm({
      petName: "",
      ownerName: "",
      serviceType: "",
      staff: "",
      date: "",
      note: "",
      status: "Chờ xử lý",
      diagnosis: "",
      prescription: "",
      recheck: "",
    });
  };

  // Hàm chỉnh sửa dịch vụ
  const handleEdit = (service) => setEditing({ ...service });

  // Hàm lưu chỉnh sửa
  const handleSaveEdit = () => {
    if (!editing.diagnosis || !editing.prescription) {
      alert("Vui lòng điền đầy đủ chẩn đoán và đơn thuốc!");
      return;
    }
    setServices(services.map((s) => (s.id === editing.id ? editing : s)));
    setEditing(null);
  };

  // Hàm thay đổi trạng thái
  const handleStatusChange = (id, newStatus) => {
    setServices(services.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  // Hàm gửi thông báo
  const handleSendNotification = (service) => {
    alert(`Đã gửi thông báo đến ${service.ownerName} về dịch vụ ${service.serviceType}: ${service.recheck || "Không có lịch tái khám"}`);
    // Gọi API gửi thông báo nếu có backend
  };

  // Hàm tìm kiếm
  const filteredServices = services.filter(
    (service) =>
      isMedicalService(service.serviceType) &&
      (service.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="doctor-services">
      <h2>Quản lý dịch vụ y tế</h2>

      {/* Thanh tìm kiếm */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm theo tên thú cưng hoặc loại dịch vụ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form thêm mới */}
      <div className="service-form">
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
          type="text"
          placeholder="Loại dịch vụ"
          value={form.serviceType}
          onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bác sĩ phụ trách"
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
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Thêm</button>
      </div>

      {/* Bảng dịch vụ */}
      <table className="services-table">
        <thead>
          <tr>
            <th>Thú cưng</th>
            <th>Chủ nuôi</th>
            <th>Dịch vụ</th>
            <th>Bác sĩ</th>
            <th>Ngày</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service.id}>
              <td>{service.petName}</td>
              <td>{service.ownerName}</td>
              <td>{service.serviceType}</td>
              <td>{service.staff}</td>
              <td>{service.date}</td>
              <td>{service.note}</td>
              <td>
                <select
                  value={service.status}
                  onChange={(e) => handleStatusChange(service.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(service)}>
                  Cập nhật
                </button>
                <button className="view-btn" onClick={() => setViewing(service)}>
                  Xem
                </button>
                <button
                  className="notify-btn"
                  onClick={() => handleSendNotification(service)}
                >
                  Gửi thông báo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal cập nhật dịch vụ */}
      {editing && (
        <div className="edit-modal">
          <h3>Cập nhật dịch vụ y tế</h3>
          <p><strong>Thú cưng:</strong> {editing.petName}</p>
          <p><strong>Chủ nuôi:</strong> {editing.ownerName}</p>
          <p><strong>Dịch vụ:</strong> {editing.serviceType}</p>
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
          <input
            type="text"
            placeholder="Ghi chú"
            value={editing.note}
            onChange={(e) => setEditing({ ...editing, note: e.target.value })}
          />
          <select
            value={editing.status}
            onChange={(e) => setEditing({ ...editing, status: e.target.value })}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button onClick={handleSaveEdit}>Lưu</button>
          <button onClick={() => setEditing(null)}>Hủy</button>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {viewing && (
        <div className="view-modal">
          <h3>Chi tiết dịch vụ y tế</h3>
          <p><strong>Thú cưng:</strong> {viewing.petName}</p>
          <p><strong>Chủ nuôi:</strong> {viewing.ownerName}</p>
          <p><strong>Dịch vụ:</strong> {viewing.serviceType}</p>
          <p><strong>Bác sĩ:</strong> {viewing.staff}</p>
          <p><strong>Ngày:</strong> {viewing.date}</p>
          <p><strong>Ghi chú:</strong> {viewing.note || "Không có"}</p>
          <p><strong>Chẩn đoán:</strong> {viewing.diagnosis || "Chưa có"}</p>
          <p><strong>Đơn thuốc:</strong> {viewing.prescription || "Chưa có"}</p>
          <p><strong>Lịch tái khám:</strong> {viewing.recheck || "Không có"}</p>
          <button onClick={() => setViewing(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default DoctorServices;