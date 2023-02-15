import { FIRST_PLAYER, SECOND_PLAYER } from "../constants/gameConstants.mjs";
import { Player } from "../game/Player.mjs"


describe('Player Module', () => {
  let player1;

  beforeEach(() => {
    player1 = new Player(FIRST_PLAYER)
  })

  describe('chooseRandomColumn', () => {
    it('Should give a valid number within the given valid columns array', () => {
      const validColumns = [0, 1, 2, 3, 4, 5, 6]
      const randomChoice = player1.chooseRandomColumn(validColumns)

      expect(validColumns.includes(randomChoice)).toBeTruthy()
    })

    it('Should not give a number not within the given valid columns array', () => {
      const validColumns = [0, 1, 2, 4, 5]
      const invalidColumns = [3, 6]
      const randomChoice = player1.chooseRandomColumn(validColumns)

      expect(invalidColumns.includes(randomChoice)).toBeFalsy()
    })
  })

  describe('valueOf', () => {
    it('Should be able to convert player to a string representation of the token', () => {
      expect(player1.toString()).toEqual('X');
    })

    it('Should be able to compare players by their token', () => {
      const player2 = new Player(FIRST_PLAYER);
      const player3 = new Player(SECOND_PLAYER);

      expect(player1).toEqual(player2);
      expect(player1).not.toEqual(player3);
    })
  })
})
