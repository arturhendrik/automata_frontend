import React from "react";

const ErrorPopup = ({ errorMessage, errorCallback}) => {
  const handleClose = () => {
    errorCallback(null);
  }
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>{errorMessage}</p>
        <span className="close-btn" onClick={() => handleClose()}>&times;</span>
      </div>
    </div>
  );
};

export default ErrorPopup;
