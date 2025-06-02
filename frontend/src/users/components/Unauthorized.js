import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Không có quyền truy cập</h2>
      <p>Bạn không đủ quyền để truy cập trang này.</p>
    </div>
  );
};

export default Unauthorized;
