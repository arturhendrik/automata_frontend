import React from 'react';

const CustomContextMenu = ({ xPos, yPos, onClose, optionSelectedCallback }) => {
  // Define your custom context menu options and their actions
  const handleOptionClick = (option) => {
    // Implement your logic based on the selected option
    optionSelectedCallback(option);
    // Close the context menu
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: yPos+50,
        left: xPos+50,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '5px',
        zIndex: 9999,
      }}
    >
      <button onClick={() => handleOptionClick("Initial")}>Initial</button>
      <button onClick={() => handleOptionClick("Final")}>Final</button>

    </div>
  );
};

export default CustomContextMenu;