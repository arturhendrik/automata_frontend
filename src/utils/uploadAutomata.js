function handleUpload(file, dataCallback, uploadTimestampCallback) {
  if (!file) {
    console.log('No file selected');
    return;
  }

  const reader = new FileReader();

  // Define a callback function to handle the file reading
  reader.onload = function(event) {

    const timestamp = Date.now();
    uploadTimestampCallback(timestamp);
    const xmlString = event.target.result;

    // Parse the XML string using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Extract nodes and transitions from the parsed XML document
    const nodes = Array.from(xmlDoc.querySelectorAll('state')).map(state => ({
      id: parseInt(state.getAttribute('id')),
      label: state.getAttribute('name'),
      x: parseFloat(state.querySelector('x').textContent),
      y: parseFloat(state.querySelector('y').textContent),
      group: state.querySelector('initial') && state.querySelector('final') ? 'Initial_Final' :
             state.querySelector('initial') ? 'Initial' :
             state.querySelector('final') ? 'Final' : 'Normal'
    }));

    const transitions = Array.from(xmlDoc.querySelectorAll('transition')).map(transition => ({
      from: parseInt(transition.querySelector('from').textContent),
      to: parseInt(transition.querySelector('to').textContent),
      label: transition.querySelector('read').textContent || 'λ'
    }));

    let i = 0;
    while (i < transitions.length) {
      const currentTransition = transitions[i];

    // Find all other transitions with the same 'from' and 'to' values
      const sameTransitions = transitions.filter(transition =>
        transition.from === currentTransition.from && transition.to === currentTransition.to && transition !== currentTransition
      );

    // If there are same transitions, combine their labels into currentTransition and remove them from the array
      if (sameTransitions.length > 0) {
        sameTransitions.forEach(sameTransition => {
            currentTransition.label += `; ${sameTransition.label}`;
            // Remove the combined transition from the transitions array
            const index = transitions.indexOf(sameTransition);
            if (index !== -1) {
                transitions.splice(index, 1);
            }
        });
        // Don't increment i, so it stays at the current index
      } else {
        // If no same transitions, move to the next index
        i++;
      }
    }
    
    // Construct the data object
    const data = { nodes: nodes, edges: transitions };

    // Call the dataCallback with the extracted data
    dataCallback(data);
  };

  // Read the contents of the file as text
  reader.readAsText(file);
}

export { handleUpload }
