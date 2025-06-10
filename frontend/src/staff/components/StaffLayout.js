import React from "react";
import HeaderStaff from "./StaffHeader";
import FooterStaff from "./StaffFooter";
import "../styles/StaffLayout.css";

const StaffLayout = ({ children }) => {
    return (
      <div className="staff-layout">
        <HeaderStaff />
        <main className="staff-main">{children}</main>
        <FooterStaff />
      </div>
    );
  };
  
  export default StaffLayout;