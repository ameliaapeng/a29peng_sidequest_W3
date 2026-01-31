// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

function drawStart() {
  background(180, 225, 220);

  fill(30, 50, 60);
  textSize(46);
  textAlign(CENTER, CENTER);
  text("Late Night at the Studio", width / 2, 165);

  textSize(18);
  text(
    "An interactive story with choices.\nYour Trust affects the ending.",
    width / 2,
    225,
  );

  const startBtn = {
    x: width / 2,
    y: 320,
    w: 240,
    h: 80,
    label: "START",
  };

  const instrBtn = {
    x: width / 2,
    y: 430,
    w: 240,
    h: 80,
    label: "INSTRUCTIONS",
  };

  drawButton(startBtn);
  drawButton(instrBtn);

  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

function startMousePressed() {
  const startBtn = { x: width / 2, y: 320, w: 240, h: 80 };
  const instrBtn = { x: width / 2, y: 430, w: 240, h: 80 };

  if (isHover(startBtn)) {
    currentScreen = "game";
  } else if (isHover(instrBtn)) {
    currentScreen = "instr";
  }
}

function startKeyPressed() {
  if (keyCode === ENTER) {
    currentScreen = "game";
  }

  if (key === "i" || key === "I") {
    currentScreen = "instr";
  }
}

function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();

  if (hover) {
    fill(255, 200, 150, 220);

    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 180, 120);
  } else {
    fill(255, 240, 210, 210);

    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }

  rect(x, y, w, h, 14);

  drawingContext.shadowBlur = 0;

  fill(40, 60, 70);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
