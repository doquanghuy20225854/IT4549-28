import React from "react";
import HeaderDoctor from "./DoctorHeader";
import FooterDoctor from "./DoctorFooter";
import "../styles/DoctorLayout.css";

const DoctorLayout = ({ children }) => {
  return (
    <div className="doctor-layout">
      <HeaderDoctor />
      <main className="doctor-main">
        <div className="doctor-content">
          {children}
        </div>
      </main>
      <FooterDoctor />
    </div>
  );
};

export default DoctorLayout;
