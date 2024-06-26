import React from "react";
import postRequest from "services/postRequest";
import sortNodesByGroup from "utils/sortNodes";
import checkAutomata from "utils/checkAutomata";
import { useTranslation } from "react-i18next";

const MinimizeDfaButton = ({ data, currentModeCallback, errorCallback, dataCallback, uploadTimestampCallback }) => {

    const { t } = useTranslation();

    const handleConversion = async (data) => {
        const { hasInitialNode, isNFA } = checkAutomata(data);
        await currentModeCallback(null);
        if (!hasInitialNode) {
            errorCallback("error_needs_initial");
        }
        else if (isNFA) {
            errorCallback("error_not_dfa");
        }
        else {
            try {
                const sortedNodes = sortNodesByGroup(data);
                const newData = await postRequest(sortedNodes, "minimize-dfa");
                if (newData.nodes.length === data.nodes.length) {
                    errorCallback("error_already_minimized");
                }
                else {
                    errorCallback(null);
                    dataCallback(newData);
                    const timestamp = Date.now();
                    uploadTimestampCallback(timestamp);
                }
            } catch (error) {
                errorCallback("server_error")
            }
        }
    }

    return (
        <div className="button" onClick={async () => await handleConversion(data)}>
            {t("minimize")}
        </div>
    );
};

export default MinimizeDfaButton;
