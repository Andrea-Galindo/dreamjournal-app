import React from "react";
import "../styles/Header.css";
// import DreamJournal from "../assets/DreamJournal.png";

const Header = () => {
  return (
    <div
      style={{
        fontFamily: "synthemesc, sans-serif",
        fontSize: 50,
        marginBottom: "30px",
      }}
    >
      <div style={{ textAlign: "center" }}>Dream</div>
      <div style={{ marginTop: "-30px", textAlign: "center" }}>Journal</div>
      {/* <img style={{ width: "250px" }} src={DreamJournal}></img> */}
    </div>
  );
};

export default Header;
