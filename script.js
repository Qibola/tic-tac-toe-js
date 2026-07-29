// Tic-Tac-Toe — vanilla JavaScript
// Day 1: scaffold.
// Day 2: render the empty 3x3 board into #board.
// Day 3: click handling + alternating X/O turns.

"use strict";

// Create a fresh game state: an empty board and X to move first.
function createGame() {
  return { board: Array(9).fill(null), current: "X" };
}

// Apply a move at `index` for whichever player is to move.
// Returns true if the move was applied, false if the cell was already
// taken (illegal move) or the index is out of range.
// Win/draw detection arrives in a later step, so turns just alternate.
function makeMove(game, index) {
  if (index < 0 || index > 8) return false;
  if (game.board[index] !== null) return false;
  game.board[index] = game.current;
  game.current = game.current === "X" ? "O" : "X";
  return true;
}

// Build the 3x3 grid of cells inside the given board element.
// Each cell is a <button> so it is keyboard-focusable and accessible.
function renderBoard(boardEl) {
  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i += 1) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cell";
    cell.dataset.index = String(i);
    cell.setAttribute("aria-label", `Cell ${i + 1}`);
    boardEl.appendChild(cell);
  }
  return boardEl.querySelectorAll(".cell");
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    if (!board) return;

    const game = createGame();
    const cells = renderBoard(board);

    const updateStatus = () => {
      if (status) status.textContent = `${game.current}'s turn`;
    };

    board.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");
      if (!cell || !board.contains(cell)) return;
      const index = Number(cell.dataset.index);
      if (!makeMove(game, index)) return; // ignore clicks on filled cells
      cell.textContent = game.board[index];
      updateStatus();
    });

    updateStatus();
  });
}

// Export for a headless test runner (ignored by browsers).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { createGame, makeMove, renderBoard };
}
