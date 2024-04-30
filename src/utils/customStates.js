function customFinalState ({ ctx, x, y, state: { selected, hover }, style, label }) {
    const outerRadius = style.size; // Outer radius of the circle
    const innerRadius = outerRadius - 4; // Inner radius for the double border
    
    // Draw outer circle (outer border)
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = style.color; // Fill color, same as border color
    ctx.fill();
    ctx.strokeStyle = "black" // Outer border color
    ctx.lineWidth = 1; // Outer border width
    ctx.stroke();
    ctx.closePath();

    // Draw inner circle (inner border)
    ctx.beginPath();
    ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black" // Inner border color, same as outer border color
    ctx.lineWidth = 1; // Inner border width
    ctx.stroke();
    ctx.closePath();

    // Draw label
    ctx.font = "normal 14px sans-serif";
    ctx.fillStyle = "black"; // Label color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
    
    return {
      // Dimensions of the node for the layout algorithm
      nodeDimensions: { width: 2 * outerRadius, height: 2 * outerRadius },
    };
}

function customInitialState ({ ctx, x, y, state: { selected, hover }, style, label }) {
    const radius = style.size; // Radius of the circle
    const triangleSize = radius * 1; // Size of the triangle relative to the circle radius
    const triangleOffset = radius * 1.05; // Offset of the triangle from the center of the circle

    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = style.color; // Circle fill color
    ctx.fill();
    ctx.strokeStyle = "black" // Outer border color
    ctx.lineWidth = 1; // Outer border width
    ctx.stroke();
    ctx.closePath();

    // Draw triangle (arrow)
    ctx.beginPath();
    ctx.moveTo(x - triangleOffset, y); // Start at the left side of the circle
    ctx.lineTo(x - triangleOffset - triangleSize, y - triangleSize / 2); // Top point of the triangle
    ctx.lineTo(x - triangleOffset - triangleSize, y + triangleSize / 2); // Bottom point of the triangle
    ctx.closePath();
    ctx.fillStyle = style.color; // Triangle fill color
    ctx.strokeStyle = "black" // Outer border color
    ctx.lineWidth = 1; // Outer border width
    ctx.stroke();
    ctx.fill();

    // Draw label
    ctx.font = "normal 14px sans-serif";
    ctx.fillStyle = "black"; // Label color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
    
    return {
      // Dimensions of the node for the layout algorithm
      nodeDimensions: { width: 2 * radius, height: 2 * radius },
    };
}

function customInitialFinalState ({ ctx, x, y, state: { selected, hover }, style, label }) {
  const outerRadius = style.size; // Outer radius of the circle
  const innerRadius = outerRadius - 4; // Inner radius for the double border
  const triangleSize = outerRadius * 1; // Size of the triangle relative to the circle radius
  const triangleOffset = outerRadius * 1.05; // Offset of the triangle from the center of the circle
  
  // Draw outer circle (outer border)
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, 0, 2 * Math.PI);
  ctx.fillStyle = style.color; // Fill color, same as border color
  ctx.fill();
  ctx.strokeStyle = "black" // Outer border color
  ctx.lineWidth = 1; // Outer border width
  ctx.stroke();
  ctx.closePath();

  // Draw inner circle (inner border)
  ctx.beginPath();
  ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = "black" // Inner border color, same as outer border color
  ctx.lineWidth = 1; // Inner border width
  ctx.stroke();
  ctx.closePath();

  // Draw triangle (arrow)
  ctx.beginPath();
  ctx.moveTo(x - triangleOffset, y); // Start at the left side of the circle
  ctx.lineTo(x - triangleOffset - triangleSize, y - triangleSize / 2); // Top point of the triangle
  ctx.lineTo(x - triangleOffset - triangleSize, y + triangleSize / 2); // Bottom point of the triangle
  ctx.closePath();
  ctx.fillStyle = style.color; // Triangle fill color
  ctx.strokeStyle = "black" // Outer border color
  ctx.lineWidth = 1; // Outer border width
  ctx.stroke();
  ctx.fill();

  // Draw label
  ctx.font = "normal 14px sans-serif";
  ctx.fillStyle = "black"; // Label color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  
  return {
    // Dimensions of the node for the layout algorithm
    nodeDimensions: { width: 2 * outerRadius, height: 2 * outerRadius },
  };
}

function customNormalState ({ ctx, x, y, state: { selected, hover }, style, label }) {
  const radius = style.size;
  
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = style.color;
  ctx.fill();
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();

  // Draw label
  ctx.font = "normal 14px sans-serif";
  ctx.fillStyle = "black"; // Label color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  
  return {
    // Dimensions of the node for the layout algorithm
    nodeDimensions: { width: 2 * radius, height: 2 * radius },
  };
}

export {customFinalState, customInitialState, customInitialFinalState, customNormalState}