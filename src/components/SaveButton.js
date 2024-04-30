import React from "react";
import {handleSave} from "utils/downloadAutomata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const SaveButton = ({ data, currentModeCallback }) => {
  return (
    <label className="button" onClick={() => handleSave(data, currentModeCallback)}>
      <FontAwesomeIcon icon={faDownload} />
    </label>
  );
};

export default SaveButton;
