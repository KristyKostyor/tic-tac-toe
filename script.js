"use strict";

const cells = document.querySelectorAll(".cell");
const button = document.querySelector(".game--restart");
const gameStatus = document.querySelector(".game--status");
let playerCurrent = "X";
let activeGame = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const arr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let cell of cells) {
  cell.addEventListener("click", function (e) {
    const valueCell = e.target.dataset.cellIndex;

    if (!activeGame || gameState[valueCell] != "") {
      return;
    }
    gameState[valueCell] = playerCurrent;
    cells[valueCell].textContent = playerCurrent;

    result();
  });
}

function handlePlayerChange() {
  playerCurrent = playerCurrent === "X" ? "0" : "X";
  gameStatus.textContent = `It's ${playerCurrent}'s turn`;
}

function result() {
  for (let i = 0; i <= arr.length - 1; i++) {
    const win = arr[i];
    const a = gameState[win[0]];
    const b = gameState[win[1]];
    const c = gameState[win[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      activeGame = false;
      gameStatus.textContent = `Player ${playerCurrent} has won!`;
      return;
    }
  }

  handlePlayerChange();

  if (!gameState.includes("")) {
    gameStatus.textContent = "Game ended in a draw!";
    activeGame = false;
  }
}

button.addEventListener("click", function () {
  for (let cell of cells) {
    cell.textContent = "";
  }
  gameStatus.textContent = `It's X's turn`;
  activeGame = true;
  playerCurrent = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
});
