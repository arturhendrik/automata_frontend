import React from "react";
import postRequest from "services/postRequest";
import sortNodesByGroup from "utils/sortNodes";
import checkAutomata from "utils/checkAutomata";

const NfaToDfaButton = ({ data, currentModeCallback, errorCallback, dataCallback, uploadTimestampCallback }) => {

    const handleConversion = async (data) => {
        const { hasInitialNode, isNFA } = checkAutomata(data);
        await currentModeCallback(null);
        if (!hasInitialNode) {
            errorCallback("error_needs_initial");
        }
        else if (!isNFA) {
            errorCallback("error_not_nfa");
        }
        else {
            try {
                errorCallback(null);
                const sortedNodes = sortNodesByGroup(data);
                const newData = await postRequest(sortedNodes, "nfa-to-dfa");
                dataCallback(newData);
                const timestamp = Date.now();
                uploadTimestampCallback(timestamp);

            } catch (error) {
                errorCallback("server_error")
            }
        }
    }

    return (
        <div className="button" onClick={async () => await handleConversion(data)}>
            NFA -{">"} DFA
        </div>
    );
};

export default NfaToDfaButton;
