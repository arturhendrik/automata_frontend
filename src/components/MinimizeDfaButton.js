import React from "react";
import postRequest from "services/postRequest";
import sortNodesByGroup from "utils/sortNodes";
import checkAutomata from "utils/checkAutomata";
import { useTranslation } from "react-i18next";

const MinimizeDfaButton = ({ data, currentModeCallback, errorCallback, dataCallback, uploadTimestampCallback }) => {

    const { t } = useTranslation();

    const handleConversion = async (data) => {
        const { hasInitialNode, isNFA } = checkAutomata(data);
        currentModeCallback(null);
        if (!hasInitialNode) {
            errorCallback("error_needs_initial");
        }
        else if (isNFA) {
            errorCallback("error_not_dfa");
        }
        else {
            errorCallback(null);
            try {
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
        <label className="button" onClick={async () => await handleConversion(data)}>
            {t("minimize")}
        </label>
    );
};

export default MinimizeDfaButton;
