import React from "react";
import HeaderDocter from "./DocterHeader";
import FooterDocter from "./DocterFooter";
import "../styles/DocterLayout.css";

const DocterLayout = ({ children }) => {
    return (
      <>
        <HeaderDocter />
        <main>{children}</main>
        <FooterDocter />
      </>
    );
  };
  
  export default DocterLayout;