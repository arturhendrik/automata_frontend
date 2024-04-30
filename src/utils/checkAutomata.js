const checkAutomata = (data) => {
    let hasInitialNode = false;
    let hasFinalNode = false;
    let isNFA = false;
    data.nodes.forEach(node => {
        if (node.group === "Initial") {
            hasInitialNode = true;
        }
        if (node.group === "Final") {
            hasFinalNode = true;
        }
        if (node.group === "Initial_Final") {
            hasFinalNode = true;
            hasInitialNode = true;
        }
    });
    if (data.nodes.length < 2) {
        hasFinalNode = true;
    }
    data.edges.forEach(edge => {
        if (edge.label.includes("λ")) {
            isNFA = true;
        }
        const outgoingEdges = data.edges.filter(e => e.from === edge.from);
        const labelCountMap = {};

        outgoingEdges.forEach(outgoingEdge => {
            const labels = outgoingEdge.label.split("; ");
            labels.forEach(label => {
                labelCountMap[label] = (labelCountMap[label] || 0) + 1;
            });
        });

        const hasDuplicates = Object.values(labelCountMap).some(count => count > 1);
        if (hasDuplicates) {
            isNFA = true;
        }
    });
    return { hasInitialNode, hasFinalNode, isNFA };
};

export default checkAutomata;