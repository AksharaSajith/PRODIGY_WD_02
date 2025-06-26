const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const turnIndicator = document.getElementById("turn-indicator");

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.innerText = ""; // clear any previous text
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  message.textContent = "";
  turnIndicator.textContent = "Turn: ❌";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  const currentSymbol = isXTurn ? "❌" : "⭕";

  cell.classList.add(currentClass);
  cell.innerText = currentSymbol;

  if (checkWin(currentClass)) {
    message.textContent = `${currentSymbol} Wins!`;
    turnIndicator.textContent = "";
    endGame();
  } else if (isDraw()) {
    message.textContent = "Draw!";
    turnIndicator.textContent = "";
    endGame();
  } else {
    isXTurn = !isXTurn;
    turnIndicator.textContent = `Turn: ${isXTurn ? "❌" : "⭕"}`;
  }
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener("click", handleClick);
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index =>
      cells[index].classList.contains(currentClass)
    );
  });
}

restartBtn.addEventListener("click", startGame);

startGame();
