import { useState, useEffect } from 'react';
import React from 'react';
import GraphComponent from './components/GraphComponent';
import ToolBar from './components/ToolBar';
import ErrorPopup from './components/ErrorPopup';

function App() {
  const [currentMode, setCurrentMode] = useState("DEFAULT");
  const [transitionStartNode, setTransitionStartNode] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [indexOfNodeOnContext, setIndexOfNodeOnContext] = useState(null);
  const [uploadTimestamp, setUploadTimestamp] = useState(null);
  const [error, setError] = useState(null);

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
  function uploadTimestampCallback(timestamp) {
    setUploadTimestamp(timestamp);
  };
  function errorCallback(errorMessage) {
    setError(errorMessage);
  };
  return (
    <div className="App">
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
        uploadTimestamp={uploadTimestamp}
        />
      <ToolBar currentModeCallback={currentModeCallback} currentMode={currentMode} transitionStartNode={transitionStartNode} data={data} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback} errorCallback={errorCallback}></ToolBar>
      {error && <ErrorPopup errorMessage={error} errorCallback={errorCallback} />}
    </div>
  );
}

export default App;
