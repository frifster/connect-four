#!/usr/bin/env node
// libraries
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers"
import readLine from "readline/promises"
// custom libs
import { Game } from "./game/Game.mjs";
import { CHOOSE_COLUMN, WANNA_PLAY_FIRST } from "./constants/cmdQuestions.mjs";

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

while (!winner) {

    let column = await commandLine.question(CHOOSE_COLUMN)

    if (!game.validColumn(column)) {
        console.log("Please enter a valid column!")
        continue
    }

    game.dropToken(column);
    winner = game.winner
}

