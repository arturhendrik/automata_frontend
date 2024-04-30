import React from "react";
import postRequest from "services/postRequest";
import sortNodesByGroup from "utils/sortNodes";
import checkAutomata from "utils/checkAutomata";
import { useTranslation } from "react-i18next";

const TestButton = ({ data, currentModeCallback, errorCallback, selectedExerciseCallback, selectedExercise }) => {

    const { t } = useTranslation();

    const handleChange = (event) => {
        selectedExerciseCallback(event.target.value);
    };

    const handleConversion = async (data, selectedExercise) => {
        const { hasInitialNode } = checkAutomata(data);
        await currentModeCallback(null);
        if (!hasInitialNode) {
            errorCallback("error_needs_initial");
        }
        else {
            try {
                const sortedNodes = sortNodesByGroup(data);
                const newData = await postRequest(sortedNodes, "test", selectedExercise);
                if (newData.length === 0) {
                    errorCallback(null);
                }
                else {
                    errorCallback(newData[0])
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return (
        <div className="exercise-container">
            <select className="select-menu" id="selectOption" value={selectedExercise} onChange={handleChange}>
                {Array.from({ length: 12 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>{t("exercise")} {index + 1}</option>
                ))}
            </select>
            <label className="button" onClick={async () => await handleConversion(data, selectedExercise)}>
                {t("test")}
            </label>
        </div>
    );
};

export default TestButton;
