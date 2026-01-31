// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

function drawLose() {
  background(255, 210, 210);

  fill(0);
  textAlign(CENTER, TOP);
  textSize(42);
  text("Something Went Wrong", width / 2, 90);

  textSize(18);

  let msg =
    "TRAP ENDING (Low Trust)\n\n" +
    "Your files corrupt overnight.\n" +
    "A new folder appears: PAY_ATTENTION\n\n" +
    "Your cursor moves by itself… just slightly.\n" +
    "Like it’s waiting for your next click.";

  text(msg, width / 2, 190);

  fill(0);
  textSize(16);
  text("Press R to return to Start", width / 2, 540);

  cursor(ARROW);
}

function loseMousePressed() {
  // no click actions needed
}

function loseKeyPressed() {
  if (key === "r" || key === "R") {
    currentScreen = "start";
  }
}
