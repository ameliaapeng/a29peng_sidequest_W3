// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

function drawWin() {
  background(200, 255, 210);

  fill(0);
  textAlign(CENTER, TOP);
  textSize(42);
  text("You Made It", width / 2, 90);

  textSize(18);

  let msg = "";

  if (endingTag === "secret") {
    msg =
      "SECRET ENDING (High Trust)\n\n" +
      "A clean, organized project template builds itself.\n" +
      "Your files are perfectly named. Everything exports correctly.\n\n" +
      "A final note appears:\n" +
      '"You listened. Good luck."';
  } else {
    msg =
      "SAFE ENDING\n\n" +
      "You submit your work the next day.\n" +
      "No weird folders. No glitches.\n\n" +
      "Still… you swear the monitor light flickers when you walk away.";
  }

  text(msg, width / 2, 190);

  fill(0);
  textSize(16);
  text("Press R to return to Start", width / 2, 540);

  cursor(ARROW);
}

function winMousePressed() {
  // no click actions needed
}

function winKeyPressed() {
  if (key === "r" || key === "R") {
    currentScreen = "start";
  }
}
