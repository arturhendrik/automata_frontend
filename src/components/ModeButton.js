import React from "react";
import checkAutomata from "utils/checkAutomata";
import { useTranslation } from "react-i18next";

const ModeButton = ({ currentMode, currentModeCallback, mode, errorCallback, data, runStringCallback }) => {

  const { t } = useTranslation();

  const toggle = async () => {
    if (currentMode === mode) {
      currentModeCallback(null);
    }
    else {
      if (mode === "RUN") {
        const { hasInitialNode } = checkAutomata(data);
        await currentModeCallback(null);
        if (!hasInitialNode) {
          errorCallback("error_needs_initial");
        }
        else {
          let input;

          do {
            input = prompt(t("simulate_word"));
          } while (input && (!/^[a-zA-ZäöüõÄÖÜÕ]+$/.test(input)));
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

  return (
    <div className={`button ${currentMode === mode ? "button-active" : ""}`} onClick={() => toggle()}>
      {t(mode)}
    </div>
  );
};

export default ModeButton;
