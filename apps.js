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
let players = ['player 1', 'player 2']

let warCards = [];
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
}

function compareCards() {
    pickCards()
    console.log (p1PlayedCard, p2PlayedCard)
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
    console.log(p1Pile, p2Pile)
    // let p1TotalCards = p1Hand.length + p1Pile.length;
    // let p2TotalCards = p2Hand.length + p2Pile.length;
    /* totalCards was used to check math and for a win condition
       which has been changed */

        checkForWin()
        /* refillHand() stretch feature (below) will transfer player pile 
        to hand (if pile.length > 0) when hand reaches zero */
}

function pickCards() {
    p1PlayedCard = p1Hand[0]
    p1Hand.splice(0,1)
    p2PlayedCard = p2Hand[0]
    p2Hand.splice(0,1)
}

function goToWar() {
    console.log('This is war baby!')
    let x = Math.floor(Math.random * players.length)
    if (x === 1) {
        console.log('This one goes to player 1!')
        p1Pile.push(p1PlayedCard)
        p1Pile.push(p2PlayedCard)
        console.log(p1PlayedCard, p2PlayedCard)
        console.log(p1Pile, p2Pile)
    } else {
        console.log('This one goes to player 2!')
        p2Pile.push(p1PlayedCard)
        p2Pile.push(p2PlayedCard)
        console.log(p1PlayedCard, p2PlayedCard)
    }
}
// goToWar stretchVersion
// function goToWar() {
//     console.log('This is war baby!')
//     console.log(p1PlayedCard, p2PlayedCard)
//     warCards.push(p1PlayedCard)
//     warCards.push(p2PlayedCard)
//     console.log(warCards)
//     for (let i = 0; i < 2; i++) {
//         warCards.push(p1Hand[i])
//         warCards.push(p2Hand[i])
//         p1Hand.splice(0,i)
//         p2Hand.splice(0,i)
//         }
//         console.log(warCards)
//         pickCards()
//         console.log(p1PlayedCard, p2PlayedCard)
//         if (p1PlayedCard.value > p2PlayedCard.value) {
//             warCards.push(p1PlayedCard)
//             warCards.push(p2PlayedCard)
//             p1Pile.push(warCards[0], warCards[1], warCards[2], warCards[3], warCards[4])
//             warCards.splice(0, warCards.length)
//             console.log("Player 1 took the war!");
//         } else if (p2PlayedCard.value > p1PlayedCard.value) {
//             warCards.push(p1PlayedCard)
//             warCards.push(p2PlayedCard)
//             p2Pile.push(warCards[0], warCards[1], warCards[2], warCards[3], warCards[4])
//             warCards.splice(0, warCards.length)
//             console.log("Player 1 took the war!");
//     }
//     console.log(warCards)
// } 
// goToWar (stretch version) is pulling empty arrays into warCards

// function refillHand() {
//     if (p1Hand.length === 0 || p2Hand.length === 0) {
//         p1Hand = p1Pile;
//         p1Pile = []
//         p2Hand = p2Pile;
//         p2Pile = []
//     } 
// }

function checkForWin() {
    console.log(p1Hand.length, p2Hand.length)
    if (p2Hand.length === 0) {
        winner = "Player 1"
        gameOver()
    } else if (p1Hand.length === 0) {
        winner = "Player 2"
        gameOver()
         }
}

function gameOver() {
    document.getElementsByClassName('gameOver')
    gameOver.textContent = `The War is over, $winner is victourious!`
    playCard.removeEventListener('click', compareCards)
}

function continuePlay() {
    console.log('The game is still on!')
}