function openNav() {
  document.getElementById("myNav").style.height = "auto";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

function start(){
  document.querySelector("canvas").style.display = "block";
  document.querySelector("#gui").style.display = "none";
  document.querySelector("#over").style.display = "none";
var width = 500, 
    height = 700,
    gLoop,
    points = 0,
    state = true,

canvas = document.getElementById('canvas'), 
ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

var clear = function(x){
  if (x>=0 && x<=200) {background_img = document.getElementById("bg1");}
  else{if (x>200 && x<=400)background_img = document.getElementById("bg2");
  else{background_img = document.getElementById("bg3")}}
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.drawImage(background_img, 0, 0);
}
var player = new (function(){
    this.image = new Image();
    this.image.src = "http://www.pngall.com/wp-content/uploads/2016/07/Star-Fox-PNG-Pic.png";
    this.isJumping = false;
    this.isFalling = false;
    this.jumpSpeed = 0;
    this.fallSpeed = 0;
    this.width = 100;
    this.height = 100;
    this.X = 0;
    this.Y = 0;
    this.setPosition = function(x, y){
      this.X = x;
      this.Y = y;
      } 
    this.frames = 1;
    this.actualFrame = 0;
    this.interval = 0;
this.jump = function() {
      if (!this.isJumping && !this.isFalling) {
        this.fallSpeed = 0;
        this.isJumping = true;
        this.jumpSpeed = 17;
  }
}
this.checkJump = function() {
    if (this.Y > height*0.4) {
        this.setPosition(this.X, this.Y - this.jumpSpeed);        
    } else {
        if (this.jumpSpeed > 10) points++
        // MoveCircles(this.jumpSpeed * 0.5);
        platforms.forEach(function(platform, ind){
            platform.y += player.jumpSpeed;
            if (platform.y > height) {
                var type = ~~(Math.random() * 5);
                if (type == 0) 
                    type = 1;
                else 
                    type = 0;
                platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
            }
        });
    }
    this.jumpSpeed--;
    if (this.jumpSpeed == 0) {
        this.isJumping = false;
        this.isFalling = true;
        this.fallSpeed = 1;
    }
}

this.checkFall = function(){
    if (this.Y < height - this.height) {
        this.setPosition(this.X, this.Y + this.fallSpeed);
        this.fallSpeed++;
    } else {
        if (points == 0) 
            this.fallStop();
        else 
            GameOver();
    }
}

this.fallStop = function(){
    this.isFalling = false;
    this.fallSpeed = 0;
    this.jump();    
  }
this.moveLeft = function(s){
    this.setPosition(this.X - s, this.Y);
  if (this.X < -65) {
    this.X = width;
  }
}
this.moveRight = function(s){
    this.setPosition(this.X + s, this.Y);
  if (this.X  > width) {
    this.X = -this.width;
  }
}
    this.draw = function(){
      ctx.drawImage(this.image, 0, 0 ,1350, 1500, this.X, this.Y, this.width, this.height);
    }
  
})();

var Platform = function(x, y, type) {
  this.firstColor = '#000000';
  this.secondColor = '#FFFFFF';

  this.onCollide = function() {
    player.fallStop();
  };

  if (type === 1) {
    this.firstColor = '#0000FF';
    this.secondColor = '#FF0000';

    this.onCollide = function() {
      player.fallStop();
      player.jumpSpeed = 50;
    };
  }

  this.isMoving = (Math.random() * 2);
  this.direction= (Math.random() * 2) ? -1 : 1;
  this.x = x;
  this.y = y;
  this.type = type;

  this.draw = function() {
    fillStyle = 'rgba(255, 255, 255, 1)';

    var gradient = ctx.createRadialGradient(this.x + (platformWidth/2), this.y + (platformHeight/2), 5, this.x + (platformWidth/2), this.y + (platformHeight/2), 45);
    gradient.addColorStop(0, this.firstColor);
    gradient.addColorStop(1, this.secondColor);
    ctx.fillStyle = gradient;

    ctx.fillRect(this.x, this.y, platformWidth, platformHeight);
  };

  return this;
};

var nrOfPlatforms = 7, 
  platforms = [],
  platformWidth = 70,
  platformHeight = 20;
var generatePlatforms = function(){
    var position = 0, type;
    for (var i = 0; i < nrOfPlatforms; i++) {
        type = (Math.random()*5);
        if (type == 0) 
          type = 1;
        else 
          type = 0;
        platforms[i] = new Platform(Math.random()*(width-platformWidth),position,type);
        if (position < height - platformHeight) 
            position += (height / nrOfPlatforms);
}
}();

var checkCollision = function(){
    platforms.forEach(function(e, ind){
    if ((player.isFalling) && (player.X < e.x + platformWidth) && (player.X + player.width > e.x) && (player.Y + player.height > e.y) && (player.Y + player.height < e.y + platformHeight)
) {
        e.onCollide();
}})}


var GameOver = function(){
    state = false;

    clearTimeout(gLoop);
    setTimeout(function(){
        clear(points); 
        ctx.fillText("GAME OVER", width / 2 -50, height / 2 - 50);
        ctx.fillText("YOUR RESULT:" + points, width / 2 - 60, height / 2 - 30);
    }, 100);
    document.querySelector(".score").innerText = points;
    document.querySelector("canvas").style.display = "none";
    document.querySelector("#over").style.display = "block";
};



player.setPosition(((width-player.width)/2), (height - player.height));
player.jump();

document.onmousemove = function(e){
if (player.X + canvas.offsetLeft > e.pageX) {
player.moveLeft(20);
} else if (player.X + canvas.offsetLeft < e.pageX) {
player.moveRight(20);
}}

var GameLoop = function(){
    clear(points);
    state = true;
    if (player.isJumping) player.checkJump();
    if (player.isFalling) player.checkFall();
    player.draw();
    platforms.forEach(function(platform, index){
        if (platform.isMoving) {
            if (platform.x < 0) {
                platform.direction = 1;
            } else if (platform.x > width - platformWidth) {
                platform.direction = -1;
            }
            platform.x += platform.direction * (index / 2) * ~~(points / 100);
        }
        platform.draw();
    });
    checkCollision();
    player.draw();
    ctx.fillStyle = "white";
    ctx.font = "15pt Arial";
    ctx.fillText("POINTS:" + points, 10, height-10);
  if (state)
        gLoop = setTimeout(GameLoop, 1000 / 50);
}
GameLoop();

controller = {
  left:false,
  right:false,
  keyListener:function(event) {
    var press = (event.type == "keydown")?true:false;
    switch(event.keyCode) {
      case 37:// left key
        controller.left = press;
      break;
      case 39:// right key
        controller.right = press;
       break;
}}};
        
setInterval(function(){
  if (controller.left) {
    player.moveLeft(2.5);
  }
  else if (controller.right) {
    player.moveRight(2.5);
  
}},1)
window.addEventListener("keydown",controller.keyListener)
window.addEventListener("keyup",controller.keyListener);
}
