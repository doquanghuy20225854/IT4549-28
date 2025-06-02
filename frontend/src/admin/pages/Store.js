import React from "react";
import "../styles/Store.css";

const Store = () => {
  // Dữ liệu mẫu thống kê
  const statistics = [
    { category: "Thức ăn", quantity: 120 },
    { category: "Đồ chơi", quantity: 85 },
    { category: "Phụ kiện", quantity: 60 },
    { category: "Chăm sóc", quantity: 40 },
  ];

  return (
    <div className="product-statistics-page">
      <h2>Thống kê sản phẩm</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Danh mục</th>
            <th>Số lượng sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          {statistics.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


/**
 * @return {ReactElement} Trang Cửa hàng
 */
export default Store;
