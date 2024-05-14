import React, { useRef } from "react";
import { handleUpload } from "utils/uploadAutomata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const UploadButton = ({ dataCallback, uploadTimestampCallback, currentModeCallback }) => {
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    currentModeCallback(null);
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile, dataCallback, uploadTimestampCallback);
    fileInputRef.current.value = "";
  };

  return (
    <>
      <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} ref={fileInputRef} />
      <label title={t("upload_tooltip")} htmlFor="fileInput" className="button">
        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
      </label></>
  );
}

export default UploadButton;
