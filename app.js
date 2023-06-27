// Array to store the sequence
let sequence = [];
// array to store player sequence
let playerSequence = [];
// counter
let level = 0;

// query selectors
const startButton = document.querySelector(".startButton");
const info = document.querySelector(".info");
const heading = document.querySelector(".heading");
const gameContainer = document.querySelector(".simon");
const counter = document.querySelector(".counter");

// reset game function
function resetGame(text) {
  alert(text);
  sequence = [];
  playerSequence = [];
  level = 0;
  gameContainer.classList.add("unclickable");
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
    alert("Oops! Game over, you pressed the wrong panel");
    return;
  }
  // win state
  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 20) {
      alert("Congrats! You completed all the levels");
      return;
    }

    playerSequence = [];
    info.textContent = "Success! Keep going!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
}

function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextRound();
}

startButton.addEventListener("click", startGame);
gameContainer.addEventListener("click", (event) => {
  const { panel } = event.target.dataset;

  if (panel) playerInput(panel);
});
