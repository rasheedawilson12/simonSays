// Array to store the sequence
let sequence = [];
// array to store player sequence
let playerSequence = [];
// counter
let counter = 1;

// media queries
let start = document.querySelector(".startButton");
let green = document.querySelector(".topLeftPanel");
let red = document.querySelector(".topLeftPanel");
let yellow = document.querySelector(".topLeftPanel");
let blue = document.querySelector(".topLeftPanel");

// array of colors
let allColors = [green, red, yellow, blue];

// create random sequence

// function to toggle active class so that the colors flash while the sequence is going
const toggleColor = () => {
  green.classList.toggle("active");
};

//start game

// compare the sequence to the player sequence

// go to next round if correct

// Lose state if incorrect
// win state once all levels have been cleared
