import React from 'react';
import ModeButton from './ModeButton';
import SaveButton from './SaveButton';
import UploadButton from './UploadButton';

const ToolBar = ({currentMode, currentModeCallback, transitionStartNode, data, dataCallback, uploadTimestampCallback}) => {
    return(
        <div className='toolbar'>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_STATE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_TRANSITION" transitionStartNode={transitionStartNode}></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="DELETE"></ModeButton>
            <SaveButton data={data} fileName={"test"} currentModeCallback={currentModeCallback}></SaveButton>
            <UploadButton dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback} currentModeCallback={currentModeCallback}></UploadButton>
        </div>
    );
};

export default ToolBar;
