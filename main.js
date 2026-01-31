// main.js
// This file contains setup() and draw(), and routes input to each screen.
// It also defines shared helpers (like isHover).

let currentScreen = "start";
let prevScreen = null;

function setup() {
  const c = createCanvas(800, 600);

  // Mount the canvas into the .canvas-frame div (matches your HTML)
  const frame = document.querySelector(".canvas-frame");
  if (frame) c.parent(frame);

  textFont("Arial");
}

function draw() {
  // Detect screen transitions
  if (prevScreen !== currentScreen) {
    onScreenEnter(currentScreen, prevScreen);
    prevScreen = currentScreen;
  }

  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instr") drawInstr();
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();
}

// ------------------------------
// Shared helper: hover detection
// ------------------------------
// Expects an object with {x, y, w, h} where x,y are CENTER coords (like your buttons)
function isHover(btn) {
  const left = btn.x - btn.w / 2;
  const right = btn.x + btn.w / 2;
  const top = btn.y - btn.h / 2;
  const bottom = btn.y + btn.h / 2;

  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

// ------------------------------
// Screen enter hook
// ------------------------------
// Lets screens reset cleanly when you arrive.
function onScreenEnter(newScreen, oldScreen) {
  if (newScreen === "game") {
    // If game.js exposes a reset hook, call it.
    if (typeof resetStory === "function") resetStory();
  }
}

// ------------------------------
// Input routing
// ------------------------------
function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instr") instrMousePressed();
  else if (currentScreen === "game") gameMousePressed();
  else if (currentScreen === "win") winMousePressed();
  else if (currentScreen === "lose") loseMousePressed();
}

function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "instr") instrKeyPressed();
  else if (currentScreen === "game") gameKeyPressed();
  else if (currentScreen === "win") winKeyPressed();
  else if (currentScreen === "lose") loseKeyPressed();
}
