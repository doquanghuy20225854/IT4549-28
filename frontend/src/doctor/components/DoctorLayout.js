import React from "react";
import HeaderDoctor from "./DoctorHeader";
import FooterDoctor from "./DoctorFooter";
import "../styles/DoctorLayout.css";

const DoctorLayout = ({ children }) => {
    return (
      <>
        <HeaderDoctor />
        <main>{children}</main>
        <FooterDoctor />
      </>
    );
  };
  
  export default DoctorLayout;
