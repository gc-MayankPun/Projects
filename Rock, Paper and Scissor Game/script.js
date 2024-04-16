// Global Variables
// These are the buttons
let playAgain = document.getElementById("playAgain"); // Getting the button with id "playAgain"
let playGameBtn = document.getElementById("playGame"); // Getting the button with id "playGame"
let rulesBtn = document.getElementById("rules"); // Getting the button with id "rules"
let homeBtn = document.getElementById("home"); // Getting the button with id "home"

// These are the containers
let gameCont = document.getElementsByClassName("game-container")[0]; // Getting the first element with class "game-container"
let resultBox = document.getElementsByClassName("result-box")[0]; // Getting the first element with class "result-box"
let rules = document.getElementsByClassName("rules")[0]; // Getting the first element with class "rules"

// Player Inputs
let scissor = document.getElementById("scissor");
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let playerChoice;

// Scores
let won = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

// These will only give the values of scissor, rock and paper only if the user have clicked on them otherwise it will return undefined
// Here the class is being added and remove according to the user input 
scissor.addEventListener("click", () => {
    playerChoice = "scissor";
    scissor.classList.add("input");
    rock.classList.remove("input");
    paper.classList.remove("input");
})

rock.addEventListener("click", () => {
    playerChoice = "rock";
    rock.classList.add("input");
    scissor.classList.remove("input");
    paper.classList.remove("input");
})

paper.addEventListener("click", () => {
    playerChoice = "paper";
    paper.classList.add("input");
    rock.classList.remove("input");
    scissor.classList.remove("input");
})

// Function to handle playing the game
function playGame() {
    // console.log(playerChoice);
    if (playerChoice != undefined) {
        document.querySelector(".result-card .card").remove();
        document.querySelector(".result-card-2 .card").remove();
        gameCont.style.display = "none"; // Hide the game container
        playAgain.style.display = "block"; // Show the "play again" button
        rulesBtn.style.display = "none"; // Hide the rules button
        playGameBtn.style.display = "none"; // Hide the "play game" button
        resultBox.style.display = "flex"; // Show the result box
        playerInput(playerChoice);
        let computer = computerInput();
        let inputCheck = checkInput(playerChoice, computer);
        let state = checkState(playerChoice, computer, inputCheck);

        let gameState = document.getElementsByClassName("gameState")[0];
        gameState.innerHTML = `
        ${state}
        `

        // Setting score values
        document.querySelector("#your-score span").innerHTML = won;
        document.querySelector("#high-score span").innerHTML = highScore;
    }
}

document.querySelector("#high-score span").innerHTML = highScore;
document.addEventListener("keydown", (event) => {
    if(event.key == 'Escape'){
        console.log("cleared!");
        localStorage.removeItem("highScore");
        highScore = 0;
        document.querySelector("#high-score span").innerHTML = highScore;
    }
})

function checkState(player, computer, state) {
    if (player == state) {
        won++;
        if (won > highScore) {
            highScore = won;
            localStorage.setItem("highScore", highScore);
        }
        return "You Won"
    }
    else if (computer == state) {
        won = 0;
        return "Computer Won"
    }
    else {
        won = 0;
        return "Draw"
    }
}

function checkInput(player, computer) {
    // For scissor
    if (player == "scissor" && computer == "rock") {
        return "rock";
    }
    else if (player == "scissor" && computer == "paper") {
        return "scissor";
    }

    // For rock
    else if (player == "rock" && computer == "paper") {
        return "paper";
    }
    else if (player == "rock" && computer == "scissor") {
        return "rock";
    }

    // For paper 
    else if (player == "paper" && computer == "rock") {
        return "paper";
    }
    else if (player == "paper" && computer == "scissor") {
        return "scissor";
    }

    // For draw
    else if (player == computer) {
        return "draw";
    }
}

function playerInput(playerChoice) {
    let resultCard = document.getElementsByClassName("result-card")[0];
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <img src="images/${playerChoice}.png" alt="${playerChoice}">
    </div>
    `
    resultCard.appendChild(card);
}

function computerInput() {
    let rand = Math.floor(Math.random() * 3);
    let choices = ["scissor", "rock", "paper"];
    let computerChoosed = choices[rand];

    let resultCard = document.getElementsByClassName("result-card")[1];
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <img src="images/${computerChoosed}.png" alt="${computerChoosed}">
    </div>
    `
    resultCard.appendChild(card);

    return computerChoosed;
}

// Function to show the rules
function showRules() {
    gameCont.style.display = "none"; // Hide the game container
    rules.style.display = "flex"; // Show the rules container
    homeBtn.style.display = "block"; // Show the home button
    playGameBtn.style.display = "none"; // Hide the "play game" button
    rulesBtn.style.display = "none"; // Hide the rules button
}

// Function to return to the home screen
function returnHome() {
    homeBtn.style.display = "none"; // Hide the home button
    playGameBtn.style.display = "block"; // Show the "play game" button
    gameCont.style.display = "block"; // Show the game container
    rulesBtn.style.display = "block"; // Show the rules button
    rules.style.display = "none"; // Hide the rules container
}

// Function to try playing the game again
function tryAgain() {
    gameCont.style.display = "block"; // Show the game container
    resultBox.style.display = "none"; // Hide the result box
    playAgain.style.display = "none"; // Hide the "play again" button
    playGameBtn.style.display = "block"; // Show the "play game" button
    rulesBtn.style.display = "block"; // Show the rules button
}