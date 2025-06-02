import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Services.css";

const services = [
  {
    id: 1,
    title: "Spa Thú Cưng Chuẩn 5 Sao",
    slug: "spa",
    description:
      "Dịch vụ spa chất lượng cao với trang thiết bị hiện đại và đội ngũ nhân viên chuyên nghiệp.",
  },
  {
    id: 2,
    title: "Dịch Vụ Tắm Thú Cưng Tại Nhà",
    slug: "bath",
    description:
      "Chúng tôi đến tận nơi để tắm và chăm sóc thú cưng của bạn theo lịch hẹn.",
  },
  {
    id: 3,
    title: "Dịch Vụ Cắt Tỉa Lông Và Tạo Kiểu Tại Nhà",
    slug: "grooming",
    description:
      "Tạo kiểu, cắt tỉa lông thú cưng theo yêu cầu, tại nhà bạn.",
  },
  {
    id: 4,
    title: "Khách Sạn Thú Cưng Chuẩn 5 Sao",
    slug: "hotel",
    description:
      "Nơi lưu trú tiện nghi, thoải mái và an toàn cho thú cưng của bạn.",
  },
  {
    id: 5,
    title: "Cung Cấp Sản Phẩm, Phụ Kiện",
    slug: "store",
    description:
      "Phụ kiện, thức ăn, đồ chơi chất lượng cao cho thú cưng các loại.",
  },
  {
    id: 6,
    title: "Dịch Vụ Dắt Chó Đi Dạo",
    slug: "walking",
    description:
      "Dịch vụ dắt chó đi dạo theo giờ, để thú cưng của bạn được vận động và thư giãn.",
  },
  {
    id: 7,
    title: "Khám Bệnh Thú Cưng",
    slug: "vet",
    description:
      "Dịch vụ khám bệnh thú cưng, chẩn đoán và điều trị các vấn đề sức khỏe cho thú cưng.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
      <div className="services-page">
        <h2>DỊCH VỤ</h2>
        <div className="services-list">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <button
                onClick={() =>
                  service.slug === "store"
                    ? navigate("/user/store")
                    : navigate(`/user/services/${service.slug}`)
                }
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Services;