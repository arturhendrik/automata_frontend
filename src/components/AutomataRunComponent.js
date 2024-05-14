import React from "react";
import AutomataRunGraphComponent from "components/AutomataRunGraphComponent";
import { useTranslation } from "react-i18next";

const AutomataRunComponent = ({ data, currentModeCallback, runString, runAccept, runSteps, readSteps, runIndex }) => {

    const { t } = useTranslation();

    return (
        <div>
            <AutomataRunGraphComponent data={data} />
            <span className="close-btn close-btn-big" onClick={() => currentModeCallback(null)}>&times;</span>
            <div className="run-info">
                <div>{t("run_input")}: {"'"}{runString}{"'"}</div>
                <div>{t("run_input_processed")}: {"'"}{readSteps.at(runIndex)}{"'"}</div>
                {runIndex === runSteps.length - 1 && (runAccept === true ? <div>{t("run_accept")}</div> : <div>{t("run_reject")}</div>)}
            </div>
        </div>
    );
}

export default AutomataRunComponent