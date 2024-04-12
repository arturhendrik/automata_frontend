import { useState, useEffect } from 'react';
import React from 'react';
import GraphComponent from './components/GraphComponent';
import ToolBar from './components/ToolBar';

function App() {
  const [currentMode, setCurrentMode] = useState("DEFAULT");
  const [transitionStartNode, setTransitionStartNode] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [indexOfNodeOnContext, setIndexOfNodeOnContext] = useState(null);

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
  function menuPositionCallback(coords) {
    setMenuPosition(coords);
  };
  function contextMenuVisibleCallback(visibility) {
    setContextMenuVisible(visibility);
  };
  function dataCallback(newData) {
    setData(newData);
  };
  function indexOfNodeOnContextCallback(index) {
    setIndexOfNodeOnContext(index);
  };
  return (
    <div className="App">
      <h1 style={{width: '90%', margin: 'auto'}}>Automata simulator</h1>
      <GraphComponent 
        currentMode={currentMode} 
        transitionStartNode={transitionStartNode} 
        transitionStartNodeCallback={transitionStartNodeCallback} 
        menuPositionCallback={menuPositionCallback} 
        contextMenuVisibleCallback={contextMenuVisibleCallback} 
        isContextMenuVisible={isContextMenuVisible} 
        menuPosition={menuPosition}
        data={data}
        dataCallback={dataCallback}
        indexOfNodeOnContext={indexOfNodeOnContext}
        indexOfNodeOnContextCallback={indexOfNodeOnContextCallback}
        />
      <ToolBar currentModeCallback={currentModeCallback} currentMode={currentMode} transitionStartNodeCallback={transitionStartNodeCallback} transitionStartNode={transitionStartNode} data={data}></ToolBar>
    </div>
  );
}

export default App;
