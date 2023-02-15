import { COMPUTER } from "../constants/gameConstants.mjs";

export class Player {
    constructor(token, type = COMPUTER) {
        this.playerToken = token;
        this.playerType = type;
    }

    chooseRandomColumn(validColumns) {
        console.log("chooseRandomColumn", validColumns)
        const randomIndex = Math.floor(Math.random() * validColumns.length)

        return validColumns[randomIndex]
    }

    toString() {
        return this.playerToken
    }

    valueOf() {
        return this.playerToken
    }
}
