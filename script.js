function capitalizeFirstChar(string) {
    const firstChar = string.charAt(0).toUpperCase();
    string = firstChar + string.substring(1);
    return string;
}

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }

}

function getHumanChoice() {
    let userChoice = prompt("Type rock, paper or scissors:").toLowerCase();
    while (userChoice !== "rock" && userChoice !== "paper" && userChoice !== "scissors") {
        userChoice = prompt("Invalid choice. Please type rock, paper or scissors:").toLowerCase();
    }
    return userChoice;
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        if ((humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")) {
            humanScore++;
            console.log("You win! " + capitalizeFirstChar(humanChoice) + " beats " + capitalizeFirstChar(computerChoice) + ".")
        } else if (humanChoice === computerChoice) {
            console.log("It's a tie! Both chose " + capitalizeFirstChar(humanChoice) + ".");
        } else {
            computerScore++;
            console.log("You lose! " + capitalizeFirstChar(computerChoice) + " beats " + capitalizeFirstChar(humanChoice) + ".");
        }
    }

    for (let round = 1; round <= 5; round++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
        console.log("Round #" + round  + " --- Player: " + humanScore + " vs Computer: " + computerScore);
    }

    console.log("#####");
    if (humanScore > computerScore) {
        console.log("Congratulations! You won the game!");
    } else if (humanScore < computerScore) {
        console.log("You lost the game. Better luck next time!");
    } else {
        console.log("The game is a tie!");
    }
}

playGame();