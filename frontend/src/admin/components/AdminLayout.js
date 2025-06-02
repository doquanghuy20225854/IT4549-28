import React from "react";
import HeaderAdmin from "./AdminHeader";
import FooterAdmin from "./AdminFooter";
import "../styles/AdminLayer.css";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="admin-layout">
      <HeaderAdmin />
      <div className="admin-body">
        <main className="admin-main">{children}</main>
      </div>
      <FooterAdmin />
    </div>
  );
};

export default LayoutAdmin;
