/*----- constants -----*/
/*----- app's state (variables) -----*/
let playingCards = {
    twoOfHearts: 2, threeOfHearts: 3, fourOfHearts: 4, fiveOfHearts: 5,
    sixOfHearts: 6, sevenOfHearts: 7, eightOfHearts: 8, nineOfHearts: 9,
    tenOfHearts: 10, jackOfHearts: 11, queenOfHearts: 12, kingOfHearts: 13, 
    aceOfHearts: 14, twoOfDiamonds: 2, threeOfDiamonds: 3, fourOfDiamonds: 4,
    fiveOfDiamonds: 5, sixOfDiamonds: 6, sevenOfDiamonds: 7, eightOfDiamonds: 8,
    nineOfDiamonds: 9, tenOfDiamonds: 10, jackOfDiamonds: 11, queenOfDiamonds: 12,
    kingOfDiamonds: 13, aceOfDiamonds: 14, twoOfSpades: 2, threeOfSpades: 3,
    fourOfSpades: 4, fiveOfSpades: 5, sixOfSpades: 6, sevenOfSpades: 7, 
    eightOfSpades: 8, nineOfSpades: 9, tenOfSpades: 10, jackOfSpades: 11, 
    queenOfSpades: 12, kingOfSpades: 13, aceOfSpades: 14, twoOfClubs: 2,
    threeOfClubs: 3, fourOfClubs: 4, fiveOfClubs: 5, sixOfClubs: 6, 
    sevenOfClubs: 7, eightOfClubs: 8, nineOfClubs: 9, tenOfClubs: 10, 
    jackOfClubs: 11, queenOfClubs: 12, kingOfClubs: 13, aceOfClubs: 14
}

//console.log(Object.keys(playingCards).length)
//length of playingCards is pringing to the console

let players = {
    p1: {
        p1Hand:[],
        p1FaceUpPile: [],
        // p1TotalCards: p1.p1Hand.length + p1.p1FaceUpPile.length,
        p1CurrentPlayedCard: {jackOfClubs: 11}
},
    p2: {
        p2Hand: [],
        p2FaceUpPile:[],
        // p2TotalCards: p1Hand.length + p1FaceUpPile.length,
        p2CurrentPlayedCard: {fourOfClubs: 4}
    }
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
    gameOver.textContent = `The War is over, $winner is victourious`
}


function comepareCards() {
    console.log(players.p1.p1CurrentPlayedCard.value)
    if (players.p1[2] > players.p2[2]) {
        console.log("Player 1 took this round!");
    } else if (players.p2[2] > players.p1[2]) {
        console.log("Player 2 took this round!");
    } else {
        goToWar()
    }
}

// need to add protocol to move property of currentlyPlayedCard into FaceUpPile
// compareCards is not pushing the 'losing' item into the specified array;
comepareCards()

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
    for (let i = 0; i <= Object.keys(playingCards).length; i++) {
        Math.floor(Math.random()) * 52
    }
}