var obj;
var obj2;
var obj3;
var obj4;
var obj5;
var objf;
var noSound, noSound2, noSound3, noSound4, noSound5, yes;
var nisit;
var x = 0;
var i = 0;
var hp;
var hp2;
var hp3;
var bgSound;
var power = 3;
var precentOfHeight = window.innerHeight;
var precentOfWidth = window.innerWidth;
const randomx = Math.floor(Math.random()*precentOfWidth);
const randomy = Math.floor(Math.random()*precentOfHeight);
var myScore;
var scoreImage;
var points = 0;

console.log(document.getElementById('myModal'))

function startGame() {
    modalStart.style.display = "none";
    nisit = new component(precentOfHeight*0.15, precentOfHeight*0.18, "img/nisti-right.png", 0, (precentOfHeight-(precentOfHeight*0.18)),"image")
    hp = new component((precentOfHeight*0.07), (precentOfHeight*0.07), "img/heart.png", 1, 0, "image");
    hp2 = new component((precentOfHeight*0.07), (precentOfHeight*0.07), "img/heart.png", (precentOfHeight*0.07)+5, 0, "image");
    hp3 = new component((precentOfHeight*0.07), (precentOfHeight*0.07), "img/heart.png", ((precentOfHeight*0.07)*2)+10, 0, "image");
    obj = new component(precentOfHeight*0.1, precentOfHeight*0.1, "img/coin.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj2 = new component(precentOfHeight*0.07, precentOfHeight*0.15, "img/watch.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj3 = new component(precentOfHeight*0.15, precentOfHeight*0.15, "img/table.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj4 = new component(precentOfHeight*0.12, precentOfHeight*0.12, "img/com.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    obj5 = new component(precentOfHeight*0.07, precentOfHeight*0.18, "img/Bottle.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    objf = new component(precentOfHeight*0.05, precentOfHeight*0.1, "img/ff.gif", Math.floor(Math.random()*precentOfWidth), -Math.floor(Math.random()*precentOfHeight), "image-x");
    myScore = new component("5.5vh", "Consolas", "#ff4646", precentOfWidth-(precentOfHeight*0.18), (precentOfHeight*0.108), "text")
    scoreImage = new component((precentOfHeight*0.35), (precentOfHeight*0.15), "img/score.png", precentOfWidth-(precentOfHeight*0.38), 10, "image");
    bgSound = new sound("sound/bg3.mp3");
    noSound = new sound("sound/no1.mp3");
    noSound2 = new sound("sound/no2.mp3");
    noSound3 = new sound("sound/no3.mp3");
    noSound4 = new sound("sound/no4.mp3");
    noSound5 = new sound("sound/no5.mp3");
    yes = new sound("sound/yes.mp3");
    endSound = new sound("sound/end.mp3")
    myGameArea.start();
}
window.addEventListener( "keydown", doKeyDown, false);
window.addEventListener( "keyup", doKeyDown, false);

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height =  window.innerHeight;        
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 33);
            
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {         
        this.image = new Image();
        this.image.src = color;
    }
    if (type == "image-x") {         
        this.image = new Image();
        this.image.src = color;
    }
    this.angle = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 4;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
              this.x, 
              this.y,
              this.width, this.height);
          }else if(type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
          }else if(type == "image-x"){              
            ctx.save();
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, 
                this.width / -2, 
                this.height / -2,
                this.width, this.height)
            ctx.restore(); 
          }else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
          }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;  
        }       
        return crash;
    }
    this.newPos = function() {
        this.gravitySpeed = this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }  
      
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function toptop(obj){
    if(obj.y >= window.innerHeight ){
        obj.x = Math.floor(Math.random()*precentOfWidth);
        obj.y = -Math.floor(Math.random()*(precentOfHeight*4));
        obj.gravitySpeed += 1;
    }
}
function hit_f(obj){
    obj.x = Math.floor(Math.random()*precentOfWidth);
    obj.y = -Math.floor(Math.random()*(precentOfHeight*2));
    points += 100;
}
function hit(obj){
    obj.x = Math.floor(Math.random()*precentOfWidth);
    obj.y = -Math.floor(Math.random()*(precentOfHeight*2));
}

function updateGameArea() {
    bgSound.play()
    myGameArea.clear();
    obj.angle += 3 * Math.PI / 180;
    obj2.angle += 3 * Math.PI / 180;
    obj3.angle += 3 * Math.PI / 180;
    obj4.angle += 3 * Math.PI / 180;
    obj5.angle += 3 * Math.PI / 180;
    objf.angle += 3 * Math.PI / 180;
    myScore.text =  points
    scoreImage.update();
    myScore.update();
    obj.newPos();
    obj.update();
    obj2.newPos();
    obj2.update();
    obj3.newPos();
    obj3.update();
    obj4.newPos();
    obj4.update();
    obj5.newPos();
    obj5.update();
    objf.newPos();
    objf.update();
    i += 1;
    if(i==500){
        obj.gravity += 1;
        obj2.gravity += 1;
        obj3.gravity += 1;
        obj4.gravity += 1;
        obj5.gravity += 1;
        objf.gravity += 1;
        i = 0
    }
    toptop(obj);
    obj.newPos();
    obj.update();
    toptop(obj2);
    obj2.newPos();
    obj2.update();
    toptop(obj3);
    obj3.newPos();
    obj3.update();
    toptop(obj4);
    obj4.newPos();
    obj4.update();
    toptop(obj5);
    obj5.newPos();
    obj5.update();
    toptop(objf);
    objf.newPos();
    objf.update();
    if(power == 3){
        hp.update();
        hp2.update();
        hp3.update();
    }else if(power == 2){
        hp.update();
        hp2.update();
    }else if(power == 1){
        hp.update();
    }else{
        nisit.image.src = "";
        bgSound.stop();
        endSound.play();
        myGameArea.stop();
        myGameArea.clear();
        modal.style.display = "block";
        document.getElementById("point").innerHTML = "SCORE: "+points;
        span.onclick = function() {
            modal.style.display = "none";
            myGameArea.clear();
            power = 3;
            soc = 3;
            startGame();
        }        
    }
    if (nisit.crashWith(obj)){       
        hit(obj);
        noSound.play()
        obj.newPos();
        obj.update();
        power -= 1 
    }else if(nisit.crashWith(obj2)){
        hit(obj2);
        noSound2.play()
        obj2.newPos();
        obj2.update();
        power -= 1 
    }else if(nisit.crashWith(obj3)){
        hit(obj3);
        noSound3.play()
        obj3.newPos();
        obj3.update();
        power -= 1 
    }else if(nisit.crashWith(obj4)){
        hit(obj4);
        noSound4.play()
        obj4.newPos();
        obj4.update();
        power -= 1 
    }else if(nisit.crashWith(obj5)){
        hit(obj5);
        noSound5.play()
        obj5.newPos();
        obj5.update();
        power -= 1 
    }else if(nisit.crashWith(objf)){
        hit_f(objf);
        yes.play()
        objf.newPos();
        objf.update();
    }else{
        nisit.x += nisit.speedX;
        nisit.y += nisit.speedY;
        nisit.update();
    }
    
}
function doKeyDown(e) {
    if(e.type=='keydown'){
        if(e.keyCode==37){
            nisit.image.src = "img/nisit-left.png"            
            nisit.speedX = -10;
            return false;
        }
        else if(e.keyCode==39){
            nisit.image.src = "img/nisti-right.png"
            nisit.speedX = 10; 
            return false;            
        }
    }else if(e.type=='keyup'){
        clearmove()
        return false;
    }
    return true;
}

function clearmove() {
    nisit.speedX = 0; 
    nisit.speedY = 0; 
}
