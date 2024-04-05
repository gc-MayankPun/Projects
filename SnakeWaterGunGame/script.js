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
let snake = document.getElementById("snake");
let gun = document.getElementById("gun");
let water = document.getElementById("water");
let playerChoice;

// These will only give the values of snake, gun and water only if the user have clicked on them otherwise it will return undefined
// Here the class is being added and remove according to the user input 
snake.addEventListener("click", () => {
    playerChoice = "snake";
    snake.classList.add("input");
    gun.classList.remove("input");
    water.classList.remove("input");
})

gun.addEventListener("click", () => {
    playerChoice = "gun";
    gun.classList.add("input");
    snake.classList.remove("input");
    water.classList.remove("input");
})

water.addEventListener("click", () => {
    playerChoice = "water";
    water.classList.add("input");
    gun.classList.remove("input");
    snake.classList.remove("input");
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
    }
}

function checkState(player, computer, state) {
    if (player == state) {
        return "You Won"
    }
    else if (computer == state) {
        return "Computer Won"
    }
    else {
        return "Draw"
    }
}

function checkInput(player, computer) {
    // For snake
    if (player == "snake" && computer == "gun") {
        return "gun";
    }
    else if (player == "snake" && computer == "water") {
        return "snake";
    }

    // For gun 
    else if (player == "gun" && computer == "water") {
        return "water";
    }
    else if (player == "gun" && computer == "snake") {
        return "gun";
    }

    // For water 
    else if (player == "water" && computer == "gun") {
        return "water";
    }
    else if (player == "water" && computer == "snake") {
        return "snake";
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
        <img src="images/${playerChoice}.webp" alt="${playerChoice}">
    </div>
    `
    resultCard.appendChild(card);
}

function computerInput() {
    let rand = Math.floor(Math.random() * 3);
    let choices = ["snake", "gun", "water"];
    let computerChoosed = choices[rand];

    let resultCard = document.getElementsByClassName("result-card")[1];
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <img src="images/${computerChoosed}.webp" alt="${computerChoosed}">
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