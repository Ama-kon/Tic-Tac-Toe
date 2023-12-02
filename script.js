let fields = [null, null, null, null, null, null, null, null, null];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "circle";

function init() {
  render();
}

function render() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");

  const table = document.createElement("table");

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      const index = i * 3 + j;

      cell.onclick = function () {
        setXO(cell, index);
        createXO(cell, index);
      };

      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  tableContainer.appendChild(table);
  container.appendChild(tableContainer);
}

function createXO(cell, index) {
  if (fields[index] === "circle") {
    const animatedCircle = createAnimatedCircle();
    cell.appendChild(animatedCircle);
  } else if (fields[index] === "cross") {
    const animatedX = createAnimatedX();
    cell.appendChild(animatedX);
  }
}

function isWinningCombo(indices) {
  return (
    fields[indices[0]] === currentPlayer &&
    fields[indices[1]] === currentPlayer &&
    fields[indices[2]] === currentPlayer
  );
}

function endOfGame() {
  const winningCombo = winningCombos.find(isWinningCombo);
  if (winningCombo) {
    drawWinningLine(winningCombo);
    return true;
  }
  return false;
}

function setXO(cell, index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;

    if (endOfGame()) {
      console.log("Spiel beendet. Gewinner: " + currentPlayer);
    } else {
      currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    }
  }
}

function drawWinningLine(combination) {
  const lineColor = "#ffffff";
  const lineWidth = 5;

  const startCell = document.querySelectorAll(`td`)[combination[0]];
  const endCell = document.querySelectorAll(`td`)[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const contentRect = document
    .getElementById("content")
    .getBoundingClientRect();

  const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) +
      Math.pow(endRect.top - startRect.top, 2),
    Math.pow(endRect.left - startRect.left, 2) +
      Math.pow(endRect.top - startRect.top, 2)
  );
  const lineAngle = Math.atan2(
    endRect.top - startRect.top,
    endRect.left - startRect.left
  );

  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2} px`;
  line.style.left = `${startRect.left + startRect.width / 2} px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.top = `${
    startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top
  }px`;
  line.style.left = `${
    startRect.left + startRect.width / 2 - contentRect.left
  }px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  document.getElementById("content").appendChild(line);
}

function createAnimatedCircle() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "50");
  svg.setAttribute("height", "50");

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", "25");
  circle.setAttribute("cy", "25");
  circle.setAttribute("r", "20");
  circle.setAttribute("stroke", "#00B0EE");
  circle.setAttribute("stroke-width", "8");
  circle.setAttribute("fill", "transparent");

  const animation = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  animation.setAttribute("attributeName", "r");
  animation.setAttribute("values", "1;20");
  animation.setAttribute("dur", "0.5s");
  animation.setAttribute("keyTimes", "0;1");
  animation.setAttribute("begin", "0s");
  animation.setAttribute("fill", "freeze");

  circle.appendChild(animation);
  svg.appendChild(circle);

  return svg;
}

function createAnimatedX() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", "10");
  line1.setAttribute("y1", "10");
  line1.setAttribute("x2", "40");
  line1.setAttribute("y2", "40");
  line1.setAttribute("stroke", "#FFC000");
  line1.setAttribute("stroke-width", "8");

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", "40");
  line2.setAttribute("y1", "10");
  line2.setAttribute("x2", "10");
  line2.setAttribute("y2", "40");
  line2.setAttribute("stroke", "#FFC000");
  line2.setAttribute("stroke-width", "8");

  const animation1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  animation1.setAttribute("attributeName", "x1");
  animation1.setAttribute("values", "10;40");
  animation1.setAttribute("dur", "0.5s");
  animation1.setAttribute("keyTimes", "0;1");
  animation1.setAttribute("begin", "0s");
  animation1.setAttribute("fill", "freeze");

  const animation2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  animation2.setAttribute("attributeName", "y1");
  animation2.setAttribute("values", "10;40");
  animation2.setAttribute("dur", "0.5s");
  animation2.setAttribute("keyTimes", "0;1");
  animation2.setAttribute("begin", "0s");
  animation2.setAttribute("fill", "freeze");

  const animation3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  animation3.setAttribute("attributeName", "x2");
  animation3.setAttribute("values", "40;10");
  animation3.setAttribute("dur", "0.5s");
  animation3.setAttribute("keyTimes", "0;1");
  animation3.setAttribute("begin", "0s");
  animation3.setAttribute("fill", "freeze");

  const animation4 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  animation4.setAttribute("attributeName", "y2");
  animation4.setAttribute("values", "40;10");
  animation4.setAttribute("dur", "0.5s");
  animation4.setAttribute("keyTimes", "0;1");
  animation4.setAttribute("begin", "0s");
  animation4.setAttribute("fill", "freeze");

  line1.appendChild(animation1);
  line2.appendChild(animation2);
  line1.appendChild(animation3);
  line2.appendChild(animation4);
  svg.appendChild(line1);
  svg.appendChild(line2);

  return svg;
}
