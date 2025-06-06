import React from "react";
import "../styles/DoctorFooter.css";

const FooterDoctor = () => {
  return (
    <footer className="doctor-footer">
      <p className="doctor-footer_text">
        &copy; {new Date().getFullYear()} Doctor Panel. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterDoctor;
