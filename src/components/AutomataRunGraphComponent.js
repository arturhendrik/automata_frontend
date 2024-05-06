import React, { Component } from "react";
import { Network } from "vis-network";
import { customFinalState, customInitialFinalState, customInitialState, customNormalState } from "utils/customStates";

class AutomataRunGraphComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
    }

    componentDidMount() {
        this.initGraph(this.props.data);
    }

    componentDidUpdate() {
        this.initGraph(this.props.data);
    }

    initGraph(data) {
        const container = document.getElementById("run-network");
        const options = {
            nodes: {
                borderWidth: 1,
                font: {
                    size: 14,
                    face: "sans-serif"
                },
                shape: "circle",
                margin: 15,
                color: {
                    background: "white",
                    border: "black"
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
                    inherit: false
                },
                font: {
                    align: "top",
                    face: "sans-serif"
                },
                width: 1,
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
                },
                Initial_Active: {
                    shape: "custom",
                    color: {
                        background: "#9c9695",
                    },
                    ctxRenderer: customInitialState
                },
                Final_Active: {
                    shape: "custom",
                    color: {
                        background: "#9c9695",
                    },
                    ctxRenderer: customFinalState
                },
                Initial_Final_Active: {
                    shape: "custom",
                    color: {
                        background: "#9c9695",
                    },
                    ctxRenderer: customInitialFinalState
                },
                Normal_Active: {
                    shape: "custom",
                    color: {
                        background: "#9c9695",
                    },
                    ctxRenderer: customNormalState
                },
                Final_Accepted: {
                    shape: "custom",
                    color: {
                        background: "#71fa28",
                    },
                    ctxRenderer: customFinalState
                },
                Initial_Final_Accepted: {
                    shape: "custom",
                    color: {
                        background: "#71fa28",
                    },
                    ctxRenderer: customInitialFinalState
                },
                Normal_Notaccepted: {
                    shape: "custom",
                    color: {
                        background: "red",
                    },
                    ctxRenderer: customNormalState
                },
                Initial_Notaccepted: {
                    shape: "custom",
                    color: {
                        background: "red",
                    },
                    ctxRenderer: customInitialState
                }
            },
            interaction: {
                dragNodes: false,
                dragView: false,
                hoverConnectedEdges: false,
                selectable: false,
                selectConnectedEdges: false,
                zoomView: false
            },
            manipulation: {
                enabled: false
            },
            physics: {
                enabled: false
            }
        };

        const network = new Network(container, data, options);
        network.on("oncontext", (params) => {
            params.event.preventDefault();
        });
    }

    render() {
        return (
            <div id="run-network" className="network-container network-container-run" />
        )
    }
}

export default AutomataRunGraphComponent;
