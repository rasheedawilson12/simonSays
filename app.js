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
const wrapper = document.querySelector(".wrapper");
const counter = document.querySelector(".counter");
const lose = document.querySelector(".loseState");
const win = document.querySelector(".winState");
const power = document.querySelector(".power");
const rules = document.querySelector(".rules");
const sound = document.querySelector(".sound");

// 1. Show the game board
// show the game board
const showBoard = () => {
  rules.classList.add("hidden");
  wrapper.classList.remove("hidden");
};

// reset game function from midgame
function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  counter.innerHTML = "0";
  lose.classList.add("hidden");
  win.classList.add("hidden");
  wrapper.classList.remove("hidden");
  power.classList.remove("powerOn");
  body.style.backgroundColor = "#e5e3c9";
}

// reset game function from winState
function resetWin() {
  sequence = [];
  playerSequence = [];
  level = 0;
  counter.innerHTML = "0";
  win.classList.add("hidden");
  wrapper.classList.remove("hidden");
  power.classList.remove("powerOn");
  body.style.backgroundColor = "#e5e3c9";
}

// reset game function from loseState
function resetLose() {
  sequence = [];
  playerSequence = [];
  level = 0;
  counter.innerHTML = "0";
  lose.classList.add("hidden");
  wrapper.classList.remove("hidden");
  power.classList.remove("powerOn");
  body.style.backgroundColor = "#e5e3c9";
  sound.classList.remove("hidden");
}

// 7. When the computer's turn is over, it is the players turn and the player can now click the panels.
function playerTurn() {
  gameContainer.classList.remove("unclickable");
}

// 5. toggle colors on and off during the sequence when called upon in the sequence
function flashColor(color) {
  const panel = document.querySelector(`[data-panel='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  panel.classList.add("active");
  sound.play();

  setTimeout(() => {
    panel.classList.remove("active");
  }, 300);
}

// 4. play the round with the random sequnce of color that will flash the colors and sounds as each color is played. Set a timeout between colors so they don't all flash at once.
function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, (index + 1) * 600);
  });
}

// 6. Create the next step in the sequence from the panels avalible.
function nextStep() {
  // create array of functions that contain all of the panels.
  const panels = ["red", "green", "blue", "yellow"];
  // create random number the length of the array
  const random = panels[Math.floor(Math.random() * panels.length)];
  // return the array index with the index of the random number that was choosen

  return random;
}

// 3. Set up the next(or inital) round to be played
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

// 8. The computer will take the player's clicks and store them in the player sequence array and compare the player sequence to the computer's sequence. If the sequence is correct AND the player has cleared up all the levels, call winState. If the sequence is not correct, call loseState. If the squence is correct but the player hasn't cleared all the levels, call nexTRound.
function playerInput(panel) {
  // push player cick input into player array
  const index = playerSequence.push(panel) - 1;
  // target sound data sets in HTML and play sound on each click
  const sound = document.querySelector(`[data-sound='${panel}']`);
  sound.play();

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

  // compare the player input to the computer sequence
  // lose state
  if (playerSequence[index] !== sequence[index]) {
    loseState();
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
  wrapper.classList.add("hidden");
  lose.classList.remove("hidden");
  body.style.backgroundColor = "lightBlue";
  sound.classList.add("hidden");
};

const winState = () => {
  wrapper.classList.add("hidden");
  win.classList.remove("hidden");
  body.style.backgroundColor = "salmon";
};

// 2. Start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  power.classList.add("powerOn");
  nextRound();
}

// look into the data set in HTML and flash the colors and sounds when a particular panel is clicked.
gameContainer.addEventListener("click", (event) => {
  const { panel } = event.target.dataset;
  if (panel) playerInput(panel);
});
