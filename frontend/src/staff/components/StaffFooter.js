import React from "react";
import "../styles/StaffFooter.css";

const FooterStaff = () => {
  return (
    <footer className="staff-footer">
      <p className="staff-footer_text">
        &copy; {new Date().getFullYear()} Staff Panel. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterStaff;
