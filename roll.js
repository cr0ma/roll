class Play {
    DnDsides = [4, 6, 8, 10, 12, 20];
    side = Number();

    constructor() {
        var i = window.prompt("Pick a dice (specify a valid number of sides):");
        if (this.DnDsides.includes(Number(i))) {
            this.side = i;
        } else {
            alert("You have to specify a valid DnD dice!");
            console.error("You have to specify a valid DnD dice!");
            console.error("It can either of these: 4, 6, 8, 10, 12, 20");
            return NaN;
        }

    }

    roll() {
        var randomNumber = Math.floor(Math.random() * this.side) + 1;
        return randomNumber;
    };

    get getSide() {
        return this.side;
    }
}

main();


function main() {
    var score = {
        sides: [],
        rolls: [],

        update: function () {
            var idScoreboard = document.getElementById("scoreboard");
            var idSides = document.getElementById("sides");
            var idRolls = document.getElementById("rolls");
            var idTotal = document.getElementById("total");

            idScoreboard.classList.remove("hidden");
            idSides.innerHTML = this.sides.toString();
            idRolls.innerHTML = this.rolls.toString();
            idTotal.innerHTML = this.total();
        },

        add: function (accumulator, a) {
            return accumulator + a;
        },

        total: function () {
            var total = score.rolls.reduce(this.add, 0);
            return total;
        }
    };

    function game(){
        play = new Play();
        side = play.getSide;
        roll = play.roll();
        var snd = new Audio("./roll.mp3");
        snd.play();
        score.sides.push(side);
        score.rolls.push(roll);
        score.update();
    }
    
    document.addEventListener('touchend', function (event) {
        game();
    });

    document.addEventListener('keypress', function (event) {
        if (event.key === 'r') {
            game();
        }
    });

}