#!/usr/bin/env node

import { Game } from "./game/Game.mjs";

console.log('CONNECT FOUR')

const game = new Game();

game.dropToken();
