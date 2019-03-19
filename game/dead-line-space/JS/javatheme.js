// Project Multimedia XD


var rocket = box('ROCKET', 180, 560, 40, 40);
var laser = box('LASER', -1000, 330, 15, 50);
var left=37, right=39, up=38, down=40, specbar=32; // Key code each button.
var speedrocket = 5;
var controller = new Object();
var last_looprun = 0;


var distance = 0;
var score = 0;
var enemies = new Array();
var stat = 0;

function main(){
	// Main Function has loop with date() function.
	//var x = new Date().getTime();
	//console.log(x);
	if (new Date().getTime() - last_looprun > 15 && stat == 0){ // <--- FPS per 1000 millisecond.
		addEnemy();
		show(); // This Function For Show Object to div.
		updatePosition(); // speed of laser.
		moverocket(); // This Function For Move Rocket div.
		dissa(); // Delete div enemy.
		document.getElementById("distance").innerHTML = "Distance : "+distance;
		document.getElementById('score').innerHTML="Your Score : "+score;
		distance++;
    if(laser.y<0){
        laser.y = -9999;
    }
    last_looprun = new Date().getTime();
  
    if(laser.y == rocket.y - laser.h){
      document.getElementById('laser1').currentTime = 0;
      sound('laser1');
    }
	}
	else if(stat == 1){
		document.getElementById('END').style.visibility="visible";
		document.getElementById('distanceED').innerHTML="Distance : "+(distance-1);
		document.getElementById('scoreED').innerHTML="Your Score : "+score;
	}
	setTimeout( "main()", 2);
}


function show(){
    setPosition(rocket); 
    
    setPosition(laser);
    
    
    for (var i = 0; i < enemies.length; i++) {
    setPosition(enemies[i]);
  }
}

function box(idee, x, y, w,h){ // This Function For Creat Object such ROCKET.
    var result = new Object();
    result.idee = idee;
    result.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    return result;
}

function setPosition(obj){ // This Function For Set Position for Object.
    var name = document.getElementById(obj.idee)
    name.style.left = obj.x + 'px';
    name.style.top = obj.y + 'px';
    name.style.width = obj.w + 'px';
    name.style.height = obj.h + 'px';
}


function moverocket(){
    if(controller.up){
        rocket.y -= speedrocket;
        ckshowposition()
    }
    if(controller.down){
        rocket.y += speedrocket;
        ckshowposition()
    }
    if(controller.left){
        rocket.x -= speedrocket;
        ckshowposition()
    }
    if(controller.right){
        rocket.x += speedrocket;
        ckshowposition()
    }
    if(controller.specbar && laser.y < 0){
        laser.x = rocket.x + 14; // Font laser gun able change this for type object. 
        laser.y = rocket.y - laser.h;
    }
    blockrocket(rocket);
}

function blockrocket(obj){
    if(obj.x < 10){
        obj.x = 10;
    }
    if(obj.y < 10){
        obj.y = 10;
    }
    if(obj.x > 360){
        obj.x = 360;
    }
    if(obj.y > 560){
        obj.y = 560;
    }
}

function ckkey(key, status){
    if(key == left){
        controller.left = status;
    }
    if(key == right){
        controller.right = status;
    }
    if(key == up){
        
        controller.up = status;
    }
    if(key == down){
        controller.down = status;
    }
    if(key == specbar){
        controller.specbar = status;
    }

}

document.onkeydown = function(key){
    ckkey(key.keyCode, true);
}

document.onkeyup = function(key){
    ckkey(key.keyCode, false);
}

function updatePosition(){
	var j =1;
	for (var i = 0; i < enemies.length; i++) {
    enemies[i].y += 5;
    enemies[i].x += getRandom(0, 7) - 3;
    blockrocket(enemies[i], true);
    
  }
    laser.y -= 12;
}

function ckshowposition(){ // This Function For checking position of ROCKET.
	document.getElementById("check1").innerHTML = "X="+rocket.x+" Y="+rocket.y;
}

function addEnemy() {
  var interval = 32;
  if(distance > 10000){
  	interval = 0;
  }else if (distance > 9000) {
    interval = 2;
  } else if (distance > 8000) {
    interval = 4;
  } else if (distance > 7000) {
    interval = 7;
  }else if (distance > 6000) {
    interval = 11;
  } else if (distance > 5000) {
    interval = 14;
  } else if (distance > 4000) {
    interval = 18;
  }else if (distance > 3000) {
    interval = 22;
  } else if (distance > 2000) {
    interval = 25;
  } else if (distance > 1000) {
    interval = 28;
  }
  
  if (getRandom(0, interval) == 0) {
    var elementName = 'ENEMY'+getRandom(0, 10000000);
    var enemy = box(elementName, getRandom(5, 365), 0, getRandom(50,70), getRandom(50,70));
    
    var element = document.createElement('div');
    
    // var randompic = 'BGI/Monsters/1.png';
    // var image = document.createElement("IMG");
    // var imageParent = document.getElementById(enemy.idee);
    element.id = enemy.idee;
    if(distance > 10000){
      element.className = 'enemy10';
    }else if (distance > 9000) {
      element.className = 'enemy9';
    } else if (distance > 8000) {
      element.className = 'enemy8';
    } else if (distance > 7000) {
      element.className = 'enemy7';
    }else if (distance > 6000) {
      element.className = 'enemy6';
    } else if (distance > 5000) {
      element.className = 'enemy5';
    } else if (distance > 4000) {
      element.className = 'enemy4';
    }else if (distance > 3000) {
      element.className = 'enemy3';
    } else if (distance > 2000) {
      element.className = 'enemy2';
    } else if (distance > 1000) {
      element.className = 'enemy1';
    }else{
      element.className = 'enemy';
    }
    document.body.children[0].appendChild(element);
    enemies[enemies.length] = enemy;


  }
}

function getRandom(min,max) {
  return parseInt(Math.random() * (max-min)+min);
}

function dissa() {
  for (var i = 0; i < enemies.length; i++) {
    if (hit(laser, enemies[i])) {
      document.createElement('div').className = 'boom';
      var element = document.getElementById(enemies[i].idee);
      element.style.visibility = 'hidden';
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
      laser.y = -laser.h;
      if(distance > 10000){
        score += 500;
      }else if (distance > 9000) {
        score += 325;
      } else if (distance > 8000) {
        score += 300;
      } else if (distance > 7000) {
        score += 275;
      }else if (distance > 6000) {
        score += 250;
      } else if (distance > 5000) {
        score += 225;
      } else if (distance > 4000) {
        score += 200;
      }else if (distance > 3000) {
        score += 175;
      } else if (distance > 2000) {
        score += 150;
      } else if (distance > 1000) {
        score += 125;
      }else{
        score += 100;
      }
      document.getElementById('boom').volume = 0.25;
      document.getElementById('boom').currentTime = 0;
      sound('boom');
          } else if (hit(rocket, enemies[i])) {
    	stat = 1;
      sound('lose');
  	} 
      else if (enemies[i].y + enemies[i].h >= 600) {
      var element = document.getElementById(enemies[i].idee);
      element.style.visibility = 'hidden';
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
    }
  }
}

function hit(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function retry(){
	for (var i = 0; i < enemies.length; i++) {
      var element = document.getElementById(enemies[i].idee);
      element.style.visibility = 'hidden';
      // element.parentNode.removeChild(element);
      // enemies.splice(i, 1);
  	}
	stat = 0;
	last_looprun = 0;
	score = 0;
	distance = 0;
	rocket = box('ROCKET', 180, 560, 40, 40);
	laser = box('LASER', -1000, 330, 15, 50);
	enemies = new Array();
	document.getElementById('END').style.visibility="hidden";
}
function sound(id){
  var snd = document.getElementById(id);
  snd.play();
  }

function end() {
	//name2.style.top = -400 + 'px';
	//var elem = document.getElementById(rocket.idee);
	//elem.parentNode.removeChild(elem);
  //var element = document.getElementById('cgameover');
  //element.style.visibility = 'visible';
  //element.style.zIndex = "3";
}
main();
