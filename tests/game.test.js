import { FIRST_PLAYER, SECOND_PLAYER } from "../constants/gameConstants.mjs";
import { INVALID_COLUMN } from "../constants/messages.mjs";
import { Game } from "../game/Game.mjs";
import { Player } from "../game/Player.mjs"

describe("Game Module", () => {
  let game;
  const player1 = new Player(FIRST_PLAYER)
  const player2 = new Player(SECOND_PLAYER)

  beforeEach(() => {
    game = new Game([player1, player2])
  })

  describe('Initialization', () => {
    it('should create a new game with an empty board', () => {
      expect(game.board).toEqual([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]);
    });

    it('should set the players and the current player', () => {
      expect(game.players).toEqual([player1, player2]);
      expect(game.currentPlayer).toEqual(player1);
    });

    it('should initialize other properties', () => {
      expect(game.winner).toBeNull();
      expect(game.boardFull).toBeFalsy();
      expect(game.validColumns).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
  });

  describe('getCurrentPlayer', () => {
    it('should return the token of the current player', () => {
      expect(game.getCurrentPlayer()).toEqual('X');
      game.switchPlayer();
      expect(game.getCurrentPlayer()).toEqual('O');
    });
  });

  describe('switchPlayer', () => {
    it('should switch the current player', () => {
      expect(game.currentPlayer).toEqual(player1);
      game.switchPlayer();
      expect(game.currentPlayer).toEqual(player2);
      game.switchPlayer();
      expect(game.currentPlayer).toEqual(player1);
    });
  });

  describe('setBoard', () => {
    it('should set the board to the given value', () => {
      const board = [
        ['X', null, null, null, 'O', null],
        [null, 'O', null, null, null, null],
        [null, null, 'X', null, null, null],
        [null, null, null, 'O', null, null],
        [null, null, null, null, 'X', null],
        [null, null, null, null, null, 'O'],
        ['O', null, null, null, null, null]
      ];
      game.setBoard(board);
      expect(game.board).toEqual(board);
    });
  });

  describe('dropToken', () => {
    it("throws an error if the column is invalid", () => {
      expect(() => game.dropToken(-1)).toThrowError(INVALID_COLUMN);
      expect(() => game.dropToken(7)).toThrowError(INVALID_COLUMN);
    });


    it('should drop the token in the given column', () => {
      game.dropToken(3);

      expect(game.board).toEqual([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]);

      game.switchPlayer()
      game.dropToken(2)

      expect(game.board).toEqual([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, "O"],
        [null, null, null, null, null, "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]);

      game.switchPlayer()
      game.dropToken(2)

      expect(game.board).toEqual([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, null, "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]);

      game.switchPlayer()
      game.dropToken(6)

      expect(game.board).toEqual([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, null, "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, "O"]
      ]);
    });
  });

  describe('validColumn', () => {
    it('should be able to tell if the given column number is a valid move', () => {
      const board = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, "O"],
        ["X", "X", "O", "O", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]
      game.setBoard(board)

      expect(game.validColumn(0)).toBeTruthy();
      expect(game.validColumn(1)).toBeTruthy();
      expect(game.validColumn(3)).toBeFalsy();

    })

    it('should not accept invalid number', () => {
      expect(game.validColumn("asdjjah23")).toBeFalsy();
      expect(game.validColumn(121242)).toBeFalsy();
      expect(game.validColumn(-1)).toBeFalsy();
      expect(game.validColumn(7)).toBeFalsy();
    })

  })

  describe('isBoardFull', () => {
    it('returns false if board is not full', () => {
      const board = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, "O"],
        ["X", "X", "O", "O", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]

      game.setBoard(board)
      expect(game.isBoardFull()).toBeFalsy();

    })

    it('returns true if board is full', () => {
      const board = [
        ["X", "X", "O", "O", "X", "X"],
        ["X", "X", "O", "O", "X", "X"],
        ["X", "X", "O", "O", "X", "X"],
        ["X", "X", "O", "O", "X", "X"],
        ["X", "X", "O", "O", "X", "X"],
        ["X", "X", "O", "O", "X", "X"],
        ["X", "X", "O", "O", "X", "X"],
      ]

      game.setBoard(board)
      expect(game.isBoardFull()).toBeTruthy();

    })

  })

  describe('checkWin', () => {
    beforeEach(() => {
      game.setBoard([
        [null, null, null, null, "O", "X"],
        [null, "O", "X", "O", "X", "X"],
        [null, null, null, "X", "X", "X"],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
    })

    it('Should return true if there`s a winner', () => {
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should be able to check the winner given a winning board', () => {
      game.checkWin()
      expect(game.winner).toEqual(player2.toString());
    })

    it('Should return true for horizontal win 1st row', () => {
      game.setBoard([
        [null, null, null, null, "O", "X"],
        [null, "O", "X", "O", "X", "X"],
        [null, null, null, "X", "X", "X"],
        [null, null, "O", "O", "O", "X"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for horizontal win 2nd row', () => {
      game.setBoard([
        [null, null, null, null, "X", "O"],
        [null, "O", "X", "O", "X", "X"],
        [null, null, null, "X", "X", "X"],
        [null, null, "O", "O", "X", "X"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for horizontal win 3rd row', () => {
      game.setBoard([
        [null, null, null, "X", "X", "O"],
        [null, "O", "X", "X", "X", "O"],
        [null, null, null, "X", "O", "X"],
        [null, null, "O", "X", "X", "X"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for horizontal win 4th row', () => {
      game.setBoard([
        [null, null, "X", "O", "X", "O"],
        [null, "O", "X", "X", "X", "O"],
        [null, null, "X", "X", "O", "X"],
        [null, null, "X", "O", "X", "X"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for horizontal win 5th row', () => {
      game.setBoard([
        [null, "O", "X", "O", "X", "O"],
        [null, "O", "O", "X", "X", "O"],
        [null, "O", "X", "X", "O", "X"],
        [null, "O", "X", "O", "X", "X"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for horizontal win 6th row', () => {
      game.setBoard([
        ["X", "O", "X", "O", "X", "O"],
        ["X", "X", "O", "X", "X", "O"],
        ["X", "O", "X", "X", "O", "X"],
        ["X", "O", "X", "O", "X", "X"],
        [null, null, null, null, "X", "O"],
        [null, null, "X", "X", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for vertical win 1st col', () => {
      game.setBoard([
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, "X", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for vertical win 2nd col', () => {
      game.setBoard([
        [null, null, null, null, null, null],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, null, null],
        [null, null, null, "X", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for vertical win 3rd col', () => {
      game.setBoard([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, "X", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for vertical win 4th col', () => {
      game.setBoard([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, "X", "X", "X"],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, "X", "O"],

      ])
      expect(game.checkWin()).toBeTruthy();
    })

    it('Should return true for vertical win 5th col', () => {
      game.setBoard([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, "X", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })
    it('Should return true for vertical win 6th col', () => {
      game.setBoard([
        [null, null, null, null, null, null],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, null, null],
        [null, null, null, "X", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, "O", "O", "O", "O"],
        [null, null, null, null, "X", "O"],
      ])
      expect(game.checkWin()).toBeTruthy();
    })
    it('Should return true for vertical win 7th col', () => {
      game.setBoard([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, "X", "X", "X"],
        [null, null, null, null, null, null],
        [null, null, null, null, "X", "O"],
        [null, null, null, null, "X", "O"],
        [null, null, "O", "O", "O", "O"],

      ])
      expect(game.checkWin()).toBeTruthy();
    })


    it('Should return true for diagonal win', () => {
      game.setBoard([
        [null, "X", "X", "X", "O", "O"],
        [null, "O", "X", "O", "X", "X"],
        ["O", "O", "O", "X", "X", "O"],
        [null, null, null, "O", "O", "O"],
        [null, null, null, null, "O", "X"],
        [null, "X", "O", "X", "X", "X"],
        ["O", "X", "O", "X", "O", "X"],

      ])
      expect(game.checkWin()).toBeTruthy();
    })
  })


});


