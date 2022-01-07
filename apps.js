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

let tempPlayingCards = [];
let p1Hand = [];
let p1Pile = [];
let p1Card = {};

let p2Hand = [];
let p2Pile = [];
let p2Card = {};
let players = ['player 1', 'player 2']

let warCards = [];
let winner = ''
let dealButton = document.getElementById('deal')
let playCard = document.getElementById('playCard')
let resetButton = document.getElementById('resetGame')
let endMessage = document.getElementsByClassName('gameOver')

let p1CardMarker = document.querySelector('#p1Card p')
let p2CardMarker = document.querySelector('#p2Card p')

// let backOfCard = document.createElement('img')
// backOfCard.src = 'https://i.imgur.com/38pBbZN.png'
// backOfCard.classList.add('cardBack')

let backOfCard2 = document.createElement('img')
backOfCard2.src = 'https://i.imgur.com/38pBbZN.png'
backOfCard2.classList.add('cardBack2')

/*----- cached element references -----*/

/*----- event listeners -----*/
dealButton.addEventListener('click', dealCards)

resetButton.addEventListener('click', resetGame)

/*----- functions -----*/


function dealCards() {
    tempPlayingCards = playingCards
    console.log(tempPlayingCards, playingCards)
    while (p1Hand.length < 26) {
        let c = Math.floor(Math.random()* tempPlayingCards.length)
        p1Hand.push(tempPlayingCards[c])
        tempPlayingCards.splice(c,1)
    } 
    while (p2Hand.length < 26) {
        let d = Math.floor(Math.random()* tempPlayingCards.length)
        p2Hand.push(tempPlayingCards[d])
        tempPlayingCards.splice(d,1)
    }
    playCard.addEventListener('click', compareCards)
    dealButton.removeEventListener('click',dealCards)
}

function compareCards() {
    pickCards()
    if (p1Card.value > p2Card.value) {
        p1Pile.push(p1Card)
        p1Pile.push(p2Card)
        console.log("Player 1 took this round!");
    } else if (p2Card.value > p1Card.value) {
        p2Pile.push(p1Card)
        p2Pile.push(p2Card)
        console.log("Player 2 took this round!");
    } else {
        goToWar()
    } 
        //add cardbank (which is a class) to div 
        checkForWin()
        
        
}

function renderSymbol(suit) {
    if (suit === 'hearts') {
        return '♥'
    } else if (suit === 'diamonds') {
        return '♦'
    } else if (suit === 'clubs') {
        return '♣'
    } else if (suit === 'spades') {
        return '♠'
    }
}

function pickCards() {
    p1Card = p1Hand[0]
    p1Hand.splice(0,1)
    p2Card = p2Hand[0]
    p2Hand.splice(0,1)
    console.log(p1Hand, p1Card)
    if (p1Card&& p1Card.suit && p1Card.value) {
        document.querySelector('#p1Card p').innerText=`${renderSymbol(p1Card.suit)} ${p1Card.value}`
    } 
    if (p2Card&& p2Card.suit && p2Card.value) {
        document.querySelector('#p2Card p').innerText=`${renderSymbol(p2Card.suit)} ${p2Card.value}`
    }
    p1CardMarker.classList.remove('placeHolderText')
    p1CardMarker.classList.add('cardValue')
    p2CardMarker.classList.remove('placeHolderText')
    p2CardMarker.classList.add('cardValue')
    // document.querySelector('.divContainer').appendChild(backOfCard)
    document.querySelector('.divContainer').appendChild(backOfCard2)
}

// beginning of stretch version of goToWar below
function goToWar() {
    console.log('This is war baby!')
    let x = Math.floor(Math.random() * players.length)
    if (x === 1) {
        console.log('This one goes to player 1!')
        p1Pile.push(p1Card)
        p1Pile.push(p2Card)
        console.log(p1Pile, p2Pile)
    } else {
        console.log('This one goes to player 2!')
        p2Pile.push(p1Card)
        p2Pile.push(p2Card)
    }
}

function checkForWin () {
    if (p1Hand.length === 0 && p2Hand.length === 0 && p1Pile.length > p2Pile.length) {
        winner = 'Player 1'
        console.log('Player 1 wins the war!')
        gameOver()
    } else if (p1Hand.length === 0 && p2Hand.length === 0 && p2Pile.length > p1Pile.length) {
        winner = 'Player 2'
        console.log('Player 2 wins the war!')
        gameOver()
    } else if (p1Hand.length === 0 && p2Hand.length === 0 && p2Pile.length === p1Pile.length) {
        console.log('Sometimes in war...nobody wins.')
        console.log(p1Hand.length, p1Pile.length, p2Hand.length, p2Pile.length);
        gameOver()
    }
    
}

function resetGame() {
    p1Hand = [];
    p1Pile = [];
    p1Card = {};

    p2Hand = [];
    p2Pile = [];
    p2Card = {};

    warCards = [];
    winner = ''
    tempPlayingCards = []

    playCard.addEventListener('click', compareCards)
}

function gameOver() {
    playCard.removeEventListener('click', compareCards)
}

// ****************************************************************************************************
// stretch features will include:

// 1. a 'refill' function which will take the cards in a players pile and move it to his hand when
// when the hand reaches zero so that play may continue

// 2. refactoring of 'checkForWin' which will evaluate whether total cards (hand + pile === 52.)
// this will be the new win condition 

// 3. refactoring 'goToWar' -- this version will store both played cards in a new, temporary 
// array 'warCards', draw three more cards from each hand, placing them in the same array, then finally,
// drawing a last card from each hand which will be evaluated for highest value. The player
// to whom the highest value card of this matchup belongs will get all cards in the array, 
// pushed into his pile, as well as both cards currenly being played (all elements of 'warCards' 
// will simultaneously need to be spliced out).

// 4. ability to deal a new game without refreshing page

// ****************************************************************************************************
// GOTOWAR (Stretch Version)

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

// ****************************************************************************************************
// REFILL (Stretch Feature)

// function refillHand() {
//     if (p1Hand.length === 0 || p2Hand.length === 0) {
//         p1Hand = p1Pile;
//         p1Pile = []
//         p2Hand = p2Pile;
//         p2Pile = []
//     } 
// }