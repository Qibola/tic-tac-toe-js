// Tic-Tac-Toe — vanilla JavaScript
// Day 1: scaffold.
// Day 2: render the empty 3x3 board into #board.
// Day 3: click handling + alternating X/O turns.
// Day 4: win and draw detection.
// Day 5: live status text + "New game" reset button.

"use strict";

// The eight ways to make three-in-a-row: rows, columns, diagonals.
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// Create a fresh game state: an empty board and X to move first.
function createGame() {
  return { board: Array(9).fill(null), current: "X", winner: null, over: false };
}

// Inspect the board for a completed line. Returns "X" or "O" if a player
// occupies a full winning line, otherwise null.
function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// A draw is a full board with no winner.
function isDraw(board) {
  return checkWinner(board) === null && board.every((cell) => cell !== null);
}

// Apply a move at `index` for whichever player is to move.
// Returns true if the move was applied, false if the game is already over,
// the cell was already taken (illegal move), or the index is out of range.
// After a valid move we check for a win or draw; only if the game continues
// does the turn pass to the other player.
function makeMove(game, index) {
  if (game.over) return false;
  if (index < 0 || index > 8) return false;
  if (game.board[index] !== null) return false;

  game.board[index] = game.current;

  const winner = checkWinner(game.board);
  if (winner) {
    game.winner = winner;
    game.over = true;
  } else if (isDraw(game.board)) {
    game.over = true; // winner stays null -> draw
  } else {
    game.current = game.current === "X" ? "O" : "X";
  }
  return true;
}

// Reset an existing game object back to its starting state, in place, so any
// code holding a reference to it keeps working.
function resetGame(game) {
  game.board.fill(null);
  game.current = "X";
  game.winner = null;
  game.over = false;
  return game;
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
    const resetButton = document.getElementById("reset");
    if (!board) return;

    const game = createGame();
    const cells = renderBoard(board);

    const updateStatus = () => {
      if (!status) return;
      if (game.winner) status.textContent = `${game.winner} wins!`;
      else if (game.over) status.textContent = "It's a draw.";
      else status.textContent = `${game.current}'s turn`;
    };

    // Repaint every cell from the game state — used after a reset.
    const renderCells = () => {
      cells.forEach((cell, i) => {
        cell.textContent = game.board[i] === null ? "" : game.board[i];
      });
    };

    board.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");
      if (!cell || !board.contains(cell)) return;
      const index = Number(cell.dataset.index);
      if (!makeMove(game, index)) return; // ignore illegal / post-game clicks
      cell.textContent = game.board[index];
      updateStatus();
    });

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        resetGame(game);
        renderCells();
        updateStatus();
      });
    }

    updateStatus();
  });
}

// Export for a headless test runner (ignored by browsers).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { createGame, makeMove, resetGame, renderBoard, checkWinner, isDraw, WIN_LINES };
}
