import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/ServiceDetail.css";

const serviceData = {
  "spa": {
    title: "Spa Thú Cưng Chuẩn 5 Sao",
    image: "/images/spa.jpg",
    content: `Spa thú cưng của chúng tôi cung cấp các dịch vụ chăm sóc chuyên sâu như tắm nước ấm, massage thư giãn,
    làm móng, vệ sinh tai và tạo kiểu lông. Đội ngũ nhân viên tận tâm và không gian thân thiện giúp thú cưng thư giãn tối đa.`,
  },
  "bath": {
    title: "Tắm Thú Cưng Tại Nhà",
    image: "/images/bath.jpg",
    content: `Không cần đưa thú cưng đi đâu xa, chúng tôi đến tận nhà để thực hiện các bước tắm rửa chuyên nghiệp
    với các sản phẩm an toàn, không gây kích ứng da. Giúp bạn tiết kiệm thời gian mà vẫn đảm bảo thú cưng sạch sẽ.`,
  },
  "grooming": {
    title: "Cắt Tỉa Lông Và Tạo Kiểu",
    image: "/images/grooming.jpg",
    content: `Tạo kiểu lông cho thú cưng theo xu hướng và phong cách riêng. Đội ngũ groomer chuyên nghiệp sẽ mang lại diện mạo mới mẻ và dễ thương cho thú cưng của bạn.`,
  },
  "hotel": {
    title: "Khách Sạn Thú Cưng",
    image: "/images/hotel.jpg",
    content: `Chỗ nghỉ dưỡng lý tưởng với phòng riêng, điều hòa, camera giám sát 24/7 và khu vui chơi. Đảm bảo thú cưng của bạn có kỳ nghỉ thoải mái khi bạn đi công tác hay du lịch.`,
  },
  "store": {
    title: "Phụ Kiện Thú Cưng",
    image: "/images/accessories.jpg",
    content: `Cung cấp thức ăn, vòng cổ, quần áo, đồ chơi và nhiều sản phẩm chất lượng cao từ các thương hiệu uy tín. Giao hàng tận nơi trên toàn quốc.`,
  },
  "walking": {
    title: "Dắt Chó Đi Dạo",
    image: "/images/walking.jpg",
    content: `Nhân viên giàu kinh nghiệm sẽ đưa thú cưng đi dạo đúng giờ, đảm bảo an toàn và giúp thú cưng được vận động, giảm stress mỗi ngày.`,
  },
  "vet": {
    title: "Khám Bệnh Thú Cưng",
    image: "/images/vet.jpg",
    content: `Đội ngũ bác sĩ thú y tay nghề cao, chẩn đoán nhanh chóng và điều trị hiệu quả. Có hỗ trợ khám tại nhà và cấp thuốc theo toa rõ ràng.`,
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); 
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="service-detail">
        <h2>Dịch vụ không tồn tại</h2>
      </div>
    );
  }

  const handleNavigate = () => {
    if (slug === "store") {
      navigate("/user/store");
    } else {
      navigate(`/user/booking/${slug}`);
    }
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="service-detail__back-button"
      >
        ← Quay lại
      </button>
      <div className="service-detail">
        <img src={service.image} alt={service.title} className="service-detail__image" />
        <h1 className="service-detail__title">{service.title}</h1>
        <p className="service-detail__content">{service.content}</p>
        <button onClick={handleNavigate} className="service-detail__book-button">
          Đặt lịch ngay
        </button>
      </div>
    </>
  );
};

export default ServiceDetail;
