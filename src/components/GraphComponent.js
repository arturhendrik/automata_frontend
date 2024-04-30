import React, { Component } from "react";
import { Network } from "vis-network";
import CustomContextMenu from "components/CustomContextMenu";
import { customFinalState, customInitialFinalState, customInitialState, customNormalState } from "utils/customStates";
import i18next from "i18n";

class GraphComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMode: props.currentMode,
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
    this.data = null;
  }

  componentDidMount() {
    this.initGraph(this.props.data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.uploadTimestamp !== prevProps.uploadTimestamp) {
      this.initGraph(this.props.data);
    }
    else if (this.props.currentMode === "NEW_TRANSITION") {
      this.enterAddEdgeMode();
    }
    else {
      this.leaveAddEdgeMode();
    }
  }

  initGraph(data) {
    this.data = data;
    const container = document.getElementById("network");
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
          background: "white",
          border: "black",
          hover: {
            border: "black"
          },
          highlight: {
            border: "black"
          },
        }
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.6,
          }
        },
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
        width: 0.5,
        smooth: {
          type: "curvedCW",
          roundness: 0.1
        }
      },
      groups: {
        Initial: {
          shape: "custom",
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
      manipulation: {
        enabled: false,
        addEdge: (data, callback) => {
          let labelInput;
          do {
            labelInput = prompt(i18next.t("enter_letter"));
          } while (labelInput && (labelInput.length !== 1 || !/^[a-zA-Z]+$/.test(labelInput)));
          if (labelInput === "") {
            labelInput = "λ";
          }
          if (labelInput !== null) {
            const newTransition = { from: data.from, to: data.to, label: labelInput };
            let existsLabel = this.data.edges.some(edge => edge.from === newTransition.from && edge.to === newTransition.to && edge.label.includes(newTransition.label));
            const existingTransitionIndex = this.data.edges.findIndex(edge => edge.from === newTransition.from && edge.to === newTransition.to);

            if (existingTransitionIndex !== -1) {
              if (!existsLabel) {
                this.data.edges[existingTransitionIndex].label += `; ${labelInput}`;
                this.updateGraph(this.data);
              }
            }
            else {
              this.data.edges.push(newTransition);
              this.updateGraph(this.data);
            }
          }
          network.addEdgeMode();
        }
      },
      physics: {
        enabled: false
      },
      interaction: {
        selectConnectedEdges: false
      }
    };

    this.enterAddEdgeMode = () => {
      network.addEdgeMode();
    }

    this.leaveAddEdgeMode = () => {
      network.disableEditMode();
    }

    this.updateGraph = (data) => {
      const previousScale = network.getScale();
      const previousViewPosition = network.getViewPosition();

      network.setData(data);

      network.moveTo({
        position: previousViewPosition,
        scale: previousScale,
        offset: { x: 0, y: 0 }
      });
      const coordinatesToDOM = data.nodes.map(node => {
        const { x, y } = network.canvasToDOM({ x: node.x, y: node.y });
        return { ...node, x: x, y: y };
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

    network.on("click", (params) => {
      this.handleCloseContextMenu();
      if (params.nodes.length === 0) {
        if (this.props.currentMode === "NEW_STATE") {
          const position = params.pointer.canvas;
          const existingNodeIds = data.nodes.map(node => node.id);
          let newNodeId = 0;
          while (existingNodeIds.includes(newNodeId)) {
            newNodeId++;
          }
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
      <div id="network" className="network-container" />
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
