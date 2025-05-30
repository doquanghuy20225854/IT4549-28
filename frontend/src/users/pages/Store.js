import React, { useState } from "react";
import "../styles/Store.css";
import "../styles/Layout.css";

const products = [
  {
    id: 1,
    title: "Thức Ăn Hạt Royal Canin",
    description: "Thức ăn hạt cao cấp cho chó, hỗ trợ tiêu hóa và tăng cường sức khỏe lông.",
    price: "350,000 VNĐ",
  },
  {
    id: 2,
    title: "Đồ Chơi Bóng Cao Su",
    description: "Bóng cao su bền bỉ, an toàn cho thú cưng, phù hợp cho chó và mèo.",
    price: "50,000 VNĐ",
  },
  {
    id: 3,
    title: "Vòng Cổ Thú Cưng",
    description: "Vòng cổ thời trang với chất liệu mềm mại, có thể điều chỉnh kích thước.",
    price: "120,000 VNĐ",
  },
  {
    id: 4,
    title: "Nhà Cào Cho Mèo",
    description: "Cột cào bằng sợi đay tự nhiên, giúp mèo mài móng và thư giãn.",
    price: "250,000 VNĐ",
  },
  {
    id: 5,
    title: "Balo Vận Chuyển Thú Cưng",
    description: "Balo thiết kế lưới thoáng khí, phù hợp cho chó mèo dưới 5kg.",
    price: "390,000 VNĐ",
  },
  {
    id: 6,
    title: "Khăn Tắm Cho Thú Cưng",
    description: "Khăn siêu thấm nước, mềm mịn, giúp làm khô thú cưng nhanh chóng.",
    price: "70,000 VNĐ",
  },
  {
    id: 7,
    title: "Bình Nước Di Động",
    description: "Bình nước tích hợp khay uống cho chó mèo khi đi dạo hoặc du lịch.",
    price: "130,000 VNĐ",
  },
  {
    id: 8,
    title: "Bánh Thưởng Cho Mèo",
    description: "Snack mềm vị cá ngừ, bổ sung vitamin và khoáng chất cho mèo.",
    price: "45,000 VNĐ",
  }
];


const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="store-page">
      <h2>CỬA HÀNG</h2>

      <div className="store-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>
            <button onClick={() => setSelectedProduct(product)}>Xem chi tiết</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.description}</p>
            <p><strong>Giá:</strong> {selectedProduct.price}</p>
            <button onClick={() => setSelectedProduct(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;