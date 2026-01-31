// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

function drawInstr() {
  background(240);

  fill(0);
  textAlign(CENTER, TOP);
  textSize(36);
  text("Instructions", width / 2, 80);

  textSize(18);

  const lines =
    "Choose what to do using the on-screen buttons.\n" +
    "Keyboard shortcuts in the story:\n" +
    "- ENTER: choose the first option\n" +
    "- 1 / 2 / 3: choose options\n\n" +
    "Your Trust stat changes based on choices.\n" +
    "Higher Trust can unlock a secret ending.";

  text(lines, width / 2, 160);

  const backBtn = {
    x: width / 2,
    y: 560,
    w: 220,
    h: 70,
    label: "BACK",
  };

  drawInstrButton(backBtn);

  cursor(isHover(backBtn) ? HAND : ARROW);
}

function instrMousePressed() {
  const backBtn = { x: width / 2, y: 560, w: 220, h: 70 };

  if (isHover(backBtn)) {
    currentScreen = "start";
  }
}

function instrKeyPressed() {
  if (keyCode === ESCAPE) {
    currentScreen = "start";
  }

  if (key === "b" || key === "B") {
    currentScreen = "start";
  }
}

function drawInstrButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();
  fill(hover ? color(200, 200, 255, 200) : color(220, 220, 255, 170));
  rect(x, y, w, h, 12);

  fill(0);
  textSize(26);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
