import React, { useState, useEffect } from "react";
import "../styles/StaffCustomers.css"; // Import CSS riêng cho staff

const StaffCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  // Lấy danh sách khách hàng từ API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/customers', {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          setCustomers(data.data);
        } else {
          console.error('Failed to fetch customers:', data.error);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Hàm tìm kiếm khách hàng
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  // Hàm chỉnh sửa thông tin khách hàng
  const handleEdit = (customer) => setEditing({ ...customer });

  // Hàm lưu thông tin đã chỉnh sửa
  const handleSaveEdit = async () => {
    if (!editing.name || !editing.phone || !editing.email) {
      alert("Vui lòng điền đầy đủ thông tin: Tên, Số điện thoại, Email!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/customers/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      const data = await response.json();
      if (data.success) {
        setCustomers(customers.map((c) => (c._id === editing._id ? data.data : c)));
        setEditing(null);
      } else {
        alert('Cập nhật thất bại: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Cập nhật thất bại');
    }
  };

  // Hàm gửi thông báo (giả lập)
  const handleSendNotification = (customer) => {
    alert(`Đã gửi thông báo đến ${customer.name} qua email: ${customer.email}`);
    // Gọi API gửi thông báo nếu có backend
  };

  return (
    <div className="staff-customers">
      <h2>Quản lý khách hàng</h2>

      {/* Thanh tìm kiếm */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm theo tên hoặc số điện thoại"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng danh sách khách hàng */}
      <table className="customers-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(customer)}>
                  Sửa
                </button>
                <button className="view-btn" onClick={() => setViewing(customer)}>
                  Xem
                </button>
                <button
                  className="notify-btn"
                  onClick={() => handleSendNotification(customer)}
                >
                  Gửi thông báo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chỉnh sửa thông tin khách hàng */}
      {editing && (
        <div className="edit-modal">
          <h3>Chỉnh sửa thông tin khách hàng</h3>
          <input
            type="text"
            placeholder="Tên khách hàng"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={editing.phone}
            onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editing.email}
            onChange={(e) => setEditing({ ...editing, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={editing.address}
            onChange={(e) => setEditing({ ...editing, address: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Lưu</button>
          <button onClick={() => setEditing(null)}>Hủy</button>
        </div>
      )}

      {/* Modal xem chi tiết khách hàng */}
      {viewing && (
        <div className="view-modal">
          <h3>Chi tiết khách hàng</h3>
          <p><strong>Tên:</strong> {viewing.name}</p>
          <p><strong>Số điện thoại:</strong> {viewing.phone}</p>
          <p><strong>Email:</strong> {viewing.email}</p>
          <p><strong>Địa chỉ:</strong> {viewing.address}</p>
          <h4>Danh sách thú cưng</h4>
          <ul>
            {viewing.pets && viewing.pets.map((pet, index) => (
              <li key={index}>
                <strong>{pet.name}</strong> ({pet.species}) - Sức khỏe: {pet.health}
                <br />
                <strong>Lịch sử dịch vụ:</strong>{" "}
                {pet.services && pet.services.length > 0 ? pet.services.join(", ") : "Chưa có dịch vụ"}
              </li>
            ))}
          </ul>
          <button onClick={() => setViewing(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default StaffCustomers;
