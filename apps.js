/*----- constants -----*/
/*----- app's state (variables) -----*/
// deck
let suit = ['♤','♧','♥','♦'];
let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];

function buildDeck() {
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < value.length; j++) {
            let score = parseInt(value[i]);
            if (value[i] === 'J') {
                score = 11;
            } else if (value[i] === 'Q') {
                score = 12;
            } else if (value[i] === 'K') {
                score = 13;
            } else if (value[i] === 'A') {
                score = 14;
                let card = {
                    value: value[i], suit: suit[i], score : score
                };
                deck.push(card);
            }
        }
    }
}

buildDeck()
//buildDeck is NOT pushing cards to 'deck' variable, console logs out empty array.


let deck = [];
let p1Hand = [];
let p1Pile = [];
let p1Card = {};

let p2Hand = [];
let p2Pile = [];
let p2Card = {};
let players = ['player 1', 'player 2']

let warCards = [];
let winner = ''

let p1CardMarker = document.querySelector('#p1Card p')
let p2CardMarker = document.querySelector('#p2Card p')

// buttons
let dealButton = document.getElementById('deal')
let playCard = document.getElementById('playCard')
let resetButton = document.getElementById('resetGame')
let endMessage = document.getElementsByClassName('gameOver')

// military symbols 
let marinesSymbol = document.createElement('img')
marinesSymbol.src = 'https://i.imgur.com/tz4iOz6.png'
marinesSymbol.classList.add('marinesSymbol')

let armySymbol = document.createElement('img')
armySymbol.src = 'https://i.imgur.com/ZMpazCl.png'
armySymbol.classList.add('armySymbol')

let airForceSymbol = document.createElement('img')
airForceSymbol.src = 'https://i.imgur.com/1ejw5bf.png'
airForceSymbol.classList.add('airForceSymbol')

let navySymbol = document.createElement('img')
navySymbol.src = 'https://i.imgur.com/dkwNhga.png'
navySymbol.classList.add('navySymbol')

//  playing card designs
let backOfCard = document.createElement('img')
backOfCard.src = 'https://i.imgur.com/38pBbZN.png'
backOfCard.classList.add('cardBack')

let backOfCard2 = document.createElement('img')
backOfCard2.src = 'https://i.imgur.com/38pBbZN.png'
backOfCard2.classList.add('cardBack2')

let navBarLinks = document.querySelectorAll('li')

/*----- cached element references -----*/

// sounds 

// var dealAlert = new Audio(src="https://audio.jukehost.co.uk/gYeF9bf2dRkIyWsUGE1ISH1FjJMilWUs");
// this sound won't play

/*----- event listeners -----*/
dealButton.addEventListener('click', dealCards)
// dealAlert.addEventListener('click', dealAlert.play)
// this sound won't play
resetButton.addEventListener('click', resetGame)

/*----- functions -----*/
document.querySelector('#deal').classList.add('activeButton')
document.querySelector('.messenger').innerText=`Ready for War?`

document.querySelector('#p2Pile').appendChild(marinesSymbol)
document.querySelector('#p1Pile').appendChild(airForceSymbol)
document.querySelector('#p1Card').appendChild(armySymbol)
document.querySelector('#p2Card').appendChild(navySymbol)


function dealCards() {
    document.querySelector('.gameBoard').classList.add('activeGameBoard')
    document.querySelector('#p2Pile').removeChild(marinesSymbol)
    document.querySelector('#p1Pile').removeChild(airForceSymbol)
    document.querySelector('#p1Card').removeChild(armySymbol)
    document.querySelector('#p2Card').removeChild(navySymbol)
    while (p1Hand.length < 26) {
        let c = Math.floor(Math.random()* deck.length)
        p1Hand.push(deck[c])
        deck.splice(c,1)
    } 
    while (p2Hand.length < 26) {
        let d = Math.floor(Math.random()* deck.length)
        p2Hand.push(deck[d])
        deck.splice(d,1)
    }
    playCard.addEventListener('click', compareCards)
    dealButton.removeEventListener('click',dealCards)
    document.querySelector('.messenger').innerText=`Make your move!`
    document.querySelector('#deal').classList.remove('activeButton')
    document.querySelector('#playCard').classList.add('activeButton')
}

function compareCards() {
    pickCards()
    if (p1Card.value > p2Card.value) {
        p1Pile.push(p1Card)
        p1Pile.push(p2Card)
        console.log('You took this round!');
        document.querySelector('#p1Card').classList.add('activeGameCard')
        document.querySelector('#p2Card').classList.remove('activeGameCard')
        // document.querySelector('.messenger').innerText=`You took this round!`
        // the above is only displayed for a millisecond before next function is called
        
    } else if (p2Card.value > p1Card.value) {
        p2Pile.push(p1Card)
        p2Pile.push(p2Card)
        console.log("Your enemy took this round!");
        document.querySelector('#p2Card').classList.add('activeGameCard')
        document.querySelector('#p1Card').classList.remove('activeGameCard')
        // document.querySelector('.messenger').innerText=`You took this round!`
        // the above is only displayed for a millisecond before next function is called
    } else {
        goToWar()
    } 
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
    if (p1Card && p1Card.suit && p1Card.value) {
        document.querySelector('#p1Card p').innerText=`${renderSymbol(p1Card.suit)} ${p1Card.value}`
    } 
    if (p2Card&& p2Card.suit && p2Card.value) {
        document.querySelector('#p2Card p').innerText=`${renderSymbol(p2Card.suit)} ${p2Card.value}`
    }
    p1CardMarker.classList.remove('placeHolderText')
    p1CardMarker.classList.add('cardValue')
    p2CardMarker.classList.remove('placeHolderText')
    p2CardMarker.classList.add('cardValue')
    document.querySelector('.gameBoard').appendChild(backOfCard)
    document.querySelector('.gameBoard').appendChild(backOfCard2)  
}

function goToWar() {
    console.log('This is war baby!')
    let x = Math.floor(Math.random() * players.length)
    if (x === 1) {
        console.log('This one goes to player 1!')
        p1Pile.push(p1Card)
        p1Pile.push(p2Card)
        console.log(p1Pile, p2Pile)
        document.querySelector('.messenger').innerText=`You won the stalemate!`
    } else {
        console.log('This one goes to player 2!')
        p2Pile.push(p1Card)
        p2Pile.push(p2Card)
        document.querySelector('.messenger').innerText=`Your enemy won the stalemate!`
    }
}

function checkForWin () {
    if (p1Hand.length === 0 && p2Hand.length === 0 && p1Pile.length > p2Pile.length) {
        winner = 'You'
        console.log('You won the the WAR!')
        // document.querySelector('.messenger').innerText=`You won the the WAR!`
        // this is only dipslaying for a split second before the next message is triggered
        gameOver()
    } else if (p1Hand.length === 0 && p2Hand.length === 0 && p2Pile.length > p1Pile.length) {
        winner = 'Your Enemy'
        console.log('Your enemy won the WAR!')
        // document.querySelector('.messenger').innerText=`Your enemy won the WAR!`
        // this is only dipslaying for a split second before the next message is triggered
        gameOver()
    } else if (p1Hand.length === 0 && p2Hand.length === 0 && p2Pile.length === p1Pile.length) {
        winner = 'Tie'
        console.log('Sometimes in war...nobody wins.')
        // document.querySelector('.messenger').innerText='Sometimes in war...nobody wins.'
        // this is only dipslaying for a split second before the next message is triggered
        gameOver()
    }
    document.querySelector('.messenger').innerText=`Player: ${p1Pile.length} || Enemy: ${p2Pile.length}`
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
    deck = []

    dealButton.addEventListener('click', dealCards)
    playCard.addEventListener('click', compareCards)
}

function gameOver() {
    console.log(winner)
    if (winner === 'You') {
        document.querySelector('.messenger').innerText=`You won the war!`
    } else if (winner === 'Your Enemy') {
        document.querySelector('.messenger').innerText=`Your enemy won the war!`
    } else if (winner === 'Tie') {
        document.querySelector('.messenger').innerText=`Sometimes in war, nobody wins!`
    }
    playCard.removeEventListener('click', compareCards)
    document.querySelector('#playCard').classList.remove('activeButton')
    document.querySelector('#resetGame').classList.add('activeGameBoard')
    document.querySelector('.gameBoard').classList.remove('activeGameBoard')
    // logic displaying winner at the end is not yet functional, I don't know why
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