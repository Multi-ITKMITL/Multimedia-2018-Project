function changeKirby() {
  document.getElementById('bird').src = "kirby.png";
  document.body.style.backgroundImage= "url(bg-11.jpg)";
  document.getElementById('score_text').style.color = "black";
  init();
}
function changeFish() {
  document.getElementById('bird').src = "fish3.gif";
  document.body.style.backgroundImage= "url(bg.gif)";
  document.getElementById('score_text').style.color = "black";
  init();
}
function changeCat() {
  document.getElementById('bird').src = "cat.gif";
  document.body.style.backgroundImage= "url(bg10.jpg)";
  document.getElementById('score_text').style.color = "white";
  init();
}
function changeMario() {
  document.getElementById('bird').src = "mario2.png";
  document.body.style.backgroundImage= "url(bg-13.jpg)";
  document.getElementById('score_text').style.color = "black";
  init();
}

function init() {
  var modal = document.getElementById('myModal');
  modal.style.display = "none";   
  var enemies = document.getElementsByClassName("enemy");
  while (enemies.length > 0) {
    enemies[0].remove();
  }

  ng_sound = new Audio("http://soundeffect-lab.info/sound/anime/mp3/stupid3.mp3");
  jump_sound = new Audio("http://soundeffect-lab.info/sound/anime/mp3/puyon1.mp3");
  ng_sound.load();
  jump_sound.load();

  score = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("startBtn").style.display = "none";

  bgX = 0;

  maxX = window.innerWidth;
  
  document.addEventListener("click", fly);
  document.addEventListener("touchstart", fly);
  document.addEventListener('keydown', handleKeydown);

  bird = document.getElementById("bird");
  maxY = window.innerHeight - bird.height;
  ay = 0.4;
  vy = 0;
  y = 300;
  bird.style.top = y + "px";

  start();
}
function handleKeydown(bird) {
    // spacebar
    if (bird.keyCode === 32) {
        fly();
    }
}
function start() {
  moveBirdInterval = setInterval(moveBird, 20);
  genEnemyInterval = setInterval(genEnemy, 2000);
  moveEnemyInterval = setInterval(moveEnemy, 20);
  moveBackgroundInterval = setInterval(moveBackground, 20);
  countScoreInterval = setInterval(countScore, 100);
}

function end() {
  ng_sound.play();
  document.getElementById("startBtn").style.display = "block";
  document.getElementById("startBtn").innerHTML = "RESTART";

    // Get the modal
  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 
  modal.style.display = "block";
  document.getElementById('score').innerHTML
  document.getElementById('endPopup').innerHTML = "your score is " + document.getElementById('score').innerHTML;
  

  clearInterval(moveBirdInterval);
  clearInterval(genEnemyInterval);
  clearInterval(moveEnemyInterval);
  clearInterval(moveBackgroundInterval);
  clearInterval(countScoreInterval);

}

function moveBird() {

  vy += ay;
  y += vy;
  if (y < 0) {
    y = 0;
  } else if (y > maxY) {
    end();
  }
  checkCollision();
  bird.style.top = y + "px";
}

function genEnemy() {
  var pos = 10 + Math.random() * 40;
  var enemyTop = document.createElement("div");
  var enemyBottom = document.createElement("div");
  enemyTop.className = "enemy";
  enemyBottom.className = "enemy";
  enemyTop.style.bottom = pos + 35 + "%";
  enemyBottom.style.top = (100 - pos) + 10 + "%";
  enemyTop.style.left = maxX + "px";
  enemyBottom.style.left = maxX + "px";
  document.body.insertBefore(enemyTop, document.body.firstChild);
  document.body.insertBefore(enemyBottom, document.body.firstChild);
}

function moveEnemy() {
  var enemies = document.getElementsByClassName("enemy");
  for (var i = 0; i < enemies.length; i++) {
    var left = parseInt(enemies[i].style.left.replace(/px/, ""));
    left -= 10;
    if (left < -enemies[i].getBoundingClientRect().width) {
      enemies[i].remove();
    } else {
      enemies[i].style.left = left + "px";
    }
  }
}

function moveBackground() {
  bgX -= 10;
  document.body.style.backgroundPosition = bgX + "px";
}

function countScore(){
  score++;
  document.getElementById("score").textContent = score;
} 

function checkCollision() {
  var enemies = document.getElementsByClassName("enemy");
  var birdRect = bird.getBoundingClientRect();
  for (var i = 0; i < enemies.length; i++) {
    var enemyRect = enemies[i].getBoundingClientRect();
    if (enemyRect.left < birdRect.right && birdRect.left < enemyRect.right) {
      if (enemyRect.top < birdRect.bottom && birdRect.top < enemyRect.bottom) {
        end();
      }
    }
  }
}

function fly() {
  jump_sound.play();
  vy = -10;
}