#!/usr/bin/env node
// libraries
import readLine from "readline/promises";
// custom libs
import { Game } from "./game/Game.mjs";
import { CHOOSE_COLUMN, CHOOSE_GAME_MODE, INVALID_GAME_MODE } from "./constants/cmdQuestions.mjs";
import { GAME_TIE } from "./constants/messages.mjs";
import { Player } from "./game/Player.mjs";
import { FIRST_PLAYER, HUMAN, SECOND_PLAYER } from "./constants/gameConstants.mjs";
import { delay } from "./helpers/delay.js";
import { errorLog, prettyLog } from "./helpers/prettyLog.js";

const commandLine = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Possible players
 * Human vs Human
 * Human vs Com
 * Com vs Com
 */

let gameMode = ''
let players = []

while (!gameMode) {
    const answer = await commandLine.question(CHOOSE_GAME_MODE)

    if (answer === '1') {
        const player1 = new Player(FIRST_PLAYER, HUMAN)
        const player2 = new Player(SECOND_PLAYER, HUMAN)
        players = [player1, player2]

        gameMode = '1'

        break
    }

    if (answer === '2') {
        const player1 = new Player(FIRST_PLAYER, HUMAN)
        const player2 = new Player(SECOND_PLAYER)
        players = [player1, player2]

        break
    }

    if (answer === '3') {
        const player1 = new Player(FIRST_PLAYER)
        const player2 = new Player(SECOND_PLAYER)
        players = [player1, player2]

        break
    }

    errorLog(INVALID_GAME_MODE)
}

const game = new Game(players);

let winner = game.winner;

while (!winner) {

    prettyLog(`Player ${game.getCurrentPlayer()}'s TURN: `)

    let column = ''
    const validColumns = game.getValidColumns();

    console.log(`The available columns to drop token to : ${validColumns} \n`)

    let isColumnValid = false;

    if (game.currentPlayer.playerType === HUMAN) {
        column = parseInt(await commandLine.question(CHOOSE_COLUMN)) - 1;

        console.log("column", column)

        isColumnValid = game.validColumn(column)

    } else {
        column = game.currentPlayer.chooseRandomColumn(game.validColumns)

        isColumnValid = game.validColumn(column)

        // Adding 1 for human readable index
        prettyLog(`Computer Player chose column number ${column + 1}`)
        console.log('\n')

        await delay(500)

    }

    if (!isColumnValid) {
        errorLog("Please enter a valid column!")
        continue
    }

    game.dropToken(column)
        .showBoard();

    if (game.isBoardFull()) {
        break
    }

    if (game.checkWin()) {
        winner = game.winner
        break
    }

    game.switchPlayer()
}

if (!winner) {
    console.log(GAME_TIE)
    commandLine.close()
}

if (winner) {
    console.log(`The winner is player: ${winner}.`)
    commandLine.close()
}

