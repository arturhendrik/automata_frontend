import React from 'react';

const ModeButton = ({currentMode, currentModeCallback, mode, transitionStartNode}) => {
  const toggle = () => {
    if (currentMode === mode) {
      currentModeCallback("DEFAULT");
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
    <label className={`button ${currentMode === mode ? 'button-active' : ''}`} onClick={() => toggle()}>
      {buttonText()}
    </label>
  );
};

export default ModeButton;
