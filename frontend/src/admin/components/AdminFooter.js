import React from "react";
import "../styles/AdminFooter.css";

const FooterAdmin = () => {
  return (
    <footer className="admin-footer">
      <p className="admin-footer_text">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterAdmin;
