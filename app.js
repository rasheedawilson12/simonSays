// Array to store the sequence
let sequence = [];
// array to store player sequence
let playerSequence = [];
// counter
let level = 0;

// query selectors
const body = document.querySelector("body");
const startButton = document.querySelector(".startButton");
const info = document.querySelector(".info");
const heading = document.querySelector(".heading");
const gameContainer = document.querySelector(".simon");
const counter = document.querySelector(".counter");
const lose = document.querySelector(".loseState");
const win = document.querySelector(".winState");

// reset game function
function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  counter.innerHTML = "0";
  lose.classList.add("hidden");
  win.classList.add("hidden");
  gameContainer.classList.remove("hidden");
}

// reset game function
function resetWin() {
  sequence = [];
  playerSequence = [];
  level = 0;
  counter.innerHTML = "0";
  win.classList.add("hidden");
  gameContainer.classList.remove("hidden");
}

// reset game function
function resetLose() {
  sequence = [];
  playerSequence = [];
  level = 0;
  counter.innerHTML = "0";
  lose.classList.add("hidden");
  gameContainer.classList.remove("hidden");
}

// make panels unlickable while it is the computers turn
function playerTurn() {
  gameContainer.classList.remove("unclickable");
}

// toggle colors on and off during the sequence
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

// create the next step in the squence
function nextStep() {
  // create array of functions that contain all of the panels.
  const panels = ["red", "green", "blue", "yellow"];
  // create random number the length of the array
  const random = panels[Math.floor(Math.random() * panels.length)];
  // return the array index with the index of the random number that was choosen

  return random;
}

function nextRound() {
  // increment level by one
  level++;
  // make the panels unclickable while the computer is flashing
  gameContainer.classList.add("unclickable");
  counter.innerHTML = `${level}`;
  // add the elements of the sequence with the nextStep function and create a nextSequence array with all elements inside and in the correct order.
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level * 600 + 1000);
}

function playerInput(panel) {
  // push player cick input into player array
  const index = playerSequence.push(panel) - 1;
  // compare the player input to the computer sequence
  // lose state
  if (playerSequence[index] !== sequence[index]) {
    loseState();
  }
  // win state
  // check to see if the player's turn has finished
  if (playerSequence.length === sequence.length) {
    if (sequence.length === 5) {
      winState();
    } else {
      playerSequence = [];
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  }
}

// playback current sequence function for player
const lastSequence = (color, index) => {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, (index + 1) * 600);
  });
};

const loseState = () => {
  gameContainer.classList.add("hidden");
  lose.classList.remove("hidden");
};

const winState = () => {
  gameContainer.classList.add("hidden");
  win.classList.remove("hidden");
};

function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextRound();
}

gameContainer.addEventListener("click", (event) => {
  const { panel } = event.target.dataset;

  if (panel) playerInput(panel);
});
