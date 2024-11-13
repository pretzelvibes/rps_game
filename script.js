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

    updateSigns(humanChoice, computerChoice);
    const result = determineWinner(humanChoice, computerChoice);
    updateScores(result, humanChoice, computerChoice);

    if (isGameOver()) {
        btnRock.setAttribute("disabled", "");
        btnPaper.setAttribute("disabled", "");
        btnScissors.setAttribute("disabled", "");

        const h2 = document.createElement("h2");
        h2.setAttribute("id", "isGameOver");
        if (humanScore > computerScore) {
            h2.textContent = "Game over - Congratulations! You won the game!";
        } else {
            h2.textContent = "Game over - You lost the game. Better luck next time!";
        }
        const btnReset = document.createElement("button");
        btnReset.textContent = "Start New Game!";
        btnReset.setAttribute("id", "btnNewGame");
        content.appendChild(h2);
        content.appendChild(btnReset);
        btnReset.addEventListener("click", resetGame);
    }
}

function updateSigns(humanChoice, computerChoice) {
    playerImg.setAttribute("src", "./img/" + humanChoice + ".png");
    playerImg.setAttribute("alt", capitalizeFirstChar(humanChoice));
    computerImg.setAttribute("src", "./img/" + computerChoice + ".png");
    computerImg.setAttribute("alt", capitalizeFirstChar(computerChoice));
}

function updateScores(result, humanChoice, computerChoice) {
    switch (result) {
        case "win":
            humanScore++;
            updateScoreHTML("win", humanChoice, computerChoice);
            break;
        case "draw":
            round--;
            updateScoreHTML("draw", humanChoice, computerChoice);
            break;
        case "lose":
            cpuScore++;
            updateScoreHTML("lose", humanChoice, computerChoice);
            break;
    }
}

function determineWinner(humanChoice, computerChoice) {
    if ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {
        return "win";
    } else if (humanChoice === computerChoice) {
        return "draw";
    } else {
        return "lose";
    }
}

function resetGame() {
    document.querySelector("#isGameOver").remove();
    document.querySelector("#btnNewGame").remove();
    btnRock.removeAttribute("disabled", "");
    btnPaper.removeAttribute("disabled", "");
    btnScissors.removeAttribute("disabled", "");
    playerImg.setAttribute("src", "./img/question.png");
    playerImg.setAttribute("alt", "Player's choice");
    computerImg.setAttribute("src", "./img/question.png");
    computerImg.setAttribute("alt", "Player's choice");

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
const playerImg = document.querySelector("#playerImg");
const computerImg = document.querySelector("#computerImg");