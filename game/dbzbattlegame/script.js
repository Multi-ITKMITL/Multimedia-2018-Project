var blood1 = 20;
var blood2 = 20;
var round = 0;
var sign = document.querySelector('#sign');
var preparing = 5;
var snum = 0;
var check4 = 0, check5 = 0;
var check, check2, check3;
var timeup = 90;
var combo1 = 0, combo2 = 0;
function ready2() {
    blood1 = 100;
    blood2 = 100;
    timeup = 90;
    combo1 = 0;
    combo2 = 0;
    updateRound();
    updateBlood1();
    updateBlood2();
    subTitle.innerText = "loading...";
    setTimeout(
        function(){
            countdown();
        },preparing*1000);
    ready();
}
function ready() {
    document.getElementById('play').style.display = "none";
    document.getElementById('Howtoplay').style.display = "none";
    if ((timeup > 0) && (blood1 > 0 && blood2 > 0)) {
        reset();
        clearTimeout(check2);
        clearTimeout(check);
        clearTimeout(check3);
        for (let i = 0; i < preparing; i++) {
            check2 = setTimeout(
                function(){
                    theTime.innerText = "Ready! Round start in "+(preparing-i);
                },i*1000);
        }
        check = setTimeout(
            function(){
                theTime.innerText = "Go!";
                check5 = 1;
                change();
            },preparing*1000);

    }
}
function reset() {
    if (timeup > 0) {
        sign.style.backgroundImage = "";
        snum = 0;
        setTimeout(function(){
            document.getElementById('box1').style.backgroundImage = "url(1-stand2.gif)";
            document.getElementById('box2').style.backgroundImage = "url(2-stand.gif)";
        },3000);
    }
}
function countdown() {
    cd = setInterval(
        function(){
            if (timeup > 0) {
                timeup--;
                updateTime();
                if (blood1 == 0 || blood2 == 0) {
                    clearInterval(cd);
                    updateRound();
                }
            }
            else{
                clearInterval(cd);
            }
        },1000);
}
function updateTime() {
    if (timeup > 0) {
        document.getElementById('round').innerText = timeup;
    }else {
        subTitle.innerHTML = "<button class='button' style='vertical-align:middle' href='#!' onclick='ready2()'><span>PLAY AGAIN</span></button>";
        document.getElementById('round').innerText = "TIMES UP!";
        updateRound();
    }

}
// function updateScore1() {
//     document.getElementById('score1').innerText = score1;
// }
// function updateScore2() {
//     document.getElementById('score2').innerText = score2;
// }
// function updateRound() {
//     if (round <= 10) {
//         round++;
//         if (round == 10){
//             document.getElementById('round').innerText = "final round";
//         }
//         else
//             setTimeout(function(){
//                 document.getElementById('round').innerText = round;
//             },1000);
//     }
//     if (round == 11) {
//             subTitle.innerHTML = "<button class='button' style='vertical-align:middle' href='#!' onclick='ready2()'><span>PLAY AGAIN</span></button>";
//             if(score1 > score2){
//                 theTime.innerText = "Champion is GOKU!";
//             }
//             else if (score1 == score2) {
//                 theTime.innerText = "DRAW!";
//             }else {
//                 theTime.innerText = "Champion is VEGETA!"
//             }
//             setTimeout(function(){
//                 document.getElementById('round').innerText = "ROUND END!";
//             },1100);

//             return;
//         }
// }
function updateRound() {
    if ((blood1 == 0 || blood2 == 0) || (timeup == 0)) {
        if (blood1 > blood2) {
            clearTimeout(check)
            clearTimeout(check2)
            setTimeout(function(){
            theTime.innerText = "Champion is GOKU!";
            subTitle.innerHTML = "<button class='button' style='vertical-align:middle' href='#!' onclick='ready2()'><span>PLAY AGAIN</span></button>";
            },1500);
        }else if (blood1 == blood2) {
            clearTimeout(check)
            clearTimeout(check2)
            setTimeout(function(){
            theTime.innerText = "DRAW!";
            subTitle.innerHTML = "<button class='button' style='vertical-align:middle' href='#!' onclick='ready2()'><span>PLAY AGAIN</span></button>";
            },1500);
        }
        else {
            clearTimeout(check)
            clearTimeout(check2)
            setTimeout(function(){
            theTime.innerText = "Champion is VEGETA!";
            subTitle.innerHTML = "<button class='button' style='vertical-align:middle' href='#!' onclick='ready2()'><span>PLAY AGAIN</span></button>";
            },1500);
        }
    }
}
function updateBlood1() {
    document.getElementById('blood1').style.width = blood1+"%";
    console.log(blood1);
}
function updateBlood2() {
    document.getElementById('blood2').style.width = blood2+"%";
    console.log(blood2);
}
function change() {
    var time = Math.floor(Math.random() * 2000);
    check3 = setTimeout(
        function(){
            sign.style.backgroundImage = "url('fight.png')";
            snum = 1;
        },time);
}
// document.body.onkeydown = function(event) {
//     if (round <= 11 && check5 == 1) {
//       var press = event.code;
//       console.log(event.code);
//       if (press != 1) {
//           if (press == "Space") {
//             if (snum == 1) {
//                 subTitle.innerText = "GOKU Win!";
//                 blood1 -=10;
//                 document.getElementById('box1').style.backgroundImage = "url(1-fight3.gif)";
//                 sound('hit1');
//                 updateScore1();
//                 updateRound();
//                 check5 = 0;
//                 ready();
//                 return;
//             }
//             else {
//                 subTitle.innerText = "GOKU Lose!";
//                 score2++;
//                 sound('miss');
//                 updateScore2();
//                 updateRound();
//                 check5 = 0;
//                 ready();
//             }
//           }
//           if (press == "Enter") {
//             if (snum == 1) {
//                 subTitle.innerText = "VEGETA Win!";
//                 score2++;
//                 document.getElementById('box2').style.backgroundImage = "url(2-fight2.gif)";
//                 sound("hit");
//                 updateScore2();
//                 updateRound();
//                 check5 = 0;
//                 ready();
//                 return;
//             }
//             else {
//                 subTitle.innerText = "VEGETA Lose!";
//                 score1++;
//                 sound('miss');
//                 updateScore1();
//                 updateRound();
//                 check5 = 0;
//                 ready();
//             }
//           }
//         }
//     }
// }
document.body.onkeydown = function(event) {
    if (timeup > 0 && check5 == 1) {
      var press = event.code;
      console.log(event.code);
      if (press != 1) {
          if (press == "Space") {
            if (snum == 1) {
                subTitle.innerText = "GOKU Win!";
                combo1++;
                combo2 = 0;
                if (combo1 == 3) {
                    if ((blood2 - 20) < 0) {
                        blood2 = 0;
                    } else{
                        blood2 -= 20;
                    }
                    combo1 = 0;
                    setTimeout(function(){
                        subTitle.innerText = "GOKU Win with COMBO!";
                    },1000);
                }
                else {
                    blood2 -= 10;
                }
                document.getElementById('box1').style.backgroundImage = "url(1-fight3.gif)";
                sound('hit1');
                updateBlood2();
                updateRound();
                check5 = 0;
                ready();
                return;
            }
            else {
                subTitle.innerText = "GOKU Miss!";
                combo1 = 0;
                blood1 -= 10;
                updateBlood1();
                updateRound();
                sound('miss');
                check5 = 0;
                ready();
                return;
            }
          }
          if (press == "Enter") {
            if (snum == 1) {
                subTitle.innerText = "VEGETA Win!";
                combo2++;
                combo1 = 0;
                if (combo2 == 3) {
                    if ((blood1 - 20) < 0) {
                        blood1 = 0;
                    } else{
                        blood1 -= 20;
                    }
                    combo2 = 0;
                    setTimeout(function(){
                        subTitle.innerText = "VEGETA Win with COMBO!";
                    },1000);
                }
                else {
                    blood1 -= 10;
                }
                document.getElementById('box2').style.backgroundImage = "url(2-fight2.gif)";
                sound("hit");
                updateBlood1();
                updateRound();
                check5 = 0;
                ready();
                return;
            }
            else {
                subTitle.innerText = "VEGETA Miss!";
                combo2 = 0;
                blood2 -= 10;
                updateBlood2();
                updateRound();
                sound('miss');
                check5 = 0;
                ready();
                return;
            }
          }
        }
    }
}
function sound(id) {
        document.getElementById(id).play();
    }
var bgmi = 0;
function playbgm() {
    if (bgmi == 0) {
        sound('bgm');
        bgm++;
    }
}
window.onload = function(){
        setTimeout(function(){playbgm()},500);
    }
function Howtoplay(){
    document.getElementById('Howtoplay').innerText = "GOKU press Spacebar to hit!\n--------\nVEGETA press Enter to hit!";
}