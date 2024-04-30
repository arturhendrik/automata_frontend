import React from 'react';
import checkAutomata from 'utils/checkAutomata';

const ModeButton = ({currentMode, currentModeCallback, mode, transitionStartNode, errorCallback, data, runStringCallback}) => {
  const toggle = () => {
    if (currentMode === mode) {
      currentModeCallback(null);
    }
    else {
      if (mode === "RUN") {
        const { hasInitialNode } = checkAutomata(data);
        if (!hasInitialNode) {
            errorCallback("The automaton needs an initial state");
            currentModeCallback(null);
        }
        else {
          let input;

            do {
              input = prompt("Enter a word to simulate:");
            } while (input && (!/^[a-zA-Z]+$/.test(input)));
          runStringCallback(input);
          if (input === null) {
            currentModeCallback(null);
          }
          else {
            currentModeCallback(mode);
          }
        }
      }
      else {
        currentModeCallback(mode); 
      }
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
    if (mode === "RUN") {
      return "Jooksuta";
    }
  }
  return (
    <label className={`button ${currentMode === mode ? 'button-active' : ''}`} onClick={() => toggle()}>
      {buttonText()}
    </label>
  );
};

export default ModeButton;
