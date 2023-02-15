#!/usr/bin/env node
// libraries
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers"
import readLine from "readline/promises"
// custom libs
import { Game } from "./game/Game.mjs";
import { CHOOSE_COLUMN, WANNA_PLAY_FIRST } from "./constants/cmdQuestions.mjs";
import { GAME_TIME } from "./constants/messages.mjs";

// const argvs = yargs(hideBin(process.argv)).argv

const commandLine = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const answer = await commandLine.question(WANNA_PLAY_FIRST)
console.log({ answer })

// console.log('CONNECT FOUR', argvs)


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

    console.log("game.board", game.board)

    boardFull = game.boardFull
    winner = game.winner


    console.log({ winner, boardFull })
}

if (!winner && boardFull) {
    console.log(GAME_TIME)

    commandLine.close()
}

