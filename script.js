function capitalizeFirstChar(string) {
    const firstChar = string.charAt(0).toUpperCase();
    string = firstChar + string.substring(1);
    return string;
}

function getComputerChoice() {
    let choice = ["rock", "paper", "scissors"];
    let randomNumber = Math.floor(Math.random() * choice.length);
    return choice[randomNumber];
}

function playRound(humanChoice) {
    if (isGameOver()) {
        return;
    }

    const computerChoice = getComputerChoice();
    round++;
    playerSign.textContent = capitalizeFirstChar(humanChoice);
    computerSign.textContent = capitalizeFirstChar(computerChoice);
    determineWinner(humanChoice, computerChoice);

    if (isGameOver()) {
        btnRock.setAttribute("disabled", "");
        btnPaper.setAttribute("disabled", "");
        btnScissors.setAttribute("disabled", "");
        const div = document.createElement("div");
        div.setAttribute("id", "isGameOver");
        if (humanScore > computerScore) {
            div.textContent = "Game over - Congratulations! You won the game!";
        } else {
            div.textContent = "Game over - You lost the game. Better luck next time!";
        }
        const btnReset = document.createElement("button");
        btnReset.textContent = "Reset";
        content.appendChild(div);
        div.appendChild(btnReset);
        btnReset.addEventListener("click", resetGame);
    }
}

function determineWinner(humanChoice, computerChoice) {
    if ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {
        humanScore++;
        updateScoreHTML("win", humanChoice, computerChoice);
    } else if (humanChoice === computerChoice) {
        round--;
        updateScoreHTML("draw", humanChoice, computerChoice);
    } else {
        cpuScore++;
        updateScoreHTML("lose", humanChoice, computerChoice);
    }
}

function resetGame() {
    const div = document.querySelector("#isGameOver");
    content.removeChild(div);
    btnRock.removeAttribute("disabled", "");
    btnPaper.removeAttribute("disabled", "");
    btnScissors.removeAttribute("disabled", "");
    humanScore = 0;
    cpuScore = 0;
    round = 0;
    updateScoreHTML("start");
}

function isGameOver() {
    return cpuScore === maxGame || humanScore === maxGame;
}

function updateScoreHTML(result, humanChoice = "", computerChoice = "") {
    switch (result) {
        case "start":
            scoreInfo.textContent = "Choose your move!";
            scoreMessage.textContent = "First to score 5 points win the game";
            break;
        case "win":
            scoreInfo.textContent = "Round #" + round + ": You win!";
            scoreMessage.textContent = capitalizeFirstChar(humanChoice) + " beats " + capitalizeFirstChar(computerChoice) + ".";
            break;
        case "draw":
            scoreInfo.textContent = "Round #" + round + ": It's a tie!";
            scoreMessage.textContent = "Both chose " + capitalizeFirstChar(humanChoice) + ".";
            break;
        case "lose":
            scoreInfo.textContent = "Round #" + round + ": You lose!";
            scoreMessage.textContent = capitalizeFirstChar(computerChoice) + " beats " + capitalizeFirstChar(humanChoice) + ".";
            break;
    }
    playerScore.textContent = "Player: " + humanScore;
    computerScore.textContent = "Computer: " + cpuScore;
}

const btnRock = document.querySelector("#rock");
const btnPaper = document.querySelector("#paper");
const btnScissors = document.querySelector("#scissors");

btnRock.addEventListener("click", () => playRound("rock"));
btnPaper.addEventListener("click", () => playRound("paper"));
btnScissors.addEventListener("click", () => playRound("scissors"));

let humanScore = 0;
let cpuScore = 0;
let round = 0;
const maxGame = 5;

const content = document.querySelector("#content");
const playerScore = document.querySelector("#playerScore");
const computerScore = document.querySelector("#computerScore");
const scoreInfo = document.querySelector("#score-info");
const scoreMessage = document.querySelector("#score-message");
const playerSign = document.querySelector("#playerSign");
const computerSign = document.querySelector("#computerSign");