import React from "react";
import { useTranslation } from "react-i18next";

const SuccessPopup = ({ successCallback }) => {

    const { t } = useTranslation();

    const handleClose = () => {
        successCallback(null);
    }
    return (
        <div className="popup success">
            <div className="popup-content">
                <p>{t("success")}</p>
                <span className="close-btn" onClick={() => handleClose()}>&times;</span>
            </div>
        </div>
    );
};

export default SuccessPopup;
