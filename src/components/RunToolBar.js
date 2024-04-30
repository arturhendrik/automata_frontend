import { faBackwardFast, faBackwardStep, faForwardFast, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { stepBack, stepForward, stepToEnd, stepToStart } from "utils/automataRun";

const RunToolBar = ({runIndex, runIndexCallback, runDataCallback, runSteps, runData}) => {
    return (
        <div className="toolbar">
            <label className="button" onClick={() => stepToStart(runIndex, runIndexCallback, runDataCallback, runSteps, runData)}>
                <FontAwesomeIcon icon={faBackwardFast}></FontAwesomeIcon>
            </label>
            <label className="button" onClick={() => stepBack(runIndex, runIndexCallback, runDataCallback, runSteps, runData)}>
                <FontAwesomeIcon icon={faBackwardStep}></FontAwesomeIcon>
            </label>
            <label className="button" onClick={() => stepForward(runIndex, runIndexCallback, runDataCallback, runSteps, runData)}>
                <FontAwesomeIcon icon={faForwardStep}></FontAwesomeIcon>
            </label>
            <label className="button" onClick={() => stepToEnd(runIndex, runIndexCallback, runDataCallback, runSteps, runData)}>
                <FontAwesomeIcon icon={faForwardFast}></FontAwesomeIcon>
            </label>
        </div>
    );
};

export default RunToolBar;
