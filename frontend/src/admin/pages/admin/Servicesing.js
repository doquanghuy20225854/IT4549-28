import React, { useState } from "react";
import "../../styles/Servicesing.css";
import "../../styles/Header.css";
import Header from "../../components/Header";

const initialServices = [
  { id: 1, name: "Spa Thú Cưng Chuẩn 5 Sao", description: "Spa cao cấp cho thú cưng." },
  { id: 2, name: "Dịch Vụ Tắm Tại Nhà", description: "Nhân viên đến tận nhà để tắm thú cưng." },
  { id: 3, name: "Khách Sạn Thú Cưng", description: "Lưu trú an toàn, tiện nghi." },
];

const Servicesing = () => {
  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [editingService, setEditingService] = useState(null);

  const handleAdd = () => {
    if (!newService.name.trim()) return;
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: "", description: "" });
  };

  const handleEdit = (service) => {
    setEditingService(service);
  };

  const handleSaveEdit = () => {
    setServices(services.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá dịch vụ này?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="admin-services">
      <Header />
      <h2>Quản lý Dịch Vụ Đang Hoạt Động</h2>

      <div className="service-form">
        <input
          type="text"
          placeholder="Tên dịch vụ"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <button onClick={handleAdd}>Thêm dịch vụ</button>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th>Tên Dịch Vụ</th>
            <th>Mô Tả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>
                <button onClick={() => handleEdit(service)}>Sửa</button>
                <button onClick={() => handleDelete(service.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingService && (
        <div className="edit-modal">
          <h3>Chỉnh sửa dịch vụ</h3>
          <input
            type="text"
            value={editingService.name}
            onChange={(e) =>
              setEditingService({ ...editingService, name: e.target.value })
            }
          />
          <input
            type="text"
            value={editingService.description}
            onChange={(e) =>
              setEditingService({ ...editingService, description: e.target.value })
            }
          />
          <button onClick={handleSaveEdit}>Lưu</button>
          <button onClick={() => setEditingService(null)}>Huỷ</button>
        </div>
      )}
    </div>  
  );
};

export default Servicesing;
