import React from 'react';

const ModeButton = ({currentMode, currentModeCallback, mode, transitionStartNodeCallback}) => {
  const toggle = () => {
    if (currentMode === mode) {
      currentModeCallback("DEFAULT");
      if (transitionStartNodeCallback) {
        transitionStartNodeCallback(null);
      }
    }
    else {
      currentModeCallback(mode); 
    }
  };
  return (
    <button onClick={() => toggle()}style={{color: currentMode === mode ? 'orange' : 'black', marginBottom: '10px'}}>
      {mode}
    </button>
  );
};

export default ModeButton;
