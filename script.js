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
    grid.appendChild(div);
  }
}

makeBoard(9);

let userChoice;
let computerChoice;
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
  checkWinner();
});

xButton.addEventListener("click", (event) => {
  userChoice = "X";
  disableButton(oButton);
  disableButton(xButton);
  document.getElementById("range").disabled = true;
  checkWinner();
});

let totalMoves = 0;

function playGame() {
  totalMoves += 1;
  playerPlay(userChoice);
  //checkWinner();
}

/* Remove all event listeners */
const removeListeners = () => {
  for (let j = 0; j < divs.length; j++) {
    divs[j].removeEventListener("click", clickHandler);
  }
};

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
    switchPlayer();
  };

  /* Add event listeners */
  for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", clickHandler);
  }
}

function checkWinner() {
  if (totalMoves < 9) {
    playGame();
  } else {
    console.log("game over");
  }
}
