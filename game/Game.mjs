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
      console.log("iiiiiiii", i)
      if (this.board[columnNumber][i] === null) {
        this.board[columnNumber][i] = this.currentPlayer
        break;
      }
    }


    const hasWinner = this.checkWin()

    console.log("hasWinner", hasWinner)

    if (hasWinner) {
      this.winner = this.currentPlayer
    } else {

      const isBoardFull = this.isBoardFull()

      if (isBoardFull) {
        console.log("BOARD FULL")
        this.boardFull = true
        return
      }
      this.switchPlayer()
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
    const winningPositions = [
      // Vertical
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4],
      [5, 5, 5, 5],

      // Horizontal
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],

      // Diagonal
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
    ]

    // for (let position of winningPositions) {
    //   const [a, b, c, d] = position

    //   console.log("position", position)


    //   if (this.board[a][b]) {
    //     if (this.board[a][b] === this.board[c][d] && this.board[b][c] === this.board[d][a]) {
    //       return true
    //     }
    //   }
    // }

    return false

  }
}
