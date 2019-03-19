var storage = {};
var storage_name = [];
var storage_score = [];
var point = 0;
var s = 0;
game();
function game() {
    var x, y, i, time = -1;
    var num = 2000;
    var move_3 = 9, move_4 = -1, point_start_3, point_start_4 = 10;
    var move_1 = 0, move_2 = 10, point_start_1, point_start_2 = 10;
    var move_5 = 9, move_6 = -1, point_start_5, point_start_6 = 10;
    var move_7 = 0, move_8 = 10, point_start_7, point_start_8 = 10;
    //random&enemy
    var name = prompt('Are You Ready Please enter you name.');
    var main1 = setInterval(function(){
        x = getRandomInt(0, 9);
        y = 0;
        document.querySelector(".enemy1").style.transition = ".3s";
        document.querySelector(".enemy2").style.transition = ".3s";
        if ((move_1 == 0) || (move_1 == 11)) {
            point_start_1 = x;
            move_1 = 0;
            document.querySelector(".enemy1").style.transition = "0s";
        }
        if (move_1 == 4) {
            point_start_2 = x;
            move_2 = 0;
            document.querySelector(".enemy2").style.transition = "0s";
        }
        document.querySelector('.enemy1').setAttribute('x',point_start_1);
        document.querySelector('.enemy1').setAttribute('y',move_1);
        document.querySelector('.enemy2').setAttribute('x',point_start_2);
        document.querySelector('.enemy2').setAttribute('y',move_2);
        document.querySelector('.random1').setAttribute('x',x);
        document.querySelector('.random1').setAttribute('y',y);
        move_1++;
        move_2++;
        }, 1000);
    setTimeout(function(){
        clearInterval(main1)
        main1 = setInterval(function(){
            x = getRandomInt(0, 9);
            y = 0;
            document.querySelector(".enemy1").style.transition = ".3s";
            document.querySelector(".enemy2").style.transition = ".3s";
            if ((move_1 == 0) || (move_1 == 11)) {
                point_start_1 = x;
                move_1 = 0;
                document.querySelector(".enemy1").style.transition = "0s";
            }
            if (move_1 == 4) {
                point_start_2 = x;
                move_2 = 0;
                document.querySelector(".enemy2").style.transition = "0s";
            }
            document.querySelector('.enemy1').setAttribute('x',point_start_1);
            document.querySelector('.enemy1').setAttribute('y',move_1);
            document.querySelector('.enemy2').setAttribute('x',point_start_2);
            document.querySelector('.enemy2').setAttribute('y',move_2);
            document.querySelector('.random1').setAttribute('x',x);
            document.querySelector('.random1').setAttribute('y',y);
            move_1++;
            move_2++;
            }, 750);
    }, 10000);
    setTimeout(function(){
        clearInterval(main1)
        main1 = setInterval(function(){
            x = getRandomInt(0, 9);
            y = 0;
            document.querySelector(".enemy1").style.transition = ".3s";
            document.querySelector(".enemy2").style.transition = ".3s";
            if ((move_1 == 0) || (move_1 == 11)) {
                point_start_1 = x;
                move_1 = 0;
                document.querySelector(".enemy1").style.transition = "0s";
            }
            if (move_1 == 4) {
                point_start_2 = x;
                move_2 = 0;
                document.querySelector(".enemy2").style.transition = "0s";
            }
            document.querySelector('.enemy1').setAttribute('x',point_start_1);
            document.querySelector('.enemy1').setAttribute('y',move_1);
            document.querySelector('.enemy2').setAttribute('x',point_start_2);
            document.querySelector('.enemy2').setAttribute('y',move_2);
            document.querySelector('.random1').setAttribute('x',x);
            document.querySelector('.random1').setAttribute('y',y);
            move_1++;
            move_2++;
            }, 500);
    }, 17500);
    setTimeout(function(){
        clearInterval(main1)
        main1 = setInterval(function(){
            x = getRandomInt(0, 9);
            y = 0;
            document.querySelector(".enemy1").style.transition = ".3s";
            document.querySelector(".enemy2").style.transition = ".3s";
            if ((move_1 == 0) || (move_1 == 11)) {
                point_start_1 = x;
                move_1 = 0;
                document.querySelector(".enemy1").style.transition = "0s";
            }
            if (move_1 == 4) {
                point_start_2 = x;
                move_2 = 0;
                document.querySelector(".enemy2").style.transition = "0s";
            }
            document.querySelector('.enemy1').setAttribute('x',point_start_1);
            document.querySelector('.enemy1').setAttribute('y',move_1);
            document.querySelector('.enemy2').setAttribute('x',point_start_2);
            document.querySelector('.enemy2').setAttribute('y',move_2);
            document.querySelector('.random1').setAttribute('x',x);
            document.querySelector('.random1').setAttribute('y',y);
            move_1++;
            move_2++;
            }, 250);
    }, 22500);
    var main2 = setInterval(function(){
        x = getRandomInt(1, 10);
        y = 9;
        document.querySelector(".enemy3").style.transition = ".3s";
        document.querySelector(".enemy4").style.transition = ".3s";
        if ((move_3 == 9) || (move_3 == -2)) {
            point_start_3 = x;
            move_3 = 9;
            document.querySelector(".enemy3").style.transition = "0s";
        }
        if (move_3 == 5) {
            point_start_4 = x;
            move_4 = 9;
            document.querySelector(".enemy4").style.transition = "0s";
        }
        document.querySelector('.enemy3').setAttribute('x',point_start_3);
        document.querySelector('.enemy3').setAttribute('y',move_3);
        document.querySelector('.enemy4').setAttribute('x',point_start_4);
        document.querySelector('.enemy4').setAttribute('y',move_4);
        document.querySelector('.random2').setAttribute('x',x);
        document.querySelector('.random2').setAttribute('y',y);
        move_3--;
        move_4--;
        },1000)
    setTimeout(function()
    {
        clearInterval(main2)
        main2 = setInterval(function(){
        x = getRandomInt(1, 10);
        y = 9;
        document.querySelector(".enemy3").style.transition = ".3s";
        document.querySelector(".enemy4").style.transition = ".3s";
        if ((move_3 == 9) || (move_3 == -2)) {
            point_start_3 = x;
            move_3 = 9;
            document.querySelector(".enemy3").style.transition = "0s";
        }
        if (move_3 == 5) {
            point_start_4 = x;
            move_4 = 9;
            document.querySelector(".enemy4").style.transition = "0s";
        }
        document.querySelector('.enemy3').setAttribute('x',point_start_3);
        document.querySelector('.enemy3').setAttribute('y',move_3);
        document.querySelector('.enemy4').setAttribute('x',point_start_4);
        document.querySelector('.enemy4').setAttribute('y',move_4);
        document.querySelector('.random2').setAttribute('x',x);
        document.querySelector('.random2').setAttribute('y',y);
        move_3--;
        move_4--;
        },750)
    }, 10000)
    setTimeout(function()
    {
        clearInterval(main2)
        main2 = setInterval(function(){
        x = getRandomInt(1, 10);
        y = 9;
        document.querySelector(".enemy3").style.transition = ".3s";
        document.querySelector(".enemy4").style.transition = ".3s";
        if ((move_3 == 9) || (move_3 == -2)) {
            point_start_3 = x;
            move_3 = 9;
            document.querySelector(".enemy3").style.transition = "0s";
        }
        if (move_3 == 5) {
            point_start_4 = x;
            move_4 = 9;
            document.querySelector(".enemy4").style.transition = "0s";
        }
        document.querySelector('.enemy3').setAttribute('x',point_start_3);
        document.querySelector('.enemy3').setAttribute('y',move_3);
        document.querySelector('.enemy4').setAttribute('x',point_start_4);
        document.querySelector('.enemy4').setAttribute('y',move_4);
        document.querySelector('.random2').setAttribute('x',x);
        document.querySelector('.random2').setAttribute('y',y);
        move_3--;
        move_4--;
        },500)
    }, 17500)
    setTimeout(function()
    {
        clearInterval(main2)
        main2 = setInterval(function(){
        x = getRandomInt(1, 10);
        y = 9;
        document.querySelector(".enemy3").style.transition = ".3s";
        document.querySelector(".enemy4").style.transition = ".3s";
        if ((move_3 == 9) || (move_3 == -2)) {
            point_start_3 = x;
            move_3 = 9;
            document.querySelector(".enemy3").style.transition = "0s";
        }
        if (move_3 == 5) {
            point_start_4 = x;
            move_4 = 9;
            document.querySelector(".enemy4").style.transition = "0s";
        }
        document.querySelector('.enemy3').setAttribute('x',point_start_3);
        document.querySelector('.enemy3').setAttribute('y',move_3);
        document.querySelector('.enemy4').setAttribute('x',point_start_4);
        document.querySelector('.enemy4').setAttribute('y',move_4);
        document.querySelector('.random2').setAttribute('x',x);
        document.querySelector('.random2').setAttribute('y',y);
        move_3--;
        move_4--;
        },250)
    }, 22500)

    var main3 = setInterval(function(){
        x = 9;
        y = getRandomInt(0, 9);
        document.querySelector(".enemy5").style.transition = ".3s";
        document.querySelector(".enemy6").style.transition = ".3s";
        if ((move_5 == 9) || (move_5 == -1)) {
            point_start_5 = y;
            move_5 = 9;
            document.querySelector(".enemy5").style.transition = "0s";
        }
        if (move_5 == 5) {
            point_start_6 = y;
            move_6 = 9;
            document.querySelector(".enemy5").style.transition = "0s";
        }
        document.querySelector('.enemy5').setAttribute('x',move_5);
        document.querySelector('.enemy5').setAttribute('y',point_start_5);
        document.querySelector('.enemy6').setAttribute('x',move_6);
        document.querySelector('.enemy6').setAttribute('y',point_start_6);
        document.querySelector('.random3').setAttribute('x',x);
        document.querySelector('.random3').setAttribute('y',y);
        move_5--;
        move_6--;
    },1000)
    setTimeout(function()
    {
        clearInterval(main3)
        main3 = setInterval(function(){
        x = 9;
        y = getRandomInt(0, 9);
        document.querySelector(".enemy5").style.transition = ".3s";
        document.querySelector(".enemy6").style.transition = ".3s";
        if ((move_5 == 9) || (move_5 == -1)) {
            point_start_5 = y;
            move_5 = 9;
            document.querySelector(".enemy5").style.transition = "0s";
        }
        if (move_5 == 5) {
            point_start_6 = y;
            move_6 = 9;
            document.querySelector(".enemy6").style.transition = "0s";
        }
        document.querySelector('.enemy5').setAttribute('x',move_5);
        document.querySelector('.enemy5').setAttribute('y',point_start_5);
        document.querySelector('.enemy6').setAttribute('x',move_6);
        document.querySelector('.enemy6').setAttribute('y',point_start_6);
        document.querySelector('.random3').setAttribute('x',x);
        document.querySelector('.random3').setAttribute('y',y);
        move_5--;
        move_6--;
        },750)
    }, 10000)
    setTimeout(function()
    {
        clearInterval(main3)
        main3 = setInterval(function(){
        x = 9;
        y = getRandomInt(0, 9);
        document.querySelector(".enemy5").style.transition = ".3s";
        document.querySelector(".enemy6").style.transition = ".3s";
        if ((move_5 == 9) || (move_5 == -1)) {
            point_start_5 = y;
            move_5 = 9;
            document.querySelector(".enemy5").style.transition = "0s";
        }
        if (move_5 == 5) {
            point_start_6 = y;
            move_6 = 9;
            document.querySelector(".enemy6").style.transition = "0s";
        }
        document.querySelector('.enemy5').setAttribute('x',move_5);
        document.querySelector('.enemy5').setAttribute('y',point_start_5);
        document.querySelector('.enemy6').setAttribute('x',move_6);
        document.querySelector('.enemy6').setAttribute('y',point_start_6);
        document.querySelector('.random3').setAttribute('x',x);
        document.querySelector('.random3').setAttribute('y',y);
        move_5--;
        move_6--;
        },500)
    }, 17500)
    setTimeout(function()
    {
        clearInterval(main3)
        main3 = setInterval(function(){
        x = 9;
        y = getRandomInt(0, 9);
        document.querySelector(".enemy5").style.transition = ".3s";
        document.querySelector(".enemy6").style.transition = ".3s";
        if ((move_5 == 9) || (move_5 == -1)) {
            point_start_5 = y;
            move_5 = 9;
            document.querySelector(".enemy5").style.transition = "0s";
        }
        if (move_5 == 5) {
            point_start_6 = y;
            move_6 = 9;
            document.querySelector(".enemy6").style.transition = "0s";
        }
        document.querySelector('.enemy5').setAttribute('x',move_5);
        document.querySelector('.enemy5').setAttribute('y',point_start_5);
        document.querySelector('.enemy6').setAttribute('x',move_6);
        document.querySelector('.enemy6').setAttribute('y',point_start_6);
        document.querySelector('.random3').setAttribute('x',x);
        document.querySelector('.random3').setAttribute('y',y);
        move_5--;
        move_6--;
        },250)
    },22500)

    var main4 = setInterval(function(){
        x = 0;
        y = getRandomInt(1, 10);
        document.querySelector(".enemy7").style.transition = ".3s";
        document.querySelector(".enemy8").style.transition = ".3s";
        if ((move_7 == 0) || (move_7 == 11)) {
            point_start_7 = y;
            move_7 = 0;
            document.querySelector(".enemy7").style.transition = "0s";
        }
        if (move_7 == 4) {
            point_start_8 = y;
            move_8 = 0;
            document.querySelector(".enemy8").style.transition = "0s";
        }
        document.querySelector('.enemy7').setAttribute('x',move_7);
        document.querySelector('.enemy7').setAttribute('y',point_start_7);
        document.querySelector('.enemy8').setAttribute('x',move_8);
        document.querySelector('.enemy8').setAttribute('y',point_start_8);
        document.querySelector('.random4').setAttribute('x',x);
        document.querySelector('.random4').setAttribute('y',y);
        move_7++;
        move_8++;
        },1000)
    setTimeout(function()
    {
        clearInterval(main4)
        main4 = setInterval(function(){
        x = 0;
        y = getRandomInt(1, 10);
        document.querySelector(".enemy7").style.transition = ".3s";
        document.querySelector(".enemy8").style.transition = ".3s";
        if ((move_7 == 0) || (move_7 == 11)) {
            point_start_7 = y;
            move_7 = 0;
            document.querySelector(".enemy7").style.transition = "0s";
        }
        if (move_7 == 4) {
            point_start_8 = y;
            move_8 = 0;
            document.querySelector(".enemy8").style.transition = "0s";
        }
        document.querySelector('.enemy7').setAttribute('x',move_7);
        document.querySelector('.enemy7').setAttribute('y',point_start_7);
        document.querySelector('.enemy8').setAttribute('x',move_8);
        document.querySelector('.enemy8').setAttribute('y',point_start_8);
        document.querySelector('.random4').setAttribute('x',x);
        document.querySelector('.random4').setAttribute('y',y);
        move_7++;
        move_8++;
        },750)
    },10000)
    setTimeout(function()
    {
        clearInterval(main4)
        main4 = setInterval(function(){
        x = 0;
        y = getRandomInt(1, 10);
        document.querySelector(".enemy7").style.transition = ".3s";
        document.querySelector(".enemy8").style.transition = ".3s";
        if ((move_7 == 0) || (move_7 == 11)) {
            point_start_7 = y;
            move_7 = 0;
            document.querySelector(".enemy7").style.transition = "0s";
        }
        if (move_7 == 4) {
            point_start_8 = y;
            move_8 = 0;
            document.querySelector(".enemy8").style.transition = "0s";
        }
        document.querySelector('.enemy7').setAttribute('x',move_7);
        document.querySelector('.enemy7').setAttribute('y',point_start_7);
        document.querySelector('.enemy8').setAttribute('x',move_8);
        document.querySelector('.enemy8').setAttribute('y',point_start_8);
        document.querySelector('.random4').setAttribute('x',x);
        document.querySelector('.random4').setAttribute('y',y);
        move_7++;
        move_8++;
        },500)
    },17500)
    setTimeout(function()
    {
        clearInterval(main4)
        main4 = setInterval(function(){
        x = 0;
        y = getRandomInt(1, 10);
        document.querySelector(".enemy7").style.transition = ".3s";
        document.querySelector(".enemy8").style.transition = ".3s";
        if ((move_7 == 0) || (move_7 == 11)) {
            point_start_7 = y;
            move_7 = 0;
            document.querySelector(".enemy7").style.transition = "0s";
        }
        if (move_7 == 4) {
            point_start_8 = y;
            move_8 = 0;
            document.querySelector(".enemy8").style.transition = "0s";
        }
        document.querySelector('.enemy7').setAttribute('x',move_7);
        document.querySelector('.enemy7').setAttribute('y',point_start_7);
        document.querySelector('.enemy8').setAttribute('x',move_8);
        document.querySelector('.enemy8').setAttribute('y',point_start_8);
        document.querySelector('.random4').setAttribute('x',x);
        document.querySelector('.random4').setAttribute('y',y);
        move_7++;
        move_8++;
        },250)
    },22500)

    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
    }

    var timer = setInterval(function(){
            // เพิ่มเวลา
            ++time;
            // อัพเดทเวลา
            theTime.innerText = time;
    },1000)

    //###### Player Move ######
    var char = document.querySelector(".player");
    var xx = 5, yy = 5;
    document.onkeydown = function(){
        var char = document.querySelector(".player");
      if(window.event.keyCode == 37){
        xx--;
        var sound = document.getElementById('alert').play();
        sound.volume = 0.1;
        if (xx < 0) {
            xx = 0;

        }
        char.setAttribute('x', xx);
      }
      else if(window.event.keyCode == 38){
        yy--;
        var sound = document.getElementById('alert').play();
        sound.volume = 0.1;
        if (yy < 0) {
            yy = 0;
        }
        char.setAttribute('y', yy);
      }
      else if(window.event.keyCode == 39){
        xx++;
        var sound = document.getElementById('alert').play();
        sound.volume = 0.1;
        if (xx > 9) {
            xx = 9;
        }
        char.setAttribute('x', xx);
      }
      else if(window.event.keyCode == 40){
        yy++;
        var sound = document.getElementById('alert').play();
        sound.volume = 0.1;
        if (yy > 9) {
            yy = 9;
        }
        char.setAttribute('y', yy);
      }
    }
    /* ### กฎเกม #### */

    var rule = setInterval(function(){
        document.querySelector('.enemy1').getAttribute('x')
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy1').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy1').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)

            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy2').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy2').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy3').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy3').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy4').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy4').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy5').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy5').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy6').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy6').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy7').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy7').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
        if ( document.querySelector('.player').getAttribute('x') == document.querySelector('.enemy8').getAttribute('x') && document.querySelector('.player').getAttribute('y') == document.querySelector('.enemy8').getAttribute('y') ) {
            clearInterval(rule);
            clearInterval(timer);
            setInterval(function(){
                clearInterval(main1);
                clearInterval(main2);
                clearInterval(main3);
                clearInterval(main4);
            },)
            setTimeout(function(){ again() },1000)
        }
    },)
    /*เริ่มเล่นเกมอีกครั้ง*/
    function again() {
        storage_name[point] = name;
        storage_score[point] = time;
        point++;
        //sort();
        console.log(storage_name);
        console.log(storage_score);
        console.log(point);
        /*ประวัติการเล่น*/
        if(s<=9){
            var para = document.createElement("P");
            var t = document.createTextNode(storage_name[s]+"   =   "+storage_score[s]+"   s.");
            para.appendChild(t);
            document.getElementById("history").appendChild(para);
            s++;
        }



        alert('Lost!! '+name+ ' Score Time : '+time);
        alert('Play again?\nPress Enter');
        document.onkeydown = function(){
            if(window.event.keyCode == 13){
                /*localStorage.setItem('data', JSON.stringify(check));
                var show = localStorage.getItem('data');
                console.log(show);*/
                document.querySelector('.enemy1').setAttribute('x',10);
                document.querySelector('.enemy1').setAttribute('y',0);
                document.querySelector('.enemy2').setAttribute('x',10);
                document.querySelector('.enemy2').setAttribute('y',10);
                document.querySelector('.enemy3').setAttribute('x',10);
                document.querySelector('.enemy3').setAttribute('y',9);
                document.querySelector('.enemy4').setAttribute('x',10);
                document.querySelector('.enemy4').setAttribute('y',-1);
                document.querySelector('.enemy5').setAttribute('x',9);
                document.querySelector('.enemy5').setAttribute('y',10);
                document.querySelector('.enemy6').setAttribute('x',-1);
                document.querySelector('.enemy6').setAttribute('y',10);
                document.querySelector('.enemy7').setAttribute('x',0);
                document.querySelector('.enemy7').setAttribute('y',10);
                document.querySelector('.enemy8').setAttribute('x',10);
                document.querySelector('.enemy8').setAttribute('y',10);
                document.querySelector('.player').setAttribute('x',5);
                document.querySelector('.player').setAttribute('y',5);
                time = 0;
                game();
            }
        }
    }
    function sort() {
        var score_cpy, name_cpy;
        for (i = 0; i < point; ++i)
        {
            for (j = 0; j < point-1; ++j)
            {
                if (storage_score[j] < storage_score[j+1])
                {
                    score_cpy = storage_score[j];
                    storage_score[j] = storage_score[j+1];
                    storage_score[j+1] = score_cpy;
                    name_cpy = storage_name[j];
                    storage_name[j] = storage_name[j+1];
                    storage_name[j+1] = name_cpy;
                }
            }
        }




    }



}