import React, { useState, useEffect } from "react";
import "../styles/StaffAppointments.css";

const STATUS_OPTIONS = ["Chờ xử lý", "Đã xác nhận", "Hoàn tất", "Đã huỷ"];

// Danh sách dịch vụ cho staff (không bao gồm vet)
const STAFF_SERVICES = [
  { slug: 'spa', name: 'Spa Thú Cưng Chuẩn 5 Sao' },
  { slug: 'bath', name: 'Tắm Thú Cưng Tại Nhà' },
  { slug: 'grooming', name: 'Cắt Tỉa Lông Và Tạo Kiểu' },
  { slug: 'hotel', name: 'Khách Sạn Thú Cưng' },
  { slug: 'store', name: 'Phụ Kiện Thú Cưng' },
  { slug: 'walking', name: 'Dắt Chó Đi Dạo' },
];

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    time: "",
    serviceSlug: STAFF_SERVICES[0].slug, // Mặc định chọn dịch vụ đầu tiên
    status: "Chờ xử lý",
  });

  // Lấy danh sách lịch hẹn từ API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/appointments/staff');
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data);
        } else {
          console.error('Failed to fetch appointments:', data.error);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleAdd = async () => {
    const { petName, ownerName, time, serviceSlug } = form;

    if (!petName || !ownerName || !time || !serviceSlug) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Lấy tên dịch vụ từ slug
    const selectedService = STAFF_SERVICES.find(s => s.slug === serviceSlug);
    const reason = selectedService ? selectedService.name : serviceSlug;
    const serviceType = serviceSlug;

    try {
      const response = await fetch('http://localhost:3001/api/appointments/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petName,
          ownerName,
          time,
          reason,
          status: form.status,
          serviceType
        })
      });
      const data = await response.json();
      if (data.success) {
        setAppointments([...appointments, data.data]);
        setForm({ petName: "", ownerName: "", time: "", serviceSlug: STAFF_SERVICES[0].slug, status: "Chờ xử lý" });
      } else {
        alert('Thêm lịch hẹn thất bại: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('Thêm lịch hẹn thất bại');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lịch hẹn này?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/appointments/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          setAppointments((prev) => prev.filter((app) => app._id !== id));
        } else {
          alert('Xóa lịch hẹn thất bại: ' + data.error);
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Xóa lịch hẹn thất bại');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((app) => (app._id === id ? data.data : app))
        );
      } else {
        alert('Cập nhật trạng thái thất bại: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Cập nhật trạng thái thất bại');
    }
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
        <select
          value={form.serviceSlug}
          onChange={(e) => setForm({ ...form, serviceSlug: e.target.value })}
        >
          {STAFF_SERVICES.map((service) => (
            <option key={service.slug} value={service.slug}>{service.name}</option>
          ))}
        </select>
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
            <tr key={app._id}>
              <td>{index + 1}</td>
              <td>{app.petName}</td>
              <td>{app.ownerName}</td>
              <td>{app.time.replace("T", " ")}</td>
              <td>{app.reason}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(app._id)}>
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

export default StaffAppointments;
