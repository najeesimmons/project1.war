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
// array contatining each card and its value as a object
//console.log(Object.keys(playingCards).length)
//length of playingCards is printing to the console

let players = {
    p1: {
        p1Hand:[],
        p1FaceUpPile: [],
        // p1TotalCards: p1.p1Hand.length + p1.p1FaceUpPile.length,
        p1CurrentPlayedCard: playingCards[0]
},
    p2: {
        p2Hand: [],
        p2FaceUpPile:[],
        // p2TotalCards: p1Hand.length + p1FaceUpPile.length,
        p2CurrentPlayedCard: playingCards[10]}
    }

// console.log(players)
// players variable is printing to console log

let p1TotalCards = players.p1.p1Hand.length + players.p1.p1FaceUpPile.length
let p2TotalCards = players.p2.p2Hand.length + players.p2.p2FaceUpPile.length
let winner = ''

/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

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
// checkforWin is functioning properly

function gameOver() {
    document.getElementsByClassName('gameOver')
    gameOver.textContent = `The War is over, $winner is victourious!`
}

function compareCards() {
    if (players.p1.p1CurrentPlayedCard.value > players.p2.p2CurrentPlayedCard.value) {
        console.log("Player 1 took this round!");
    } else if (players.p2.p2CurrentPlayedCard.value > players.p1.p1CurrentPlayedCard.value) {
        console.log("Player 2 took this round!");
    } else {
        goToWar()
    }
}

// need to add protocol to move property of currentlyPlayedCard into FaceUpPile
// compareCards is not pushing the 'losing' item into the specified array;
compareCards()

// console.log(players)

// need to add the actual war protocol to this function
function goToWar() {
    console.log('This is war baby!')
}

function startGame() {
}

function continuePlay() {
    //console.log('The game is still on!')
}

function playCards() {
    // for (let i = 0; i <= Object.keys(playingCards).length; i++) {
    //     p1CurrentPlayedCard = Math.floor(Math.random()) * 52
    // }
    let p1randomNumber = Math.floor(Math.random()* 52)
    let p2randomNumber = Math.floor(Math.random()* 52)
    players.p1.p1CurrentPlayedCard = playingCards[p1randomNumber] 
    players.p2.p2CurrentPlayedCard = playingCards[p2randomNumber]
}
playCards()

console.log(players.p1.p1CurrentPlayedCard, players.p2.p2CurrentPlayedCard)
// playCards needs condition to handle situation if same card is selected
//for p1 and p2
