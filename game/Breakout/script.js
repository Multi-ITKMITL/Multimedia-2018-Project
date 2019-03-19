var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var paused = document.getElementById('paused');
  canvas.style.display="none";
  paused.style.display="none";
  helpMenu.style.display="none";
  helpback.style.display="none";
  helpLabel.style.display="none";
  pauseback.style.display="none";
  gameOverScreen.style.display="none";
  gameoverLabel.style.display="none";
  winScreen.style.display="none";

var timeSec = 0;
var timeMin = 0;
var score = 0;
var lives = 3;
var pause = false;
var help = false;
var ballRad = 8.5;
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 6;
var dy = -6;

var padHeight = 10;
var padWidth = 150;
var padX = (canvas.width - padWidth)/2;

var brickCount = 18;
var brickColumn = 5;
var brickWidth = 50;
var brickHeight = 25;
var brickPad = 4;
var brickOffsetLeft = 15;
var brickOffsetTop = 35;
var bricks = [];

for(var c = 0; c < brickColumn; c++){
  bricks[c] = [];
  for (var r = 0; r < brickCount; r++) {
    bricks[c][r] = {x: 0, y:0, status: 1};
    console.log(bricks[c][r]);
  }
}

function save() {
  var saves;
    saves += "\n";
    saves += " Score: " + score + " Time: " +
    timeMin + ":" + timeSec;//


  var hiddenElement = document.createElement('a');

  hiddenElement.href = 'data:attachment/text,' + encodeURI(saves);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'breakout score.txt';
  hiddenElement.click();
}

document.getElementById("coinbut").onclick = function() {coin()};
function coin() {
  var coin = document.getElementById("coin");
  coin.volume = 0.5;
  coin.play();

  canvas.style.display="block";
  helpLabel.style.display="block";
  coinbut.style.display="none";
  title.style.display="none";

  draw();
  time = setInterval(timer, 1000);
  }

startup.volume = 0.4;


function restrictAudio(event) {
    if (event.currentTime > 25) {
        event.currentTime = 10
        event.pause();
    }
  }

document.addEventListener("keyup", keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler,false);

  function keyUpHandler(e){
    if(e.keyCode == 82) {
      document.location.reload(1);
    }
      if(e.keyCode == 80){
          if(pause == true){
            var paused = document.getElementById('paused');
            pause = false;
            canvas.style.display="block";
            helpLabel.style.display="block";
            draw();
            paused.style.display="none";
            pauseback.style.display="none";
          }
      else{
          var paused = document.getElementById('paused');
          pause = true;
          canvas.style.display="none";
          helpLabel.style.display="none";
          paused.style.display="block";
          pauseback.style.display="block";
        }

    }

    if (e.keyCode == 72)
      if(help == true){
        pause = false;
        help = false;
        canvas.style.display="block";
        helpLabel.style.display="block";
        draw();
        helpMenu.style.display="none";
        helpback.style.display="none";
      }
    else{
        pause = true;
        help = true;
        canvas.style.display="none";
        helpLabel.style.display="none";
        helpback.style.display="block";
        helpMenu.style.display="block";
    }

  }

function mouseMoveHandler(e){
  var relX = e.clientX - canvas.offsetLeft;
  if (relX > 0 && relX<canvas.width) {
    padX = relX - padWidth/2;
  }
}

function timer(){
  if(!pause){
    timeSec++;
    if(timeSec >= 60){
      timeMin++;
      timeSec = 0;
    }
  }
}
function drawScore(){
  ctx.font = "12px 'Press Start 2P' ";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score:  "+ score, 8, 20);
}
function drawLives(){
  ctx.font = "10px 'Press Start 2P' ";
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives:  " + lives, canvas.width - 100, 20);
}

function drawTime(){
  ctx.font = "12px 'Press Start 2P'";
  ctx.fillStyle = "#fff";
    if(timeSec<10)
      {
        ctx.fillText(+ timeMin+":0"+timeSec, 500, 20);
      }
    else
      {
        ctx.fillText(+ timeMin+":"+timeSec, 500, 20);
      }

}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(padX, canvas.height - padHeight, padWidth, padHeight);
  ctx.fillStyle = "#fffb49";
  ctx.fill();
  ctx.closePath;
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRad, 0, Math.PI*2);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath;
}

function drawBricks() {
  for (var c = 0; c < brickColumn; c++) {
    for(var r = 0; r < brickCount; r++){
      if(bricks[c][r].status == 1){
        var brickX = (r*(brickWidth + brickPad)) + brickOffsetLeft;
        var brickY = (c*(brickHeight + brickPad)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle =  'rgb(' + myRed + ',' + myGreen + ',' + myBlue + ')';
        ctx.fill();
        ctx.closePath;
      }
    }
  }
}

function brickCollision(){
  for (var c = 0; c < brickColumn; c++) {
    for(var r = 0; r < brickCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if(x>b.x &&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
          dy = -dy;
          b.status = 0;
          var beep = document.getElementById("beep");
          beep.volume = 0.2;
          beep.play();
          score += 10;
          if (score == brickCount*brickColumn*10) {
            gameoverLabel.style.display="block";
            gameOverScreen.style.display="none";
            winScreen.style.display="block";
            canvas.style.display="none";
            helpLabel.style.display="none";
            save();

          }
        }
      }

    }
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawLives();
  drawTime();
  drawScore();
  brickCollision();

  if (x + dx > canvas.width - ballRad || x + dx < ballRad) {

    dx = -dx;

  }

  if (y+ dy < ballRad) {

    dy = -dy;

  }

  else if(y + dy > canvas.height - ballRad) {
    if(x>padX && x<padX + padWidth){
      dx = 8*((x - (padX + padWidth/2))/padWidth);
      var plop = document.getElementById("plop");
      plop.volume = 0.2;
      plop.play();
      dy = -dy;
  }

  else{
      lives--;
      if (!lives)
      {
        gameoverLabel.style.display="block";
        gameOverScreen.style.display="block";
        winScreen.style.display="none";
        canvas.style.display="none";
        helpLabel.style.display="none";
        var peep = document.getElementById("peep");
        peep.volume = 0.2;
        peep.play();
        pause = true;
      }
      else {
        x = canvas.width/2;
        y = canvas.height - 30;
        dx = 6;
        dy = -6;
        var peep = document.getElementById("peep");
        peep.volume = 0.2;
        peep.play();

      }
  }
}
  x += dx;
  y += dy;

 if(pause == false)
   {
       requestAnimationFrame(draw);
   }
}

    var myRed = Math.floor(Math.random() * 256); //การสุ่มสี RGB
    var myGreen = Math.floor(Math.random() * 256);
    var myBlue = Math.floor(Math.random() * 256);
