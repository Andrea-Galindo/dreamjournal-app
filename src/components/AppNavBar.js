import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserAuth } from "../context/AuthContext";

import "../styles/AppNavBar.css";

const AppNavBar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("uid");
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="position-relative"
      style={{ paddingTop: "2rem" }}
    >
      <LinkContainer
        style={{ fontFamily: "synthemesc, sans-serif", fontSize: "25px" }}
        to="/dashboard"
      >
        <Navbar.Brand className="position-absolute start-50 translate-middle-x">
          Dream Journal
        </Navbar.Brand>
      </LinkContainer>
      <LinkContainer
        className="hover-underline"
        onClick={handleLogout}
        style={{
          borderRadius: "40px",
          fontFamily: "degular-text, sans-serif",
          marginRight: "30px",
        }}
        to="/settings"
      >
        <div
          style={{
            background: "black",
            fontSize: "16px",
            fontFamily: "degular-text, sans-serif",
          }}
          variant="primary"
          className="position-absolute end-0"
        >
          Sign Out
        </div>
      </LinkContainer>
    </Navbar>
  );
};

export default AppNavBar;
