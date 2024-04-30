import React from "react";
import ModeButton from "components/ModeButton";
import SaveButton from "components/SaveButton";
import UploadButton from "components/UploadButton";
import NfaToDfaButton from "components/NfaToDfaButton";
import MinimizeDfaButton from "components/MinimizeDfaButton";

const ToolBar = ({ currentMode, currentModeCallback, data, dataCallback, uploadTimestampCallback, errorCallback, runStringCallback, selectedExercise }) => {
    return (
        <div className="toolbar">
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_STATE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_TRANSITION"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="DELETE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="RUN" errorCallback={errorCallback} data={data} runStringCallback={runStringCallback}></ModeButton>
            <NfaToDfaButton data={data} currentModeCallback={currentModeCallback} errorCallback={errorCallback} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback}></NfaToDfaButton>
            <MinimizeDfaButton data={data} currentModeCallback={currentModeCallback} errorCallback={errorCallback} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback}></MinimizeDfaButton>
            <SaveButton data={data} currentModeCallback={currentModeCallback} selectedExercise={selectedExercise}></SaveButton>
            <UploadButton dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback} currentModeCallback={currentModeCallback}></UploadButton>
        </div>
    );
};

export default ToolBar;
