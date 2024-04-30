function handleUpload(file, dataCallback, uploadTimestampCallback) {
  if (!file) {
    console.log("No file selected");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {

    const timestamp = Date.now();
    uploadTimestampCallback(timestamp);
    const xmlString = event.target.result;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const nodes = Array.from(xmlDoc.querySelectorAll("state")).map(state => ({
      id: parseInt(state.getAttribute("id")),
      label: state.getAttribute("name"),
      x: parseFloat(state.querySelector("x").textContent),
      y: parseFloat(state.querySelector("y").textContent),
      group: state.querySelector("initial") && state.querySelector("final") ? "Initial_Final" :
        state.querySelector("initial") ? "Initial" :
          state.querySelector("final") ? "Final" : "Normal"
    }));

    const transitions = Array.from(xmlDoc.querySelectorAll("transition")).map(transition => ({
      from: parseInt(transition.querySelector("from").textContent),
      to: parseInt(transition.querySelector("to").textContent),
      label: transition.querySelector("read").textContent || "λ"
    }));

    let i = 0;
    while (i < transitions.length) {
      const currentTransition = transitions[i];

      const sameTransitions = transitions.filter(transition =>
        transition.from === currentTransition.from && transition.to === currentTransition.to && transition !== currentTransition
      );

      if (sameTransitions.length > 0) {
        sameTransitions.forEach(sameTransition => {
          currentTransition.label += `; ${sameTransition.label}`;
          const index = transitions.indexOf(sameTransition);
          if (index !== -1) {
            transitions.splice(index, 1);
          }
        });
      } else {
        i++;
      }
    }

    const data = { nodes: nodes, edges: transitions };

    dataCallback(data);
  };

  reader.readAsText(file);
}

export { handleUpload }
