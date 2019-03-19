///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////


/*============================================================*/
/*Link To HTML*/
/*============================================================*/

var html_theLife = 100;
var html_theRound = 1;
var html_theScore = 0;
var html_theAmmo = 100;

function updateHTML() {
	html_theScore = player.score;
	html_theAmmo = player.ammo;
	var lift = document.querySelector('.game_bar div:nth-child(1) .life_energy_bg');
	theScore.innerHTML = html_theScore;
	theRound.innerHTML = html_theRound;
	theAmmo.innerHTML = html_theAmmo;
	lift.style.setProperty('--lift', html_theLife+"%");
}

/*============================================================*/
/*Link To HTML*/
/*============================================================*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var player, enemy, enemy2, counterJ;
var statusjump = 0;
var loopplay = 0;
var enemySp = 0;
var endgame = 0;
var enemyArray = [];
var bullet = 3;//MergeMere//
var enemyDmg = 1;

// ---------- Image ---------

var enemyImage = new Image(50, 80);
enemyImage.src = '../../asset/enemy.gif'
var charImage = new Image(50, 80);
charImage.src = '../../asset/char.gif'
var wallImage = new Image(1000, 500);
wallImage.src = '../../asset/wall.jpg'

// --------- Constructor ---------


function Rectangle(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	return this;
}

function Entity(x, y, width, height, color, hitPoint, image) {
	Rectangle.call(this, x, y, width, height, color);
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.score = 0;
	this.status = 0;
	this.gForce = 10;
	this.hitPoint = hitPoint;
	this.image = image;
	this.ammo = bullet;//MergeMere//

	this.entityUpdate = function entityUpdate() {
		ctx.drawImage(this.image, this.x, this.y);
	}

	this.updatePos = function updatePos() {
		this.y += this.yVelocity + this.gForce;
		this.x += this.xVelocity;
	}

	this.moveRight = () => {
		this.xVelocity = 10;
	}

	this.moveLeft = () => {
		this.xVelocity = -10;
	}

	this.jump = () => {
		this.yVelocity = -20;
		statusjump = 1;
	}

	this.reload = () => {
		this.ammo = bullet;//MergeMere//
	}
	return this;
}

function enemyMovement(obj){
    let xDiff = player.x - obj.x;
    if(Math.abs(xDiff) <= 150 && player.y == obj.y){
        if(player.x > obj.x){
            obj.xVelocity = (6+enemySp);
        } else if(player.x < obj.x){
            obj.xVelocity = -(6+enemySp);
        }
    } else {
        let x = Math.floor(Math.random() * 30) + 1;
        if(x == 1){
            obj.xVelocity = (4+enemySp);
        } else if(x == 2){
            obj.xVelocity = -(4+enemySp);
        }
    }
}

document.body.addEventListener('keydown', (e) => {
	if(e.code == 'KeyD') {
		player.moveRight();
		faceHit = "R";
	} else if (e.code == 'KeyA'){
		player.moveLeft();
		faceHit = "L"
	}else if((e.code == 'KeyH') && (player.score >= 300) &&(html_theLife > 20)){
		player.score -= 300;
		html_theLife += (100 - html_theLife);
	} else if ((e.code == 'Digit1') && (player.score >= 2000) && (enemyDmg > 0.5)){//MergeMere//
		player.score -= 2000;
		enemyDmg *= 0.8;
	} else if ((e.code == 'Digit2') && (player.score >= 500)){//MergeMere//
		player.score -= 500;
		bullet += 1;
	} else if (e.code == 'KeyL' && player.status == 1){
		player.jump();
		player.status = 0;
	} else if (e.code == 'KeyJ') {
		player.reload();
		console.log("Reload!");
	}else if(e.code == 'KeyK' && player.ammo != 0){
		if(faceHit == "L"){
			laser = new Rectangle(player.x, player.y+(player.height/2)+1, 0-player.x, 5, "red");
			// laser.gForce = 0;
			// laser.updatePos();
			// laser.entityUpdate();
			player.ammo -= 1;
			enemyArray.forEach((obj) => {
				if((((player.y+(player.height/2)+1) >= obj.y) && ((player.y+(player.height/2)+1) <= obj.y+obj.height))&& player.x > obj.x) {
					obj.hitPoint = 0;
					obj.y = -500;
					obj.gForce = 0;
					loopplay+=1;
					player.score +=100;
					html_theRound+=1;
					enemySp+=0.5;
				}
			});
		}
		else if(faceHit == "R"){
			laser = new Rectangle(player.x+player.width, player.y+(player.height/2)+1, 1200-player.x, 5, "red");
			// laser.gForce = 0;
			// laser.updatePos();
			// laser.entityUpdate();
			player.ammo -= 1;
			enemyArray.forEach((obj) => {
				if((((player.y+(player.height/2)+1) >= obj.y) && ((player.y+(player.height/2)+1) <= obj.y+obj.height)) && player.x < obj.x){
					obj.hitPoint = 0;
					obj.y = -500;
					obj.gForce = 0;
					loopplay+=1;
					player.score +=100;
					html_theRound+=1;
					enemySp+=0.5;
				}
			});
		}
		console.log("Ammo Left :", player.ammo);
	}
});

document.body.addEventListener('keyup', function(e){
	if(e.code == 'KeyD' || e.code == 'KeyA') {
		player.xVelocity = 0;
	} else if(e.code == 'KeyL'){
		player.yVelocity = 0;
	}
});

const draw = {
	canvas : function drawCanvas(width, height, image) {
		this.width = width;
		this.height = height;
		this.image = image;
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(this.image, 0, 0);
	},
	map : function drawMap() { // Draw map and keep all platform in array
		let platform1 = new Rectangle(370,170,300,10, "#133468");//top1
		let platform2 = new Rectangle(170,370,300,10, "#133468");//top2
		let platform3 = new Rectangle(570,370,300,10, "#133468");//top3
		level = [platform1, platform2, platform3];

	}
}
function collisionDetector(obj) { //Check if player is on platform
	let pat1 = (((obj.y+obj.height) == level[0].y)&&((obj.x+obj.width >= level[0].x)&&(obj.x <= level[0].x+level[0].width)));
	let pat2 = (((obj.y+obj.height) == level[1].y)&&((obj.x+obj.width >= level[1].x)&&(obj.x <= level[1].x+level[1].width)));
	let pat3 = (((obj.y+obj.height) == level[2].y)&&((obj.x+obj.width >= level[2].x)&&(obj.x <= level[2].x+level[2].width)));
	if(pat1 || pat2 || pat3){
		obj.gForce = 0;
		obj.status = 1;
	}
	else{
		obj.gForce = 10;
		obj.status = 0;
	}
}
function parallax(player){ // Parallax effect
	if((player.x+player.width < 0)){
		player.x = 1000;
	}
	else if(player.x > 1000){
		player.x = 0;
	}
	else if(player.y > 500){
		player.y = -50;
	}
}

function jumpLimit(player){ // counterj = Y (before jump)
	let j1 = (((player.y+player.height) == level[0].y)&&((player.x+player.width >= level[0].x)&&(player.x <= level[0].x+level[0].width))&&(statusjump == 0));
	let j2 = (((player.y+player.height) == level[1].y)&&((player.x+player.width >= level[1].x)&&(player.x <= level[1].x+level[1].width))&&(statusjump == 0));
	let j3 = (((player.y+player.height) == level[2].y)&&((player.x+player.width >= level[2].x)&&(player.x <= level[2].x+level[2].width))&&(statusjump == 0));
	if(j1 || j2 || j3){
		counterJ = player.y;
	}
	else if(player.yVelocity ==-20){
		if(player.y+player.height == counterJ-120){
			player.yVelocity = 0;
		}
	}
	else if((player.yVelocity ==0) && (statusjump == 1) && (player.gForce == 0)){
		statusjump = 0;
	}
}
function tophit(obj){
	if ((player.y+player.height == obj.y)&&(player.x+player.width >= obj.x)&&(player.x <= obj.x+obj.width)){
		player.jump();
		player.status = 0;
		obj.y = -100;
		obj.hitPoint = 0;
		loopplay+=1;
		player.score +=100;
	}
}
function enemyattack(obj){
	if(((obj.y+obj.height == player.y)&&(obj.x+obj.width >= player.x)&&(obj.x <= player.x+player.width))){
		html_theLife -= enemyDmg;//MergeMere//
	}
	if((((obj.x <= player.x+player.width) && (obj.x+obj.width >= player.x))&&((obj.y <= player.y+player.height) && (obj.y+obj.width >= player.y)))){
		html_theLife -= enemyDmg;//MergeMere//
	}
}

function enemySpawner() {
	for (let i = 0; i < 3; i++) {
		let foo = new Entity(Math.floor(Math.random() * 800), (Math.floor(Math.random()) * 300), 50, 80, "red", 1, enemyImage);
		enemyArray[i] = foo;
	}
	enemyArray.forEach((obj) => {
		console.log(obj.x);
	});
}

// ---------- Game Loop ----------

function load() {
    draw.canvas(1000, 500, wallImage);
    draw.map();
	player = new Entity(500, 10, 50, 80, "#9ce2a0", 1, charImage);
	enemySpawner();
    setInterval(game, 33); // 33ms ~ 30fps (defalut = 33ms)
}

function render() {
    draw.canvas(1000, 500, wallImage); //render Canvas first
	draw.map(); // than render map
	player.entityUpdate(); // than render everything else
	enemyArray.forEach((obj) => {
		obj.updatePos();
		obj.entityUpdate();
	});
}

function game() { //update here
	if(html_theLife > 20){
		collisionDetector(player);
		parallax(player);
		jumpLimit(player); // player.y(before jump)
		enemyArray.forEach((obj) => {
			enemyattack(obj);
			tophit(obj);
			collisionDetector(obj);
			enemyMovement(obj);
			parallax(obj);
		});

		player.updatePos();
		enemyArray.forEach((obj) => {
			if(obj.hitPoint == 1){
				obj.updatePos();
				collisionDetector(obj);
				parallax(obj);
				enemyMovement(obj);
			}
		});

		if(html_theLife == 100){
			player.color = "#9ce2a0";
		}
		if(html_theLife == 75){
			player.color = "#fffc27";
		}
		if(html_theLife == 50){
			player.color = "red";
		}
		updateHTML();
		render();
	}
	else{
		alert("Your Score : "+player.score);
	}
}
