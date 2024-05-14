import React from "react";
import { handleSave } from "utils/downloadAutomata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const SaveButton = ({ data, currentModeCallback, selectedExercise }) => {

  const { t } = useTranslation();

  return (
    <div title={t("download_tooltip")} className="button" onClick={() => handleSave(data, currentModeCallback, selectedExercise)}>
      <FontAwesomeIcon icon={faDownload} />
    </div>
  );
};

export default SaveButton;
