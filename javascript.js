function setupButtons() {
    const btns = document.querySelectorAll('.rps-btn');
    btns.forEach(btn => btn.addEventListener('click', playerSelects));
}

function playerSelects() {
    if(this.id == "rock" || this.id == "paper" || this.id == "scissors") {
        let playerChoice = formatPlayerChoice(this.id);
        startRound(playerChoice);
    }
}

function startRound(playerChoice) {
    appendResults("Player chose: " + playerChoice);
    let compChoice = computerPlay();
    appendResults("Computer chose: " + compChoice);
    
    let winner = playRound(compChoice, playerChoice);
    if (winner != null) {
        if (winner === compChoice) {
            updateScore("comp");
        } else {
            updateScore("player");
        }
    }
}

function computerPlay() {
    // choose random value
    let randInt = Math.floor(Math.random()*3);
    
    let compChoice = "";
    switch(randInt) {
        case 0:
            compChoice = "Rock";
            break;
        case 1:
            compChoice = "Paper";
            break;
        case 2:
            compChoice = "Scissors";
            break;
        default:
            console.error("Computer chose an invalid choice");
    }

    return compChoice;
}

function formatPlayerChoice(playerChoice) {
    
    if (typeof playerChoice != "string") {
        console.log("Player did not choose a string.")
        return null;
    }
    
    playerChoice.toLowerCase();
    playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);

    return playerChoice;
}

function playRound(compChoice, playerChoice) {

    if(compChoice === playerChoice) {
        appendResults("You both chose " + compChoice);
        appendResults("It's a Tie!");
        return;
    } 
    else if ((compChoice === "Rock" && playerChoice === "Scissors")
                || (compChoice == "Paper" && playerChoice === "Rock")
                || (compChoice == "Scissors" && playerChoice === "Paper")) {
        
        appendResults(compChoice + " beats " + playerChoice)
        appendResults("You Lose :(");
        return compChoice;
    }
    else {
        appendResults(playerChoice + " beats " + compChoice)
        appendResults("You Win!");
        return playerChoice;
    }
}

function appendResults(text){
    let results = document.querySelector('#results');
    let newResult = document.createElement('p');
    newResult.textContent = text;
    results.appendChild(newResult);
}

function updateScore(winner){
    if(winner == "player"){
        let playerScoreboard = document.querySelector('#playerScore');
        let playerWins = isNaN(parseInt(playerScoreboard.textContent)) ? 0 : parseInt(playerScoreboard.textContent);
        playerScoreboard.textContent = ++playerWins;
        if(playerWins == 5){
            alert("Player wins");
        }
    }else if (winner == "comp"){
        let compScoreboard = document.querySelector('#compScore');
        let compWins = isNaN(parseInt(compScoreboard.textContent)) ? 0 : parseInt(compScoreboard.textContent)
        compScoreboard.textContent = ++compWins;
        if(compWins == 5){
            alert("Computer wins");
        }
    }
}

setupButtons();
