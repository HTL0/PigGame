'use strict';

//Select elements

const player0Element = document.querySelector(".player--0")
const player1Element = document.querySelector(".player--1")
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing

//Set start game function
const startGame = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    player0Element.classList.add("player--active");
    player1Element.classList.remove("player--active");
    player0Element.classList.remove("player--winner");
    player1Element.classList.remove("player--winner");
    diceElement.hidden = true;
}

startGame();

const swichPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
}


//Dice roll function
btnRoll.addEventListener("click", function(){
    if(playing){
        //Set a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        //Display dice
        diceElement.hidden = false;
        diceElement.src = `dice-${dice}.png`;

        //Check if rolled 1
        if(dice !== 1){
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else {
            //Switch to next player
            swichPlayer();
        }
    }
})

//Hold button event
btnHold.addEventListener("click", function(){
    if(playing){
        //Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if player's score is >= 100
        if(scores[activePlayer] >= 100){
            //finish the game
            playing = false;
            diceElement.hidden = true;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }

        //switch to the next player
        swichPlayer();
    }
})

//Newgame button event
btnNew.addEventListener("click", startGame)
