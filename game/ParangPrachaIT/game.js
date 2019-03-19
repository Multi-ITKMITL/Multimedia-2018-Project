var canvas_main = document.getElementById('game-canvas');
var context_main = canvas_main.getContext('2d');

var canvas_render = document.createElement('canvas');
var context_render = canvas_render.getContext('2d');

var background_left, background_right, background_top, background_bottom;
var canvas_left, canvas_right, canvas_top, canvas_bottom;
var trans_x, trans_y, trans_x_max, trans_y_max, trans_value;



trans_x = 0;
trans_y = 0;
trans_value = 5;
trans_x_max = 0;
trans_y_max = 0;


var global_mouse_x = 0;
var global_mouse_y = 0;




//generate mons
var monster_number = 10;
var isPause = false,
    isWin = false,
    isGameOver = false;

var score_to_level_2 = 40;
var score_to_level_3 = 80;
var score_to_level_4 = 120;
var background = new Image();
background.width = window.innerWidth;
background.height = window.innerHeight;


var MyCanvas = {

    canvas_width: 1000,
    canvas_height: 600,


    background_width: 0,
    background_height: 0,

    canvas_max_top: 80,


    screen_size: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    init: function() {
        console.log('MyCanvas crazy');
        this.canvas_width = MyCanvas.screen_size.width;
        this.canvas_height = MyCanvas.screen_size.height;

        canvas_main.width = this.canvas_width;
        canvas_main.height = this.canvas_height;

        this.background_width = background.width;
        this.background_height = background.height;

        canvas_render.width = this.canvas_width;
        canvas_render.height = this.canvas_height;

        background_left = 40;
        background_right = this.background_width;
        background_top = 80;
        background_bottom = this.background_height - 80;

        canvas_left = 0;
        canvas_right = this.canvas_width;
        canvas_top = 0;
        canvas_bottom = this.canvas_height;

        trans_x_max = this.background_width - this.canvas_width;
        trans_y_max = this.background_height - this.canvas_height;

        // console.log(this.canvas_width, this.canvas_height);

        // console.log(background_left, background_right, background_top, background_bottom);
        // console.log(canvas_left, canvas_right, canvas_top, canvas_bottom);

        // console.log(trans_x_max, trans_y_max);

        console.log(canvas_render);
        console.log(canvas_main);

    },
};
 

var picture_onbar = [
    "images/a_right.png",
    "images/missile_right.png",
    "images/rocket_right.png"
];
var pic1 = new Image();
pic1.src = picture_onbar[0];
var pic2 = new Image();
pic2.src = picture_onbar[1];
var pic3 = new Image();
pic3.src = picture_onbar[2];
var MyProgressBar = {
    value: 0,
    max_value: 100,
    width: 500,
    height: 10,
    offsetX: 0,
    offsetY: 0,
    bg_color: 'rgb(255,255,255)',
    line_color: 'red',
    value_color: 'rgb(226,226,42)',

    line1_offsetX: 0,
    line2_offsetX: 0,

    init: function() {
        this.value = 0;
        this.max_value = score_to_level_4;
        this.offsetX = MyCanvas.canvas_width - this.width - 50;
        this.offsetY = 50;
        this.line1_offsetX = this.offsetX + this.width / 3;
        this.line2_offsetX = this.offsetX + this.width / 3 * 2;
    },

    draw: function() {

        if (this.value > this.max_value) {
            this.value = this.max_value;
        }
        context_render.drawImage(pic1, this.line1_offsetX-180, this.offsetY+10, 30, 30);
        context_render.drawImage(pic2, this.line1_offsetX-10, this.offsetY+10, 30, 30);
        context_render.drawImage(pic3, this.line1_offsetX+150, this.offsetY+10, 30, 30);
        context_render.lineJoin = 'round';
        context_render.lineCap = 'round';
        context_render.fillStyle = this.bg_color;
        context_render.fillRect(this.offsetX + trans_x, this.offsetY + trans_y, this.width, this.height);
        context_render.fillStyle = this.value_color;
        context_render.fillRect(this.offsetX + trans_x, this.offsetY + trans_y, this.value / this.max_value * this.width, this.height);
        context_render.fillStyle = this.line_color;
        context_render.fillRect(this.line1_offsetX + trans_x, this.offsetY + trans_y - 1, 2, this.height + 1);
        context_render.fillRect(this.line2_offsetX + trans_x, this.offsetY + trans_y - 1, 2, this.height + 1);
    }
}
var MyScore = {
    left: 30,
    top: 60,
    lineWidth: 20,
    score: 0,
    color: 'blue',

    draw: function() {
        this.left = 30;
        this.top = 60;
        context_render.lineWidth = this.lineWidth;
        context_render.fillStyle = this.color;

        context_render.font = 'normal bold 5em courier';

        context_render.fillText("Score:" + this.score, this.left, this.top);
    }
}

var MyHeart = {
    left: 250,
    top: 60,
    lineWidth: 20,
    heart: 3,
    color: 'red',

    draw: function() {
        this.left = canvas_left+MyScore.left*8;
        this.top = canvas_top+60;
        context_render.lineWidth = this.lineWidth;
        context_render.fillStyle = this.color;

        context_render.font = 'Normal bold 5em courier';

        context_render.fillText("  Heart:" + this.heart, this.left, this.top);
    }
}

var MyNoti = {
    left: 400,
    top: 60,
    lineWidth: 10,
    noti: '',
    color: 'lightgreen',

    lostHeart: function() {
        this.noti = 'Live -1!!!';

        setTimeout(function() {
            MyNoti.noti = '';
            const audio = new Audio("music/ouch.mp3");
            audio.play();
        }, 100);
    },

    levelUp: function() {
        this.noti = 'Level Up!!!';

        setTimeout(function() {
            MyNoti.noti = '';
            const audio = new Audio("music/lvlup.mp3");
            audio.play();
        }, 2000);

        
    },

    pause: function() {
        this.noti = 'Pause!!!';

        setTimeout(function() {
            MyNoti.noti = '';
        }, 2000);
    },

    draw: function() {
        this.left = canvas_left+MyScore.left*18;
        this.top = 60 + canvas_top;
        context_render.lineWidth = this.lineWidth;
        context_render.fillStyle = this.color;

        context_render.font = 'normal bold 5em courier';

        context_render.fillText(this.noti, this.left, this.top);
    }
}

var hero = {
    value: 1,

    x: 0,
    y: 0,

    width: 0,
    height: 0,

    direction: 0,

    init: function() {
        this.x = MyCanvas.screen_size.width /10;
        this.y = MyCanvas.screen_size.height /10;
        this.direction = 'R';
        this.width = 30;
        this.height = 30;
    },

    draw: function() {
    },

    lostHeart: function(cur_value) {
        this.value = 100;
        console.log('lost heart' + cur_value);

        setTimeout(function() {
            console.log('It\'s' + cur_value);
            hero.value = cur_value;
            console.log('hurt' + hero.value);
        }, 1000);
    }
}

var picture_src = [
    "images/star.png",
    "images/a_left.png",
    "images/a_right.png",
    "images/missile_left.png",
    "images/missile_right.png",
    "images/rocket_left.png",
    "images/rocket_right.png",
    "images/alien_left.png",
    "images/alien_right.png",

];
//random mons
var mons_array = [];

var generate_mons = {
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    add: function() {
        var monster = {
            value: 0,
            top: 0,
            left: 0,
            width: 45,
            height: 45,

            img: 0,

            velocityX: -50,
            velocityY: 0,
        }

        let preRand = this.getRandomInt(0, 30);
        var rand = 0;

        if (preRand == 0) {
            rand = 0;
        }

        if (preRand == 1) {
            rand = this.getRandomInt(7, 8);
        }

        if (preRand > 1 && preRand <= 5) {
            rand = this.getRandomInt(5, 6);
        }

        if (preRand > 5 && preRand <= 17) {
            rand = this.getRandomInt(3, 4);
        }
        if (preRand > 17) {
            rand = this.getRandomInt(1, 2);
        }

        monster.img = new Image();
        monster.img.src = picture_src[rand];

        if (rand == 0) {
            monster.value = 1;
            monster.width = 30;
            monster.height = 30;
            monster.velocityX = 0;
            monster.velocityY = this.getRandomInt(1, 5);
            monster.top = 0;
            monster.left = this.getRandomInt(0 + 100, MyCanvas.background_width - 100);
        } else {
            monster.velocityY = 0;

            if (rand == 1 || rand == 2) {
                monster.value = 1;
                monster.width = 40;
                monster.height = 40;
            }

            if (rand == 3 || rand == 4) {
                monster.value = 2;
                monster.width = 50;
                monster.height = 50;
            }

            if (rand == 5 || rand == 6) {
                monster.value = 3;
                monster.width = 80;
                monster.height = 80;
            }

            if (rand == 7 || rand == 8) {
                monster.value = 4;
                monster.width = 100;
                monster.height = 100;
            }

            // gen mons from right
            if (rand % 2 == 0) {
                monster.velocityX = this.getRandomInt(1, 10);
                monster.left = 0;
                monster.top = this.getRandomInt(MyCanvas.canvas_max_top, MyCanvas.background_height - monster.height);
            } else {
                // gen mons from left
                monster.velocityX = this.getRandomInt(-10, -1);
                monster.left = MyCanvas.background_width;
                monster.top = this.getRandomInt(MyCanvas.canvas_max_top, MyCanvas.background_height - monster.height);
            }
        }

        mons_array.push(monster);
    },

    update: function() {
        for (var i = 0; i < mons_array.length; i++) {
            mons_array[i].left += mons_array[i].velocityX;
            mons_array[i].top += mons_array[i].velocityY;
        }
    },

    draw: function() {
        for (var i = 0; i < mons_array.length; i++) {
            var monster = mons_array[i];
            context_render.drawImage(monster.img, monster.left, monster.top, monster.width, monster.height);
        }
    }
}

// check logic หลุดจอ หาย วาร์ป ไป เลย
var MyCheck = {
    outOfRange: function() {
        for (var i = 0; i < mons_array.length; i++) {
            var monster = mons_array[i];
            if (monster.left + monster.width < 0) {
                mons_array.splice(i, 1);
                continue;
            }
            if (monster.left > MyCanvas.background_width) {
                mons_array.splice(i, 1);
                continue;
            }
            if (monster.top > MyCanvas.background_height) {
                mons_array.splice(i, 1);
                continue;
            }
        }

        // while (mons_array.length <= monster_number) {
        //     generate_mons.add();
        // }
    },

    collision: function() {

        var monster;
        var hero_x, hero_y;
        var cur_score = MyScore.score;
        var cur_heart = MyHeart.heart;
        var cur_value = hero.value;

        // immortal :))
        if (cur_value == 100) {
            return;
        }

        if (hero.direction == "L") {
            hero_x = hero.left;
            hero_y = hero.top + hero.height / 2;
        } else {
            hero_x = hero.left + hero.width;
            hero_y = hero.top + hero.height / 2;
        }


        for (var i = 0; i < mons_array.length; i++) {
            monster = mons_array[i];

            if (monster.left < hero_x && hero_x < monster.left + monster.width &&
                monster.top < hero_y && hero_y < monster.top + monster.height) {
                if (monster.value <= hero.value) {
                    cur_score += monster.value;
                    
        setTimeout(function() {
            MyNoti.noti = '';
            const audio = new Audio("music/pop.mp3");
            audio.play();
        }, 10);
                    mons_array.splice(i, 1);
                } else {
                    hero.lostHeart(cur_value);
                    MyNoti.lostHeart();
                    MyHeart.heart--;

                    if (MyHeart.heart < 1) {
                        isGameOver = true;
                    }

                    return;
                }
            }
        }

        while (mons_array.length <= monster_number) {
            generate_mons.add();
        }

        // 
        if (cur_value != 1 && 0 <= cur_score && cur_score < score_to_level_2) {
            cur_value = 1;
            console.log('level 1');
        }
        if (cur_value != 2 && score_to_level_2 <= cur_score && cur_score < score_to_level_3) {
            cur_value = 2;
            MyHeart.heart += 0;
            MyNoti.levelUp();
            hero.width = 55;
            hero.height = 55;
            console.log('level 2');
        }
        if (cur_value != 3 && score_to_level_3 <= cur_score && cur_score < score_to_level_4) {
            cur_value = 3;
            MyHeart.heart += 0;
            MyNoti.levelUp();
            hero.width = 80;
            hero.height = 80;
            console.log('level 3');
        }

        if (cur_value != 4 && cur_score >= score_to_level_4) {
            isWin = true;
        }

        // UI
        hero.value = cur_value;
        MyScore.score = cur_score;
        MyProgressBar.value = cur_score;
    },
}

/* Control setting */
function setMousePosition(e) {

    var mouse_x = e.clientX;
    var mouse_y = e.clientY;

    if (global_mouse_x < mouse_x) {
        hero.direction = 'R';
        document.getElementById('cursorID').src = 'images/hero_right.png'
    } else {
        hero.direction = 'L';
        document.getElementById('cursorID').src = 'images/hero_left.png'
    }

    global_mouse_x = mouse_x;
    global_mouse_y = mouse_y;

    if (global_mouse_x < canvas_left) {
        global_mouse_x = canvas_left - 1;
    }

    if (global_mouse_x > canvas_right) {
        global_mouse_x = canvas_right + 1;
    }

    if (global_mouse_y < canvas_top) {
        global_mouse_y = canvas_top - 1;
    }

    if (global_mouse_y > canvas_bottom) {
        global_mouse_y = canvas_bottom + 1;
    }

    document.getElementById('cursorID').width = hero.width;
    document.getElementById('cursorID').style.left = (global_mouse_x) + 'px';
    document.getElementById('cursorID').style.top = (global_mouse_y) + 'px';
}

document.addEventListener("mousemove", setMousePosition, false);

function changeScreenSize() {
    console.log('changeScreenSize');
}
window.addEventListener("resize", changeScreenSize);


//Pause Function
document.onkeypress = function(e) {
    e = e || window.event;
    if (e.keyCode == 112) { // Ascii value of 'p' == 112
        if (isPause) {
            isPause = false;
            update();
        } else {
            isPause = true;
            MyNoti.pause();
        }
    }
    //Restart Function
    if (e.keyCode == 114) { // Ascii value of 'r' == 114
        location.reload();
    }
};


/*Stat when begin to play*/
function init() {
    MyCanvas.init();
    hero.init();
    MyScore.score = 0;
    MyHeart.heart = 3;
    MyProgressBar.init();

    isPause = false;
    isWin = false;
    isGameOver = false;


    while (mons_array.length > 0) {
        mons_array.pop();
    }

    while (mons_array.length < monster_number) {
        generate_mons.add();
    }

    console.log('init');
};

//update


function beforeupdate() {

    hero.left = global_mouse_x + trans_x;
    hero.top = global_mouse_y + trans_y;

    if (hero.left < background_left) {
        hero.left = background_left;
    }

    if (hero.left > background_right) {
        hero.left = background_right;
    }

    if (hero.top < background_top) {
        hero.top = background_top;
    }

    if (hero.top > background_bottom) {
        hero.top = background_bottom;
    }

    if (global_mouse_x < canvas_left) {
        trans_x -= trans_value;
    }

    if (global_mouse_x > canvas_right) {
        trans_x += trans_value;
    }

    if (global_mouse_y < canvas_top) {
        trans_y -= trans_value;
    }

    if (global_mouse_y > canvas_bottom) {
        trans_y += trans_value;
    }

    trans_x = (trans_x < 0) ? 0 : trans_x;
    trans_y = (trans_y < 0) ? 0 : trans_y;

    trans_x = (trans_x > trans_x_max) ? trans_x_max : trans_x;
    trans_y = (trans_y > trans_y_max) ? trans_y_max : trans_y;
}

function update() {

    // draw background
    // var background = new Image();
    // background.src = "images/background_level1.jpg";
    context_render.drawImage(background, 0, 0);
    beforeupdate();

    // context_render.clearRect(0, 0, canvas_main.width, canvas_main.height);

    MyCheck.outOfRange();
    MyCheck.collision();

    generate_mons.update();
    generate_mons.draw();

    hero.draw();console.log("Hero");
    MyScore.draw();
    MyHeart.draw();
    MyNoti.draw();
    MyProgressBar.draw();

    context_main.drawImage(canvas_render, trans_x, trans_y, MyCanvas.canvas_width, MyCanvas.canvas_height,

        0, 0, MyCanvas.canvas_width, MyCanvas.canvas_height);

    if (isWin) {
        console.log("WIN WIN WIN");
        var img = new Image();
        img.src = "images/control/win.png";
        img.onload = function() {
            context_main.drawImage(img, (MyCanvas.canvas_width - img.width) / 2,
                (MyCanvas.canvas_height - img.height) / 2);
            const audio = new Audio("music/win.mp3");
            audio.play();
        };

        return;
    }

    if (isGameOver) {
        console.log("GAME OVER");
        var img = new Image();
        img.src = "images/control/gameover.jpg";
        img.onload = function() {
            context_main.drawImage(img, (MyCanvas.canvas_width - img.width) / 2,
                (MyCanvas.canvas_height - img.height) / 2);
                const audio = new Audio("music/fail.mp3");
                audio.play();
        };
        var wow = new Image();
            wow.src = "images/restart.jpg";
            wow.onload = function() {
                context_main.drawImage(wow, (MyCanvas.canvas_width - wow.width) / 2,
                    (MyCanvas.canvas_height - 200));
            }; 
        return;
    }
    if (isPause) {
        console.log("Pause")
        setTimeout(function() {
            var img = new Image();
            img.src = "images/pause.jpg";
            img.onload = function() {
                context_main.drawImage(img, (MyCanvas.canvas_width - img.width) / 2,
                    (MyCanvas.canvas_height - img.height) / 2);
            };
            var wow = new Image();
            wow.src = "images/restart.jpg";
            wow.onload = function() {
                context_main.drawImage(wow, (MyCanvas.canvas_width - wow.width) / 2,  (MyCanvas.canvas_height - 100));
            };      
        }, 100);
    }

    if (!isPause) {
        requestAnimationFrame(update);
    }
}

// run
background.src = "images/bg.jpg";

background.onload = function() {
    init();
    update();
    playvol();
}

function playvol() {
    document.getElementById('game-audio').play();
    setTimeout("playvol()", 1000);
}