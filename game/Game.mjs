import { BOARD_ROWS, BOARD_COLUMNS } from "../constants/gameConstants.mjs";
import { GAME_OVER_WITH_WINNER, INVALID_COLUMN } from "../constants/messages.mjs";

export class Game {
  constructor(players) {
    this.board = Array.from({ length: BOARD_COLUMNS }, () => Array.from({ length: BOARD_ROWS }, () => null))
    this.players = players;
    this.currentPlayer = players[0];
    this.winner = null;
    this.boardFull = false;
    this.validColumns = [0, 1, 2, 3, 4, 5, 6]
  }

  getCurrentPlayer() {
    return `${this.currentPlayer}`;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0]

    return this
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
        this.board[columnNumber][i] = this.currentPlayer.playerToken
        break;
      }
    }

    return this
  }

  validColumn(columnNumber) {
    if (isNaN(columnNumber)) {
      return false
    }

    if (!(columnNumber < 0 || columnNumber >= BOARD_COLUMNS)) {
      if (this.board[columnNumber].includes(null)) {
        return true
      }
    }

    return false
  }

  getValidColumns() {
    const validColumns = []
    for (let i = 0; i <= BOARD_COLUMNS - 1; i++) {
      if (this.board[i].includes(null)) {
        validColumns.push(i)
      }
    }

    this.validColumns = validColumns

    // Adding 1 for human readable index
    return validColumns.map(x => x + 1).join(" | ")
  }

  isBoardFull() {
    for (let column of this.board) {
      if (column.includes(null)) {
        return false
      }
    }

    return true
  }

  showBoard() {
    for (let row = 0; row < this.board[0].length; row++) {
      let rowStr = '|';

      for (let col = 0; col < this.board.length; col++) {
        const cell = this.board[col][row];
        rowStr += cell ? ` ${cell} |` : '   |';
      }

      console.log(rowStr);
    }

    console.log('-----------------------------');
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

          this.winner = currentCell
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
          this.winner = currentCell
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
          this.winner = currentCell
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
          this.winner = currentCell
          return true;
        }
      }
    }

    return false;
  }
}
