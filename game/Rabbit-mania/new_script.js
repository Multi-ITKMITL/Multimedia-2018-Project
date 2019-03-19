console.clear();
console.log("Pre-loading.");

// Sound import
var sound_bg = new Audio("sound/bg.ogg");
var sound_shoot = new Audio("sound/shoot.ogg");
var sound_collect = new Audio("sound/collect.ogg");
var sound_hit = new Audio("sound/hit.ogg");
var sound_pass = new Audio("sound/wave_pass.ogg");
var sound_end = new Audio("sound/end.ogg");

sound_bg.volume = 0.2;
sound_shoot.volume = 0.4;
sound_collect.volume = 0.4;
sound_hit.volume = 0.4;
sound_pass.volume = 0.4;
sound_end.volume = 0.4;
sound_bg.loop = true;
sound_end.loop = true;

// Import sprite zone
var Img_Flower_1 = new Image();
var Img_Flower_2 = new Image();
var Img_Flower_3 = new Image();
var Img_Player_up_idle = new Image();
var Img_Player_up1 = new Image();
var Img_Player_up2 = new Image();
var Img_Player_down_idle = new Image();
var Img_Player_down1 = new Image();
var Img_Player_down2 = new Image();
var Img_Player_left_idle = new Image();
var Img_Player_left1 = new Image();
var Img_Player_left2 = new Image();
var Img_Player_right_idle = new Image();
var Img_Player_right1 = new Image();
var Img_Player_right2 = new Image();
var Img_Eneme_up1 = new Image();
var Img_Eneme_down1 = new Image();
var Img_Eneme_down2 = new Image();
var Img_Eneme_left1 = new Image();
var Img_Eneme_left2 = new Image();
var Img_Eneme_right1 = new Image();
var Img_Eneme_right2 = new Image();
var Img_Big_bg = new Image();
var Iimg_end = new Image();

Img_Flower_1.src = "world/Flower/1.png";
Img_Flower_2.src = "world/Flower/2.png";
Img_Flower_3.src = "world/Flower/3.png";
Img_Player_up_idle.src = "charector/player/up_idle.png";
Img_Player_up1.src = "charector/player/up1.png";
Img_Player_up2.src = "charector/player/up2.png";
Img_Player_down_idle.src = "charector/player/down_idle.png";
Img_Player_down1.src = "charector/player/down1.png";
Img_Player_down2.src = "charector/player/down2.png";
Img_Player_left_idle.src = "charector/player/left_idle.png";
Img_Player_left1.src = "charector/player/left1.png";
Img_Player_left2.src = "charector/player/left2.png";
Img_Player_right_idle.src = "charector/player/right_idle.png";
Img_Player_right1.src = "charector/player/right1.png";
Img_Player_right2.src = "charector/player/right2.png";
Img_Eneme_up1.src = "charector/enemy/up1.png";
Img_Eneme_down1.src = "charector/enemy/down1.png";
Img_Eneme_down2.src = "charector/enemy/down2.png";
Img_Eneme_left1.src = "charector/enemy/left1.png";
Img_Eneme_left2.src = "charector/enemy/left2.png";
Img_Eneme_right1.src = "charector/enemy/right1.png";
Img_Eneme_right2.src = "charector/enemy/right2.png";
Img_Big_bg.src = "world/big_bg2.png";
Iimg_end.src = "object/gameover.jpg";

var name = "name";
var display_width = 1600;
var display_height = 900;

console.clear();
console.log("Pre-loading....Completed");

console.log("Connecting to firebase....");
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIgt35xrVZvgiCLd5N5fcQe5WBCbdGdgg",
    authDomain: "gametest-1.firebaseapp.com",
    databaseURL: "https://gametest-1.firebaseio.com",
    projectId: "gametest-1",
    storageBucket: "",
    messagingSenderId: "822843097189"
  };
  firebase.initializeApp(config);

  var database_naja = firebase.database();
console.clear();
console.log("Pre-loading....Completed");
console.log("Connecting to firebase....Completed");


var board = document.querySelector("broad-naja");

function start_game(){

function sendData_end() {
    database_naja.ref('leader-board/'+ name).set({
            score: player.score,
            wave: player.high_wave,
            time: (time_2 - time_1)/1000
    });
  }

// Setup zone
var current_scence = "scence1";
var scence_item_size = 32;
var time_1 = new Date().getTime();
var time_2 = new Date().getTime();

var key_map = {87: false, 65:false, 83:false, 68:false, 32:false};
var player = {
    x: display_width/2,
    y: display_height/2,
    direction: "down",
    speed: 4,
    spike: Img_Player_down1,
    bullet: 8,
    bul_speed: 30,
    score: 0, 
    this_wave: 1,
    wave: 0, 
    high_wave: 1,
    life: 3,
    shoot: false
    }
var enemy_box = [];
var bullet = [];
var bullet_id = 0;
var id_count =0;
var temp_elem;
var power_on = true;
var game_loop_ID = null;
var key_handle_ID = null;
var shot_key_ID = null;


// Processing zone
document.title = "Rabbit!";

function random_me(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
    
function is_collisions(x1, y1, w1, h1, x2, y2, w2, h2){
    // Check for collision
    if ((x2+w2>=x1 && x1>=x2 && y2+h2>=y1 && y1>=y2) || (x2+w2>=x1+w1 && x1+w1>=x2 && y2+h2>=y1 && y1>=y2) || (x2+w2>=x1 && x1>=x2 && y2+h2>=y1+h1 && y1+h1>=y2) || (x2+w2>=x1+w1 && x1+w1>=x2 && y2+h2>=y1+h1 && y1+h1>=y2)){
        return true;
    }
    return false;
}

function enemy(){
    var Img_Eneme = Img_Eneme_down1;
    var enemy_mult = (player.wave * 2)+1;
    var enemy_speed = player.speed+2;
    var add_x = 0;
    var add_y = 0;
    if(player.wave != player.this_wave){
        for(var i=0; i<enemy_mult; i++){
            enemy_box.push([random_me(50, display_width-50), random_me(0, 50), "down", id_count]);
            temp_elem = document.createElement("enemy");
            temp_elem.setAttribute("id", id_count);
            temp_elem.setAttribute("class", "enemy");
            temp_elem.setAttribute("direction", "down");
            temp_elem.appendChild(Img_Eneme_down1.cloneNode(true));
            board.appendChild(temp_elem);
            id_count++;
            enemy_box.push([random_me(50, display_width-50), random_me(display_height-100, display_height-10), "up", id_count]);
            temp_elem = document.createElement("enemy");
            temp_elem.setAttribute("id", id_count);
            temp_elem.setAttribute("class", "enemy");
            temp_elem.setAttribute("direction", "up");
            temp_elem.appendChild(Img_Eneme_up1.cloneNode(true));
            board.appendChild(temp_elem);
            id_count++;
            enemy_box.push([random_me(0, 50), random_me(50, display_height-50), "right", id_count]);
            temp_elem = document.createElement("enemy");
            temp_elem.setAttribute("id", id_count);
            temp_elem.setAttribute("class", "enemy");
            temp_elem.setAttribute("direction", "right");
            temp_elem.appendChild(Img_Eneme_right1.cloneNode(true));
            board.appendChild(temp_elem);
            id_count++;
            enemy_box.push([random_me(display_width-100, display_width-50), random_me(50, display_height-50), "left", id_count]);
            temp_elem = document.createElement("enemy");
            temp_elem.setAttribute("id", id_count);
            temp_elem.setAttribute("class", "enemy");
            temp_elem.setAttribute("direction", "left");
            temp_elem.appendChild(Img_Eneme_down1.cloneNode(true));
            board.appendChild(temp_elem);
            id_count++;
        }
        player.wave = player.this_wave;
    }
    for(var i=0; i<enemy_box.length; i++){
        if(Math.abs( enemy_box[i][0] - player.x+30) - Math.abs( enemy_box[i][1] - player.y) > 1){
            if(enemy_box[i][0] - player.x+30  > 1){
                add_x = -enemy_speed;
                enemy_box[i][2] = "left";
                temp_elem = document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']");
                temp_elem.replaceChild(Img_Eneme_left1.cloneNode(true), temp_elem.firstChild);
            }
            else{
                add_x = enemy_speed;
                enemy_box[i][2] = "right";
                temp_elem = document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']");
                temp_elem.replaceChild(Img_Eneme_right1.cloneNode(true), temp_elem.firstChild);
            }
        }
        else{
            if(enemy_box[i][1] - player.y > 2){
                 add_y = -enemy_speed;
                 enemy_box[i][2] = "up";
                 temp_elem = document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']");
                 temp_elem.replaceChild(Img_Eneme_up1.cloneNode(true), temp_elem.firstChild);
            }
            else{
                add_y = enemy_speed;
                enemy_box[i][2] = "down";
                temp_elem = document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']");
                temp_elem.replaceChild(Img_Eneme_down1.cloneNode(true), temp_elem.firstChild);
            }
        }
        if(enemy_box[i] != enemy_box[enemy_box.length-1]){
            if(is_collisions(enemy_box[i][0], enemy_box[i][1], 32, 32, enemy_box[i+1][0], enemy_box[i+1][1], 32, 32)){
                add_x = -add_x;
                add_y = -add_y;
            }
        }
        else{
            if(is_collisions(enemy_box[i][0], enemy_box[i][1], 32, 32, enemy_box[0][0], enemy_box[0][1], 32, 32)){
                add_x = -add_x;
                add_y = -add_y;
            }
        }
        enemy_box[i][0] += add_x;
        enemy_box[i][1] += add_y;
    }

    for(var i=0; i<enemy_box.length; i++){
        if(enemy_box[i][2] == "up"){Img_Eneme = Img_Eneme_up1;}
        if(enemy_box[i][2] == "down"){Img_Eneme = Img_Eneme_down1;}
        if(enemy_box[i][2] == "left"){Img_Eneme = Img_Eneme_left1;}
        if(enemy_box[i][2] == "right"){Img_Eneme = Img_Eneme_right1;}
    }
}

function end_game(){
    time_2 = new Date().getTime();
    console.log("Time played: " + (time_2 - time_1)/1000 + "s.");
    sound_bg.pause();
    sound_bg.currentTime = 0;
    sound_end.play();
    Iimg_end.style.animation = "end_bloom 2s infinite alternate";
    sendData_end();
    temp_elem = document.createElement("retry");
    temp_elem.innerText = "Try again?";
    temp_elem.setAttribute("onclick", "new_game()");
    board.appendChild(temp_elem);
}

function player_dead(){
    console.log("Player dead");
    player.life--;
    sound_hit.play();
    interval_handle("game_loop", false);
    interval_handle("key_handle", false);
    interval_handle("shot_key", false);
    if(player.high_wave < player.wave){player.high_wave = player.wave;}
    if(player.life>0){
        player.wave = 0;
        player.this_wave = 1;
        setTimeout(function() {
            //clear bullet
            for(var i=bullet.length-1; i>=0;i--){
                 document.querySelector("bullet[id='"+bullet[i][3].toString()+"']").remove();
                 bullet.splice(i, 1);
            }
            //clear enemy
            for(var i=enemy_box.length-1; i>=0; i--){
                document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']").remove();
                enemy_box.splice(i, 1);
            }
            player.x = display_width/2;
            player.y = display_height/2;
            interval_handle("game_loop", true);
            interval_handle("key_handle", true);
            interval_handle("shot_key", true);
        }, 1000);
    }
    else{
        end_game();
    }
}


function hud(score, wave, life, bullet){
    var bullet_box = "";
    for(var i=0; i<bullet; i++){
        bullet_box += "=> ";
    }bullet_box
    var hud_box1 = document.querySelector("hud[id='line1']");
    var hud_box2 = document.querySelector("hud[id='line2']");
    hud_box1.innerText = "life: "+life+"  bullet: "+bullet_box;
    hud_box2.innerText = "score: "+score+"  wave: "+wave;
}


function event_control(score,wave, life, name){
    enemy();
    //remove bullet when it offscreen
    for(var i=bullet.length-1; i>=0;i--){
        if(bullet[i][0] < 0 || bullet[i][0] > display_width || bullet[i][1] < 0 || bullet[i][1] > display_height){
            document.querySelector("bullet[id='"+bullet[i][3].toString()+"']").remove();
            bullet.splice(i, 1);
        }
    }
    // bullet handle
    for(var i=0; i<bullet.length; i++){
            if(bullet[i][2] == 'up'){
                bullet[i][1] -= player.bul_speed;
                }
            else if (bullet[i][2] == 'down'){
                bullet[i][1] += player.bul_speed;
            }
            else if (bullet[i][2] == 'left'){
                bullet[i][0] -= player.bul_speed;
            } 
            else if (bullet[i][2] == 'right'){
                bullet[i][0] += player.bul_speed;
            }
    }
    // remove enemy when it offscreen
        for(var i=enemy_box.length-1; i>=0; i--){
                if(is_collisions(enemy_box[i][0], enemy_box[i][1], 32, 32, player.x, player.y, 32, 32)){
                    player_dead();
                }
                if(enemy_box[i][0] < 0 || enemy_box[i][0] > display_width || enemy_box[i][1] < 0 || enemy_box[i][1] > display_height){
                    document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']").remove();
                    enemy_box.splice(i, 1);
                }
        }
    // Collide of bullet and enemy handle
        for (var i=bullet.length-1; i>=0; i--){
            for (var a =enemy_box.length-1; a>=0; a--){
                if(is_collisions(bullet[i][0], bullet[i][1], 10, 10, enemy_box[a][0], enemy_box[a][1], 32, 32)){
                    sound_collect.play();
                    document.querySelector("enemy[id='"+enemy_box[a][3].toString()+"']").remove();
                    document.querySelector("bullet[id='"+bullet[i][3].toString()+"']").remove();
                    enemy_box.splice(a, 1);
                    bullet.splice(i, 1);
                    player.score += 1;
                    break;
                }
            }
        }
    // Wave control
        if(enemy_box.length == 0){
            sound_pass.play();
            player.this_wave++;
        }

}


function game_loop(){
    hud(player.score, player.wave, player.life, player.bullet- bullet.length);
    event_control(player.score, player.wave, player.life, name);
}

function key_handle(){
    if(key_map[68]){
        player.x<1500? player.x += player.speed: player.x -= player.speed;
        if(player.direction != "right"){
            player.direction = "right";
        }
        if(player.spike != Img_Player_right1){
            board.replaceChild(Img_Player_right1, player.spike);
            player.spike = Img_Player_right1;
        }
    }
    if(key_map[65]){
        player.x>50? player.x -= player.speed: player.x += player.speed;
        if(player.direction != "left"){
            player.direction = "left";
        }
        if(player.spike != Img_Player_left1){
            board.replaceChild(Img_Player_left1, player.spike);
            player.spike = Img_Player_left1;
        }
    }
    if(key_map[87]){
        player.y>50? player.y -= player.speed: player.y += player.speed;
        if(player.direction != "up"){
            player.direction = "up";
        }
        if(player.spike != Img_Player_up1){
            board.replaceChild(Img_Player_up1, player.spike);
            player.spike = Img_Player_up1;
        }
    }
    if(key_map[83]){
        player.y<800? player.y += player.speed: player.y -= player.speed;
        if(player.direction != "down"){
            player.direction = "down";
        }
        if(player.spike != Img_Player_down1){
            board.replaceChild(Img_Player_down1, player.spike);
            player.spike = Img_Player_down1;
        }
    }
    
}

function spike_handle(){
    player.spike.style.zIndex = "3";
    player.spike.style.transform = "translate("+player.x+"px,"+player.y+"px)";
    for(var i=0; i<enemy_box.length; i++){
        var temp_element = document.querySelector("enemy[id='"+enemy_box[i][3].toString()+"']");
        temp_element.setAttribute("style", "transform: translate("+enemy_box[i][0]+"px, "+enemy_box[i][1]+"px);");
    }
    for(var i=0; i<bullet.length; i++){
        var temp_element = document.querySelector("bullet[id='"+bullet[i][3].toString()+"']");
        temp_element.setAttribute("style", "transform: translate("+bullet[i][0]+"px, "+bullet[i][1]+"px);");
    }
}

function shot_key(){
    if(key_map[32] && player.bullet - bullet.length > 0){
        player.shoot = true;
        sound_shoot.play();
        bullet.push([player.x, player.y, player.direction, bullet_id]);
        temp_elem = document.createElement("bullet");
        temp_elem.setAttribute("id", bullet_id);
        temp_elem.setAttribute("direction", player.direction);
        board.appendChild(temp_elem);
        bullet_id++;
    }
}

document.onkeydown = function(evt){
    evt = evt || window.event;
    key_map[evt.keyCode] = true;
};

document.onkeyup = function(evt) {  /*optional */
    evt = evt || window.event;
    key_map[evt.keyCode] = false;
};

function interval_handle(name, power_on){
    if(name=="game_loop"){
        if(power_on){
            game_loop_ID = setInterval(function(){game_loop();}, 50);
        }
        else{
            clearInterval(game_loop_ID);
        }
    }
    else if(name=="key_handle"){
        if(power_on){
            key_handle_ID = setInterval(function(){key_handle(); spike_handle();}, 10);
        }
        else{
            clearInterval(key_handle_ID);
        }
    }
    else if(name=="shot_key"){
        if(power_on){
            shot_key_ID = setInterval(function(){shot_key();}, 100);
        }
        else{
            clearInterval(shot_key_ID);
        }
    }
}

 

    temp_elem = document.querySelector("in-box");
    if(temp_elem != null){
        temp_elem.style = "animation:fadd_out 2s;";
        name = document.querySelector("input").value;
    }
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    temp_elem = document.createElement("hud");
    temp_elem.setAttribute("id", "line1");
    temp_elem.innerText = "Rabbit Mania!!";
    board.appendChild(temp_elem);
    temp_elem = document.createElement("hud");
    temp_elem.setAttribute("id", "line2");
    temp_elem.innerText = "Enter name first!!";
    board.appendChild(temp_elem);
    setTimeout(function() {
        sound_bg.play();
        board.appendChild(player.spike);
        player.spike.style.transform = "translate("+player.x+"px,"+player.y+"px)";
        Iimg_end.style = "width: 100%; z-index: 1; opacity: 0; transition:all .8s;";
        board.appendChild(Iimg_end);
        interval_handle("game_loop", true);
        interval_handle("key_handle", true);
        interval_handle("shot_key", true);
    }, 1000);
}

function new_game(){
    sound_end.pause();
    sound_end.currentTime = 0;
    start_game();
}

function name_check(){
    temp_elem = document.querySelector("input");
    if(temp_elem.value.length > 0){
        temp_elem = document.querySelector("label");
        temp_elem.innerText = "Hello";
        temp_elem = document.querySelector('butt[id="name_check"]');
        setTimeout(function() {
            temp_elem.innerText = "Let's play!";
        }, 1000);
        setTimeout(function() {
            new_game();
        }, 2000);
        
    }
    else{
        temp_elem.style.animation = "warning_field .5s infinite alternate";
        temp_elem.style.webkitAnimationPlayState="running";
        setTimeout(function() {
            temp_elem.style.webkitAnimationPlayState="paused";
        }, 1000);
        
    }
}

function openFullscreen() {
  if (board.requestFullscreen) {
    board.requestFullscreen();
  } else if (board.mozRequestFullScreen) { /* Firefox */
    board.mozRequestFullScreen();
  } else if (board.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    board.webkitRequestFullscreen();
  } else if (board.msRequestFullscreen) { /* IE/Edge */
    board.msRequestFullscreen();
  }
}

function open_scoretab(){
    if(board.querySelector("score-tab") == null){
        temp_elem = document.createElement("score-tab2");
        board.appendChild(temp_elem);
        temp_elem = document.createElement("score-tab");
        board.appendChild(temp_elem);
    }
    else{
        temp_elem = board.querySelector("score-tab");
    }
    if(temp_elem.style.opacity == 1){
        var oppa = 1;
        var timerr = setInterval(function(){
            if(oppa <= 0){clearInterval(timerr);}
                board.querySelector("score-tab").style.opacity = oppa;
                board.querySelector("score-tab2").style.opacity = oppa;
                oppa -= 0.01;
                },10);
        temp_elem.style.zIndex = "-3";
        board.querySelector("score-tab2").style.zIndex = "-4";
    }
    else{
        temp_elem.style.zIndex = "4";
        board.querySelector("score-tab2").style.zIndex = "3";
        var oppa = 0.0;
        var timerr = setInterval(function(){
            if(oppa >= 1){clearInterval(timerr);}
                board.querySelector("score-tab").style.opacity = oppa;
                board.querySelector("score-tab2").style.opacity = oppa;
                oppa += 0.01;
                },10);
        var starCountRef = firebase.database().ref('leader-board/');
        starCountRef.on('value', function(snapshot) {
            while (board.querySelector("score-tab").firstChild) {
                 board.querySelector("score-tab").removeChild(board.querySelector("score-tab").firstChild);
            }
            var big_box = snapshot.val();
            for(i in big_box){
                temp_elem = document.createElement("score");
                var temp_child0 = document.createElement("mini-score");
                var temp_child1 = document.createElement("mini-score");
                var temp_child2 = document.createElement("mini-score");
                var temp_child3 = document.createElement("mini-score");
                temp_child0.innerText = "Name: "+i.toString();
                temp_child1.innerText = "Score: "+big_box[i]["score"].toString();
                temp_child2.innerText = "Time played: "+big_box[i]["time"].toString()+"s";
                temp_child3.innerText = "Wave survied: "+big_box[i]["wave"].toString();
                temp_elem.appendChild(temp_child0);
                temp_elem.appendChild(temp_child1);
                temp_elem.appendChild(temp_child2);
                temp_elem.appendChild(temp_child3);
                board.querySelector("score-tab").appendChild(temp_elem);
            }
        });
    }
}

console.log("WOW! script not error!!");