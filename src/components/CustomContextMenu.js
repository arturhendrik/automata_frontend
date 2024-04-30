import React from 'react';

const CustomContextMenu = ({ xPos, yPos, onClose, optionSelectedCallback, selectedOption }) => {
  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      optionSelectedCallback("Normal");
    }
    else if (selectedOption === "Initial_Final") {
      if (option === "Initial") {
        optionSelectedCallback("Final");
      }
      else {
        optionSelectedCallback("Initial");
      }
    }
    else if ((selectedOption === "Initial" && option === "Final") || (selectedOption === "Final" && option === "Initial")) {
      optionSelectedCallback("Initial_Final");
    }
    else {
      optionSelectedCallback(option);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: yPos,
        left: xPos,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '5px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={selectedOption === "Initial" || selectedOption === "Initial_Final"}
          onChange={() => handleOptionClick("Initial")}
        />
        Initial
      </label>
      <label>
        <input
          type="checkbox"
          checked={selectedOption === "Final" || selectedOption === "Initial_Final"}
          onChange={() => handleOptionClick("Final")}
        />
        Final
      </label>
    </div>
  );
};

export default CustomContextMenu;