import React, { useState, useEffect } from "react";
import "../styles/Users.css";
import "../styles/AdminHeader.css";
import { GET_LIST_USER_ROUTE, ADD_USER_ROUTE, UPDATE_USER_ROUTE, DELETE_USER_ROUTE } from "../../utils/constant";
import { apiClient } from './../../lib/api-client';
import { toast } from 'react-toastify';

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", phone: "" });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(GET_LIST_USER_ROUTE, {withCredentials: true});
      setUsersList(response.data.users);
    } catch (error) {
      toast.error("Không thể tải danh sách người dùng: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const validateForm = (data) => {
    if (!data.name || data.name.trim() === "") {
      toast.error("Tên người dùng không được để trống");
      return false;
    }
    if (!data.role || data.role.trim() === "") {
      toast.error("Chức vụ không được để trống");
      return false;
    }
    if (!data.phone || !/^[0-9]{10}$/.test(data.phone)) {
      toast.error("Số điện thoại không hợp lệ (cần đúng 10 chữ số)");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm(form)) return;

    try {
      setLoading(true);
      const response = await apiClient.post(ADD_USER_ROUTE, form, {withCredentials: true});
      if (response.status === 201) {
        setUsersList([...usersList, response.data.user]);
        setForm({ name: "", role: "", phone: "" });
        toast.success("Thêm người dùng thành công!");
      }
    } catch (error) {
      toast.error("Không thể thêm người dùng: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("ID người dùng không hợp lệ");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        setLoading(true);
        const response = await apiClient.delete(`${DELETE_USER_ROUTE}/${id}`, {withCredentials: true});
        if (response.status === 200) {
          setUsersList(usersList.filter((s) => s._id !== id));
          toast.success("Xóa người dùng thành công!");
        }
      } catch (error) {
        toast.error("Không thể xóa người dùng: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editing || !editing._id) {
      toast.error("ID người dùng không hợp lệ");
      return;
    }

    if (!validateForm(editing)) return;

    try {
      setLoading(true);
      const response = await apiClient.put(`${UPDATE_USER_ROUTE}/${editing._id}`, {
        name: editing.name,
        role: editing.role,
        phone: editing.phone
      }, {withCredentials: true});
      
      if (response.status === 200) {
        setUsersList(usersList.map((s) => (s._id === editing._id ? response.data.user : s)));
        setEditing(null);
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Không thể cập nhật thông tin: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-container">
      <h2>Quản lý Người dùng</h2>

      <div className="staff-form">
        <input
          type="text"
          placeholder="Tên người dùng"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Chức vụ"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={loading}
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Đang xử lý..." : "Thêm người dùng"}
        </button>
      </div>

      {loading && <div className="loading">Đang tải...</div>}

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
          {usersList.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => setEditing(user)} disabled={loading}>Sửa</button>
                <button onClick={() => handleDelete(user._id)} disabled={loading}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chỉnh sửa người dùng</h3>
            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              disabled={loading}
              placeholder="Tên người dùng"
            />
            <input
              value={editing.role}
              onChange={(e) => setEditing({ ...editing, role: e.target.value })}
              disabled={loading}
              placeholder="Chức vụ"
            />
            <input
              value={editing.phone}
              onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
              disabled={loading}
              placeholder="Số điện thoại"
            />
            <button onClick={handleUpdate} disabled={loading}>
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button onClick={() => setEditing(null)} disabled={loading}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
