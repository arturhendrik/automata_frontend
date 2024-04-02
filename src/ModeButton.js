import React from 'react';

const ModeButton = ({currentMode, currentModeCallback, mode, transitionStartNodeCallback, transitionStartNode}) => {
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
  const buttonText = () => {
    if (mode === "NEW_TRANSITION") {
      if (currentMode === "NEW_TRANSITION") {
        if (transitionStartNode === null) {
          return 'Vali alguspunkt';
        }
        return 'Vali lõpp-punkt';
      }
      return 'Lisa üleminek';
    }
    if (mode === "NEW_STATE") {
      return 'Uus olek';
    }
    if (mode === "DELETE") {
      return 'Kustuta';
    }
  }
  return (
    <button onClick={() => toggle()}style={{color: currentMode === mode ? 'orange' : 'black', marginBottom: '10px'}}>
      {buttonText()}
    </button>
  );
};

export default ModeButton;
