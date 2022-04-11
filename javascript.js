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
    /*let winner = */playRound(compChoice, playerChoice);
}

function game() {
    console.clear();
    let compWins = 0;
    let playerWins = 0;

    // for(let i=0; i<5; i++){
        let compChoice = computerPlay();
        let playerChoice = getPlayerChoice();

        console.log("You chose: " + playerChoice);
        console.log("Computer chose: " + compChoice);

        let winner = playRound(compChoice, playerChoice);
        if (winner != null) {
            if (winner === compChoice) {
                compWins++;
            } else {
                playerWins++;
            }
        }
        // let gameCount = i+1;
        // console.log("Good Game! The Score after Game " + gameCount + " is" +
        //             "\n     Player: " + playerWins +
        //             "\n     Computer: " + compWins);
    // }
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

function getPlayerChoice() {
    let keepAsking = true;
    let playerChoice = "";
    while(keepAsking) {
        playerChoice = prompt("Rock, Paper, Scissors, Shoot! What do you choose? [Rock, Paper, Scissors]");
        playerChoice = formatPlayerChoice(playerChoice);

        if(playerChoice !== "Rock"
            && playerChoice !== "Paper"
            && playerChoice !== "Scissors") {
                console.log("You chose: " + playerChoice);
                console.log("You have not chosen a valid option, please choose one of the following and be careful of spelling:\nRock\nPaper\nScissors");
        } else {
            keepAsking = false;
        }
    } 

    return playerChoice;
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

setupButtons();
// game();