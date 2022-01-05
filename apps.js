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
let p1CurrentPlayedCard = {};


let p2Hand = [];
let p2Pile = [];
let p2CurrentPlayedCard = {};

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
    } 
    while (p2Hand.length < 26) {
        let d = Math.floor(Math.random()* playingCards.length)
        p2Hand.push(playingCards[d])
    }
}

// playCards needs condition to handle situation if same card is selected
//for p1 and p2

function compareCards() {
    let e = Math.floor(Math.random()* p1Hand.length)
    let p1CurrentPlayedCard = p1Hand[e]
    p1Hand.shift(p1Hand[e])
    let f = Math.floor(Math.random()* p1Hand.length)
    let p2CurrentPlayedCard = p2Hand[f]
    p2Hand.shift(p1Hand[f])
    if (p1CurrentPlayedCard.value > p2CurrentPlayedCard.value) {
        p1Pile.push(p1CurrentPlayedCard)
        p1Pile.push(p2CurrentPlayedCard)
        console.log("Player 1 took this round!");
    } else if (p2CurrentPlayedCard.value > p1CurrentPlayedCard.value) {
        p2Pile.push(p1CurrentPlayedCard)
        p2Pile.push(p2CurrentPlayedCard)
        console.log("Player 2 took this round!");
    } else {
        goToWar()
    } 
    let p1TotalCards = p1Hand.length + p1Pile.length;
    let p2TotalCards = p2Hand.length + p2Pile.length;
        checkForWin(p1TotalCards, p2TotalCards)
        refillHand()
    console.log(p1Hand.length, p1Pile.length, p1TotalCards)
}

function refillHand() {
    if (p1Hand.length === 0) {
        console.log(p1Hand)
        p1Hand = p1Pile;
        p1Pile = []
        console.log(p1Hand)
    } else if (p2Hand.length === 0) {
        p2Hand = p1Pile;
        p2Pile = []
    } 
}

function goToWar() {
    console.log('This is war baby!')
}
// need to add the actual war protocol to this function

function checkForWin(p1, p2) {
    if (p1 === 52) {
        winner = "Player 1"
        gameOver()
    } else if (p2 === 52) {
        winner = "Player 2"
        gameOver()
         } else {
             continuePlay()
             // this needs to get us back to a new round.
         }
}

function gameOver() {
    document.getElementsByClassName('gameOver')
    gameOver.textContent = `The War is over, $winner is victourious!`
}

function continuePlay() {
    console.log('The game is still on!')
}

