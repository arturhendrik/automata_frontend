import { useState, useEffect } from 'react';
import React from 'react';
import GraphComponent from './GraphComponent';
import ToolBar from './ToolBar';

function App() {
  const [currentMode, setCurrentMode] = useState("DEFAULT");
  const [transitionStartNode, setTransitionStartNode] = useState(null);
  useEffect(() => {
    // Set transitionStartNode to null when currentMode changes
    setTransitionStartNode(null);
  }, [currentMode]);
  function currentModeCallback(mode) {
    setCurrentMode(mode);
  };
  function transitionStartNodeCallback(node) {
    setTransitionStartNode(node);
  };
  return (
    <div className="App">
      <h1 style={{width: '90%', margin: 'auto'}}>Automata simulator</h1>
      <GraphComponent currentMode={currentMode} transitionStartNode={transitionStartNode} transitionStartNodeCallback={transitionStartNodeCallback}/>
      <ToolBar currentModeCallback={currentModeCallback} currentMode={currentMode} transitionStartNodeCallback={transitionStartNodeCallback} ></ToolBar>
    </div>
  );
}

export default App;
