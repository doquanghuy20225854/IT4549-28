import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // You can call API here
      // await fetch("/api/bookings", { ... })

      console.log("Booking submitted:", { ...formData, service: slug });
      alert("Đặt lịch thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra khi đặt lịch.");
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

      <form className="booking-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="booking-button">
          Xác nhận đặt lịch
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
