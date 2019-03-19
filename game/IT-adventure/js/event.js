var eventBox = [4,5,9,10,12,13,14,16,17,19,20,24,27,30,33,35,37,40,41,43,45,47,48,51,52,56,57,58];
var eventRandomBox = [4,9,12,17,27,30,40,43];
var eventGoodBox = [5,14,35];
var eventBadBox = [10,13,16,24,33,37,41,45,56,57,58];
var lockEventBox = [19,20,47,48,51,52];
var theEvent = document.querySelector("#theEvent");
function checkEvent(eventer) {
    if(eventRandomBox.indexOf(player[eventer].step) != -1){
        num = Math.floor(Math.random()*37) + 1;
    } else if(eventGoodBox.indexOf(player[eventer].step) != -1){
        num = Math.floor(Math.random()*11) + 1;
    } else  if(eventBadBox.indexOf(player[eventer].step) != -1){
        num = Math.floor(Math.random()*22) + 16;
    } else if(player[eventer].step == 19 || player[eventer].step == 20){
        num = 38;
    } else if(player[eventer].step == 47 || player[eventer].step == 48){
        num = 39;
    } else if(player[eventer].step == 51 || player[eventer].step == 52){
        num = 40;
    }
    eventFunction(eventer, num)
}

function eventFunction(eventer, num) {
    console.log(num);
    theEvent.setAttribute("event", num);
    theEvent.style.display = "inline-block";
    switch (num) {
        case 1:
            setTimeout(() => {
                moveCounter(5, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 2:
            setTimeout(() => {
                player[eventer].life += 1;
                if(player[eventer].life > 5){
                    player[eventer].life = 5;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 3:
            setTimeout(() => {
                moveCounter(3, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 4:
            setTimeout(() => {
                moveCounter(1, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 5:
            setTimeout(() => {
                player[eventer].life += 1;
                if(player[eventer].life > 5){
                    player[eventer].life = 5;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 6:
            setTimeout(() => {
                player[eventer].life += 1;
                if(player[eventer].life > 5){
                    player[eventer].life = 5;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 7:
            setTimeout(() => {
                player[eventer].life += 3;
                if(player[eventer].life > 5){
                    player[eventer].life = 5;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 8:
            setTimeout(() => {
                moveCounter(3, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 9:
            setTimeout(() => {
                player[eventer].life += 1;
                if(player[eventer].life > 5){
                    player[eventer].life = 5;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 10:
            setTimeout(() => {
                player[eventer].life += 1;
                if(player[eventer].life > 5){
                    player[eventer].life = 5;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 11:
            setTimeout(() => {
                moveCounter(2, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 12:
        case 13:
        case 14:
        case 15:
            setTimeout(() => {
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 16:
            setTimeout(() => {
                reverseCounter(5, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 17:
            setTimeout(() => {
                player[eventer].life -= 3;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 18:
            setTimeout(() => {
                reverseCounter(2, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 19:
            setTimeout(() => {
                reverseCounter(4, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 20:
            setTimeout(() => {
                reverseCounter(2, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 21:
            setTimeout(() => {
                player[eventer].life -= 1;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 22:
            setTimeout(() => {
                player[eventer].life -= 1;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 23:
            setTimeout(() => {
                player[eventer].life -= 1;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 24:
            setTimeout(() => {
                player[eventer].life -= 1;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 25:
            setTimeout(() => {
                player[eventer].life -= 1;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 26:
            setTimeout(() => {
                player[eventer].life -= 1;
                if(player[eventer].life < 0){
                    player[eventer].life = 0;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 27:
            setTimeout(() => {
                reverseCounter(4, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
            setTimeout(() => {
                player[eventer].move = 0;
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 38:
            setTimeout(() => {
                player[eventer].step = 0;
                document.getElementById(eventer).setAttribute("step", 0);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 39:
            setTimeout(() => {
                player[eventer].step = 58;
                document.getElementById(eventer).setAttribute("step", 58);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 40:
            setTimeout(() => {
                player[eventer].step = 36;
                document.getElementById(eventer).setAttribute("step", 36);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        break;
        default:
            break;
    }
}