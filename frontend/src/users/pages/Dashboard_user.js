import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard_user.css';

const DashboardUser = () => {
  const services = [
    {
      title: 'Spa thú cưng',
      slug: 'spa',
      description: 'Chăm sóc sắc đẹp và vệ sinh cho thú cưng của bạn.',
      image: '/images/spa.jpg',
      link: '/services/spa',
    },
    {
      title: 'Khách sạn thú cưng',
      slug: 'hotel',
      description: 'Nơi nghỉ ngơi lý tưởng cho thú cưng khi bạn đi vắng.',
      image: '/images/hotel.jpg',
      link: '/services/hotel',
    },
    {
      title: 'Dắt chó đi dạo',
      slug: 'walking',
      description: 'Dịch vụ dắt chó đi dạo theo giờ.',
      image: '/images/walking.jpg',
      link: '/services/walking',
    },
  ];

  const posts = [
    {
      id: 1,
      slug: 'bang-gia',
      title: 'Bảng Giá Chăm Sóc Thú Cưng – Pet Service',
      image: '/bang_gia.png',
      excerpt: `PET SERVICE với các trang thiết bị chuyên nghiệp cùng với đội ngũ nhân viên được đào tạo bài bản và có nhiều năm kinh nghiệm, sẽ đáp ứng nhu cầu vệ sinh sạch sẽ của thú cưng bao gồm: tắm sấy, vệ sinh, cắt tỉa ngoài ra còn có thú y tại nhà.`,
      date: '28/05/2020',
    },
  ];

  const categories = ['Chia Sẻ Kinh Nghiệm', 'Góc Giải Trí', 'Dịch Vụ Tại Nhà'];

  const recentPosts = [
    {
      id: 2,
      
      title: 'Bí Quyết Chăm Sóc Mèo Con Mới Nhận Nuôi Tại HÀ NỘI',
      date: '12 Th4 2025',
    },
    {
      id: 3,
      title: 'Dịch Vụ Trông Giữ Thú Cưng HÀ NỘI – Linh Hoạt Từ Pet Service',
      date: '11 Th3 2025',
    },
    {
      id: 4,
      title: 'Spa Uy Tín HÀ NỘI – Top Mẹo Chọn spa thú cưng Từ Pet Service',
      date: '10 Th3 2025',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <h1>Chào mừng đến với Petserver!</h1>
        <p>
          Petserver là một công ty chuyên cung cấp các dịch vụ chăm sóc thú cưng
          uy tín và chuyên nghiệp. Chúng tôi có các dịch vụ spa thú cưng, khách
          sạn thú cưng, dắt chó đi dạo,... và nhiều hơn nữa.
        </p>
      </div>
      
      {/* Services Section */}
      <div className="dashboard__services">
        <h2 className="dashboard__services-title">Dịch vụ phổ biến</h2>
        <div className="dashboard__services-list">
          {services.map((service, index) => (
            <div key={index} className="dashboard__service-card">
              <img
                src={service.image}
                alt={service.title}
                className="dashboard__service-image"
              />
              <h3 className="dashboard__service-title">{service.title}</h3>
              <p className="dashboard__service-description">{service.description}</p>
              <Link to={`/user/services/${service.slug}`} className="dashboard__service-link">
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="dashboard__content">
        <div className="dashboard__main">
          {posts.map((post, index) => (
            <div key={index} className="dashboard__post">
              <img
                src={post.image}
                alt={post.title}
                className="dashboard__post-image"
              />
              <h2 className="dashboard__post-title">{post.title}</h2>
              <p className="dashboard__post-excerpt">{post.excerpt}</p>
              <Link to={`/user/post/${post.id}`} className="dashboard__post-link">
                Xem thêm »
              </Link>
              <div className="dashboard__post-meta">{post.date}</div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="dashboard__sidebar">
          <div className="dashboard__sidebar-section">
            <h3 className="dashboard__sidebar-title">Danh Mục</h3>
            <ul className="dashboard__category-list">
              {categories.map((cat, idx) => (
                <li key={idx} className="dashboard__category-item">
                  <input type="radio" className="dashboard__category-radio" name="category" />
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard__sidebar-section">
            <h3 className="dashboard__sidebar-title">Bài Viết Mới</h3>
            <ul className="dashboard__recent-list">
              {recentPosts.map((post, i) => (
                <li key={i} className="dashboard__recent-item">
                  <Link to={`/user/post/${post.id}`} className="dashboard__recent-link">
                    {post.title}
                  </Link>
                  <div className="dashboard__recent-meta">{post.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
