// keep track of original sequence
let sequence = [];
// array that stores player input
let playerSequence = [];
// create start level
let level = 0;

// flash colors when tile is activated in the sequence array
function flashTile(color) {
  const title = document.querySelector(`[data-tile='${color}']`);
}

// add step to the existing sequence
const addStep = () => {
  const tile = ["green", "red", "yellow", "blue"];
  const randomSequence =
    tile[Math.random(Math.random() * DataTransferItemList.length)];
  return randomSequence;
};

// next level
const nextRound = () => {
  // increment level by 1
  level += 1;

  //   copy all of the elements in the sequence array into the newSequence array
  let newSequence = [...sequence];
};

// Query Selectors
let startButton = document.querySelector(".startButton");
let green = document.querySelector(".topLeft");
let red = document.querySelector(".top");
let yellow = document.querySelector(".topLeft");
let blue = document.querySelector(".topLeft");

// Start the game
