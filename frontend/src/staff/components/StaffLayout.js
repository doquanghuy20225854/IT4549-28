import React from "react";
import HeaderStaff from "./StaffHeader";
import FooterStaff from "./StaffFooter";
import "../styles/StaffLayout.css";

const StaffLayout = ({ children }) => {
    return (
      <>
        <HeaderStaff />
        <main>{children}</main>
        <FooterStaff />
      </>
    );
  };
  
  export default StaffLayout;