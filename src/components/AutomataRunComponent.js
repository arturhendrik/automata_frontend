import React from "react";
import AutomataRunGraphComponent from "./AutomataRunGraphComponent";

const AutomataRunComponent = ({ data, currentModeCallback, runString, runAccept, runSteps, readSteps, runIndex}) => {

    return (
        <div>
            <AutomataRunGraphComponent data={data}/>
            <span className="close-btn" onClick={() => currentModeCallback(null)}>&times;</span>
            <div className="run-info">
                <div>Input: {"'"}{runString}{"'"}</div>
                {runAccept === true ? <div>Võtab vastu</div> : <div>Ei võta</div>}
                <div>Current states: {runSteps.at(runIndex)}</div>
                <div>Input processed: {"'"}{readSteps.at(runIndex)}{"'"}</div>
            </div>
        </div>
    );
}

export default AutomataRunComponent