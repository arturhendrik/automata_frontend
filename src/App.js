import { useState, useEffect } from 'react';
import React from 'react';
import GraphComponent from './components/GraphComponent';
import ToolBar from './components/ToolBar';
import ErrorPopup from './components/ErrorPopup';
import AutomataRunComponent from './components/AutomataRunComponent';
import RunToolBar from './components/RunToolBar';
import { getRunSteps } from './utils/automataRun';

function App() {
  const [currentMode, setCurrentMode] = useState(null);
  const [transitionStartNode, setTransitionStartNode] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [indexOfNodeOnContext, setIndexOfNodeOnContext] = useState(null);
  const [uploadTimestamp, setUploadTimestamp] = useState(null);
  const [error, setError] = useState(null);
  const [runData, setRunData] = useState({ nodes: [], edges: [] });
  const [runIndex, setRunIndex] = useState(0);
  const [runSteps, setRunSteps] = useState([]);
  const [runString, setRunString] = useState(null);
  const [readSteps, setReadSteps] = useState([]);
  const [runAccept, setRunAccept] = useState(null);

  useEffect(() => {
    setTransitionStartNode(null);
    setContextMenuVisible(false);
    setIndexOfNodeOnContext(null);
    if (currentMode === "RUN") {
      const initialNodes = data.nodes.filter(node => node.group === "Initial" || node.group === "Initial_Final");
      const minX = Math.min(...data.nodes.map(node => node.x));
      const minY = Math.min(...data.nodes.map(node => node.y));
      const updatedNodes = data.nodes.map(node => ({
        ...node,
        x: node.x - minX,
        y: node.y - minY
      }));

      if (initialNodes.length > 0 && runString !== null) {
          const {runSteps, readSteps, accept} = getRunSteps(initialNodes.at(0).id, data, runString);
          setRunSteps(runSteps);
          setReadSteps(readSteps);
          setRunAccept(accept);
          if (runString === '') {
            updatedNodes.forEach(element => {
              if (runSteps.at(0).includes(element.id)) {
                if (element.group.includes("Final")) {
                  element.group = element.group+"_Accepted";
                } else {
                  element.group = element.group+"_Notaccepted";
                }
              }
            });
          }
          else {
            updatedNodes.forEach(element => {
              if (runSteps.at(0).includes(element.id)) {
                element.group = element.group+"_Active";
              }
            });
          }
          const newData = { nodes: updatedNodes, edges: data.edges };
          setRunData(newData);
      }
    } else {
      setRunData({ nodes: [], edges: [] });
      setRunIndex(0);
      setRunSteps([]);
      setRunString(null);
      setReadSteps([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode]);
  useEffect(() => {
    setContextMenuVisible(false);
    setIndexOfNodeOnContext(null);
  }, [data]);
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
  function runDataCallback(data) {
    setRunData(data);
  };
  function runIndexCallback(index) {
    setRunIndex(index);
  }
  function runStringCallback(string) {
    setRunString(string);
  }
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
      {currentMode === "RUN" ? <RunToolBar runIndex={runIndex} runIndexCallback={runIndexCallback} runDataCallback={runDataCallback} runSteps={runSteps} runData={runData}></RunToolBar> : <ToolBar currentModeCallback={currentModeCallback} currentMode={currentMode} transitionStartNode={transitionStartNode} data={data} dataCallback={dataCallback} uploadTimestampCallback={uploadTimestampCallback} errorCallback={errorCallback} runStringCallback={runStringCallback}></ToolBar>}
      {error && <ErrorPopup errorMessage={error} errorCallback={errorCallback} />}
      {currentMode === "RUN" && <AutomataRunComponent data={runData} currentModeCallback={currentModeCallback} runString={runString} runAccept={runAccept} runSteps={runSteps} readSteps={readSteps} runIndex={runIndex}/>}
    </div>
  );
}

export default App;
