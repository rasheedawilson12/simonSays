// keep track of original sequence
let sequence = [];
// array that stores player input
let playerSequence = [];
// create start level
let level = 0;

// flash colors when tile is activated in the sequence array
// must activiate the tiles on the screen in the right order
function flashTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);

  //   add activated class to tile to show that it is being engaged by the sequence.
  tile.classList.add("activated");

  //   remove activated class after 3 milliseconds after it has been activated in the sequence
  setTimeout(() => {
    DataTransferItemList.classList.remove("activated");
  }, 300);
}

// play round with the sequences engaging and the active class toggling on and off from the flash tile function.
// playRound passing through new sequence to activate tiles on the screen
const playRound = (newSequence) => {
  newSequence.forEach((color, index) => {
    // flashes each colored title at 600 milisecond intervals until the sequence has concluuded and it is players turn to go.
    setTimeout(() => {
      flashTile(color);
    }, (index + 1) * 600);
  });
};

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
  //   push the new sequence into the array
  newSequence.push(addStep());
  // go through the playRound logic with the new sequnce passed through
  playRound(newSequence);
};

// Query Selectors
let startButton = document.querySelector(".startButton");
let green = document.querySelector(".topLeft");
let red = document.querySelector(".top");
let yellow = document.querySelector(".topLeft");
let blue = document.querySelector(".topLeft");

// Start the game
