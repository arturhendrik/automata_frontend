import React, { Component } from 'react';
import { Network } from 'vis-network';

class GraphComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { currentMode: props.currentMode, transitionStartNode: props.transitionStartNode, transitionStartNodeCallback: props.transitionStartNodeCallback };
  }

  componentDidMount() {
    // Create a new network instance
    const container = document.getElementById('network');
    const data = {
      nodes: [],
      edges: [],
    };
    const options = {
      nodes: {
        font: {
          color: "#000000",
          face: "Libre Baskerville"
        },
        shape: "circle",
        margin: 15,
        shapeProperties: {
          borderRadius: 20
        },
        shadow: {
          enabled: true,
          size: 3,
          x: 3,
          y: 3
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
          face: "Libre Baskerville"
        },
        width: 2,
        smooth: {
          type: 'curvedCCW',
          roundness: 0.2 // adjust the roundness of the curve (0 to 1)
        }
      },
      interaction: {
        hover: true,
        dragView: false,  // Disable dragging of the canvas background
      },
      manipulation: {
        enabled: false, // Disable node manipulation
      },
      physics: {
        enabled: false, // Disable physics simulation
      }
    };

    const network = new Network(container, data, options);

    network.on('click', (params) => {
      if (params.nodes.length === 0) {
        if (this.props.currentMode === "NEW_STATE") {
          const position = params.pointer.DOM;
          const newNodeId = data.nodes.length > 0 ? data.nodes[data.nodes.length-1].id + 1 : 1 ;
          const newNode = { id: newNodeId, label: `Q${newNodeId}`, x: position.x, y: position.y };
          data.nodes.push(newNode);
          network.setData(data);
          network.canvas.body.view.translation = {x: 0, y: 0};
        }
      }
      else if (params.nodes.length === 1) {
        if (this.props.currentMode === "DELETE") {
          const indexToDelete = data.nodes.findIndex(item => item.id === params.nodes[0]);
          //console.log(params.nodes);
          data.nodes.splice(indexToDelete, 1);
          for (let i = data.edges.length - 1; i >= 0; i--) {
            if (data.edges[i].from === params.nodes[0] || data.edges[i].to === params.nodes[0]) {
              data.edges.splice(i, 1);
            }
          }
          network.setData(data);
          network.canvas.body.view.translation = {x: 0, y: 0};
        }
        if (this.props.currentMode === "NEW_TRANSITION") {
          if (this.props.transitionStartNode) {
            let labelInput = prompt("Enter the label for the transition:");
            if (labelInput === '') {
              labelInput = 'λ';
            }
            if (labelInput !== null) {
              const newTransition = {from: this.props.transitionStartNode, to: params.nodes[0], label: labelInput};
              let exists = data.edges.some(edge => edge.from === newTransition.from && edge.to === newTransition.to && edge.label === newTransition.label);
              if (!exists) {
                data.edges.push(newTransition);
                network.setData(data);
                network.canvas.body.view.translation = {x: 0, y: 0};
                console.log(data.edges)
            }
            }
            this.props.transitionStartNodeCallback(null);
          }
          else {
            //console.log(params.nodes);
            this.props.transitionStartNodeCallback(params.nodes[0]);
          }
        }
      }
    });
  }

  render() {
    return <div id="network" style={{ width: '90%', height: '450px', border: '2px solid black', margin: 'auto' }} />;
  }
}

export default GraphComponent;
