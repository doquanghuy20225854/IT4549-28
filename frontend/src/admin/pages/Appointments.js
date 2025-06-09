import React, { useState, useEffect } from "react";
import "../styles/Appointments.css";
import { apiClient } from "../../lib/api-client";
import { GET_LIST_MEDIA_RECORD_ROUTE, ADD_MEDIA_RECORD_ROUTE, DELETE_MEDIA_RECORD_ROUTE } from "../../utils/constant";

const STATUS_OPTIONS = ["Chờ xử lý", "Đã xác nhận", "Hoàn tất", "Đã huỷ"];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    pet: "",
    owner: "",
    createDate: "",
    diagnosis: "",
    status: "Chờ xử lý",
  });


  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await apiClient.get(GET_LIST_MEDIA_RECORD_ROUTE, {withCredentials: true});
      setAppointments(response.data);
    }
    fetchAppointments();
  }, []);

  const handleAdd = async () => {
    const { pet, owner, createDate, diagnosis, status } = form;

    if (!pet || !owner || !createDate || !diagnosis || !status) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newAppointment = {
      ...form,
    };

    try {
      const response = await apiClient.post(ADD_MEDIA_RECORD_ROUTE, newAppointment, {withCredentials: true});
      if (response.status === 201) {
        setAppointments([...appointments, newAppointment]);
        setForm({ pet: "", owner: "", createDate: "", diagnosis: "", status: "Chờ xử lý" });
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lịch hẹn này?")) {
      try {
        const response = await apiClient.delete(`${DELETE_MEDIA_RECORD_ROUTE}/${id}`, {withCredentials: true});
        if (response.status === 200) {
          setAppointments((prev) => prev.filter((app) => app.id !== id));
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
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
          value={form.pet}
          onChange={(e) => setForm({ ...form, pet: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tên chủ nuôi"
          value={form.owner}
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
        />
        <input
          type="datetime-local"
          value={form.createDate}
          onChange={(e) => setForm({ ...form, createDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lý do khám"
          value={form.diagnosis}
          onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form,   status: e.target.value })}
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
              <td>{app.pet}</td>
              <td>{app.owner}</td>
              <td>{new Date(app.createDate).toLocaleString('vi-VN')}</td>
              <td>{app.diagnosis}</td>
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
