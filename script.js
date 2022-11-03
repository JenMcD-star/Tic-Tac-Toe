/* 1. create board (grid) 
2. make option to choose x or o
3. make choice appear when grid square is selected
    -only one turn at a time
    -computer turn
4. stop game when 3 of the same symbols are in a row(not sure on this part!)
5. alert winner
6. return to blank grid
*/
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

let userChoice;
const xCombos = [];
const oCombos = [];
const xButton = document.getElementById("xButton");
const oButton = document.getElementById("oButton");
const divs = document.querySelectorAll("[id*=item");

function disableButton(btn) {
  document.getElementById(btn.id).disabled = true;
}

oButton.addEventListener("click", (event) => {
  userChoice = "O";
  disableButton(oButton);
  disableButton(xButton);
  document.getElementById("range").disabled = true;
  playGame();
});

xButton.addEventListener("click", (event) => {
  userChoice = "X";
  disableButton(oButton);
  disableButton(xButton);
  document.getElementById("range").disabled = true;
  playGame();
});

let totalMoves = 0;

function playGame() {
  playerPlay(userChoice);
  //checkWinner();
}

function switchPlayer() {
  if (userChoice == "X") {
    userChoice = "O";
  } else {
    userChoice = "X";
  }
  return userChoice;
}

function playerPlay() {
  /* Click event listener */
  const clickHandler = (e) => {
    e.currentTarget.innerHTML = userChoice;
    e.currentTarget.removeEventListener("click", clickHandler);

    console.log(userChoice);
    if (userChoice == "X") {
      xCombos.push(e.currentTarget.value);
      console.log(xCombos);
    }
    if (userChoice == "O") {
      oCombos.push(e.currentTarget.value);
      console.log(oCombos);
    }
    switchPlayer();
    winningCombos();
  };

  /* Add event listeners */
  for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", clickHandler);
  }
}

function checkWinner() {}

const w = [0, 1, 2];
const w1 = [3, 4, 5];
const w2 = [6, 7, 8];
const w3 = [0, 3, 6];
const w4 = [1, 4, 7];
const w5 = [2, 5, 8];
const w6 = [0, 4, 8];
const w7 = [2, 4, 6];

function winningCombos() {
  //gameover()
  let xWins = [];
  let oWins = [];
  xCombos.forEach(function (element) {
    xWins.push(Number(element));
    console.log(xWins);
  });
  oCombos.forEach(function (element) {
    oWins.push(Number(element));
    console.log(oWins);
  });
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
    alert("x wins");
  }
  if (
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
    alert("o wins");
  }
}
