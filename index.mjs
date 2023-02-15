#!/usr/bin/env node
// libraries
import readLine from "readline/promises"
// custom libs
import { Game } from "./game/Game.mjs";
import { CHOOSE_COLUMN, WANNA_PLAY_FIRST } from "./constants/cmdQuestions.mjs";
import { GAME_TIME } from "./constants/messages.mjs";

const commandLine = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// TODO: Assign player to X or O
const answer = await commandLine.question(WANNA_PLAY_FIRST)


const game = new Game();

let winner = game.winner;
let boardFull = game.boardFull;

while (!winner && !boardFull) {

    // offset by -1 to match array index
    let column = parseInt(await commandLine.question(CHOOSE_COLUMN)) - 1;

    console.log("game.validColumn(column)", game.validColumn(column))

    if (!game.validColumn(column)) {
        console.log("Please enter a valid column!")
        continue
    }

    game.dropToken(column);

    // TODO: Show the current board


    if (game.isBoardFull()) {
        break
    }

    if (game.checkWin()) {
        break
    }

    game.switchPlayer()
}

if (!winner && boardFull) {
    console.log(GAME_TIME)
    commandLine.close()
}

if (winner) {
    console.log(`The winner is player: ${winner}.`)
    commandLine.close()
}

