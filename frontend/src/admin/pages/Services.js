import React, { useState } from "react";
import "../styles/Services.css";
import "../styles/Header.css";
import Header from "../components/Header";

const services = [
  {
    id: 1,
    title: "Spa Thú Cưng Chuẩn 5 Sao",
    description: "Dịch vụ spa chất lượng cao với trang thiết bị hiện đại và đội ngũ nhân viên chuyên nghiệp.",
  },
  {
    id: 2,
    title: "Dịch Vụ Tắm Thú Cưng Tại Nhà",
    description: "Chúng tôi đến tận nơi để tắm và chăm sóc thú cưng của bạn theo lịch hẹn.",
  },
  {
    id: 3,
    title: "Dịch Vụ Cắt Tỉa Lông Và Tạo Kiểu Tại Nhà",
    description: "Tạo kiểu, cắt tỉa lông thú cưng theo yêu cầu, tại nhà bạn.",
  },
  {
    id: 4,
    title: "Khách Sạn Thú Cưng Chuẩn 5 Sao",
    description: "Nơi lưu trú tiện nghi, thoải mái và an toàn cho thú cưng của bạn.",
  },
  {
    id: 5,
    title: "Cung Cấp Sản Phẩm, Phụ Kiện",
    description: "Phụ kiện, thức ăn, đồ chơi chất lượng cao cho thú cưng các loại.",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="services-page">
      <Header />
      <h2>DỊCH VỤ</h2>

      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <button onClick={() => setSelectedService(service)}>Xem chi tiết</button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>
            <button onClick={() => setSelectedService(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
