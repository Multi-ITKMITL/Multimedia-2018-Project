var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var flap = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/proof.png";
flap.src = "images/flap.png";
bg.src = "images/BG.jpg"
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var img_obj = {
    'source': null,
    'current': 0,
    'total_frames': 30,
    'width': 130,
    'height': 60
};
img_obj.source = bird;
// loop GIF character cause it can't use normally

function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
    if (iobj.source != null) {
        context.drawImage(iobj.source, iobj.current * iobj.width, 0,
                          iobj.width, iobj.height,
                          x, y, iobj.width, iobj.height);
    }
    iobj.current = (iobj.current + 1) % iobj.total_frames;
                   // incrementing the current frame and assuring animation loop
}

var gap = 200; // ช่องกว่าง Gap
var constant;

var bX = 150; // spawn X
var bY = 130; // spawn Y

setInterval((function (c, i) {
            return function () {
                draw_anim(c, bX, bY, i);
            };
})(ctx, img_obj), 5000);


var score = 0;
var check = 0;
// audio files
var die = new Audio();
var fly = new Audio();
var scor = new Audio();
var intro = new Audio();
intro.src = "sounds/dyna.mp3";
fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
die.src = "die.mp3"
// on key down


document.onkeydown = function(e) {
    // var del =
    switch (e.keyCode) {
        case 13:
            if(check===0){
            document.getElementById('test').style.display = "none"; //Delete flappy bird logo
            intro.play(); //intro music
            return draw(); } //start game
            else{};
        case 38:
        if(check != 1 && check != 0){
            return moveUp(); //if arrow up button has been pressed then move up;
        }
        case 40:
        if(check != 1 && check != 0){
            return moveDown(); //if arrow up button has been pressed then move down;
        }
        case 32:
         if(check === 1){
            location.reload(); // restart the game
    }
}
}

function moveUp() {
    
    bY -= 25; //move up range
    fly.play();
}

function moveDown() {
    bY += 25; //move down range
    fly.play();
}

clearScreen = function() {
    this.ctx.clearRect(0, 0, 900, 500); //clearscreen
};


// pipe coordinates

var pipe = []; //array for pipe

pipe[0] = {
    x: cvs.width,
    y: -100
};




function draw() {

    clearScreen();

    draw_anim(ctx, bX, bY, img_obj);
    for (var i = 0; i < pipe.length; i++) {
        check+=1;
        if(bY<0){ //debug for bird out of screen
            bY = 0;
        }
        if(bY + img_obj.height >= cvs.height - fg.height){
            bY=450;
        }
        constant = pipeNorth.height + gap; //ความกว้าง Gap
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y); //draw upper pipe
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant); //draw lower pipe
        if (score < 3) {              // speed 1 when score < 3
            pipe[i].x -= 2.5;
        } else if (score <= 13) {     // speed 2 when 25 >= score >3
            pipe[i].x -= 5;
        } else {
            pipe[i].x -= 10;          // speed 3 for else score (very hard)
        }
        if (pipe[i].x == 400) { //pipe spawn when previous pipe are at 400 in x
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height//random
            });
        }

        // if bird hit the pipe

        if (bX + img_obj.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + img_obj.height >= pipe[i].y + constant) ) {
            check=1;
            die.play();
            gameOver(); //use game over function
            i = pipe.length // stop spawn pipe
            ctx.fillStyle = "#fff";
            ctx.font = "20px Verdana";
            ctx.fillText("Score : " + score, 10, cvs.height - 20) // display score

        }
 
        if (pipe[i].x == 250) { // score + when bird through the pipe
            score++;
            scor.play();
        }


    }

    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20); //score display

    requestAnimationFrame(draw);

}

function gameOver() {

    clearInterval(this.intervalID);
    document.getElementById("gameover").style.cssText = "z-index:1;";

    document.addEventListener("keydown", document.onkeydown, false);
}
