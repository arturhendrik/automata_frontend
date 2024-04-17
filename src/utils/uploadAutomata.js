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
      label: transition.querySelector('read').textContent
    }));

    // Construct the data object
    const data = { nodes: nodes, edges: transitions };

    // Call the dataCallback with the extracted data
    dataCallback(data);
  };

  // Read the contents of the file as text
  reader.readAsText(file);
}

export { handleUpload }
