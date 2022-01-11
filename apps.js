/*----- constants -----*/
/*----- app's state (variables) -----*/
// deck

let suit = ['♤','♧','♥','♦'];
let value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];

function buildDeck() {
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < suit.length; j++) {
            let score = parseInt(value[i]);
            if (value[i] == 'J')
                score = 11;
            if (value[i] == 'Q')
                score = 12;
            if (value[i] == 'K') 
                score = 13;
            if (value[i] == 'A') 
                score = 14;
                let card = {
                    value: value[i], suit: suit[j], score: score
                };
                console.log(card)
                deck.push(card);
            }
        }
    }

buildDeck()



let playerHand = [];
let playerPile = [];
let playerCard = {};

let computerHand = [];
let computerPile = [];
let computerCard = {};

let players = ['player 1', 'player 2']
let winner = ''

let warCards = [];

let playerCardMarker = document.querySelector('#playerCard p')
let computerCardMarker = document.querySelector('#computerCard p')

// buttons
let dealButton = document.getElementById('deal')
let playCard = document.getElementById('playCard')
let resetButton = document.getElementById('resetGame')
let endMessage = document.getElementsByClassName('gameOver')

// military symbol images
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
resetButton.addEventListener('click', resetGame)

/*----- functions -----*/
document.querySelector('#deal').classList.add('activeButton')
document.querySelector('.messenger').innerText=`Ready for War?`

document.querySelector('#computerPile').appendChild(marinesSymbol)
document.querySelector('#playerPile').appendChild(airForceSymbol)
document.querySelector('#playerCard').appendChild(armySymbol)
document.querySelector('#computerCard').appendChild(navySymbol)


function dealCards() {
    document.querySelector('.gameBoard').classList.add('activeGameBoard')
    document.querySelector('#computerPile').removeChild(marinesSymbol)
    document.querySelector('#playerPile').removeChild(airForceSymbol)
    document.querySelector('#playerCard').removeChild(armySymbol)
    document.querySelector('#computerCard').removeChild(navySymbol)
    while (playerHand.length < 26) {
        let c = Math.floor(Math.random()* deck.length)
        playerHand.push(deck[c])
        deck.splice(c,1)
    } 
    while (computerHand.length < 26) {
        let d = Math.floor(Math.random()* deck.length)
        computerHand.push(deck[d])
        deck.splice(d,1)
    }
    playCard.addEventListener('click', compareCards)
    dealButton.removeEventListener('click',dealCards)
    document.querySelector('.messenger').innerText=`Make your move!`
    document.querySelector('#deal').classList.remove('activeButton')
    document.querySelector('#playCard').classList.add('activeButton')
}

function pickCards() {
    playerCard = playerHand[0]
    playerHand.splice(0,1)
    computerCard = computerHand[0]
    computerHand.splice(0,1)
    console.log(playerHand, playerCard)
    if (playerCard && playerCard.suit && playerCard.value) {
        document.querySelector('#playerCard p').innerText=`${renderSymbol(playerCard.suit)} ${playerCard.value}`
    } 
    if (computerCard&& computerCard.suit && computerCard.value) {
        document.querySelector('#computerCard p').innerText=`${renderSymbol(computerCard.suit)} ${computerCard.value}`
    }
    playerCardMarker.classList.remove('placeHolderText')
    playerCardMarker.classList.add('cardValue')
    computerCardMarker.classList.remove('placeHolderText')
    computerCardMarker.classList.add('cardValue')
    document.querySelector('.gameBoard').appendChild(backOfCard)
    document.querySelector('.gameBoard').appendChild(backOfCard2)  
}
function compareCards() {
    pickCards()
    if (playerCard.value > computerCard.value) {
        playerPile.push(playerCard)
        playerPile.push(computerCard)
        console.log('You took this round!');
        document.querySelector('#playerCard').classList.add('activeGameCard')
        document.querySelector('#computerCard').classList.remove('activeGameCard')
        
    } else if (computerCard.value > playerCard.value) {
        computerPile.push(playerCard)
        computerPile.push(computerCard)
        console.log("Your enemy took this round!");
        document.querySelector('#computerCard').classList.add('activeGameCard')
        document.querySelector('#playerCard').classList.remove('activeGameCard')
    } else {
        goToWar()
    } 
        checkForWin()     
}

function goToWar() {
    console.log('This is war baby!')
    let x = Math.floor(Math.random() * players.length)
    if (x === 1) {
        console.log('This one goes to player 1!')
        playerPile.push(playerCard)
        playerPile.push(computerCard)
        console.log(playerPile, computerPile)
        document.querySelector('.messenger').innerText=`You won the stalemate!`
    } else {
        console.log('This one goes to player 2!')
        computerPile.push(playerCard)
        computerPile.push(computerCard)
        document.querySelector('.messenger').innerText=`Your enemy won the stalemate!`
    }
}

function checkForWin () {
    if (playerHand.length === 0 && computerHand.length === 0 && playerPile.length > computerPile.length) {
        winner = 'You'
        console.log('You won the the WAR!')
        // document.querySelector('.messenger').innerText=`You won the the WAR!`
        gameOver()
    } else if (playerHand.length === 0 && computerHand.length === 0 && computerPile.length > playerPile.length) {
        winner = 'Your Enemy'
        console.log('Your enemy won the WAR!')
        // document.querySelector('.messenger').innerText=`Your enemy won the WAR!`
        gameOver()
    } else if (playerHand.length === 0 && computerHand.length === 0 && computerPile.length === playerPile.length) {
        winner = 'Tie'
        console.log('Sometimes in war...nobody wins.')
        // document.querySelector('.messenger').innerText='Sometimes in war...nobody wins.'
        gameOver()
    }
    document.querySelector('.messenger').innerText=`Player: ${playerPile.length} || Enemy: ${computerPile.length}`
}

function resetGame() {

    playerHand = [];
    playerPile = [];
    playerCard = {};

    computerHand = [];
    computerPile = [];
    computerCard = {};

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
//         warCards.push(playerHand[i])
//         warCards.push(computerHand[i])
//         playerHand.splice(0,i)
//         computerHand.splice(0,i)
//         }
//         console.log(warCards)
//         pickCards()
//         console.log(p1PlayedCard, p2PlayedCard)
//         if (p1PlayedCard.value > p2PlayedCard.value) {
//             warCards.push(p1PlayedCard)
//             warCards.push(p2PlayedCard)
//             playerPile.push(warCards[0], warCards[1], warCards[2], warCards[3], warCards[4])
//             warCards.splice(0, warCards.length)
//             console.log("Player 1 took the war!");
//         } else if (p2PlayedCard.value > p1PlayedCard.value) {
//             warCards.push(p1PlayedCard)
//             warCards.push(p2PlayedCard)
//             computerPile.push(warCards[0], warCards[1], warCards[2], warCards[3], warCards[4])
//             warCards.splice(0, warCards.length)
//             console.log("Player 1 took the war!");
//     }
//     console.log(warCards)
// } 

// ****************************************************************************************************
// REFILL (Stretch Feature)

// function refillHand() {
//     if (playerHand.length === 0 || computerHand.length === 0) {
//         playerHand = playerPile;
//         playerPile = []
//         computerHand = computerPile;
//         computerPile = []
//     } 
// }