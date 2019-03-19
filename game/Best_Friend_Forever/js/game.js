const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;
const KEY_CODE_P = 80;
const KEY_CODE_R = 82;
const KEY_CODE_ulti = 17;
const KEY_CODE_Z = 90;
const KEY_CODE_X = 88;
const KEY_CODE_C = 67;
const KEY_CODE_SP_skill = 16;
const KEY_CODE_ENTER = 13;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const GAME_TOP = 32;
const GAME_BOTTOM = 32;


const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 110;
const PLAYER_HEALTH = 10;
const PLAYER_MINX = PLAYER_WIDTH;
const PLAYER_MAXX = GAME_WIDTH - PLAYER_WIDTH - 200;
const PLAYER_MINY = PLAYER_HEIGHT - 70;
const PLAYER_MAXY = GAME_HEIGHT - PLAYER_HEIGHT;
const PLAYER_STYLE = 5;
const MAX_GAUGE = 10;
const MAX_STACK = 20;
var PLAYER_CHAR = 1;
const num_skill = 2;

const MAX_skill_spaw_delay = 40;

const PLAYER_MAX_SPEED = 600.0;
const METEO_SPEED = 200.0;
const LASER_MAX_SPEED = 300.0;
var LASER_COOLDOWN = 1;
const START_BossX = GAME_WIDTH;
const START_BossY = GAME_HEIGHT /2 ;

const Boss_Enemy_HEALTH = 1;
const Boss_Enemy_COOLDOWN = 3;
const Boss_Enemy_COOLDOWN_RANGE = 0.2;
const Boss_Enemy_SPEED = 2;
const Boss_Enemy_MOVEDELAY = 500;
const Boss_Enemy_MINX = 0;
const Boss_Enemy_MAXX = GAME_WIDTH - 60;
const Boss_Enemy_MINY = 70;
const Boss_Enemy_MAXY = GAME_HEIGHT - 100;
const Boss_Enemy_STYLE = 13;

const VICTORY_SCORE = 30000;

const STORY_START = 8;
const STORY_END = 9;

var GAME_HEAL = 1;
var Boss_Enemy_Damage = 1;
var ON_PAUSE = true;
var ON_PLAY = false;
var ON_STORY = false;
var ON_COUNTDOWN = false;
var SOUND_BGM = .5;
var SOUND_EFFECT = .5;

const GAME_STATE = {
  player_stack: 0,
  skill_spaw: 10,
  MAX_MATEO_DELAY: 1.5,
  METEO_DELAY: 1.5,
  gauge_player: 0,
  Boss_Enemyhealth: 1,
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  upPressed: false,
  downPressed: false,
  spacePressed: false,
  ctrlPressed: false,
  shiftPressd: false,
  playerX: 0,
  playerY: 0,
  player_health: PLAYER_HEALTH,
  playerCooldown: 0,
  lasers: [],
  ultimate_num: [],
  enemies: [],
  meteo: [],
  Boss_EnemyLasers: [],
  Boss_Enemyup: false,
  Boss_Enemydown: false,
  gameOver: false,
  Boss_EnemyX: 0,
  Boss_EnemyY: 0,
  score: 0,
  cdMETEO: 10,
  skillslot: [0, 0, 0],
  devil: false
};

function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function clamp(v, min, max) {
  return Math.max(Math.min(max, v), min);
}

function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

function createPlayer($container) {
  GAME_STATE.playerX = 0;
  GAME_STATE.playerY = GAME_HEIGHT / 2;
  const $player = document.createElement("img");
  $player.src = `img/player/${PLAYER_CHAR}.gif`;
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function destroyPlayer($container, player) {
  boom($container,  GAME_STATE.playerX,  GAME_STATE.playerY);
  $container.removeChild(player);
  GAME_STATE.gameOver = true;
}

function updatePlayer(dt, $container) {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.upPressed) {
    GAME_STATE.playerY -= dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.downPressed) {
    GAME_STATE.playerY += dt * PLAYER_MAX_SPEED;
  }

  GAME_STATE.playerX = clamp(GAME_STATE.playerX, PLAYER_MINX, PLAYER_MAXX,);
  GAME_STATE.playerY = clamp(GAME_STATE.playerY, PLAYER_MINY, PLAYER_MAXY,);

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    if (GAME_STATE.devil){
      createUltimate($container, GAME_STATE.playerX - 50, GAME_STATE.playerY - 100);
    }
    else {
      createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY);
    }
    GAME_STATE.playerCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.ctrlPressed && GAME_STATE.gauge_player == MAX_GAUGE) {
    //createUltimate($container, GAME_STATE.playerX - 50, GAME_STATE.playerY - 100);
    devil();
  }
  if (GAME_STATE.shiftPressd && GAME_STATE.player_stack == MAX_STACK) {
    GAME_STATE.player_stack = 0;
    updatestack();
    createUltimate($container, GAME_STATE.playerX - 50, GAME_STATE.playerY - 100, GAME_STATE.devil);
  }
  if (GAME_STATE.playerCooldown > 0) {
    GAME_STATE.playerCooldown -= dt;
  }

  const player = document.querySelector(".player");
  setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function devil(){
  GAME_STATE.gauge_player = 0;
  updategauge();
  player = document.querySelector(".player");
  player.src = `img/player/devil.gif`;
  GAME_STATE.devil = true;
  setTimeout(function(){
    player.src = `img/player/${PLAYER_CHAR}.gif`;
    GAME_STATE.devil = false;
  }, 5000);
}


function createUltimate($container, x, y, b_size) {
  const $element = document.createElement("img"); 
  $element.src = "img/bullet.gif";
  $element.className = "ultimate";
  if (b_size){
    $element.src = "img/bullet1.gif";
    $element.style.width = "500px";
  }
  $container.appendChild($element);
  const ultimate = { name: "ult", damage: 1, x , y, $element };
  GAME_STATE.lasers.push(ultimate);
  // const audio = new Audio("sound/lazer.mp3");
  // audio.volume = .3 * SOUND_EFFECT;
  // audio.play();
  setPosition($element, x, y);
}



function updategauge(){
  mygauge = document.querySelector("#gauge");
  myfull_gauge = document.querySelector("#Max_gauge");
  if(GAME_STATE.gauge_player == MAX_GAUGE){
    mygauge.classList.add("fullgauge");
    myfull_gauge.classList.add("shake_gauge");
  }
  else{
    mygauge.classList.remove("fullgauge");
    myfull_gauge.classList.remove("shake_gauge");
  }
  mygauge.style.width = `${GAME_STATE.gauge_player/MAX_GAUGE*100}%`;
}



function createStack($container, x, y) {
  GAME_STATE.player_stack = 0;
  updatestack();
  const $element = document.createElement("img"); 
  $element.src = "img/bullet.gif";
  $element.className = "stack";
  $container.appendChild($element);
  const stack = { name: "stack", damage: 1,x , y, $element };
  GAME_STATE.lasers.push(stack);
  // const audio = new Audio("sound/lazer.mp3");
  // audio.volume = .3 * SOUND_EFFECT;
  // audio.play();
  setPosition($element, x, y);
}


function updatestack(){
  mystack = document.querySelector(".percenBar");
  if(GAME_STATE.player_stack == MAX_STACK){
    mystack.classList.add("shake_gauge");
    mystack.classList.add("fullgauge");
  }
  else{
    mystack.classList.remove("shake_gauge");
    mystack.classList.remove("fullgauge");
  }
  mystack.style.width = `${GAME_STATE.player_stack*100/20}%`;
}



function createLaser($container, x, y) {
  const $element = document.createElement("img"); 
  $element.src = "img/heart.gif";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = {name: "laser", x, y, damage: 1,  $element };
  GAME_STATE.lasers.push(laser);
  const audio = new Audio("sound/lazer.mp3");
  audio.volume = .3 * SOUND_EFFECT;
  audio.play();
  setPosition($element, x, y);
  enemymove();
}
function updateLasers(dt, $container) {
  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.x += dt * LASER_MAX_SPEED;
    if (laser.x > GAME_WIDTH) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    eachENEMY($container, r1, laser);
    eachMETEO($container, r1, laser);
  }
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead)
  ;
}

function destroyLaser($container, laser) {
  if (laser.isDead){return;};
  $container.removeChild(laser.$element);
  laser.isDead = true;
}




function eachENEMY($container, r1, laser){
  const enemies = GAME_STATE.enemies;
  for (let j = 0; j < enemies.length; j++) {
    const Boss_Enemy = enemies[j];
    if (Boss_Enemy.isDead) continue;
    const r2 = Boss_Enemy.$element.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) {
      // Boss_Enemy was hit
      Boss_Enemy.health -= laser.damage;
      document.querySelector("#E_health").style.width = `${Boss_Enemy.health/ GAME_STATE.Boss_Enemyhealth * 100}%`;
      if (Boss_Enemy.health <= 0){
      // boom($Boss_Enemy, Boss_Enemy.x, Boss_Enemy.y+GAME_STATE.Boss_EnemyY);
      boom($container, laser.x, laser.y);
      heal($container, GAME_STATE.playerX, GAME_STATE.playerY, GAME_HEAL);
      
      destroyBoss_Enemy($container, Boss_Enemy);
      
      GAME_STATE.score += 10 * GAME_STATE.Boss_Enemyhealth;
      }
      if (laser.name != "ult"){
        GAME_STATE.player_stack = Math.min(MAX_STACK, GAME_STATE.player_stack + 1);
        updatestack();
        destroyLaser($container, laser);
        }
      break;
    }
  }
}

function eachMETEO($container, r1, laser){
  if (laser.isDead) return;
  const meteo = GAME_STATE.Boss_EnemyLasers;
  for (let j = 0; j < meteo.length; j++) {
    const mete_o = meteo[j];
    if (mete_o.isDead) continue;
    const r2 = mete_o.$element.getBoundingClientRect();
    if (rectsIntersect(r1, r2) && mete_o.name === "meteo") {
      // mete_o was hit
      mete_o.hp -= laser.damage;
      if (mete_o.hp <= 0){
      // boom($mete_o, mete_o.x, mete_o.y+GAME_STATE.mete_oY);
      boom($container, laser.x, laser.y);
      destroyBoss_Enemylaser($container, mete_o);
      GAME_STATE.score += 1;
      }
      if (laser.name != "ult"){
      destroyLaser($container, laser);
      }
      break;
    }
  }
}






function damaged($container, x, y, num) {
  const damaged = document.createElement("div");
  GAME_STATE.player_health -= num;
  GAME_STATE.gauge_player = Math.min(MAX_GAUGE, GAME_STATE.gauge_player + num);
  updategauge();
  damaged.innerHTML = `-${num}`;
  damaged.className = "damaged";
  $container.appendChild(damaged);
  document.querySelector('#maxhealth').className = "blood_reduce";
  setPosition(damaged, x, y);
  updatehealth();
  setTimeout(function(){
    document.querySelector('#maxhealth').className = "";
    $container.removeChild(damaged);
  }, 300);
}

function updatehealth(){
  document.querySelector("#P_health").style.width = `${GAME_STATE.player_health/PLAYER_HEALTH*100}%`;
}
function heal($container, x, y, num) {
  const heal = document.createElement("div");
  GAME_STATE.player_health = Math.min(10, GAME_STATE.player_health + num);
  heal.innerHTML = `+${num}`;
  heal.className = "heal";
  $container.appendChild(heal);
  setPosition(heal, x, y);
  updatehealth();
  setTimeout(function(){
    $container.removeChild(heal);
  }, 300);
}



function boom($container, x, y) {
  const boom = document.createElement("img");
  boom.src = "img/boom.gif";
  boom.className = "boom";
  $container.appendChild(boom);
  setPosition(boom, x, y);
  const audio = new Audio("sound/Bomb.mp3");
  audio.volume = .6 * SOUND_EFFECT;
  audio.play();
  setTimeout(function(){
    $container.removeChild(boom);
  }, 1000);
}
















function createBoss_Enemy($container) {
    const x = START_BossX;
    const y = START_BossY;
    document.querySelector("#E_health").style.width = `100%`;
  const $element = document.createElement("img");
  $element.src = `img/enemy/${parseInt(Math.random() * Boss_Enemy_STYLE) + 1}.gif`;
  var size = parseInt(Math.random() * 3) * 40 + 80;
  $element.style.width = `${size}px`;
  $element.className = "Boss_Enemy";
  $container.appendChild($element);
  const Boss_Enemy = {
    maxcooldown: (1-(Math.min(GAME_STATE.score, 30000)/30000)) * 0.5 + 0.5,
    health: GAME_STATE.Boss_Enemyhealth,
    x: x-100,
    y,
    size,
    cooldown: Boss_Enemy_COOLDOWN,
    $element
  };
  GAME_STATE.enemies.push(Boss_Enemy);
  setPosition($element, Boss_Enemy.x, Boss_Enemy.y);
}


function enemymove(){
  GAME_STATE.Boss_Enemyup = Math.random() < 0.5 ? true : false;
}

function updateEnemies(dt, $container) {
        GAME_STATE.Boss_EnemyX = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
        GAME_STATE.Boss_EnemyY += (GAME_STATE.Boss_Enemyup == true? 1: -1) * Boss_Enemy_SPEED;

  const enemies = GAME_STATE.enemies;
  for (let i = 0; i < enemies.length; i++) {
    const Boss_Enemy = enemies[i];
    var x = Boss_Enemy.x + GAME_STATE.Boss_EnemyX;
    var y = Boss_Enemy.y + GAME_STATE.Boss_EnemyY;
    var maxy = Boss_Enemy_MAXY- Boss_Enemy.size/2,
        maxx = Boss_Enemy_MAXX- Boss_Enemy.size/3;
    x = clamp(x, Boss_Enemy_MINX, maxx);
    y = clamp(y, Boss_Enemy_MINY, maxy);
    if (y <= Boss_Enemy_MINY){
      GAME_STATE.Boss_Enemyup = true;
    }
    else if(y >= maxy){
      GAME_STATE.Boss_Enemyup = false;
    }
    setPosition(Boss_Enemy.$element, x, y);
    Boss_Enemy.cooldown -= dt;
    if (Boss_Enemy.cooldown <= 0) {
      createBoss_EnemyLaser($container, x, y);
      Boss_Enemy.cooldown = Boss_Enemy.maxcooldown;
    }
  }
  GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
}

function destroyBoss_Enemy($container, Boss_Enemy) {
  $container.removeChild(Boss_Enemy.$element);
  Boss_Enemy.isDead = true;
  levelup($container);
}


function levelup($container){
  GAME_STATE.MAX_MATEO_DELAY = Math.max(.5, GAME_STATE.MAX_MATEO_DELAY - 0.03);
  LASER_COOLDOWN = Math.max(.2, LASER_COOLDOWN - 0.05);
  GAME_STATE.Boss_Enemyhealth += 3;
  GAME_STATE.Boss_EnemyX = 0;
  GAME_STATE.Boss_EnemyY = 0;
  setTimeout(function(){ createBoss_Enemy($container)}, 1000);
}

function createBoss_EnemyLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/e_bullet.gif";
  $element.className = "Boss_Enemy-laser";
  $container.appendChild($element);
  const laser = {name: "e_laser", x, y, $element };
  GAME_STATE.Boss_EnemyLasers.push(laser);
  setPosition($element, x, y);
}

function updateBoss_EnemyLasers(dt, $container) {
  const lasers = GAME_STATE.Boss_EnemyLasers;
  if (GAME_STATE.gameOver) {
    return;
  }
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.x -= dt * LASER_MAX_SPEED;
    if (laser.x < 0) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const player = document.querySelector(".player");
    const r2 = player.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) {
      // Player was hit
      if(laser.name == "skill"){
        for(let i = 0; i < 3; i++){
          if (GAME_STATE.skillslot[i] == 0){
            GAME_STATE.skillslot[i] = laser.skill;
            updateslot();
            break;
          }
        }
      }
      else{
      damaged($container, laser.x, laser.y, Boss_Enemy_Damage);
        if (GAME_STATE.player_health <= 0){
          destroyPlayer($container, player);
        }
      }
      destroyBoss_Enemylaser($container, laser);
      break;
    }
  }
  GAME_STATE.Boss_EnemyLasers = GAME_STATE.Boss_EnemyLasers.filter(e => !e.isDead);
}
function destroyBoss_Enemylaser($container, laser) {
    $container.removeChild(laser.$element);
    laser.isDead = true;
  }




  function createMETEO($container) {
    var meteosize = (parseInt(Math.random() * 5) + 1);
    var x = GAME_WIDTH - meteosize * 20 + 20;
    var y = Math.random() * GAME_HEIGHT + meteosize * 10;
    y = clamp(y, GAME_TOP, GAME_HEIGHT - 10 * meteosize - 70)
    const $element = document.createElement("img");
    $element.style.width = `${meteosize * 20}px`;
    // $element.style.height = `${meteosize * 20}px`;
    $element.src = `img/E_power/${parseInt(Math.random() * 4) + 1}.gif`;
    $element.className = "meteo";
    $container.appendChild($element);
    const mymeteo = {name: "meteo" , x, y, $element, hp: meteosize};
    GAME_STATE.Boss_EnemyLasers.push(mymeteo);
    setPosition($element, x, y);
  }



  function createSkill($container) {
    const $element = document.createElement("img"); 
    skill = parseInt(Math.random() * num_skill) + 1;
    var x = GAME_WIDTH - 80;
    var y = Math.random() * GAME_HEIGHT + 30;
    y = clamp(y, GAME_TOP, GAME_HEIGHT - 100);
    $element.src = `img/skill/${skill}.gif`;
    $element.className = "skill";
    $container.appendChild($element);
    const myskill = {name: "skill" , x, y, $element, skill};
    GAME_STATE.Boss_EnemyLasers.push(myskill);
    setPosition($element, x, y);
  }
  


function updateslot(){
  slot = GAME_STATE.skillslot
  for(let i = 0; i < slot.length; i++){
    document.querySelector(`.slot${i+1}`).src = `img/skill/${GAME_STATE.skillslot[i]}.gif`;
  }
}



function SpecialSkill(slot){
  const audio = new Audio("sound/PW_UP.mp3");
  audio.volume =   1* SOUND_EFFECT;
  audio.play();
  skill_code = GAME_STATE.skillslot[slot]
  if (skill_code === 1){
    GAME_STATE.player_health = PLAYER_HEALTH;
    updatehealth();
  }
  else if(skill_code === 2){
    GAME_STATE.gauge_player = MAX_GAUGE;
    updategauge();
  }
  GAME_STATE.skillslot[slot] = 0;
  updateslot();
}


function spawnMETEO(dt, $container){
    if (GAME_STATE.METEO_DELAY <= 0){
      createMETEO($container);
      GAME_STATE.METEO_DELAY = GAME_STATE.MAX_MATEO_DELAY;
    }
    else{
      GAME_STATE.METEO_DELAY -= dt;
    }
}

function spawnSKILL(dt, $container){
  if (GAME_STATE.skill_spaw <= 0){
    createSkill($container);
    GAME_STATE.skill_spaw = MAX_skill_spaw_delay + (Math.random() * 20);
  }
  else{
    GAME_STATE.skill_spaw -= dt;
  }
}

function init() {
  updatestack();
  updateslot();
  updategauge();
  ON_PLAY = true;
  ON_PAUSE = false;
  
  document.querySelector("#ingame").style.display = "inherit";
  const $container = document.querySelector(".game");
  setInterval(enemymove, Boss_Enemy_MOVEDELAY);
  createPlayer($container);
  createBoss_Enemy($container);
  // window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.requestAnimationFrame(update);
//   const Boss_EnemySpacing =(GAME_WIDTH - Boss_Enemy_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
//   for (let j = 0; j < 3; j++) {
//     const y = Boss_Enemy_VERTICAL_PADDING + j * Boss_Enemy_VERTICAL_SPACING;
//     for (let i = 0; i < ENEMIES_PER_ROW; i++) {
//       const x = i * Boss_EnemySpacing + Boss_Enemy_HORIZONTAL_PADDING;
//       createBoss_Enemy($container, x, y);
//     }
//   }
}

function playerHasWon() {
  return GAME_STATE.score >= VICTORY_SCORE;
  // return 1;
}


document.getElementById("pausebutton").addEventListener('click', resume, false);
function resume(){
  if (ON_PLAY){ 
    if (ON_PAUSE === false){
      ON_PAUSE = true;
     }
     else{
      GAME_STATE.lastTime = Date.now();
      document.querySelector(".pauseui").style.display = "none";
      window.requestAnimationFrame(update);
      ON_PAUSE = false;
     }
    }
};






function update(e) {
  if (ON_PAUSE){
    document.querySelector(".pauseui").style.display = "block";
    return;
  }
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;
  document.getElementById("score_f").innerHTML = `Score : ${GAME_STATE.score}`;

  if (GAME_STATE.gameOver) {
    gameover();
    return;
  }

  if (playerHasWon()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }
  const $container = document.querySelector(".game");
  spawnMETEO(dt, $container);
  spawnSKILL(dt, $container);
  updatePlayer(dt, $container);
  // updateUltimate(dt, $container);
  updateEnemies(dt, $container);
  updateBoss_EnemyLasers(dt, $container);
  // updateMETEO(dt, $container);
  updateLasers(dt, $container);
  
  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}


function gameover(){
    SOUND_BGM = 0;
    updateBGM();
    const audio = new Audio("sound/gameover.mp3");
    audio.volume = 1 * SOUND_EFFECT;
    audio.loop = true;
    audio.play();
  document.querySelector(".game-over").style.display = "block";
}



function onKeyDown(e) {

  if(ON_PLAY)
  {
    if (e.keyCode === KEY_CODE_LEFT) {
      GAME_STATE.leftPressed = true;
    } else if (e.keyCode === KEY_CODE_RIGHT) {
      GAME_STATE.rightPressed = true;
    } else if (e.keyCode === KEY_CODE_SPACE) {
        if(playerHasWon()){
          if(ON_STORY){
            nextstory();
          }else{
            story();
          }
        }else{
          GAME_STATE.spacePressed = true;
        }
    } else if (e.keyCode === KEY_CODE_UP) {
      GAME_STATE.upPressed = true;
    } else if (e.keyCode === KEY_CODE_DOWN) {
      GAME_STATE.downPressed = true;
    } else if (e.keyCode === KEY_CODE_ulti){
      GAME_STATE.ctrlPressed = true;
    } else if (e.keyCode === KEY_CODE_SP_skill){
      GAME_STATE.shiftPressd = true;
    } else if (e.keyCode === KEY_CODE_Z){
      SpecialSkill(0)
    } else if (e.keyCode === KEY_CODE_X){
      SpecialSkill(1)
    } else if (e.keyCode === KEY_CODE_C){
      SpecialSkill(2)
    }
  } 
  else{
      if (e.keyCode === KEY_CODE_LEFT) {
      slideIMG(-1);
    } else if (e.keyCode === KEY_CODE_RIGHT) {
      slideIMG(1);
    } else if (e.keyCode === KEY_CODE_SPACE) {
        if(ON_STORY){
          nextstory();
        }
        else if (!ON_COUNTDOWN){
        story();
        }
    }
  }
  if (e.keyCode === KEY_CODE_P) {
    resume();
  } else if(e.keyCode === KEY_CODE_R){
    // if(e.keyCode === KEY_CODE_R || (GAME_STATE.gameOver && e.keyCode === KEY_CODE_SPACE))
    window.location.reload()
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  } else if (e.keyCode === KEY_CODE_UP) {
    GAME_STATE.upPressed = false;
  } else if (e.keyCode === KEY_CODE_DOWN) {
    GAME_STATE.downPressed = false;
  } else if (e.keyCode === KEY_CODE_ulti){
    GAME_STATE.ctrlPressed = false;
  } else if (e.keyCode === KEY_CODE_SP_skill){
    GAME_STATE.shiftPressd = false;
  }
}


function slideIMG(n){
  PLAYER_CHAR += n;
  if (PLAYER_CHAR > PLAYER_STYLE){
    PLAYER_CHAR = 1;
  }
  else if (PLAYER_CHAR < 1){
    PLAYER_CHAR = PLAYER_STYLE;
  }
  CslideIMG();
}
function CslideIMG(n){
  document.getElementById("playerchoose").src = `img/player/${PLAYER_CHAR}.gif`;
}

var page = 1;
function story(){
  document.querySelector("audio").play();
  ON_STORY = true;
  document.querySelector(".gui").style.display = "none";
  document.querySelector("#ingame").style.display = "none";
  document.querySelector(".congratulations").style.display = "none";
  m_story = document.querySelector(".story");
  m_story.style.display = "block";
  // init();
}
function nextstory(){
  page += 1;
  m_story = document.querySelector(".story");
  document.querySelector(".story_mini").src = `img/story/first/${page}.jpg`;
  if (page > STORY_START && !ON_PLAY){
    ON_STORY = false;
    m_story.style.display = "none";
    document.querySelector(".countdown").style.display = "block";
    ON_COUNTDOWN = true;
    const audio = new Audio("sound/321.mp3");
    audio.volume = .2;
    audio.play();
    setTimeout(function(){
      document.querySelector("#ingame").style.display = "block";
      ON_COUNTDOWN = false;
      document.querySelector(".countdown").style.display = "none";
      init();
    }, 2800);
  }
  if(page > STORY_END){
    document.querySelector("#ingame").style.display = "block";
    m_story.style.display = "none";
    gameover();
  }
}
window.addEventListener("keydown", onKeyDown);

document.querySelector(".story").addEventListener("click", function(){
  nextstory(); 
  });


function updateBGM(){
  document.querySelector("audio").volume = SOUND_BGM;
}

function updatesound(type,val){
  if(type == 'bgm'){
    SOUND_BGM = val/100;
    updateBGM();
  }else{
    SOUND_EFFECT = val/100;
  }
}

// var bgm = new Audio("sound/bgm.mp3");
// bgm.play();
// const audio = new Audio("sound/lazer.mp3");
  // audio.volume = .3;
  // audio.play();
  // document.querySelector("audio").volume = 1;
