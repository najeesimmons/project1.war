/*----- constants -----*/
/*----- app's state (variables) -----*/
let playingCards = [
    {suit: "hearts", value: 2},
    {suit: "hearts", value: 3},
    {suit: "hearts", value: 4},
    {suit: "hearts", value: 5},
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
    {suit: "diamonds", value: 5},
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
    {suit: "clubs", value: 5},
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
    {suit: "spades", value: 5},
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
let p1Pile = [];
let p1PlayedCard = {};


let p2Hand = [];
let p2Pile = [];
let p2PlayedCard = {};

let winner = ''
let dealButton = document.getElementById('deal')
let playCard = document.getElementById('playCard')



/*----- cached element references -----*/
/*----- event listeners -----*/
dealButton.addEventListener('click', dealCards)
playCard.addEventListener('click', compareCards)

/*----- functions -----*/


function dealCards() {
    while (p1Hand.length < 26) {
        let c = Math.floor(Math.random()* playingCards.length)
        p1Hand.push(playingCards[c])
        playingCards.splice(c,1)
    } 
    while (p2Hand.length < 26) {
        let d = Math.floor(Math.random()* playingCards.length)
        p2Hand.push(playingCards[d])
        playingCards.splice(d,1)
    }
    // console.log(p1Hand, p2Hand)
}
// now using splice to remove items from playingCards after 
// they are 'dealt' into either player hand - however I'm 
// not sure that by the time it gets to p2's while loop, 
// playingCards has 26 items or 52 items.

function compareCards() {
    pickCards()
    if (p1PlayedCard.value > p2PlayedCard.value) {
        p1Pile.push(p1PlayedCard)
        p1Pile.push(p2PlayedCard)
        console.log("Player 1 took this round!");
    } else if (p2PlayedCard.value > p1PlayedCard.value) {
        p2Pile.push(p1PlayedCard)
        p2Pile.push(p2PlayedCard)
        console.log("Player 2 took this round!");
    } else {
        goToWar()
    } 
    let p1TotalCards = p1Hand.length + p1Pile.length;
    let p2TotalCards = p2Hand.length + p2Pile.length;
        checkForWin(p1TotalCards, p2TotalCards)
        refillHand()
    console.log(p1Hand.length, p2Hand.length) 
}
    
function pickCards() {
    p1PlayedCard = p1Hand[0]
    p1Hand.splice(0,1)
    p2PlayedCard = p2Hand[0]
    p2Hand.splice(0,1)
    console.log(p1PlayedCard, p2PlayedCard)
}

function goToWar() {
    console.log('This is war baby!')
    // for (let i = 0; i < 4; i++) {
    //     pickCards()
    // }
}
// goToWar needs to have a protocol for drawing four cards and
// 'playing' the fourth card. 

function refillHand() {
    if (p1Hand.length === 0 || p2Hand.length === 0) {
        p1Hand = p1Pile;
        p1Pile = []
        p2Hand = p2Pile;
        p2Pile = []
    } 
    // console.log(p2Hand)
}
// refill isn't refilling p2Hand when it gets down to 0

function checkForWin(p1, p2) {
    if (p1 === 52) {
        winner = "Player 1"
        gameOver()
    } if (p2 === 52) {
        winner = "Player 2"
        gameOver()
         } 
}

function gameOver() {
    document.getElementsByClassName('gameOver')
    gameOver.textContent = `The War is over, $winner is victourious!`
}

function continuePlay() {
    console.log('The game is still on!')
}

