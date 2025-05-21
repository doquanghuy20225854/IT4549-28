import React from "react";
import "../styles/Footer.css";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Hotline Đặt Lịch Hẹn | <span>0897 654 321</span></h2>
      </div>

      <div className="footer-content">
        <div className="footer-about">
          <h3>PET SERVICE</h3>
          <p><strong>Pet Service</strong> ra đời với mong muốn mang lại cho khách hàng sự chuyên nghiệp, uy tín mang nét đẹp hoàn mỹ mà chúng tôi đem lại sự trải nghiệm tốt nhất cho thú cưng của chúng ta...</p>
          <p><FaMapMarkerAlt /> số 1, P. HBT, Hà Nội</p>
          <p><FaPhoneAlt /> Hotline 0897 654 321</p>
          <p><FaEnvelope /> petservice@gmail.com</p>
          <div className="social-icons">
            <FaFacebook /> <FaInstagram /> <FaEnvelope />
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>DỊCH VỤ</h4>
            <ul>
              <li>Spa Thú Cưng Chuẩn 5 Sao</li>
              <li>Dịch Vụ Tắm Thú Cưng Tại Nhà</li>
              <li>Dịch Vụ Cắt Tỉa Lông Và Tạo Kiểu Tại Nhà</li>
              <li>Khách Sạn Thú Cưng Chuẩn 5 Sao</li>
              <li>Cung Cấp Sản Phẩm, Phụ Kiện</li>
            </ul>
          </div>
          <div>
            <h4>DỊCH VỤ THÚ CƯNG TẠI NHÀ</h4>
            <ul>
              <li>Trên toàn quốc</li>
            </ul>
          </div>
          <div>
            <h4>TRUY CẬP</h4>
            <ul>
              <li>Trang Chủ</li>
              <li>Giới Thiệu Về Pet Service</li>
              <li>Chia Sẻ Kiến Thức Và Kinh Nghiệm</li>
              <li><strong>HOTLINE 24/7</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
