//cards
let firstCard = Math.floor(Math.random() * 13) + 1;
let secondCard = Math.floor(Math.random() * 13) + 1;
let extraCard
extraCard = []
let i = 0
extraCard[i] = 0
let sum = firstCard + secondCard
//status of game
let hasBlackJack = false
let isAlive = true
let state = 1
//texts
let resultEL = document.getElementById("message-El")
let sumEl = document.querySelector("#sum-El")
let cardsEl = document.querySelector("#cards-El")
let message = ""


//functions
function startGame() {
    if (state === 1) {
        state = 3
        cardsEl.textContent = "Cards: " + firstCard + ", " + secondCard
        sumEl.textContent = "Sum: " + sum
        if (sum <= 20) {
            display("Do you want to draw a new card?", true, false)
        }
        else if (sum === 21) {
            display("Congrats! You've won the Blackjack!!", true, true)
        }
        else {
            display("You are out of the game!", false, false)
        }

        console.log(hasBlackJack)
        console.log(isAlive)
    }
    else if (state === 2) {
        sumEl.textContent = "Sum: " + sum
        if (sum <= 20) {
            display("Do you want to draw a new card?", true, false)
        }
        else if (sum === 21) {
            display("Congrats! You've won the Blackjack!!", true, true)
        }
        else {
            display("You are out of the game!", false, false)
            resultEL.style.color="red"
        }

        console.log(hasBlackJack)
        console.log(isAlive)
    }
    else if (state === 3) {
        cardsEl.textContent = "You are in middle of a game!"
        sumEl.textContent = "To Start Fresh, Click on New Game"
    }
    else {
        cardsEl.textContent = "Game Over!"
        sumEl.textContent = "Click on New Game"
    }
}

function newCard() {
    state = 2
    if (sum > 21) {
        state = 0
        cardsEl.textContent = "Game Over!"
        sumEl.textContent = "Start a New Game"
        return;
    }
    extraCard[++i] = Math.floor(Math.random() * 13) + 1;
    sum += extraCard[i]

    sumEl.textContent = "Sum: " + sum
    console.log("Drawing a new card")
    startGame()
    cardsEl.textContent += ", " + extraCard[i]
}

function newGame() {
    state = 1
    firstCard = 0
    secondCard = 0
    sum = firstCard + secondCard
    extraCard.fill(0)
    cardsEl.textContent = "Cards: " + firstCard + ", " + secondCard
    sumEl.textContent = "Sum: " + sum
    reset()
}

function reset() {
    firstCard = Math.floor(Math.random() * 13) + 1;
    secondCard = Math.floor(Math.random() * 13) + 1;
    extraCard.fill(0)
    sum = firstCard + secondCard
    message = "Click on Play to start the game"
    resultEL.textContent = message
    resultEL.style.color = "white"
}

function display(message, isAlive, hasBlackJack) {
    resultEL.textContent = message
    console.log(message)
    isAlive = isAlive
    hasBlackJack = hasBlackJack
}