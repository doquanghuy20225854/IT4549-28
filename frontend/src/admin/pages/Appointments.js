import React, { useState, useEffect } from "react";
import "../styles/Appointments.css";
import { apiClient } from "../../lib/api-client";
import { 
  GET_ALL_APPOINTMENTS, 
  ADD_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  DELETE_APPOINTMENT 
} from "../../utils/constant";

const STATUS_OPTIONS = ["Chờ xử lý", "Đã xác nhận", "Hoàn tất", "Đã huỷ"];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    time: "",
    reason: "",
    status: "Chờ xử lý",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(GET_ALL_APPOINTMENTS, {withCredentials: true});
      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        setError("Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.");
      }
    } catch (error) {
      setError("Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.");
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const { petName, ownerName, time, reason } = form;
    if (!petName.trim()) return "Vui lòng nhập tên thú cưng";
    if (!ownerName.trim()) return "Vui lòng nhập tên chủ nuôi";
    if (!time) return "Vui lòng chọn thời gian";
    if (!reason.trim()) return "Vui lòng nhập lý do khám";
    return null;
  };

  const handleAdd = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setLoading(true);
    
      const response = await apiClient.post(ADD_APPOINTMENT, form, {withCredentials: true});
      if (response.data.success) {
        setAppointments([...appointments, response.data.data]);
        setForm({ petName: "", ownerName: "", time: "", reason: "", status: "Chờ xử lý" });
        alert("Thêm lịch hẹn thành công!");
      } else {
        setError("Không thể thêm lịch hẹn. " + response.data.error);
      }
    } catch (error) {
      setError("Không thể thêm lịch hẹn. Vui lòng thử lại sau.");
      console.error("Error adding appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lịch hẹn này?")) {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.delete(`${DELETE_APPOINTMENT}/${id}`, {withCredentials: true});
        if (response.status === 200) {
          setAppointments((prev) => prev.filter((app) => app._id !== id));
          alert("Xóa lịch hẹn thành công!");
        }
      } catch (error) {
        setError("Không thể xóa lịch hẹn. Vui lòng thử lại sau.");
        console.error("Error deleting appointment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.put(`${UPDATE_APPOINTMENT}/${id}`, { status: newStatus }, {withCredentials: true});
      if (response.status === 200) {
        setAppointments((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (error) {
      setError("Không thể cập nhật trạng thái. Vui lòng thử lại sau.");
      console.error("Error updating appointment status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
        <button onClick={handleAdd} disabled={loading}>Thêm lịch hẹn</button>
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
              <td>{new Date(app.time).toLocaleString('vi-VN')}</td>
              <td>{app.reason}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  disabled={loading}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(app._id)}
                  disabled={loading}
                >
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
