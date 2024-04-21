import React from 'react';
import nfaToDfaService from '../services/nfaToDfaService';

const NfaToDfaButton = ({ data, currentModeCallback, errorCallback, dataCallback, uploadTimestampCallback }) => {

    const handleConversion = async (data) => {
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
        
            // Check if any character appears more than once across all labels
            const hasDuplicates = Object.values(labelCountMap).some(count => count > 1);
            if (hasDuplicates) {
                isNFA = true;
            }
        });
        if (!hasInitialNode) {
            errorCallback("The automaton needs an initial state");
        }
        else if (!hasFinalNode) {
            errorCallback("The automaton needs at least one final state");
        }
        else if (!hasTransitions) {
            errorCallback("The automaton has non-final states without outgoing transitions");
        }
        else if (!isNFA) {
            errorCallback("This is not a NFA");
        }
        else {
            try {

                const newData = await nfaToDfaService(data);
                dataCallback(newData);
                const timestamp = Date.now();
                uploadTimestampCallback(timestamp);
    
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return (
        <label className='button' onClick={async () => await handleConversion(data)}>
            NFA -{'>'} DFA
        </label>
    );
};

export default NfaToDfaButton;
