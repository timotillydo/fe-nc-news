import React from "react";
import "../styles/Loading.css";

const Loading = () => {
  return (
    <div className="spinner-bg">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
