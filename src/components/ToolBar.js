import React from 'react';
import ModeButton from './ModeButton';
import SaveButton from './SaveButton';
import UploadButton from './UploadButton';
import NfaToDfaButton from './NfaToDfaButton';

const ToolBar = ({currentMode, currentModeCallback, transitionStartNode, data, dataCallback, uploadTimestampCallback, errorCallback}) => {
    return(
        <div className='toolbar'>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_STATE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_TRANSITION" transitionStartNode={transitionStartNode}></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="DELETE"></ModeButton>
            <NfaToDfaButton data={data} currentModeCallback={currentModeCallback} errorCallback={errorCallback} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback}></NfaToDfaButton>
            <SaveButton data={data} fileName={"test"} currentModeCallback={currentModeCallback}></SaveButton>
            <UploadButton dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback} currentModeCallback={currentModeCallback}></UploadButton>
        </div>
    );
};

export default ToolBar;
