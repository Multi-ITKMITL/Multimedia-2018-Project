var timedis = 3000;
var timerandom = 500;
var pingbing = new Audio('sound/pingbing.wav');
var scr = new Audio('sound/scr.wav');
var lose = new Audio('sound/lose.mp3');
var size = 4;
//sound
function soundpingbing() {
    pingbing.pause();
    pingbing.currentTime = 0;
    pingbing.play();
}
function soundscr() {
    scr.pause();
    scr.currentTime = 0;
    scr.play();
}

function soundlose() {
    lose.pause();
    lose.currentTime = 0;
    lose.play();
}
var set_value = (i) => localStorage.select = i;
var get = () => localStorage.select;
var level = get();
selectmode(parseInt(level));

function selectmode(level) {
    if (level === 1) {
        size = 4;
        timedis = 3000;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                $('#appendHere').append('<div class="boxE" id="box' + i + j + '"></div>');
            }
            $('#appendHere').append('<br>');
        }
        playplay();
    } else if (level === 2) {
        size = 6;
        timedis = 4000;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                $('#appendHere').append('<div class="boxN" id="box' + i + j + '"></div>');
            }
            $('#appendHere').append('<br>');
        }
        playplay();
    } else if (level === 3) {
        size = 8;
        timedis = 3000;
        timerandom = 250;
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                $('#appendHere').append('<div class="boxH" id="box' + i + j + '"></div>');
            }
            $('#appendHere').append('<br>');
        }
        playplay();
    }
}
//create div
// function set_box() {
//     for (i = 0; i < size; i++) {
//         for (j = 0; j < size; j++) {
//             $('#appendHere').append('<div class="box" id="box' + i + j + '"></div>');
//         }
//         $('#appendHere').append('<br>');
//     }
// }
function timeOut(pos, pos2, t) {
    setTimeout(function() {
        allcolor = ["#2fc1ce", "#ffb300", "#ff1280", "#ca8dc9", "#f9ec00", "#6f369d"];
        randomcolor = allcolor[Math.floor(Math.random() * allcolor.length)];
        $('#box' + pos + pos2).css('background-color', randomcolor);
    }, timerandom * t);
}
var score = 0;

function playplay() {
    $('span#score').text(score);
    $('div[id^=box]').off('click');
    setTimeout(function() {
        $('div[id^=box]').each(function() {
            $(this).css('background-color', '#222');
        });
    }, 500);
    result = [];
    temp = 100;
    setTimeout(function() {
        for (i = 0, j = size - 1; i < size; i++, j--) {
            if (temp != 100) {
                combo = Math.floor(Math.random() * 5);
                if (combo === 0 && temp != 0)
                    pos = temp - 1;
                else if (combo === 1 && temp != 0)
                    pos = temp - 1;
                else if (combo === 2)
                    pos = temp;
                else if (combo === 3 && temp != (size - 1))
                    pos = temp + 1;
                else if (combo === 4 && temp != (size - 1))
                    pos = temp + 1;
            } else
                pos = Math.floor(Math.random() * size);
            temp = pos;
            timeOut(j, pos, i);
            result.push(j + '' + pos);
        }
    }, 1000);
    setTimeout(() => {
        $('div[id^=box]').click(function() {
            pos = $(this).attr('id').slice(3, 5);
            play.push(pos);
            click++;
            soundpingbing();
            allcolor = ["#2fc1ce", "#ffb300", "#ff1280", "#ca8dc9", "#f9ec00", "#6f369d"];
            randomcolor = allcolor[Math.floor(Math.random() * allcolor.length)];
            $('#box' + pos).css('background-color', randomcolor);
        });
    }, timedis);
    console.log(result);
    play = [];
    click = 0;
    console.log(play);
    setTimeout(function() {
        $('div[id^=box]').each(function() {
            $(this).css('background-color', '#222');
        });
    }, timedis);
    check = setInterval(function() {
        if (click == size) {
            if (JSON.stringify(result) == JSON.stringify(play)) {
                score++;
                click = 0;
                $('span#score').text(score);
                allcolor = ["#2fc1ce", "#ffb300", "#ff1280", "#ca8dc9", "#f9ec00"];
                randomcolor = allcolor[Math.floor(Math.random() * allcolor.length)];
                $('span#score').css('color', randomcolor);
                $('span#score').css('text-shadow', '0px 0px 2.2em'+randomcolor);
                soundscr();
                clearInterval(check);
                playplay();
            } else {
                clearInterval(check);
                lose.play();
                modal.style.display = "block";
                $('span#score').text(score);
            }
        }
    }, 100);
}

function howto() {
    var modal = document.getElementById('howto');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block"
    span.onclick = function() {
        modal.style.display = "none";
        clearInterval(check);
    }
}
// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var repl = document.getElementsByClassName("button")[0];
// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
//     clearInterval(check);
// }
repl.onclick = function() {
    modal.style.display = "none";
    $('span#score').text(score);
    clearInterval(check);
    score = 0;
    playplay();
}
// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         clearInterval(check);
//     }
// }