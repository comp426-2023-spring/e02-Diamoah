// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver
document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("player1-submit").addEventListener("click", player1Submit);
document.getElementById("player2-submit").addEventListener("click", player2Submit);
document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("show-rules").addEventListener("click", showRules);
document.getElementById("hide-rules").addEventListener("click", hideRules);

let gameType = "rps";
let opponentType = "computer";
let player1Move = "";
let player2Move = "";

function startGame() {
    gameType = document.getElementById("game-type").value;
    opponentType = document.getElementById("opponent-type").value;

    document.getElementById("game-selection").hidden = true;
    document.getElementById("game-container").hidden = false;

    generateMoveOptions("player1-form");
}

function player1Submit() {
    player1Move = document.querySelector("#player1-form input[type='radio']:checked").value;

    if (opponentType === "computer") {
        playAgainstComputer();
    } else {
        document.getElementById("player1-form").hidden = true;
        document.getElementById("player2-form").hidden = false;
        generateMoveOptions("player2-form");
    }
}

function player2Submit() {
    player2Move = document.querySelector("#player2-form input[type='radio']:checked").value;
    playAgainstPlayer();
}

function playAgainstComputer() {
    player2Move = getRandomMove();
    displayResults();
}

function playAgainstPlayer() {
    displayResults();
}

function generateMoveOptions(formId) {
    const moveOptions = gameType === "rps" ? ["rock", "paper", "scissors"] : ["rock", "paper", "scissors", "lizard", "spock"];
    const moveSelection = document.querySelector("#" + formId + " .move-selection");

    moveSelection.innerHTML = moveOptions
        .map((move, index) => `<input type="radio" id="${move}-${formId}" name="move" value="${move}" ${index === 0 ? "checked" : ""}><label for="${move}-${formId}">${move}</label>`)
        .join("");
}

function getRandomMove() {
    const moves = gameType === "rps" ? ["rock", "paper", "scissors"] : ["rock", "paper", "scissors", "lizard", "spock"];
    return moves[Math.floor(Math.random() * moves.length)];
}

function displayResults() {
    const winner = getWinner(player1Move, player2Move);

    let result = `Player 1 chose ${player1Move}.<br>`;

    if (opponentType === "computer") {
        result += `Computer chose ${player2Move}.<br>`;
    } else {
        result += `Player 2 chose ${player2Move}.<br>`;
    }

    switch (winner) {
        case 0:
            result += "It's a tie!";
            break;
        case 1:
            result += "Player 1 wins!";
            break;
        case 2:
            result += opponentType === "computer" ? "Computer wins!" : "Player 2 wins!";
            break;
    }

    document.getElementById("results").innerHTML = result;
    document.getElementById("results").hidden = false;
}

function getWinner(move1, move2) {
    if (move1 === move2) {
        return 0;
    }

    const moves = gameType === "rps" ? ["rock", "paper", "scissors"] : ["rock", "paper", "scissors", "lizard", "spock"];
    const index1 = moves.indexOf(move1);
    const index2 = moves.indexOf(move2);
    const rpslsMatrix = [
        [0, 1, 2, 2, 1],
        [2, 0, 1, 1, 2],
        [1, 2, 0, 2, 1],
        [1, 2, 1, 0, 2],
        [2, 1, 2, 1, 0]
    ];

    return rpslsMatrix[index1][index2] === 1 ? 1 : 2;
}

function resetGame() {
    document.getElementById("game-selection").hidden = false;
    document.getElementById("game-container").hidden = true;
    document.getElementById("results").hidden = true;
    document.getElementById("player1-form").hidden = false;
    document.getElementById("player2-form").hidden = true;
}

function showRules() {
    document.getElementById("rules").innerHTML = `Rules for Rock-Paper-Scissors:<br>
    - Rock crushes Scissors<br>
    - Scissors cuts Paper<br>
    - Paper covers Rock<br><br>
    Rules for Rock-Paper-Scissors-Lizard-Spock:<br>
    - Rock crushes Scissors<br>
    - Scissors cuts Paper<br>
    - Paper covers Rock<br>
    - Rock crushes Lizard<br>
    - Lizard poisons Spock<br>
    - Spock smashes Scissors<br>
    - Scissors decapitates Lizard<br>
    - Lizard eats Paper<br>
    - Paper disproves Spock<br>
    - Spock vaporizes Rock`;
    document.getElementById("rules").hidden = false;
    document.getElementById("show-rules").hidden = true;
    document.getElementById("hide-rules").hidden = false;
}

function hideRules() {
    document.getElementById("rules").hidden = true;
    document.getElementById("show-rules").hidden = false;
    document.getElementById("hide-rules").hidden = true;
}