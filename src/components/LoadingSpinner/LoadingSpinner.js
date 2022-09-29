import React from "react";
import "./spinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Loading<div className="dots" style={{ width: "2rem" }}></div>
      </h1>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
