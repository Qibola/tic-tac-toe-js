// Tic-Tac-Toe — vanilla JavaScript
// Day 1: scaffold.
// Day 2: render the empty 3x3 board into #board.

"use strict";

// Build the 3x3 grid of cells inside the given board element.
// Each cell is a <button> so it is keyboard-focusable and accessible.
// Click handling and game logic arrive in a later step.
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

    if (board) {
      renderBoard(board);
    }
    if (status) {
      status.textContent = "Board ready — your move next (coming soon)";
    }
  });
}

// Export for a headless test runner (ignored by browsers).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderBoard };
}
