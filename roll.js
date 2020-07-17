class Play {
    DnDsides = [4, 6, 8, 10, 12, 20];
    side = Number();

    constructor() {
        var i = window.prompt("Pick a dice (specify a valid number of sides):");
        if (this.DnDsides.includes(Number(i))) {
            this.side = i;
        } else {
            alert("You have to specify a valid DnD dice!\nIt can either of these: 4, 6, 8, 10, 12, 20");
        }

    }

    roll() {

        if (this.DnDsides.includes(Number(this.side))) {
            var randomNumber = Math.floor(Math.random() * this.side) + 1;
            if (randomNumber == 20) {
                alert("Critic!");
                var snd = new Audio("./critic.mp3");
                snd.play();
            }
            var snd = new Audio("./roll.mp3");
            snd.play();
            return randomNumber;
        } else {
            return false;
        }

    }

    get getSide() {
        return this.side;
    }
}

class Stats {

    constructor(score, dices) {
        this.dices = dices;
        this.score = score;
    }

    critical() {
        var c = [];
        this.score.forEach(e => {
            if (e === 20) {
                c.push(e);
            }
        });
        return c.length;
    };

    throwedDices() {
        return this.score.length;
    };

    maxScore() {
        var max = this.score[0];
        this.score.forEach(e => {
            if (max < e) {
                max = e;
            }
        });
        return max;
    };

    minScore() {
        var max = this.score[0];
        this.score.forEach(e => {
            if (max > e) {
                max = e;
            }
        });
        return max;
    };


    popup() {
        alert("Total critical dices: " + this.critical() + "\n" + "Total throwed dices: " + this.throwedDices() + "\n" + "Higher dice: " + this.maxScore() + "\n" + "Lower dice: " + this.minScore());
    };

};

main();


function main() {


    var score = {
        sides: [],
        rolls: [],

        update: function () {
            this.updateHTML();
        },

        updateHTML: function () {
            var idScoreboard = document.getElementById("scoreboard");
            var idSides = document.getElementById("sides");
            var idRolls = document.getElementById("rolls");
            var idTotal = document.getElementById("total");

            idScoreboard.classList.remove("hidden");
            idSides.innerHTML = "🎲" + this.sides.join(", ");
            idRolls.innerHTML = "👋" + this.rolls.join("+") + "=";
            idTotal.innerHTML = this.total();
        },

        add: function (a, b) {
            return a + b;
        },

        total: function () {
            var total = score.rolls.reduce(this.add, 0);
            return total;
        },

        push: function (side, roll) {
            if (typeof (roll) === "number") {
                this.sides.push(side);
                this.rolls.push(roll);
            }
        }
    };


    function gameloop() {

        play = new Play();
        dice = play.getSide;
        roll = play.roll();
        score.push(dice, roll);
        score.update();

        document.addEventListener('keypress', function (event) {
            if (event.key === 's') {
                stats = new Stats(score.rolls, score.dices);
            }
        });

    }

    document.addEventListener('touchend', function (event) {
        gameloop();
    });

    document.addEventListener('keypress', function (event) {
        if (event.key === 'r') {
            gameloop();
        }
    });

}