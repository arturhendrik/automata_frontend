const sortNodesByGroup = (data) => {
    const groupOrder = ["Initial", "Initial_Final", "Normal", "Final"];

    const sortedNodes = [...data.nodes].sort((a, b) => {
        return groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
    });

    return { nodes: sortedNodes, edges: data.edges };
}

export default sortNodesByGroup