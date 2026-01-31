// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

// ------------------------------
// Shared story variables (global across files)
// ------------------------------
let storyState = "INTRO";
let trust = 1;

// This stores which ending happened so win/lose can show the right text.
let endingTag = "safe"; // "safe" | "trap" | "secret"

// ------------------------------
// Button list for game choices
// ------------------------------
let storyButtons = [];

// ------------------------------
// Called by main.js when entering the game screen
// ------------------------------
function resetStory() {
  storyState = "INTRO";
  trust = 1;
  endingTag = "safe";
  setButtonsForState();
}

// ------------------------------
// Main draw function for this screen
// ------------------------------
function drawGame() {
  background(240, 230, 140);

  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Late Night at the Studio", width / 2, 90);

  // HUD
  textSize(18);
  textAlign(LEFT, CENTER);
  text("Trust: " + trust, 30, 35);

  // Story text
  drawStoryText();

  // Buttons
  for (let i = 0; i < storyButtons.length; i++) {
    drawGameButton(storyButtons[i], i);
  }

  cursor(isHoverAnyButton() ? HAND : ARROW);
}

// ------------------------------
// Story text helper
// ------------------------------
function drawStoryText() {
  fill(0);
  textAlign(CENTER, TOP);
  textSize(18);

  let msg = "";

  if (storyState === "INTRO") {
    msg =
      "You’re the last one in the studio.\n" +
      "The lights flicker. A monitor turns on by itself.\n\n" +
      "A message appears...";
  } else if (storyState === "MESSAGE") {
    msg = '"I can help you finish your project."\n' + '"Do you trust me?"';
  } else if (storyState === "INVESTIGATE") {
    msg =
      "A folder opens: FINAL_SUBMISSION\n" +
      "One file glows: README_TRUTH.txt\n\n" +
      "You hear the soft hum of the monitor… like breathing.";
  } else if (storyState === "LEAVE") {
    msg =
      "You rush into the hallway.\n" +
      "It feels longer than it should.\n\n" +
      'Your phone buzzes: "We’re not done."';
  }

  text(msg, width / 2, 150);
}

// ------------------------------
// Draw a choice button
// ------------------------------
function drawGameButton(btn, index) {
  rectMode(CENTER);

  const hover = isHover(btn);

  noStroke();
  fill(hover ? color(180, 220, 255, 220) : color(200, 220, 255, 190));

  rect(btn.x, btn.y, btn.w, btn.h, 14);

  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);

  // Show keyboard hint numbers (1/2/3)
  const prefix = index < 3 ? index + 1 + ") " : "";
  text(prefix + btn.label, btn.x, btn.y);
}

// ------------------------------
// Mouse input for game screen
// ------------------------------
function gameMousePressed() {
  for (let i = 0; i < storyButtons.length; i++) {
    const btn = storyButtons[i];
    if (isHover(btn)) {
      btn.onClick();
      return;
    }
  }
}

// ------------------------------
// Keyboard input for game screen
// ------------------------------
function gameKeyPressed() {
  if (keyCode === ENTER) {
    if (storyButtons.length > 0) storyButtons[0].onClick();
    return;
  }

  if (key === "1" && storyButtons[0]) storyButtons[0].onClick();
  if (key === "2" && storyButtons[1]) storyButtons[1].onClick();
  if (key === "3" && storyButtons[2]) storyButtons[2].onClick();
}

// ------------------------------
// Helpers
// ------------------------------
function isHoverAnyButton() {
  for (let i = 0; i < storyButtons.length; i++) {
    if (isHover(storyButtons[i])) return true;
  }
  return false;
}

function makeBtn(x, y, label, onClick) {
  return {
    x: x,
    y: y,
    w: 520,
    h: 70,
    label: label,
    onClick: onClick,
  };
}

function setButtonsForState() {
  storyButtons = [];

  const cx = width / 2;
  const y1 = 390;
  const y2 = 475;
  const y3 = 560;

  if (storyState === "INTRO") {
    storyButtons.push(
      makeBtn(cx, y2, "Approach the monitor", function () {
        storyState = "MESSAGE";
        setButtonsForState();
      }),
    );
  }

  if (storyState === "MESSAGE") {
    storyButtons.push(
      makeBtn(cx, y1, "Reply calmly (+Trust)", function () {
        trust += 1;
        storyState = "INVESTIGATE";
        setButtonsForState();
      }),
    );

    storyButtons.push(
      makeBtn(cx, y2, "Threaten it (-Trust)", function () {
        trust -= 1;
        storyState = "INVESTIGATE";
        setButtonsForState();
      }),
    );

    storyButtons.push(
      makeBtn(cx, y3, "Run for the exit", function () {
        storyState = "LEAVE";
        setButtonsForState();
      }),
    );
  }

  if (storyState === "INVESTIGATE") {
    storyButtons.push(
      makeBtn(cx, y1, "Open the glowing file", function () {
        // Decide ending based on trust
        if (trust >= 2) {
          endingTag = "secret";
          currentScreen = "win";
        } else if (trust <= 0) {
          endingTag = "trap";
          currentScreen = "lose";
        } else {
          endingTag = "safe";
          currentScreen = "win";
        }
      }),
    );

    storyButtons.push(
      makeBtn(cx, y2, "Close everything (-Trust)", function () {
        trust -= 1;
        storyState = "LEAVE";
        setButtonsForState();
      }),
    );
  }

  if (storyState === "LEAVE") {
    storyButtons.push(
      makeBtn(cx, y1, "Ignore and keep walking", function () {
        if (trust <= 0) {
          endingTag = "trap";
          currentScreen = "lose";
        } else {
          endingTag = "safe";
          currentScreen = "win";
        }
      }),
    );

    storyButtons.push(
      makeBtn(cx, y2, "Turn back (+Trust)", function () {
        trust += 1;
        storyState = "INVESTIGATE";
        setButtonsForState();
      }),
    );
  }
}
