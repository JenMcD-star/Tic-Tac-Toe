/* 1. create board (grid) 
2. make option to choose x or o
3. make choice appear when grid square is selected
    -only one turn at a time
    -computer turn
4. stop game when 3 of the same symbols are in a row(not sure on this part!)
5. alert winner
6. return to blank grid
optional extras - best out of 3 selector? that would also keep track of each round*/

function makeBoard(num) {
  for (i = 0; i < num; i++) {
    let grid = document.getElementById("grid");
    let div = document.createElement("div");
    div.id = `item ${i}`;
    grid.appendChild(div);
  }
}
window.addEventListener("load", makeBoard(9));

const roundPicker = document.querySelector('input[type="range"]');
const output = document.querySelector(".output");

roundPicker.oninput = () => {
  output.textContent = roundPicker.value;
};

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
  computerChoice = "X";
  disableButton(oButton);
  disableButton(xButton);
  document.getElementById("range").disabled = true;
  playGame();
});

xButton.addEventListener("click", (event) => {
  userChoice = "X";
  computerChoice = "O";
  console.log(userChoice);
  disableButton(oButton);
  disableButton(xButton);
  document.getElementById("range").disabled = true;
  playGame();
});

function playGame() {
  let playerturns = 0;
  let computerturns = 0;
  if (playerturns <= computerturns) {
    playerPlay();
  } else {
    computerPlay();
  }
}

function fillDivs() {
  for (let i = 0; i < divs.length; i++) {
    return divs[i].addEventListener("click", clickHandler);
  }
}

function clickHandler(e) {
  e.currentTarget.innerHTML = userChoice;
}

const randomNum = Math.floor(Math.random() * 9);

function computerPlay(randomNum) {
  console.log("rest");
  divs[randomNum].innerHTML = `${computerChoice}`;
}

function playerPlay() {
  fillDivs(userChoice);
}
