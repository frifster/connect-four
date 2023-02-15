import { BOARD_ROWS, BOARD_COLUMNS, FIRST_PLAYER, SECOND_PLAYER } from "../constants/gameConstants.mjs";
import { GAME_OVER_WITH_WINNER, INVALID_COLUMN } from "../constants/messages.mjs";

export class Game {
  constructor() {
    this.board = Array.from({ length: BOARD_COLUMNS }, () => Array.from({ length: BOARD_ROWS }, () => null))
    this.currentPlayer = FIRST_PLAYER
    this.winner = null
    this.boardFull = false
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === FIRST_PLAYER ? SECOND_PLAYER : FIRST_PLAYER
  }


  dropToken(columnNumber) {
    if (this.winner) {
      throw new Error(GAME_OVER_WITH_WINNER);
    }

    if (!this.validColumn(columnNumber)) {
      throw new Error(INVALID_COLUMN);
    }

    for (let i = BOARD_COLUMNS; i >= 0; i--) {
      if (this.board[columnNumber][i] === null) {
        this.board[columnNumber][i] = this.currentPlayer
        break;
      }
    }
  }

  validColumn(columnNumber) {
    if (!(columnNumber < 0 || columnNumber > BOARD_COLUMNS)) {
      if (this.board[columnNumber].includes(null)) {
        return true
      }
    }

    return false
  }

  isBoardFull() {
    for (let column of this.board) {
      if (column.includes(null)) {
        return false
      }
    }

    return true
  }

  checkWin() {
    // Checking for horizontal win
    for (let row = 0; row < BOARD_ROWS; row++) {
      for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
        const currentCell = this.board[row][col];

        if (currentCell &&
          currentCell === this.board[row][col + 1] &&
          currentCell === this.board[row][col + 2] &&
          currentCell === this.board[row][col + 3]) {
          return true;
        }
      }
    }

    // Checking for vertical win
    for (let row = 0; row < BOARD_ROWS - 3; row++) {
      for (let col = 0; col < BOARD_COLUMNS; col++) {
        const currentCell = this.board[row][col];

        if (currentCell &&
          currentCell === this.board[row + 1][col] &&
          currentCell === this.board[row + 2][col] &&
          currentCell === this.board[row + 3][col]) {
          return true;
        }
      }
    }

    // Checking for diagonal win (top-left to bottom-right)
    for (let row = 0; row < BOARD_ROWS - 3; row++) {
      for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
        const currentCell = this.board[row][col];

        if (currentCell &&
          currentCell === this.board[row + 1][col + 1] &&
          currentCell === this.board[row + 2][col + 2] &&
          currentCell === this.board[row + 3][col + 3]) {
          return true;
        }
      }
    }

    // Checking for diagonal win (bottom-left to top-right)
    for (let row = 3; row < BOARD_ROWS; row++) {
      for (let col = 0; col < BOARD_COLUMNS - 3; col++) {
        const currentCell = this.board[row][col];

        if (currentCell &&
          currentCell === this.board[row - 1][col + 1] &&
          currentCell === this.board[row - 2][col + 2] &&
          currentCell === this.board[row - 3][col + 3]) {
          return true;
        }
      }
    }

    return false;
  }
}
