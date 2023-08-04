import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <div
      style={{
        fontFamily: "synthemesc, sans-serif",
        fontSize: 60,
        marginTop: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={{ textAlign: "center" }}>Dream</div>
      <div style={{ marginTop: "-30px", textAlign: "center" }}>Journal</div>
    </div>
  );
};

export default Header;
