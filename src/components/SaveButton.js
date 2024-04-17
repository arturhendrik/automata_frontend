import React from 'react';
import {handleSave} from "../utils/downloadAutomata";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const SaveButton = ({ data, fileName, currentModeCallback }) => {
  return (
    <label className='button' onClick={() => handleSave(data, fileName, currentModeCallback)}>
      <FontAwesomeIcon icon={faDownload} />
    </label>
  );
};

export default SaveButton;
