import React, { useState, useEffect } from "react";
import "../styles/Servicesing.css";
import { apiClient } from '../../lib/api-client';
import { toast } from 'react-toastify';
import { 
  GET_LIST_SERVICE_ROUTE,
  ADD_SERVICE_ROUTE,
  UPDATE_SERVICE_ROUTE,
  DELETE_SERVICE_ROUTE 
} from '../../utils/constant';

const CARE_SERVICES = ["Spa", "Tắm", "Chăm sóc", "Cạo lông", "Vệ sinh"];

const PetServiceAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", note: "", staff: "" });
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(GET_LIST_SERVICE_ROUTE, { withCredentials: true });
      setAppointments(response.data.services);
    } catch (error) {
      toast.error("Không thể tải danh sách dịch vụ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isCareService = (type) =>
    CARE_SERVICES.some(keyword => type.toLowerCase().includes(keyword.toLowerCase()));

  const validateForm = (data) => {
    if (!data.name || data.name.trim() === "") {
      toast.error("Loại dịch vụ không được để trống");
      return false;
    }
    if (!data.staff || data.staff.trim() === "") {
      toast.error("Nhân viên không được để trống");
      return false;
    }
    if (!data.date) {
      toast.error("Ngày không được để trống");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm(form)) return;

    try {
      setLoading(true);
      const response = await apiClient.post(ADD_SERVICE_ROUTE, form, { withCredentials: true });
      if (response.status === 201) {
        setAppointments([...appointments, response.data.service]);
        setForm({ name: "", date: "", note: "", staff: "" });
        toast.success("Thêm dịch vụ thành công!");
      }
    } catch (error) {
      toast.error("Không thể thêm dịch vụ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => setEditing(item);

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("ID dịch vụ không hợp lệ");
      return;
    }

    if (window.confirm("Bạn có chắc muốn xoá dịch vụ này?")) {
      try {
        setLoading(true);
        const response = await apiClient.delete(`${DELETE_SERVICE_ROUTE}/${id}`, { withCredentials: true });
        if (response.status === 200) {
          setAppointments(appointments.filter(a => a._id !== id));
          toast.success("Xóa dịch vụ thành công!");
        }
      } catch (error) {
        toast.error("Không thể xóa dịch vụ: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editing || !editing._id) {
      toast.error("ID dịch vụ không hợp lệ");
      return;
    }

    if (!validateForm(editing)) return;

    try {
      setLoading(true);
      const response = await apiClient.put(`${UPDATE_SERVICE_ROUTE}/${editing._id}`, {
        name: editing.name,
        staff: editing.staff,
        date: editing.date,
        note: editing.note
      }, { withCredentials: true });

      if (response.status === 200) {
        setAppointments(appointments.map(a => a._id === editing._id ? response.data.service : a));
        setEditing(null);
        toast.success("Cập nhật dịch vụ thành công!");
      }
    } catch (error) {
      toast.error("Không thể cập nhật dịch vụ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-services">
      <h2>Dịch Vụ Chăm Sóc Thú Cưng</h2>

      {/* Form Thêm Mới */}
      <div className="service-form">
        <input
          type="text"
          placeholder="Loại dịch vụ"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Nhân viên"
          value={form.staff}
          onChange={(e) => setForm({ ...form, staff: e.target.value })}
          disabled={loading}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Ghi chú"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          disabled={loading}
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Đang xử lý..." : "Thêm"}
        </button>
      </div>

      {loading && <div className="loading">Đang tải...</div>}

      {/* Bảng Lịch Hẹn */}
      <table className="services-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Dịch Vụ</th>
            <th>Nhân viên</th>
            <th>Ngày</th>
            <th>Ghi Chú</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter(item => isCareService(item.name))
            .map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.staff}</td>
                <td>{item.date}</td>
                <td>{item.note}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)} disabled={loading}>Sửa</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)} disabled={loading}>Xoá</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal Sửa */}
      {editing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Chỉnh sửa dịch vụ</h3>
            
            <div className="form-group">
              <label>Tên dịch vụ</label>
              <input
                type="text"
                placeholder="Nhập tên dịch vụ"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Nhân viên phụ trách</label>
              <input
                type="text"
                placeholder="Nhập tên nhân viên"
                value={editing.staff}
                onChange={(e) => setEditing({ ...editing, staff: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Ngày thực hiện</label>
              <input
                type="date"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Ghi chú</label>
              <input
                type="text"
                placeholder="Nhập ghi chú (nếu có)"
                value={editing.note}
                onChange={(e) => setEditing({ ...editing, note: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="modal-buttons">
              <button onClick={handleSaveEdit} disabled={loading}>
                {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
              </button>
              <button onClick={() => setEditing(null)} disabled={loading}>
                Huỷ bỏ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xem chi tiết */}
      {viewing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Chi Tiết Dịch Vụ</h3>
            <div className="service-details">
              <p><strong>Dịch vụ:</strong> {viewing.name}</p>
              <p><strong>Nhân viên:</strong> {viewing.staff}</p>
              <p><strong>Ngày:</strong> {viewing.date}</p>
              <p><strong>Ghi chú:</strong> {viewing.note || "Không có"}</p>
            </div>
            <div className="modal-buttons">
              <button onClick={() => setViewing(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetServiceAppointments;
