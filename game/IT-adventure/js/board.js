// var player = {
//     player1: {
//         step: 0,
//         life: 3,
//         status: 1,
//         character: 0
//     },
//     player2: {
//         step: 0,
//         life: 3,
//         status: 1,
//         character: 0
//     },
//     player3: {
//         step: 0,
//         life: 3,
//         status: 0,
//         character: 0
//     },
//     player4: {
//         step: 0,
//         life: 3,
//         status: 0,
//         character: 0
//     },
// };

function gameStart() {
    scrollTo(0,0);
    turn = "player1";
    let lifeDisplay = document.querySelector("#theLife").childNodes;
    let i = 1;
    for(let c in player){
        if(player[c].status == 1){
            let p = document.getElementById(c);
            p.style.display = 'inline-block';
            p.setAttribute('character', player[c].character)
            lifeDisplay[i].style.display = 'inline-block';
            i += 2;
        } else {
            lifeDisplay[i].style.display = 'none'
            i += 2;
        }
    }
    document.querySelector('game').style.display = 'inline-block';
    document.querySelector('#select').style.display = 'none';
    document.getElementById("player1_life").innerText = player.player1.life;
    document.getElementById("player2_life").innerText = player.player2.life;
    document.getElementById("player3_life").innerText = player.player3.life;
    document.getElementById("player4_life").innerText = player.player4.life;
    console.log(player);
    turnStart()
}

function turnStart() {
    document.querySelector("#theTurn").setAttribute('character', document.getElementById(turn).getAttribute('character'));
    if(player[turn].move === 0){
        player[turn].move = 1;
        turnEnd();
    }
    getDice = 1;
    thePlayer = document.getElementById(turn);
}

function turnEnd() {
    if (turn === "player1") {
        turn = "player2";
        if(player[turn].life <= 0){
            turnEnd();
        }
    } else if (turn === "player2" && player.player3.status === 1) {
        turn = "player3";
        if(player[turn].life <= 0){
            turnEnd();
        }
    } else if (turn === "player3" && player.player4.status === 1) {
        turn = "player4";
        if(player[turn].life <= 0){
            turnEnd();
        }
    } else {
        turn = "player1";
        if(player[turn].life <= 0){
            turnEnd();
        }
    }
    setTimeout(function () {
        checkDisplay(player[turn].step, "end");
        turnStart();
    }, 700);
}

function diceFunction() {
    if (fighting === 0  && getDice == 1) {
        getDice = 0;
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        theDice1 = document.getElementById("theDice1");
        theDice2 = document.getElementById("theDice2");
        theDice1.setAttribute("score", "0");
        theDice2.setAttribute("score", "0");
        setTimeout(function () {
            theDice1.setAttribute("score", dice1);
            theDice2.setAttribute("score", dice2);
            moveCounter(dice1 + dice2, turn)
        }, 1300);
    }
}

function moveCounter(move, mover) {
    end =  player[mover].step + move;
    moveFunction(end, mover)
}

function moveFunction(end, mover) {
    player[mover].step++;
    setTimeout(function () {
        // console.log(start);
        document.querySelector("#"+mover).setAttribute("step", player[mover].step);
        checkDisplay(player[mover].step, "move");
        if (player[mover].step == 59 && player[mover].step < end) {
            reverseCounter(end-player[mover].step, mover);
        } else if(player[mover].step < end){
            moveFunction(end, mover);
        } else if(player[mover].step == 59 && player[mover].step == end){
            gameEnd(mover);
        } else {
            player[mover].step = end;
            for (let p in player) {
                if (player[mover].step === player[p].step && mover !== p && player[mover].step != 1 && player[p].life > 0) {
                    text2 = p;
                    fighter2.setAttribute('character', document.getElementById(p).getAttribute('character'));
                    fighting = 1
                }
            }
            if (fighting == 1) {
                battle1.style.width = '0px';
                battle1.style.background = document.getElementById(mover).getAttribute("color");
                battle2.style.width = '0px';
                battle2.style.background = document.getElementById(text2).getAttribute("color");
                document.getElementById('theBattle').style.display = 'inline-block';
                fighter1.setAttribute('character', document.getElementById(mover).getAttribute('character'));
                text1 = mover;
            } else if (eventBox.indexOf(player[mover].step) != -1) {
                checkEvent(mover);
            } else {
                turnEnd();
            }
        }
    }, 150);

}

function reverseCounter(back, mover) {
    var reverse = player[mover].step - back;
    if (reverse < 1) {
        reverse = 1;
    }
    moveReverse(reverse, mover);
}

function moveReverse(reverse, mover) {
    if (player[mover].step != 0) {
        player[mover].step--;
    }
    checkDisplay(player[mover].step, "move");
    theLoser = document.getElementById(mover);
    setTimeout(function () {
        theLoser.setAttribute("step", player[mover].step);
        if (player[mover].step > reverse) {
            moveReverse(reverse, mover)
        } else {
            for (let p in player) {
                if (player[mover].step === player[p].step && mover !== p && player[mover].step != 1 && player[p].life > 0) {
                    text2 = p;
                    fighter2.setAttribute('character', document.getElementById(p).getAttribute('character'));
                    fighting = 1;
                }
            }
            if (fighting === 1) {
                battle1.style.width = '0px';
                battle1.style.background = document.getElementById(mover).getAttribute("color");
                battle2.style.width = '0px';
                battle2.style.background = document.getElementById(text2).getAttribute("color");
                document.getElementById('theBattle').style.display = 'inline-block';
                fighter1.setAttribute('character', document.getElementById(mover).getAttribute('character'));
                text1 = mover;
            }  else if (eventBox.indexOf(player[mover].step) != -1) {
                checkEvent(mover);
            } else {
                turnEnd();
            }
        }
    }, 150);
}

function updateLife(noob) {
    if(player[noob].life <= 0){
        document.getElementById(noob + "_life").innerText = "Dead";
        document.getElementById(noob).setAttribute("character", "05");
        document.getElementById(noob).style.zIndex = "-1";
        let count = 0;
        let w = '';
        for(let c in player){
            if(player[c].life > 0 && player[c].status == 1){
                count += 1;
                w = c;
            }
        }
        if (count == 1){
            gameEnd(w);
        }
    } else {
        document.getElementById(noob + "_life").innerText = player[noob].life;
    }
}

function checkDisplay(check, how) {
    if (check >= 8 && check <= 21){
        scrollTo(960, 0);
    } else if (check >= 44 && check <= 53){
        scrollTo(1100, 0)
    } else if (check >= 53 || (check >= 46 && how === "end")){
        scrollTo(1390, 0)
    } else {
        scrollTo(0,0)
    }
}

function gameEnd(w) {
    setTimeout(()=>{
        document.querySelector("game").style.display = 'none';
        document.querySelector("#restart").style.display = 'inline-block';
        alert(w.toUpperCase()+" Winner");

    }, 1000);
}

var battle1 = document.getElementById('battle1');
var battle1Bar = 0;
var fighter1 = document.getElementById('fighter1');
var battle2 = document.getElementById('battle2');
var battle2Bar = 0;
var fighter2 = document.getElementById('fighter2');
var fighting = 0;
var loser = '';
var winner = '';
var text1 = '';
var text2 = '';

document.body.onkeyup = function (e) {
    if (e.code === "KeyA" && fighting == 1) {
        battle1Bar += 16;
        if (battle1Bar >= 500) {
            fighting = 0;
            battle1.style.width = '498';
            winner = document.querySelector("#"+text1);
            loser = text2;
            player[loser].life -= 1;
            updateLife(loser);
            battle1Bar = 0;
            battle2Bar = 0;
            battle1.style.width = '0px';
            battle2.style.width = '0px';
            winner.style.zIndex = "2";
            document.getElementById('theBattle').style.display = 'none';
            winner.setAttribute("animate", "1");
            setTimeout(function () {
                winner.setAttribute("animate", "0");
                winner.style.zIndex = "0";
                if(player[loser].life > 0){
                    reverseCounter(5, loser);
                    if (eventBox.indexOf(player[text1].step) != -1) {
                        checkEvent(text1);
                    }
                }  else if (eventBox.indexOf(player[text1].step) != -1) {
                    checkEvent(text1);
                } else {
                    turnEnd();
                }
            }, 3500);
        } else {
            battle1.style.width = battle1Bar + 'px';
        }
    } else if (e.code === "KeyL" && fighting == 1) {
        battle2Bar += 16;
        if (battle2Bar >= 500) {
            fighting = 0;
            battle2.style.width = '498px';
            winner = document.querySelector("#"+text2);
            loser = text1;
            player[loser].life -= 1;
            updateLife(loser);
            battle1Bar = 0;
            battle2Bar = 0;
            winner.style.zIndex = "2";
            document.getElementById('theBattle').style.display = 'none';
            winner.setAttribute("animate", "1");
            setTimeout(function () {
                winner.setAttribute("animate", "0");
                winner.style.zIndex = "0";
                if(player[loser].life > 0){
                    reverseCounter(5, loser);
                } else {
                    turnEnd();
                }
            }, 3500);
        } else {
            battle2.style.width = battle2Bar + 'px';
        }

    } else if (e.code === "Space"){
        diceFunction();
    }
};