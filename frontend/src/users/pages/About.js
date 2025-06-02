import React from "react";
import "../styles/About.css";

const About = () => {
  return (
      <div className="about-page">
        <h1 className="about-title">
          Chăm sóc thú cưng toàn diện – Tận tâm như người thân!
        </h1>
        <p className="about-description">
          Pet Service ra đời với mong muốn mang lại cho khách hàng sự chuyên nghiệp, uy tín, 
          cùng vẻ đẹp hoàn mỹ trong từng dịch vụ. Chúng tôi luôn nỗ lực để đem đến trải nghiệm tốt nhất 
          cho thú cưng của bạn – những người bạn bốn chân đáng yêu.
        </p>

        <div className="about-content">
          <section>
            <h2>Giới thiệu về Pet Service</h2>
            <p>
              Với hơn 5 năm kinh nghiệm trong lĩnh vực dịch vụ thú cưng, Pet Service tự hào là điểm đến 
              tin cậy của hàng nghìn khách hàng. Chúng tôi cung cấp các dịch vụ toàn diện như: thú y, spa thú cưng, 
              khách sạn thú cưng, phân phối thú cưng và phụ kiện chuyên nghiệp. Mỗi dịch vụ đều được thực hiện 
              với sự tận tâm và chuyên môn cao.
            </p>
          </section>

          <section>
            <h2>Tầm nhìn</h2>
            <p>
              Trở thành hệ sinh thái chăm sóc thú cưng toàn diện hàng đầu tại Việt Nam – nơi thú cưng được yêu thương, 
              bảo vệ và sống hạnh phúc như một thành viên thực sự trong gia đình.
            </p>
          </section>

          <section>
            <h2>Sứ mệnh</h2>
            <p>
              Cung cấp dịch vụ chăm sóc thú cưng chuyên nghiệp, tận tâm và nhân văn. Kết nối cộng đồng yêu thú cưng 
              thông qua trải nghiệm đẳng cấp và thân thiện. Luôn đổi mới và nâng cao chất lượng vì một tương lai tốt đẹp 
              hơn cho thú cưng.
            </p>
          </section>

          <section>
            <h2>Giá trị cốt lõi</h2>
            <ul>
              <li><strong>Tận tâm</strong>: Yêu thương và phục vụ bằng cả trái tim.</li>
              <li><strong>Chất lượng</strong>: Đặt an toàn và trải nghiệm của thú cưng lên hàng đầu.</li>
              <li><strong>Minh bạch</strong>: Rõ ràng, trung thực trong mọi dịch vụ.</li>
              <li><strong>Bền vững</strong>: Phát triển cùng cộng đồng yêu thú cưng.</li>
            </ul>
          </section>

          <section>
            <h2>Liên hệ chúng tôi</h2>
            <p>
              Mọi thắc mắc hoặc yêu cầu tư vấn, vui lòng liên hệ qua email:{" "}
              <a href="mailto:petservice@gmail.com">petservice@gmail.com</a> hoặc hotline: <strong>0897 654 321</strong>.
            </p>
          </section>
        </div>
      </div>
  );
};

export default About;
