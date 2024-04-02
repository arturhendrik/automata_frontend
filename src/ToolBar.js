import React from 'react';
import ModeButton from './ModeButton';

const ToolBar = ({currentMode, currentModeCallback, transitionStartNodeCallback}) => {
    return(
        <div style={{width: '90%', margin: 'auto' }}>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_STATE"></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="NEW_TRANSITION" transitionStartNodeCallback={transitionStartNodeCallback}></ModeButton>
            <ModeButton currentMode={currentMode} currentModeCallback={currentModeCallback} mode="DELETE"></ModeButton>
        </div>
    );
};

export default ToolBar;
