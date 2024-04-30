const getRunSteps = (initialNodeId, data, runString) => {
    const runSteps = [];
    let read = "";
    const readSteps = [];
    readSteps.push(read);
    let accept = false;

    const startStates = [initialNodeId];
    traverseEpsilons(initialNodeId, startStates, data);
    runSteps.push(startStates);
    let currentStates = startStates.map(state => { return state });

    for (let i = 0; i < runString.length; i++) {
        const letter = runString[i];
        const nextStates = [];
        currentStates.forEach(state => {
            data.edges.forEach(edge => {
                const edgeLabels = edge.label.split("; ");
                if (((edgeLabels.includes(letter))) && edge.from === state) {
                    if (!nextStates.includes(edge.to)) {
                        nextStates.push(edge.to);
                    }
                    traverseEpsilons(edge.to, nextStates, data);
                }
            });
        });
        read += letter
        currentStates = nextStates;
        runSteps.push(nextStates);
        readSteps.push(read);
    }

    const finalNodes = data.nodes.filter(node => node.group === "Final" || node.group === "Initial_Final");
    let isFinal = false;
    for (let i = 0; i < runSteps.at(-1).length; i++) {
        for (let j = 0; j < finalNodes.length; j++) {
            if (runSteps.at(-1).at(i) === finalNodes.at(j).id) {
                isFinal = true;
                break;
            }
        }
    }
    if (runSteps.length === runString.length + 1 && isFinal) {
        accept = true;
    }

    return { runSteps, readSteps, accept };
}

const traverseEpsilons = (currentState, statesToUpdate, data) => {
    data.edges.forEach(edge => {
        const edgeLabels = edge.label.split("; ");
        if (edgeLabels.includes("λ") && edge.from === currentState && edge.from !== edge.to) {
            const nextState = edge.to;
            if (!statesToUpdate.includes(nextState)) {
                statesToUpdate.push(nextState);
                traverseEpsilons(nextState, statesToUpdate, data);
            }
        }
    });
};

const stepToStart = (runIndex, runIndexCallback, runDataCallback, runSteps, runData) => {
    if (runIndex > 0) {
        const newNodes = runData.nodes.map(node => {
            if (runSteps.at(0).includes(node.id)) {
                if (node.group.endsWith("_Active")) {
                    return node;
                }
                else if (node.group.endsWith("_Accepted")) {
                    return { ...node, group: node.group.slice(0, -9) + "_Active" };
                }
                else if (node.group.endsWith("_Notaccepted")) {
                    return { ...node, group: node.group.slice(0, -12) + "_Active" };
                }
                else {
                    return { ...node, group: node.group + "_Active" };
                }
            } else {
                if (node.group.endsWith("_Active")) {
                    return { ...node, group: node.group.slice(0, -7) };
                }
                else if (node.group.endsWith("_Accepted")) {
                    return { ...node, group: node.group.slice(0, -9) };
                }
                else if (node.group.endsWith("_Notaccepted")) {
                    return { ...node, group: node.group.slice(0, -12) };
                }
                else {
                    return node;
                }
            }
        });
        const newData = { nodes: newNodes, edges: runData.edges };
        runDataCallback(newData);
        runIndexCallback(0);
    }
}

const stepBack = (runIndex, runIndexCallback, runDataCallback, runSteps, runData) => {
    const newIndex = runIndex - 1;
    if (newIndex >= 0) {
        const newNodes = runData.nodes.map(node => {
            if (runSteps.at(newIndex).includes(node.id)) {
                if (node.group.endsWith("_Active")) {
                    return node;
                }
                else if (node.group.endsWith("_Accepted")) {
                    return { ...node, group: node.group.slice(0, -9) + "_Active" };
                }
                else if (node.group.endsWith("_Notaccepted")) {
                    return { ...node, group: node.group.slice(0, -12) + "_Active" };
                }
                else {
                    return { ...node, group: node.group + "_Active" };
                }
            } else {
                if (node.group.endsWith("_Active")) {
                    return { ...node, group: node.group.slice(0, -7) };
                }
                else if (node.group.endsWith("_Accepted")) {
                    return { ...node, group: node.group.slice(0, -9) };
                }
                else if (node.group.endsWith("_Notaccepted")) {
                    return { ...node, group: node.group.slice(0, -12) };
                }
                else {
                    return node;
                }
            }
        });
        const newData = { nodes: newNodes, edges: runData.edges };
        runDataCallback(newData);
        runIndexCallback(newIndex);
    }
}

const stepForward = (runIndex, runIndexCallback, runDataCallback, runSteps, runData) => {
    const newIndex = runIndex + 1;
    if (newIndex < runSteps.length) {
        const newNodes = runData.nodes.map(node => {
            const group = node.group;
            if (newIndex === runSteps.length - 1) {
                if (runSteps.at(newIndex).includes(node.id)) {
                    if (group.includes("Final")) {
                        if (group.includes("_Active")) {
                            return { ...node, group: group.slice(0, -7) + "_Accepted" };
                        }
                        else {
                            return { ...node, group: group + "_Accepted" };
                        }
                    }
                    else {
                        if (group.includes("_Active")) {
                            return { ...node, group: group.slice(0, -7) + "_Notaccepted" };
                        }
                        else {
                            return { ...node, group: group + "_Notaccepted" };
                        }
                    }
                } else {
                    if (node.group.endsWith("_Active")) {
                        return { ...node, group: node.group.slice(0, -7) };
                    }
                    else {
                        return node;
                    }
                }
            }
            else {
                if (runSteps.at(newIndex).includes(node.id)) {
                    if (node.group.endsWith("_Active")) {
                        return node;
                    } else {
                        return { ...node, group: node.group + "_Active" };
                    }
                } else {
                    if (node.group.endsWith("_Active")) {
                        return { ...node, group: node.group.slice(0, -7) };
                    } else {
                        return node;
                    }
                }
            }
        });
        const newData = { nodes: newNodes, edges: runData.edges };
        runDataCallback(newData);
        runIndexCallback(newIndex);
    }
}

const stepToEnd = (runIndex, runIndexCallback, runDataCallback, runSteps, runData) => {
    if (runIndex < runSteps.length - 1) {
        const newNodes = runData.nodes.map(node => {
            if (runSteps.at(runSteps.length - 1).includes(node.id)) {
                if (node.group.includes("Final")) {
                    if (node.group.includes("_Active")) {
                        return { ...node, group: node.group.slice(0, -7) + "_Accepted" };
                    }
                    else {
                        return { ...node, group: node.group + "_Accepted" };
                    }
                }
                else {
                    if (node.group.includes("_Active")) {
                        return { ...node, group: node.group.slice(0, -7) + "_Notaccepted" };
                    }
                    else {
                        return { ...node, group: node.group + "_Notaccepted" };
                    }
                }
            } else {
                if (node.group.endsWith("_Active")) {
                    return { ...node, group: node.group.slice(0, -7) };
                } else {
                    return node;
                }
            }
        });
        const newData = { nodes: newNodes, edges: runData.edges };
        runDataCallback(newData);
        runIndexCallback(runSteps.length - 1);
    }
}

export { getRunSteps, stepToStart, stepBack, stepForward, stepToEnd };