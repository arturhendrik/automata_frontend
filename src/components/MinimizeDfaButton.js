import React from 'react';
import postRequest from '../services/postRequest';
import sortNodesByGroup from '../utils/sortNodes';
import checkAutomata from '../utils/checkAutomata';

const MinimizeDfaButton = ({ data, currentModeCallback, errorCallback, dataCallback, uploadTimestampCallback }) => {

    const handleConversion = async (data) => {
        const {hasInitialNode, hasFinalNode, hasTransitions, isNFA} = checkAutomata(data);
        if (!hasInitialNode) {
            errorCallback("The automaton needs an initial state");
        }
        else if (!hasFinalNode) {
            errorCallback("The automaton needs at least one final state");
        }
        else if (!hasTransitions) {
            errorCallback("The automaton has non-final states without outgoing transitions");
        }
        else if (isNFA) {
            errorCallback("This is not a DFA");
        }
        else {
            try {
                currentModeCallback(null);
                const sortedNodes = sortNodesByGroup(data);
                console.log(sortedNodes);
                const newData = await postRequest(sortedNodes, "minimize-dfa");
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
            Minimeeri DFA
        </label>
    );
};

export default MinimizeDfaButton;
