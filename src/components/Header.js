import React from "react";
import "../styles/Header.css";
import DreamJournal from "../assets/DreamJournal.png";

const Header = () => {
  return (
    <div style={{ fontFamily: "synthemesc, sans-serif" }}>
      <img style={{ width: "250px" }} src={DreamJournal}></img>
    </div>
  );
};

export default Header;
