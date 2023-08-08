import React from "react";
import DreamForm from "../components/DreamForm";
import AppNavBar from "../components/AppNavBar";

import "../styles/NewDream.css";

const NewDream = () => {
  return (
    <div className="new-dream-page">
      <AppNavBar />
      <DreamForm />
    </div>
  );
};

export default NewDream;
