import React from "react";
import { useTranslation } from "react-i18next";

const ErrorPopup = ({ errorMessage, errorCallback }) => {

  const { t } = useTranslation();

  const handleClose = () => {
    errorCallback(null);
  }
  const handleMessage = () => {
    if (errorMessage.includes(":")) {
      const parts = errorMessage.split(":");
      return t(parts[0]) + parts[1]
    }
    else {
      return t(errorMessage);
    }
  }
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{handleMessage()}</p>
        <span className="close-btn" onClick={() => handleClose()}>&times;</span>
      </div>
    </div>
  );
};

export default ErrorPopup;
