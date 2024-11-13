function playRound(humanChoice) {
    if (isGameOver()) return;

    const computerChoice = getComputerChoice();
    round++;
    updateSigns(humanChoice, computerChoice);
    const result = determineWinner(humanChoice, computerChoice);
    updateScores(result, humanChoice, computerChoice);

    if (isGameOver()) {
        disableChoiceButtons();
        displayEndGameMessage();
    }
}

function capitalizeFirstChar(move) {
    return move.charAt(0).toUpperCase() + move.substring(1);
}

function getComputerChoice() {
    let choice = ["rock", "paper", "scissors"];
    let randomNumber = Math.floor(Math.random() * choice.length);
    return choice[randomNumber];
}

function disableChoiceButtons() {
    [btnRock, btnPaper, btnScissors].forEach(button => button.setAttribute("disabled", ""));
}

function enableChoiceButtons() {
    [btnRock, btnPaper, btnScissors].forEach(button => button.removeAttribute("disabled", ""));
}

function updateSigns(humanChoice, computerChoice) {
    if (humanChoice === undefined && computerChoice === undefined) {
        humanChoice = "question";
        computerChoice = "question";
        playerImg.setAttribute("alt", "Player's choice");
        computerImg.setAttribute("alt", "Computer's choice");
    } else {
        playerImg.setAttribute("alt", capitalizeFirstChar(humanChoice));
        computerImg.setAttribute("alt", capitalizeFirstChar(computerChoice));
    }
    playerImg.setAttribute("src", "./img/" + humanChoice + ".png");
    computerImg.setAttribute("src", "./img/" + computerChoice + ".png");
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

function displayEndGameMessage() {
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "gameOver");
    h2.textContent = humanScore > computerScore
        ? "Congratulations! You won the game!"
        : "You lost the game. Better luck next time!";
    const btnReset = document.createElement("button");
    btnReset.textContent = "Start New Game!";
    btnReset.setAttribute("id", "btnNewGame");
    content.appendChild(h2);
    content.appendChild(btnReset);
    btnReset.addEventListener("click", resetGame);
}

function resetGame() {
    document.querySelector("#gameOver").remove();
    document.querySelector("#btnNewGame").remove();
    enableChoiceButtons();
    updateSigns();
    humanScore = 0;
    cpuScore = 0;
    round = 0;
    updateScoreHTML("start");
}

function isGameOver() {
    return cpuScore === maxGame || humanScore === maxGame;
}

function updateScoreHTML(result, humanChoice, computerChoice) {
    switch (result) {
        case "start":
            scoreInfo.textContent = "Choose your move!";
            scoreInfo.style.color = "#ff9800";
            scoreMessage.textContent = "First to score 5 points win the game";
            break;
        case "win":
            scoreInfo.textContent = "Round #" + round + ": You win!";
            scoreInfo.style.color = "#4caf50";
            scoreMessage.textContent = capitalizeFirstChar(humanChoice) + " beats " + capitalizeFirstChar(computerChoice) + ".";
            break;
        case "draw":
            scoreInfo.textContent = "Round #" + round + ": It's a tie!";
            scoreInfo.style.color = "#ff9800";
            scoreMessage.textContent = "Both chose " + capitalizeFirstChar(humanChoice) + ".";
            break;
        case "lose":
            scoreInfo.textContent = "Round #" + round + ": You lose!";
            scoreInfo.style.color = "#f44336";
            scoreMessage.textContent = capitalizeFirstChar(computerChoice) + " beats " + capitalizeFirstChar(humanChoice) + ".";
            break;
    }
    playerScore.textContent = "Player: " + humanScore;
    computerScore.textContent = "Computer: " + cpuScore;
}

const content = document.querySelector("#content");
const scoreInfo = document.querySelector("#scoreInfo");
const scoreMessage = document.querySelector("#scoreMessage");
const playerSign = document.querySelector("#playerSign");
const playerImg = document.querySelector("#playerImg");
const playerScore = document.querySelector("#playerScore");
const computerSign = document.querySelector("#computerSign");
const computerImg = document.querySelector("#computerImg");
const computerScore = document.querySelector("#computerScore");
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