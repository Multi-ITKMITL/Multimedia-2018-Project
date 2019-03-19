
class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.matchSound = new Audio('sound/correct.mp3');
        this.missSound = new Audio('sound/incorrect1.wav');
        this.flip = new Audio('sound/click(new).mp3');
        this.lose = new Audio('sound/gameover.mp3');
        this.win = new Audio('sound/Winner.mp3');
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
    }

    startGame() {
        this.totalClicks = 0;
        this.lifeRemaining = 10;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        //this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            //this.timer.innerText = this.timeRemaining;
            document.getElementById('time-block').style.width = 75 * (this.timeRemaining/80) + "vw";
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
        document.getElementById('result').innerHTML = "<br>Total Flips : " + this.totalClicks;
        this.lose.play();
    }
    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory-text').classList.add('visible');
        document.getElementById('result-vic').innerHTML = "<br>Total Flips : " + this.totalClicks;
        this.win.play();

    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched'); 
        });
    }
    flipCard(card) {
        this.flip.play();
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
        this.matchSound.play();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
        this.missSound.play();
        document.getElementById('heart'+this.lifeRemaining).classList.add('visible');
        this.lifeRemaining--;
        if (this.lifeRemaining === 0){
            document.getElementById
            this.gameOver();
        }

    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray = cardsArray.map((card, index) => {
            card.style.order = index;
        }); 
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(80, cards);
    document.getElementById('game-start-text').innerHTML= "<center>Are you ready?<br>Click to Play.</center>";
    document.getElementById('game-start-text').addEventListener('click',() =>{;
            document.getElementById('game-start-text').classList.remove('visible');
            document.getElementById('time-text').classList.add('visible');
            document.getElementById('time-text').innerText = 5;
            startCount()
            game.shuffleCards(cards);
            function startCount(){
                var countStart = 4;
            for (var i = 1 ; i <= 24; i++){
                document.getElementById('show'+i).classList.add('visible');
            }
            var start = setInterval(() => {
            document.getElementById('time-text').innerHTML = countStart;
            if(countStart === -1){
                document.getElementById('time-text').classList.remove('visible');
                game.startGame();
                clearInterval(start);
            }
                countStart--;
                }, 1000);
            }
        });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
function restart(){
    document.getElementById('game-over-text').classList.remove('visible');
    document.getElementById('victory-text').classList.remove('visible');
    document.getElementById('game-start-text').classList.add('visible');
    for (var i = 1 ; i <= 24; i++){
        var check = document.getElementById('show'+i).className;
        if (check.includes('matched')) {
            document.getElementById('show'+i).classList.remove('matched');
            document.getElementById('show'+i).classList.remove('visible');
        }
    }
    for(var j = 1 ;  j<= 10; j++){
        var check1 = document.getElementById('heart'+j).className;
        if (check1.includes('visible')){
            document.getElementById('heart'+j).classList.remove('visible');
        }
    }
    document.getElementById('time-block').style.width = 75+"vw";
    ready();
}
var checkSound = true;
function Mute(){
    if (checkSound == true){
        checkSound = false;
        document.getElementById('main_audio').pause();
    }
    else{
        checkSound = true;
        document.getElementById('main_audio').play();
    }
}
var check2 = false;
function Fullscreen(){
    var screen = document.documentElement;
    if (check2 == false){
        screen.requestFullscreen();
        check2 = true;
    }
    else if (check2 == true){
        document.exitFullscreen();
        check2 = false
    }

}