import React from "react";
import { useTranslation } from "react-i18next";

const ErrorPopup = ({ errorMessage, errorCallback}) => {

  const { t } = useTranslation();

  const handleClose = () => {
    errorCallback(null);
  }
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>{t(errorMessage)}</p>
        <span className="close-btn" onClick={() => handleClose()}>&times;</span>
      </div>
    </div>
  );
};

export default ErrorPopup;
