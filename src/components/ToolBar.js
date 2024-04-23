import React from 'react';
import ModeButton from './ModeButton';
import SaveButton from './SaveButton';
import UploadButton from './UploadButton';
import NfaToDfaButton from './NfaToDfaButton';
import MinimizeDfaButton from './MinimizeDfaButton';

const ToolBar = ({currentMode, currentModeCallback, transitionStartNode, data, dataCallback, uploadTimestampCallback, errorCallback, runStringCallback}) => {
    return(
        <div className='toolbar'>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_STATE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_TRANSITION" transitionStartNode={transitionStartNode}></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="DELETE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="RUN" errorCallback={errorCallback} data={data} runStringCallback={runStringCallback}></ModeButton>
            <NfaToDfaButton data={data} currentModeCallback={currentModeCallback} errorCallback={errorCallback} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback}></NfaToDfaButton>
            <MinimizeDfaButton data={data} currentModeCallback={currentModeCallback} errorCallback={errorCallback} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback}></MinimizeDfaButton>
            <SaveButton data={data} fileName={"test"} currentModeCallback={currentModeCallback}></SaveButton>
            <UploadButton dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback} currentModeCallback={currentModeCallback}></UploadButton>
        </div>
    );
};

export default ToolBar;
