// Array to store the sequence
let sequence = [];
// array to store player sequence
let playerSequence = [];
// counter
let level = 0;

const startButton = document.querySelector(".startButton");
const info = document.querySelector(".info");
const heading = document.querySelector(".heading");
const gameContainer = document.querySelector(".simon");

function resetGame(text) {
  alert(text);
  sequence = [];
  playerSequence = [];
  level = 0;
  startButton.classList.remove("hidden");
  heading.textContent = "Simon Game";
  info.classList.add("hidden");
  gameContainer.classList.add("unclickable");
}

function playerTurn(level) {
  gameContainer.classList.remove("unclickable");
  info.textContent = `Your turn: ${level} Tap${level > 1 ? "s" : ""}`;
}

function flashColor(color) {
  const panel = document.querySelector(`[data-panel='${color}']`);
  panel.classList.add("active");

  setTimeout(() => {
    panel.classList.remove("active");
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const panels = ["red", "green", "blue", "yellow"];
  const random = panels[Math.floor(Math.random() * panels.length)];

  return random;
}

function nextRound() {
  level += 1;

  gameContainer.classList.add("unclickable");
  info.textContent = "Wait for the computer";
  heading.textContent = `Level ${level} of 20`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level * 600 + 1000);
}

function playerInput(panel) {
  const index = playerSequence.push(panel) - 1;

  const remainingTaps = sequence.length - playerSequence.length;

  if (playerSequence[index] !== sequence[index]) {
    resetGame("Oops! Game over, you pressed the wrong panel");
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 20) {
      resetGame("Congrats! You completed all the levels");
      return;
    }

    playerSequence = [];
    info.textContent = "Success! Keep going!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? "s" : ""
  }`;
}

function startGame() {
  startButton.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "Wait for the computer";
  nextRound();
}

startButton.addEventListener("click", startGame);
gameContainer.addEventListener("click", (event) => {
  const { panel } = event.target.dataset;

  if (panel) playerInput(panel);
});

startButton.addEventListener("click", startGame);
tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});
