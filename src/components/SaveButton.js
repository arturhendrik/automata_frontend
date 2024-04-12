import React from 'react';
import {handleSave} from "../utils/downloadAutomata"

const SaveButton = ({ data, fileName }) => {
  return (
    <button onClick={() => handleSave(data, fileName)}style={{marginBottom: '10px'}}>
      Lae alla
    </button>
  );
};

export default SaveButton;
