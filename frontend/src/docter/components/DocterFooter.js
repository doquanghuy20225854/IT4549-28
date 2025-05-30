import React from "react";
import "../styles/DocterFooter.css";

const FooterDocter = () => {
  return (
    <footer className="docter-footer">
      <p className="docter-footer_text">
        &copy; {new Date().getFullYear()} Docter Panel. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterDocter;
