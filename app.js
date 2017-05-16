////// VARIABLES //////
let scores = [0,0];
let roundScore = 0;
let currentPlayer = 0;

////// DOM SELECTORS //////
let dice = document.querySelector('.dice'); // Dice image
let rollButton = document.querySelector('.btn-roll'); // Roll button
let holdButton = document.querySelector('.btn-hold'); // Hold button
let newButton = document.querySelector('.btn-new'); // New Game button
let activeDiv = document.querySelector(`.player-${currentPlayer}-panel`); // Player with active class
let player = document.querySelector(`#current-${currentPlayer}`); // current player rolling
let playerTotal = document.querySelector(`#score-${currentPlayer}`); // current player total
const scoreDivs = [...document.querySelectorAll('div[id^=score-]')]; // total score divs (both)
const currentDivs = [...document.querySelectorAll('div[id^=current-]')]; // current score divs (both)


////// EVENTS //////
rollButton.addEventListener('click',addRoundScore);
holdButton.addEventListener('click',addToTotalScore);
newButton.addEventListener('click',startNewGame);

///// FUNCTIONS //////

// Add current score to round score
function addRoundScore() {

  // Generate random number
  let diceValue = Math.floor(Math.random() * 6) + 1;

  // Display result
  dice.style.display = 'block';
  dice.src = `dice-${diceValue}.png`;
  player = document.querySelector(`#current-${currentPlayer}`);

  // Update result
  if (diceValue !== 1) {
    roundScore += diceValue;
    player.innerHTML = roundScore;
  } else {
    switchPlayer();
  }
}

// Switch player and switch active classes to new player while removing from old
function switchPlayer() {

  activeDiv.classList.remove('active');
  currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
  activeDiv = document.querySelector(`.player-${currentPlayer}-panel`);
  activeDiv.classList.add('active');
  roundScore = 0;
  dice.style.display = 'none';
  currentDivs.map(div => div.innerHTML = 0);
}

// add current score to total score on pressing hold button
function addToTotalScore() {

  if(currentPlayer === 0) {
    playerTotal = document.querySelector(`#score-${currentPlayer}`);
    scores[0] += roundScore;
    playerTotal.innerHTML = scores[0];
    if (scores[0] >= 100) {
      declareWinner(0);
      return;
    }
    switchPlayer();
  } else {
    playerTotal = document.querySelector(`#score-${currentPlayer}`)
    scores[1] += roundScore;
    playerTotal.innerHTML = scores[1];
    if (scores[1] >= 100) {
      declareWinner(1);
      return;
    }
    switchPlayer();
  }
}

// Add winner class to winner and disbale buttons to prevent further playing

function declareWinner(winner) {
  // Disable buttons and add winner class to winner
  activeDiv = document.querySelector(`.player-${winner}-panel`);
  activeDiv.classList.add('winner');
  rollButton.style.pointerEvents = 'none';
  holdButton.style.pointerEvents = 'none';

  // reset all variables
  scores = [0,0];
  roundScore = 0;
  currentPlayer = 0;
}

// Reset variables, clear all div values and enable all buttons
function startNewGame() {

  scores = [0,0];
  roundScore = 0;
  currentPlayer = 0;
  rollButton.style.pointerEvents = 'auto';
  holdButton.style.pointerEvents = 'auto';
  clearDivs();
}

//  Clear all divs to 0
function clearDivs() {

  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  scoreDivs.map(score => score.innerHTML = 0);
  currentDivs.map(div => div.innerHTML = 0);
}
