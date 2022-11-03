//make board
function makeBoard(num) {
  for (i = 0; i < num; i++) {
    let grid = document.getElementById("grid");
    let div = document.createElement("div");
    div.id = `item ${i}`;
    div.value = `${i}`;
    grid.appendChild(div);
  }
}

makeBoard(9);

//set up variables for play
let userChoice;
let player1;
let player2;
let player1Wins = 0;
let player2Wins = 0;
let totalMoves = 0;
let xCombos = [];
let oCombos = [];
const player1Score = document.getElementById("player1");
const player2Score = document.getElementById("player2");
const xButton = document.getElementById("xButton");
const oButton = document.getElementById("oButton");
const playAgainBtn = document.createElement("button");
const playAgainDiv = document.getElementById("playAgain");
const divs = document.querySelectorAll("[id*=item");

//update html with score
function changeScore() {
  let score1 = `Player 1: ${player1Wins}`;
  player1Score.innerHTML = score1;

  let score2 = `Player 2: ${player2Wins}`;
  player2Score.innerHTML = score2;
}

//disable buttons
function disableButton(btn) {
  document.getElementById(btn.id).disabled = true;
}

//enable buttons
function enableButton(btn) {
  document.getElementById(btn.id).disabled = false;
}

//event listen for o, sets opposite choice for player2
//and disables buttons before starting the game
oButton.addEventListener("click", (event) => {
  userChoice = "O";
  player1 = "O";
  player2 = "X";
  disableButton(oButton);
  disableButton(xButton);
  playGame();
});

//event listener for x, sets opposite choice for player2
//and disables buttons before starting the game
xButton.addEventListener("click", (event) => {
  userChoice = "X";
  player1 = "X";
  player2 = "O";
  disableButton(oButton);
  disableButton(xButton);
  playGame();
});

function playGame() {
  playerPlay(userChoice);
}

//automatically switch between x and o, counts each move and returns the x or o
function switchPlayer() {
  if (userChoice == "X") {
    userChoice = "O";
  } else {
    userChoice = "X";
  }
  totalMoves++;
  return userChoice;
}

/* Click handler for board
adds the value of each div to an array for each player*/
const clickHandler = function (e) {
  if (userChoice == null){
    e.currentTarget.innerHTML = "";
  } else {
  e.currentTarget.innerHTML = userChoice;
  e.currentTarget.removeEventListener("click", clickHandler);

  if (userChoice == "X") {
    xCombos.push(e.currentTarget.value);
  }
  if (userChoice == "O") {
    oCombos.push(e.currentTarget.value);
  }
  switchPlayer();
  winningCombos();
}};

//adds events listener to any element
function addListener(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", clickHandler);
  }
}

//adds the listener to the board which enables the players to make choices
function playerPlay(userChoice) {
  addListener(divs);
}

//all of the winning possibilities
const w = [0, 1, 2];
const w1 = [3, 4, 5];
const w2 = [6, 7, 8];
const w3 = [0, 3, 6];
const w4 = [1, 4, 7];
const w5 = [2, 5, 8];
const w6 = [0, 4, 8];
const w7 = [2, 4, 6];

//compares turns the collected array into new number array
function winningCombos() {
  let xWins = [];
  let oWins = [];
  xCombos.forEach(function (element) {
    xWins.push(Number(element));
  });
  oCombos.forEach(function (element) {
    oWins.push(Number(element));
  });

  //compares the new number array with the winning possiblities
  //there must be a better way to do this...
  const isSubset = (array1, array2) =>
    array2.every((element) => array1.includes(element));
  if (
    isSubset(xWins, w) == true ||
    isSubset(xWins, w1) == true ||
    isSubset(xWins, w2) == true ||
    isSubset(xWins, w1) == true ||
    isSubset(xWins, w2) == true ||
    isSubset(xWins, w3) == true ||
    isSubset(xWins, w4) == true ||
    isSubset(xWins, w5) == true ||
    isSubset(xWins, w6) == true ||
    isSubset(xWins, w7) == true
  ) {
    if (player1 === "X") {
      player1Wins++;
      gameOver();
    }
    if (player2 === "X") {
      player2Wins++;
      gameOver();
    }
  } else if (
    isSubset(oWins, w) == true ||
    isSubset(oWins, w1) == true ||
    isSubset(oWins, w2) == true ||
    isSubset(oWins, w1) == true ||
    isSubset(oWins, w2) == true ||
    isSubset(oWins, w3) == true ||
    isSubset(oWins, w4) == true ||
    isSubset(oWins, w5) == true ||
    isSubset(oWins, w6) == true ||
    isSubset(oWins, w7) == true
  ) {
    if (player1 === "O") {
      player1Wins++;
      gameOver();
    }
    if (player2 === "O") {
      player2Wins++;
      gameOver();
    }
  } else {
    //if 9 moves have passed and no one has won then it's a tie.
    if (totalMoves == 9) {
      alert("tie! try again.");
      gameOver();
    }
  }
  //updates the score after each win
  changeScore();
}

function gameOver() {
  //stop click events
  removeEvent();
  // make a play again button
  playAgainBtn.innerHTML = "Play Again";
  playAgainBtn.id = "playAgainBtn";
  playAgainDiv.appendChild(playAgainBtn);
  playAgainBtn.addEventListener("click", playAgain);
  enableButton(playAgainBtn);
  //reset everything to 0
  totalMoves = 0;
  player1 = 0;
  player2 = 0;
  userChoice = null;
  oCombos = [];
  xCombos = [];
}

function removeEvent() {
  //replaces all of the grid divs with a clone which does not copy
  // event listeners
  let div = document.querySelectorAll("[id*=item");
  for (let i = 0; i < div.length; i++) {
    div[i].replaceWith(div[i].cloneNode(true));
  }
}

function playAgain() {
  //disable button
  disableButton(playAgainBtn);
  //play again button returns board to blank (keep score)

  let divs = document.querySelectorAll("[id*=item");
  for (let i = 0; i < divs.length; i++) {
    let blank = "";
    divs[i].innerHTML = blank;
    divs[i].value = i;
  }
  addListener(divs);

  //reenable buttons
  enableButton(xButton);
  enableButton(oButton);
}
