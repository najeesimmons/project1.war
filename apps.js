/*----- constants -----*/
/*----- app's state (variables) -----*/
let playingCards = [
    {suit: "hearts", value: 2},
    {suit: "hearts", value: 3},
    {suit: "hearts", value: 4},
    {suit: "hearts", value: 4},
    {suit: "hearts", value: 6},
    {suit: "hearts", value: 7},
    {suit: "hearts", value: 8},
    {suit: "hearts", value: 9},
    {suit: "hearts", value: 10},
    {suit: "hearts", value: 11},
    {suit: "hearts", value: 12},
    {suit: "hearts", value: 13},
    {suit: "hearts", value: 14},
    {suit: "diamonds", value: 2},
    {suit: "diamonds", value: 3},
    {suit: "diamonds", value: 4},
    {suit: "diamonds", value: 4},
    {suit: "diamonds", value: 6},
    {suit: "diamonds", value: 7},
    {suit: "diamonds", value: 8},
    {suit: "diamonds", value: 9},
    {suit: "diamonds", value: 10},
    {suit: "diamonds", value: 11},
    {suit: "diamonds", value: 12},
    {suit: "diamonds", value: 13},
    {suit: "diamonds", value: 14},
    {suit: "clubs", value: 2},
    {suit: "clubs", value: 3},
    {suit: "clubs", value: 4},
    {suit: "clubs", value: 4},
    {suit: "clubs", value: 6},
    {suit: "clubs", value: 7},
    {suit: "clubs", value: 8},
    {suit: "clubs", value: 9},
    {suit: "clubs", value: 10},
    {suit: "clubs", value: 11},
    {suit: "clubs", value: 12},
    {suit: "clubs", value: 13},
    {suit: "clubs", value: 14},
    {suit: "spades", value: 2},
    {suit: "spades", value: 3},
    {suit: "spades", value: 4},
    {suit: "spades", value: 4},
    {suit: "spades", value: 6},
    {suit: "spades", value: 7},
    {suit: "spades", value: 8},
    {suit: "spades", value: 9},
    {suit: "spades", value: 10},
    {suit: "spades", value: 11},
    {suit: "spades", value: 12},
    {suit: "spades", value: 13},
    {suit: "spades", value: 14},
]

let p1Hand = [];
let p1FaceUpPile = [];
let p1TotalCards = p1Hand.length + p1FaceUpPile.length;
let p1CurrentPlayedCard = {};

let p2Hand = [];
let p2FaceUpPile = [];
let p2TotalCards = p2Hand.length + p2FaceUpPile.length;
let p2CurrentPlayedCard = {};

let winner = ''
let startButton = document.getElementById('startButton')
startButton.addEventListener('click', playCards)
// can't seem to figure out how to add event listener


/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

function playCards() {
    let p1randomNumber = Math.floor(Math.random()* 52)
    let p2randomNumber = Math.floor(Math.random()* 52)
    p1CurrentPlayedCard = playingCards[p1randomNumber] 
    p2CurrentPlayedCard = playingCards[p2randomNumber]
    compareCards()
}
// at this time playCards initiates all other functions and gameplay
// playCards needs condition to handle situation if same card is selected
//for p1 and p2

function compareCards() {
    checkForWin()
    if (p1CurrentPlayedCard.value > p2CurrentPlayedCard.value) {
        p1FaceUpPile.push(p1CurrentPlayedCard, p2CurrentPlayedCard)
        console.log("Player 1 took this round!");

    } else if (p2CurrentPlayedCard.value > p1CurrentPlayedCard.value) {
        p2FaceUpPile.push(p1CurrentPlayedCard, p2CurrentPlayedCard)
        console.log("Player 2 took this round!");
    } else {
        goToWar()
    }
}
// compareCards is not yet pushing the 'losing' item into the specified array;

function goToWar() {
    console.log('This is war baby!')
}
// need to add the actual war protocol to this function

function checkForWin() {
    if (p1TotalCards === 52) {
        winner = "Player 1"
        gameOver()
    } if (p2TotalCards === 52) {
        winner = "Player 2"
        gameOver()
         } else {
             continuePlay()
         }
}

function gameOver() {
    document.getElementsByClassName('gameOver')
    gameOver.textContent = `The War is over, $winner is victourious!`
}

// need to add protocol to move property of currentlyPlayedCard into FaceUpPile

function continuePlay() {
    //console.log('The game is still on!')
}

