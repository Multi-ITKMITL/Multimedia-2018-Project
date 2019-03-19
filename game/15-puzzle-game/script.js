/* global declaration*/
var tile;
var empty_x;
var empty_y;
var countMove = 0;

/*
==========================
      STARTGAMEPOPUP
==========================
*/

function closeStart() {
    document.getElementById('myModalStart').style.display = "none";
    shuffle();
    var countDownDate = new Date().getTime();
    start(countDownDate);
}

/*
==========================
      ENDGAMEPOPUP
==========================
*/

function closeEnd() {
    document.getElementById('myModalEnd').style.display = "none";
    shuffle();
    var countDownDate = new Date().getTime();
    start(countDownDate);
}

/*
==========================
         MAINGAME
==========================
*/

window.onload = function () {

    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');

    for (var i = 0; i < 16; i++) {
        if (i == 15) {
            tile[i].id = 'emptyTile';
            tile[i].style.left = (i%4*100)+'px';
            tile[i].style.top = (parseInt(i/4)*100) + 'px';
        }
        else {
            tile[i].className = 'tile';
            tile[i].style.left = (i%4*100)+'px';
            tile[i].style.top = (parseInt(i/4)*100) + 'px';
        }
    }
}

function start(countDownDate) {
    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');

    for (var i = 0; i < 16; i++) {
        tile[i].onclick = function() {
            if (this.innerHTML == "") {
                console.log("You click on empty tile")
            }
            else {
                checkMove(this.innerHTML-1, countDownDate);
            }
        }
    }
}

function checkMove(position, countDownDate) {

    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');

    var tempTop = parseInt(tile[position].style.top);
    var tempLeft = parseInt(tile[position].style.left);

    empty_x = parseInt(document.getElementById('emptyTile').style.left);
    empty_y = parseInt(document.getElementById('emptyTile').style.top);

    if (empty_x - 100 == tempLeft && empty_y == tempTop) {
            swap(empty_x, empty_y, tempLeft, tempTop, position, countDownDate);
            empty_x -= 100;
    }
    else if (empty_x + 100 == tempLeft && empty_y == tempTop) {
        swap(empty_x, empty_y, tempLeft, tempTop, position, countDownDate);
        empty_x += 100;
    }
    else if (empty_y - 100 == tempTop && empty_x == tempLeft) {
        swap(empty_x, empty_y, tempLeft, tempTop, position, countDownDate);
        empty_y -= 100;
    }
    else if (empty_y + 100 == tempTop && empty_x == tempLeft) {
        swap(empty_x, empty_y, tempLeft, tempTop, position, countDownDate);
        empty_y += 100;
    }
}

function swap(empty_x, empty_y, left, top, position, countDownDate) {
    var tempTop = top;
    var tempLeft = left;

    tile[position].style.top = empty_y + 'px';
    tile[position].style.left = empty_x + 'px';

    document.getElementById('emptyTile').style.top = tempTop+'px';
    document.getElementById('emptyTile').style.left = tempLeft+'px';

    playsound();

    countMove++;

    checkWin(countDownDate);
}

function playsound() {
    // play sound something!
}

function checkWin(countDownDate) {

    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');
    var check = 1;

    for (var i = 0; i < 15; i++) {
        if (tile[i].style.left != (i%4*100)+"px") {
                    check = 0;
        }
        if (tile[i].style.top != (parseInt(i/4)*100)+"px") {
                    check = 0;
        }
    }
    if (check) {
        alertWin(countDownDate);
    }
}

function alertWin(countDownDate) {

    var now = new Date().getTime();

    var distance = now - countDownDate;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var modal = document.getElementById('myModalEnd');
    modal.style.display = "block";

    var text = document.getElementById('alertWin');

    text.innerHTML = "Congratulation, You Won 15 Puzzle The Game! With total of " + countMove + " moves! With total time of " + minutes + " minutes " + seconds + " seconds";
    countMove = 0;
}

/*
==========================
       Etcetera
==========================
*/

// shuffle while start game
function shuffle() {
    reset();
    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');

    for (var i = 0; i < 30; i++) {
        var posi_a = Math.floor(Math.random()*15);
        var posi_b = Math.floor(Math.random()*15);
        while (posi_a == posi_b) {
            var posi_b = Math.floor(Math.random()*15);
        }
        var top_a = tile[posi_a].style.top;
        var left_a = tile[posi_a].style.left;

        tile[posi_a].style.top = tile[posi_b].style.top;
        tile[posi_a].style.left = tile[posi_b].style.left;

        tile[posi_b].style.top = top_a;
        tile[posi_b].style.left = left_a;
    }
}

// for reset position while coding game
function reset() {

    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');

    for (var i = 0; i<16; i++) {
        tile[i].style.left = (i%4*100)+'px';
        tile[i].style.top = (parseInt(i/4)*100) + 'px';
    }
}

// for check position only!
function position() {
    console.log("start checking!")
    var board = document.getElementById('game');
    tile = board.getElementsByTagName('div');

    for (var i = 0; i < 15; i++) {
        console.log("Tile", i, "at position", "top:",tile[i].style.top, "left:", tile[i].style.left);
    }
    console.log("Done Check!")
}