import React from 'react';
import ModeButton from './ModeButton';
import SaveButton from './SaveButton';

const ToolBar = ({currentMode, currentModeCallback, transitionStartNodeCallback, transitionStartNode, data}) => {
    return(
        <div style={{width: '90%', margin: 'auto' }}>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_STATE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_TRANSITION" transitionStartNodeCallback={transitionStartNodeCallback} transitionStartNode={transitionStartNode}></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="DELETE"></ModeButton>
            <SaveButton data={data} fileName={"test"}></SaveButton>
        </div>
    );
};

export default ToolBar;
