import React from 'react';
import '../styles/PostDetail.css';

const PostDetail = () => {
  return (
    <>
    <div className="post-detail">
      <div className="post-detail__container">
        <h1 className="post-detail__title">BẢNG GIÁ CHI TIẾT DỊCH VỤ</h1>

        <img src="/bang_gia.png" alt="bảng giá dịch vụ" className="post-detail__image" />

        <p className="post-detail__price">
          *Giá có thể thay đổi theo kích thước thú cưng hoặc yêu cầu đặc biệt.
        </p>
        <p className="post-detail__content">
          Dịch vụ tắm - sấy cho thú cưng bao gồm: tắm bằng dầu gội cao cấp, sấy
          lông, vệ sinh tai, cắt móng, massage toàn thân. Giúp thú cưng sạch sẽ,
          thơm tho và khỏe mạnh.
        </p>
        <p className="post-detail__content">
          Dịch vụ cắt tỉa lông cho thú cưng bao gồm: cắt tỉa lông, vệ sinh tai, cắt
          móng, massage toàn thân. Giúp thú cưng sạch sẽ, thơm tho và khỏe mạnh.
        </p>
        <p className="post-detail__content">
          Dịch vụ khám tổng quát cho thú cưng bao gồm: khám sức khỏe toàn diện,
          tư vấn dinh dưỡng, tư vấn vệ sinh, phòng bệnh. Giúp thú cưng khỏe mạnh,
          có một cuộc sống tốt đẹp.
        </p>
        <p className="post-detail__content">
          Dịch vụ lưu trú qua đêm cho thú cưng bao gồm: phòng điều hòa, theo dõi
          24/7, cho ăn, uống, vệ sinh. Giúp thú cưng an toàn, có một chỗ ở sạch
          sẽ và thoải mái.
        </p>
        <p className="post-detail__content">
          Dịch vụ tại nhà cho thú cưng bao gồm: tắm, cắt tỉa, khám thú y tận nơi.
          Giúp thú cưng sạch sẽ, thơm tho và khỏe mạnh ngay tại nhà.
        </p>

        <p className="post-detail__note">
          *Giá có thể thay đổi theo kích thước thú cưng hoặc yêu cầu đặc biệt.
        </p>
      </div>
    </div>
    </>
  );
};

export default PostDetail;
