import React, { Component } from 'react';
import { Network } from 'vis-network';
import CustomContextMenu from '../components/CustomContextMenu';
import { customFinalState, customInitialFinalState, customInitialState, customNormalState } from '../utils/customStates';

class GraphComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMode: props.currentMode,
      transitionStartNode: props.transitionStartNode,
      transitionStartNodeCallback: props.transitionStartNodeCallback,
      menuPositionCallback: props.menuPositionCallback,
      contextMenuVisibleCallback: props.contextMenuVisibleCallback,
      menuPosition: props.menuPosition,
      isContextMenuVisible: props.isContextMenuVisible,
      data: props.data,
      dataCallback: props.dataCallback,
      indexOfNodeOnContext: props.indexOfNodeOnContext,
      indexOfNodeOnContextCallback: props.indexOfNodeOnContextCallback,
      selectedValue: undefined,
      uploadTimestamp: props.uploadTimestamp
    };
  }

  componentDidMount() {
    this.initGraph(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.uploadTimestamp !== prevProps.uploadTimestamp) {
      this.initGraph(this.props.data);
    }
  }

  initGraph(data) {
    // Create a new network instance
    const container = document.getElementById('network');
    //const data = this.props.data;
    const options = {
      nodes: {
        borderWidth: 1,
        borderWidthSelected: 1,
        font: {
          size: 14,
          face: "sans-serif"
        },
        shape: "circle",
        margin: 15,
        color: {
          background: 'white',
          border: 'black',
          hover: {
            border: 'black'
          },
          highlight: {
            border: 'black'
          },          
        }
      },
      edges: {
        arrows: "to",
        color: {
          color: "#3e3e3e",
          hover: "#3e3e3e",
          highlight: "#3e3e3e",
          inherit: false
        },
        font: {
          align: "top",
          face: "sans-serif"
        },
        width: 1,
        smooth: {
          type: 'curvedCW',
          roundness: 0.1 // adjust the roundness of the curve (0 to 1)
        }
      },
      groups: {
        Initial: { 
          shape: 'custom',
          ctxRenderer: customInitialState
        },
        Final: {
          shape: "custom",
          ctxRenderer: customFinalState
        },
        Initial_Final: { 
          shape: "custom",
          ctxRenderer: customInitialFinalState
        },
        Normal: {
          shape: "custom",
          ctxRenderer: customNormalState
        }
      },
      interaction: {
        hover: true
      },
      manipulation: {
        enabled: false // Disable node manipulation
      },
      physics: {
        enabled: false // Disable physics simulation
      }
    };

    this.updateGraph = (data) => {
      // store previous view properties to avoid vis.js auto view move
      const previousScale = network.getScale();
      const previousViewPosition = network.getViewPosition();

      network.setData(data);

      // restore previous view properties
      network.moveTo({
        position: previousViewPosition,
        scale: previousScale,
        offset: { x: 0, y: 0 }
      });
      const coordinatesToDOM = data.nodes.map(node => {
        const { x, y } = network.canvasToDOM({ x: node.x, y: node.y });
        return { ...node, x, y };
      });
      const updatedData = {
        nodes: coordinatesToDOM,
        edges: data.edges
      }
      this.props.dataCallback(updatedData);
    };
    this.handleCloseContextMenu = () => {
      this.props.contextMenuVisibleCallback(false);
      this.props.indexOfNodeOnContextCallback(null);
    };
    this.handleContextMenuOptionSelected = (option) => {
      if (option === "Initial" || option === "Initial_Final") {
        const initialNode = data.nodes.find(node => node.group === "Initial" || node.group === "Initial_Final");
        if (initialNode) {
          const indexChangeToNormal = data.nodes.findIndex(item => item.id === initialNode.id);
          if (data.nodes[indexChangeToNormal].group === "Initial_Final") {
            data.nodes[indexChangeToNormal].group = "Final";
          }
          else {
            data.nodes[indexChangeToNormal].group = "Normal";
          }
        }
      }
      data.nodes[this.props.indexOfNodeOnContext].group = option;
      this.updateGraph(data);
    };

    const network = new Network(container, data, options);

    network.on('click', (params) => {
      this.handleCloseContextMenu();
      if (params.nodes.length === 0) {
        if (this.props.currentMode === "NEW_STATE") {
          const position = params.pointer.canvas;
          const newNodeId = data.nodes.length > 0 ? data.nodes[data.nodes.length - 1].id + 1 : 0;
          const newNode = { id: newNodeId, group: "Normal", label: `q${newNodeId}`, x: position.x, y: position.y };
          data.nodes.push(newNode);
          this.updateGraph(data);
        }
        else if (params.edges.length === 1) {
          if (this.props.currentMode === "DELETE") {
            const indexToDelete = data.edges.findIndex(item => item.id === params.edges[0]);
            data.edges.splice(indexToDelete, 1);
            this.updateGraph(data);
          }
        }
      }
      else if (params.nodes.length === 1) {
        if (this.props.currentMode === "DELETE") {
          const indexToDelete = data.nodes.findIndex(item => item.id === params.nodes[0]);
          data.nodes.splice(indexToDelete, 1);
          for (let i = data.edges.length - 1; i >= 0; i--) {
            if (data.edges[i].from === params.nodes[0] || data.edges[i].to === params.nodes[0]) {
              data.edges.splice(i, 1);
            }
          }
          this.updateGraph(data);
        }
        if (this.props.currentMode === "NEW_TRANSITION") {
          if (this.props.transitionStartNode !== null && this.props.transitionStartNode !== undefined) {
            let labelInput;

            do {
              labelInput = prompt("Enter a single letter for the transition:");
            } while (labelInput && (labelInput.length !== 1 || !/^[a-zA-Z]+$/.test(labelInput)));

            if (labelInput === '') {
              labelInput = 'λ';
            }
            if (labelInput !== null) {
              const newTransition = { from: this.props.transitionStartNode, to: params.nodes[0], label: labelInput };
              let existsLabel = data.edges.some(edge => edge.from === newTransition.from && edge.to === newTransition.to && edge.label.includes(newTransition.label));
              const existingTransitionIndex = data.edges.findIndex(edge => edge.from === newTransition.from && edge.to === newTransition.to);
            
              if (existingTransitionIndex !== -1) {
                if (!existsLabel) {
                  data.edges[existingTransitionIndex].label += `; ${labelInput}`;
                  this.updateGraph(data);
                }
              } else {
                data.edges.push(newTransition);
                this.updateGraph(data);
              }
            }
            this.props.transitionStartNodeCallback(null);
          }
          else {
            this.props.transitionStartNodeCallback(params.nodes[0]);
          }
        }
      }
    });

    network.on("dragEnd", (params) => {
      if (params.nodes.length > 0) {
        const position = params.pointer.canvas;
        const indexToChange = data.nodes.findIndex(item => item.id === params.nodes[0]);
        data.nodes[indexToChange].x = position.x;
        data.nodes[indexToChange].y = position.y;
        this.updateGraph(data);
      }
    });

    network.on("oncontext", (params) => {
      const node = network.getNodeAt(params.pointer.DOM);
      params.event.preventDefault();
      if (node !== undefined && node !== null) {
        this.props.menuPositionCallback(params.pointer.DOM);
        this.props.contextMenuVisibleCallback(true);
        const indexToChange = data.nodes.findIndex(item => item.id === node);
        this.props.indexOfNodeOnContextCallback(indexToChange);
        const selectedNode = data.nodes[indexToChange];
        this.setState({ selectedValue: selectedNode.group });
      }
    });

    network.on("dragStart", () => {
      this.handleCloseContextMenu();
    })
  }

  render() {
    return <div>
      <div id="network" className='network-container' />
      {this.props.isContextMenuVisible && (
        <CustomContextMenu
          xPos={this.props.menuPosition.x}
          yPos={this.props.menuPosition.y}
          onClose={this.handleCloseContextMenu}
          optionSelectedCallback={this.handleContextMenuOptionSelected}
          selectedOption={this.state.selectedValue}
        />
      )}
    </div>;

  }
}

export default GraphComponent;
