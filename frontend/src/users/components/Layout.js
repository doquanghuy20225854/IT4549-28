import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Header cố định phía trên */}
      <Header />

      {/* Nội dung chính giữa header và footer */}
      <div className="admin-body">
        <main className="admin-content">
          {children}
        </main>
      </div>

      {/* Footer ở cuối trang */}
      <Footer />
    </div>
  );
};

export default Layout;
