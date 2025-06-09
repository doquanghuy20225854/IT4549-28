import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../lib/api-client";
import "../../styles/BookingPage.css";

const serviceData = {
  spa: "Spa Thú Cưng Chuẩn 5 Sao",
  bath: "Tắm Thú Cưng Tại Nhà",
  grooming: "Cắt Tỉa Lông Và Tạo Kiểu",
  hotel: "Khách Sạn Thú Cưng",
  store: "Phụ Kiện Thú Cưng",
  walking: "Dắt Chó Đi Dạo",
  vet: "Khám Bệnh Thú Cưng",
};

const BookingPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    petName: "",
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const validatePhone = (phone) => {
    // Chỉ cần 10 số và bắt đầu bằng số 0
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate phone number
    if (name === "phone" && value && !validatePhone(value)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.petName || !formData.name || !formData.phone || !formData.address || !formData.date || !formData.time) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Ghép date và time thành ISO string
      const timeISO = new Date(`${formData.date}T${formData.time}`).toISOString();
      const bookingData = {
        petName: formData.petName,
        ownerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        time: timeISO,
        reason: (serviceData[slug] || slug.replace(/-/g, " ")) + (formData.notes ? ` - ${formData.notes}` : ""),
      };

      const response = await apiClient.post('/api/appointments', bookingData);
      
      if (response.data.success) {
        alert("Đặt lịch thành công!");
        setFormData({
          petName: "",
          name: "",
          phone: "",
          address: "",
          date: "",
          time: "",
          notes: "",
        });
      } else {
        throw new Error(response.data.error || "Có lỗi xảy ra khi đặt lịch");
      }
    } catch (err) {
      console.error("Lỗi khi đặt lịch:", err);
      setError(err.response?.data?.error || "Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <h2>
        Đặt lịch dịch vụ:{" "}
        <span className="booking-page__slug">
          {serviceData[slug] || slug.replace(/-/g, " ")}
        </span>
      </h2>

      {error && <div className="error-message">{error}</div>}

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="petName">Tên thú cưng</label>
          <input
            type="text"
            id="petName"
            name="petName"
            required
            value={formData.petName}
            onChange={handleChange}
            placeholder="Nhập tên thú cưng"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Ngày đặt</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Giờ đặt</label>
          <input
            type="time"
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Ghi chú (nếu có)</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Thêm ghi chú..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="booking-button"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
