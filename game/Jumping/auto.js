
var hero;
var platform=[];
function startGame() {
    hero1 = new component(60, 60, "hero1.png", 100, 480, "image");
    hero2 = new component(60, 60, "hero2.png", 300, 480, "image")
    platform1 = new platforming(100, 100, "platform.png", 0, 500, "image");
    platform2 = new platforming(100, 100, "platform.png", 100, 500, "image");
    platform3 = new platforming(100, 100, "platform.png", 200, 500, "image");
    platform4 = new platforming(100, 100, "platform.png", 300, 500, "image");
    platform5 = new platforming(100, 100, "platform.png", 400, 500, "image");
    platform6 = new platforming(100, 100, "platform.png", 500, 500, "image");
    platform7 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), 400, "image");
    platform8 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), 300, "image");
    platform9 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), 200, "image");
    platform10 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), 100, "image");
    platform11 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), 0, "image");
    platform12 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), -100, "image");
    platform13 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), -200, "image");
    platform14 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), -300, "image");
    platform15 = new platforming(100, 100, "platform.png", Math.floor(Math.random() * 500), -400, "image");
    platform16 = new platforming(100, 100, "pixel2.png", Math.floor(Math.random() * 500), -500, "image");

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 580;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = (myGameArea.key || []);
            myGameArea.key[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key[e.keyCode] = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        clearInterval(timer().mySec);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.jump = true;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.x < -60) {

        this.x = 660;

        }else if (this.x > 660) {// if rectangle goes past right boundary

          this.x = -60;

      }
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    if(this.gravitySpeed == 0){this.jump = true;}
    this.hitplat();
    }
    this.hitplat = function(){
      if (this.y >= platform1.y && this.jump == true) {
      this.speedY = 0;
      this.gravitySpeed -= 5;
      this.jump = false;
      }
      if (this.gravitySpeed >= 0){
        this.jump=true;
      }
      if(this.x<=platform7.x+100&&this.x>=platform7.x-20&&this.y <= platform7.y +15 &&this.y >= platform7.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform8.x+100&&this.x>=platform8.x-20&&this.y <= platform8.y +15 &&this.y >= platform8.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform9.x+100&&this.x>=platform9.x-20&&this.y <= platform9.y +15&&this.y >= platform9.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform10.x+100&&this.x>=platform10.x-20&&this.y <= platform10.y +15&&this.y >= platform10.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform11.x+100&&this.x>=platform11.x-20&&this.y <= platform11.y +15&&this.y >= platform11.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform12.x+100&&this.x>=platform12.x-20&&this.y <= platform12.y +15&&this.y >= platform12.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform13.x+100&&this.x>=platform13.x-20&&this.y <= platform13.y +15&&this.y >= platform13.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform14.x+100&&this.x>=platform14.x-20&&this.y <= platform14.y +15&&this.y >= platform14.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(this.x<=platform15.x+100&&this.x>=platform15.x-20&&this.y <= platform15.y +15&&this.y >= platform15.y-15&&this.jump == true){
      this.speedY = 0;
      this.gravitySpeed -= 6;
      this.jump = false;
      }
       if(hero1.x<=platform16.x+100&&hero1.x>=platform16.x-20&&hero1.y <= platform16.y +15&&hero1.y >= platform16.y-15&&hero1.jump == true){
      this.speedY = 0;
      this.gravitySpeed = 0;
      this.jump = false;
      location.href = "over.html";
      }
      else if(hero2.x<=platform16.x+100&&hero2.x>=platform16.x-20&&hero2.y <= platform16.y +15&&hero2.y >= platform16.y-15&&hero2.jump == true){
      this.speedY = 0;
      this.gravitySpeed = 0;
      this.jump = false;
      location.href = "over2.html";
      }
      else if(hero1.y>580){
        location.href = "over2.html";
      
      }
      else if(hero2.y>580){
        location.href = "over.html";
      }





        }
     }

function platforming(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.jump = true;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
     }
function updateGameArea() {
    myGameArea.clear();
    platform1.update();
    platform2.update();
    platform3.update();
    platform4.update();
    platform5.update();
    platform6.update();
    platform7.update();
    platform8.update();
    platform9.update();
    platform10.update();
    platform11.update();
    platform12.update();
    platform13.update();
    platform14.update();
    platform15.update();
    platform16.update();
    hero1.newPos();
    hero1.update();
    hero2.newPos();
    hero2.update();
    platform1.y += 1.5;
    platform2.y += 1.5;
    platform3.y += 1.5;
    platform4.y += 1.5;
    platform5.y += 1.5;
    platform6.y += 1.5;
    platform7.y += 1.5;
    platform8.y += 1.5;
    platform9.y += 1.5;
    platform10.y +=1.5;
    platform11.y +=1.5;
    platform12.y += 1.5;
    platform13.y += 1.5;
    platform14.y += 1.5;
    platform15.y +=1.5;
    platform16.y +=1.5;
   hero1.speedX = 0;
  hero1.speedY *= 0.9;
  hero2.speedX = 0;
  hero2.speedY *= 0.9;
   if (myGameArea.key && myGameArea.key[65]) {hero1.speedX -= 3;}
  if (myGameArea.key && myGameArea.key[68]) {hero1.speedX += 3;}
  if (myGameArea.key && myGameArea.key[37]) {hero2.speedX -= 3;}
  if (myGameArea.key && myGameArea.key[39]) {hero2.speedX += 3;}
    hero1.newPos();
  hero1.update();
  hero2.newPos();
  hero2.update();
}

function clearmove() {
   hero1.speedX = 0; 
   hero1.speedY = 0; 
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

startGame();