import React from "react";
import Layout from "../components/Layout";
import "../styles/About.css";

const About = () => {
  return (
    <Layout>
      <div className="about-page">
        <div className="about-header">
          <h1>Về Pet Service</h1>
          <p>Chăm sóc thú cưng toàn diện – Tận tâm như người thân!</p>
        </div>

        <div className="about-content">
          <section>
            <h2>Sứ mệnh của chúng tôi</h2>
            <p>
              Pet Service ra đời với mong muốn mang lại cho khách hàng sự chuyên nghiệp, uy tín và trải nghiệm tốt nhất dành cho thú cưng. Chúng tôi tin rằng mỗi thú cưng đều xứng đáng được yêu thương và chăm sóc một cách hoàn hảo.
            </p>
          </section>

          <section>
            <h2>Dịch vụ nổi bật</h2>
            <ul>
              <li>🛁 Spa thú cưng chuẩn 5 sao</li>
              <li>🏠 Khách sạn lưu trú tiện nghi</li>
              <li>✂️ Cắt tỉa lông và tạo kiểu tại nhà</li>
              <li>🚿 Tắm gội chuyên sâu tại nhà</li>
              <li>🛍️ Cung cấp phụ kiện và thức ăn</li>
            </ul>
          </section>

          <section>
            <h2>Giá trị cốt lõi</h2>
            <p>
              Chúng tôi đề cao sự an toàn, tận tâm, minh bạch và trách nhiệm. Đội ngũ nhân viên, bác sĩ thú y và chuyên viên chăm sóc luôn không ngừng học hỏi và nâng cao chất lượng dịch vụ mỗi ngày.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
