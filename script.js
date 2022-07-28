window.onload = () => {
    let game = new TicTacToe();
    game.start();

}

class TicTacToe {
    winningVariants = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],

    ];

    player = "X";
    end = false;

    constructor () {
        this.fields = document.querySelectorAll(".field");
        this.winner = document.getElementById("winner");
        this.restartButton = document.getElementById("restart-game");

        this.fields.forEach(field => field.addEventListener("click", this.fieldClick));
        this.restartButton.addEventListener("click", this.start);
    }

    fieldClick = (event) => {
        this.playerTurn(event.target);
    }

    playerTurn = (field) => {
        if (this.end) return;
        if (field.textContent === "X" || field.textContent === "O") return;
        field.textContent = this.player;
        this.player = this.player === "X" ? "O" : "X";
        this.checkWin();
    }

    checkWin = () => {
        for (let i = 0; i < this.winningVariants.length; i++) {
            const variant = this.winningVariants[i];
            const a = this.getField(variant[0]);
            const b = this.getField(variant[1]);
            const c = this.getField(variant[2]);

            if (a === "" || b === "" || c === "") continue;

            if (a === b && b === c) {
                this.end = true;
                this.winner.textContent = " Wygrał " + a;
            }
        }
    }

    getField = (index) => {
        return document.querySelector(`.field[data-index='${index}']`).textContent;
    }

    start = () => {
        this.end = false;
        this.player = "X";
        this.winner.textContent = "";
        this.fields.forEach(field => field.textContent = "");
    }
}