function generateXml (data) {      
    let xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<structure>
  <type>fa</type>
  <automaton>
    <!--The list of states.-->`;

    data.nodes.forEach(node => {
      xmlString += `
    <state id="${node.id}" name="${node.label}">
      <x>${node.x}</x>
      <y>${node.y}</y>`;
      if (node.group === "Initial") {
        xmlString += `
      <initial/>`;
      }
      if (node.group === "Final") {
        xmlString += `
      <final/>`;
      }
      if (node.group === "Initial_Final") {
        xmlString += `
      <initial/>
      <final/>`;
      }
      xmlString += `
    </state>`;
    });

    xmlString += `
    <!--The list of transitions.-->`;

    data.edges.forEach(edge => {
      xmlString += `
    <transition>
      <from>${edge.from}</from>
      <to>${edge.to}</to>
      <read>${edge.label}</read>
    </transition>`;
    });

    xmlString += `
  </automaton>
</structure>`;

    return xmlString;
  };

  function handleSave (data, fileName, currentModeCallback) {
    currentModeCallback(null);
    const xmlString = generateXml(data);
    const blob = new Blob([xmlString], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.jff`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  export {generateXml, handleSave}