import { BOARD_ROWS, BOARD_COLUMNS, FIRST_PLAYER, SECOND_PLAYER } from "../constants/gameConstants.mjs";
import { GAME_OVER_WITH_WINNER, INVALID_COLUMN } from "../constants/messages.mjs";

export class Game {
  constructor() {
    this.board = Array.from({ length: BOARD_ROWS }, () => Array.from({ length: BOARD_COLUMNS }, () => null))
    this.currentPlayer = FIRST_PLAYER
    this.winner = null
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(previousPlayer) {
    return previousPlayer === FIRST_PLAYER ? SECOND_PLAYER : FIRST_PLAYER
  }


  dropToken(columnNumber) {
    if (this.winner) {
      throw new Error(GAME_OVER_WITH_WINNER);
    }

    if (columnNumber < 0 || columnNumber > BOARD_COLUMNS) {
      throw new Error(INVALID_COLUMN);
    }

    console.log('board', this.board)

  }

  isBoardFull() {
    for (let column of this.board) {
      if (column.includes(null)) {
        return false
      }
    }

    return true
  }
}
