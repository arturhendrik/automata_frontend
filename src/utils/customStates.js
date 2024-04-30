function customFinalState ({ ctx, x, y, state: { selected, hover }, style, label }) {
    const outerRadius = style.size;
    const innerRadius = outerRadius - 4;
    
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = style.color;
    ctx.fill();
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.font = "normal 14px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
    
    return {
      nodeDimensions: { width: 2 * outerRadius, height: 2 * outerRadius },
    };
}

function customInitialState ({ ctx, x, y, state: { selected, hover }, style, label }) {
    const radius = style.size;
    const triangleSize = radius * 1;
    const triangleOffset = radius * 1.05;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = style.color;
    ctx.fill();
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - triangleOffset, y);
    ctx.lineTo(x - triangleOffset - triangleSize, y - triangleSize / 2);
    ctx.lineTo(x - triangleOffset - triangleSize, y + triangleSize / 2);
    ctx.closePath();
    ctx.fillStyle = style.color;
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();

    ctx.font = "normal 14px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
    
    return {
      nodeDimensions: { width: 2 * radius, height: 2 * radius },
    };
}

function customInitialFinalState ({ ctx, x, y, state: { selected, hover }, style, label }) {
  const outerRadius = style.size;
  const innerRadius = outerRadius - 4;
  const triangleSize = outerRadius * 1;
  const triangleOffset = outerRadius * 1.05;
  
  ctx.beginPath();
  ctx.arc(x, y, outerRadius, 0, 2 * Math.PI);
  ctx.fillStyle = style.color;
  ctx.fill();
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x - triangleOffset, y);
  ctx.lineTo(x - triangleOffset - triangleSize, y - triangleSize / 2);
  ctx.lineTo(x - triangleOffset - triangleSize, y + triangleSize / 2);
  ctx.closePath();
  ctx.fillStyle = style.color;
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fill();

  ctx.font = "normal 14px sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  
  return {
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

  ctx.font = "normal 14px sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  
  return {
    nodeDimensions: { width: 2 * radius, height: 2 * radius },
  };
}

export {customFinalState, customInitialState, customInitialFinalState, customNormalState}