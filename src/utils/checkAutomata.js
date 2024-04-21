const checkAutomata = (data) => {
    let hasInitialNode = false;
    let hasFinalNode = false;
    let hasTransitions = true;
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
        if (node.group !== "Final" && node.group !== "Initial_Final") {
            const outgoingEdges = data.edges.filter(edge => edge.from === node.id);
            if (outgoingEdges.length === 0) {
                hasTransitions = false;
            }
        }
    });
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
    return {hasInitialNode, hasFinalNode, hasTransitions, isNFA};
};

export default checkAutomata;