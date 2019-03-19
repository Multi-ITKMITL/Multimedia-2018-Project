var farm = document.querySelector("#farm");
var count = 1;
var game;
var chicken = [0, 0, 0, 0, 0, 0, 0, 0];
var CheckFood=0;
var CountFood=[0, 0, 0, 0, 0, 0, 0, 0];
var egg = [0, 0, 0, 0, 0, 0, 0, 0];
var Enemy = [0, 0, 100, 50];
var EnemyR;
var money = 460;
var gun=1;
var start1 = 1;
var enemyCount = 1;
var shop=0;
var score = 0;
var end=0;
var gunPirce = 200;

function gameplay(){
  if (end == 1){
    clearInterval(game);
    window.location.href = "#popup1";
    document.getElementById("total").innerHTML = "Score: "+score;
  }
  var cursor = shop + CheckFood;
  document.getElementById("farm").setAttribute('shopchick', cursor);
  document.getElementById("money").innerHTML = "Money : "+money;
  document.getElementById("score").innerHTML = "Score : "+score;
  if (CheckFood == 2){
    document.getElementById("all").style.cursor = "url('image/wheat.png'),auto";
  }
  else{
    document.getElementById("all").style.cursor = "pointer";
  }
  Enemy[1]++;
  if (start1 == 1){
    start1 = 0;
    start();
  }
  walk();
  grow();
  if (Enemy[0] < Enemy[1]){
    document.getElementById("enemy").setAttribute('size','c');
  }
  if (document.getElementById("enemy").getAttribute('size') == 'c'){
    enemyTime();
  }
  if (money<100) {
    for (var i=0; i < 8; i++){
      if (chicken[i] == 1){
        break;
      }
      if (i==7) {
        end = 1;
      }
    }
  }
}

function spon(event) {
  if (shop == 1){
      shop = 0;
  for (var i=0; i < 8; i++){
    if (chicken[i] == 0){
      count = i+1;
      chicken[i] = 1;
      break;
    }
  }
  var chick = document.getElementById("b"+count);
  chick.setAttribute('size', 'c');
  var xPosition = event.clientX - farm.getBoundingClientRect().left - (chick.clientWidth / 2);
  var yPosition = event.clientY - farm.getBoundingClientRect().top - (chick.clientHeight / 2);
  chick.setAttribute('grow', 1);
  chick.style.left = xPosition + "px";
  chick.style.top = yPosition + "px";
  chick.setAttribute('x', xPosition);
  chick.setAttribute('y', yPosition);
  chick.setAttribute('size', 'c');
  chick.setAttribute('grow', 1);
}
}

function grow(){
    var x = 0;
    var add=1;
    var typeBox = Math.floor(Math.random()*9);
    x = document.getElementById("b"+typeBox).getAttribute('grow');
    x = Number(x);
    var In = Number(typeBox-1);
    if (CountFood[In] > 0){
      add += 4;
      CountFood[In]--;
    }
    if (x != 0 && x < 100){
        x += add;
        document.getElementById("b"+typeBox).setAttribute('grow', x);
    }
    if (x >= 40 && (Math.floor(Math.random() * 6) == 5) && egg[In] == 0){
      egg[In] = 1;
      document.getElementById("e"+typeBox).setAttribute('size', 'e');
      document.getElementById("e"+typeBox).style.left = Number(document.getElementById("b"+typeBox).getAttribute('x'))+"px";
      document.getElementById("e"+typeBox).style.top = Number(document.getElementById("b"+typeBox).getAttribute('y'))+"px";
    }
    if (x >= 40){
      document.getElementById("b"+typeBox).setAttribute('src', 'image/hen2.gif');
    }
    if (x >= 100){
      document.getElementById("b"+typeBox).setAttribute('src', 'image/hen.gif');
    }
}

function change(id){
  var check = document.getElementById(id).getAttribute('grow');
  var num = document.getElementById(id);
  var x = Number(id[1]);
  if (check >= 100){
    money += 500;
    chicken[x-1] = 0;
    document.getElementById("b"+x).setAttribute('grow', 0);
    document.getElementById("b"+x).setAttribute('size', 'a');
    document.getElementById("b"+x).setAttribute('src', 'image/chick_flip.gif');
    score++;

  }
  else if (CheckFood == 2 && check != 0 && check < 90){
      CheckFood = 0;
      num.setAttribute('grow', Number(check)+10);
    }
    CheckFood = 0;
}

function Food(){
  if (money >= 30 && CheckFood == 0 && shop == 0){
    money -= 30;
    CheckFood = 2;
  }
}

function allFood(){
  if (CheckFood == 2){
    for (var i=0; i < 8; i++)
      CountFood[i] += Math.floor(Math.random()*4+1);
  }
    CheckFood = 0;
}

function Shop(){
  if (money >= 100 && shop == 0 && CheckFood == 0 && arrayC() == 1){
    money -= 100;
    shop = 1;
  }
}

function arrayC(){
  var check=0;
  for (var i=0; i < 8; i++){
    if(chicken[i] == 0){
      check=1;
      break;
    }
  }
  return check;
}

function Egg(id){
  id = id[1];
  money += 40;
  document.getElementById("e"+id).setAttribute('size', 'a');
  egg[id-1] = 0;
}

function walk(){
  var numA = Math.floor(Math.random()*8+1);
  var numC = "b"+numA;
  var chick = document.getElementById(numC);
  var num = Math.floor(Math.random()*5);
  var walking = 50*(num == 1 || num == 2) + -50*(num == 3 || num == 4);
  if (walking < 0 && chick.getAttribute('grow') < 40){
    chick.setAttribute('src', 'image/chick.gif');
  }
  else if (walking > 0 && chick.getAttribute('grow') < 40){
    chick.setAttribute('src', 'image/chick_flip.gif');
  }
  else if (walking < 0 && chick.getAttribute('grow') >= 40 && chick.getAttribute('grow') < 100){
    chick.setAttribute('src', 'image/hen2.gif');
  }
  else if (walking > 0 && chick.getAttribute('grow') >= 40 && chick.getAttribute('grow') < 100){
    chick.setAttribute('src', 'image/hen2_flip.gif');
  }
  else if (walking < 0 && chick.getAttribute('grow') >= 100){
    chick.setAttribute('src', 'image/hen.gif');
  }
  else if (walking > 0 && chick.getAttribute('grow') >= 100){
    chick.setAttribute('src', 'image/hen_flip.gif');
  }
  if (chick.getAttribute('grow') >= 1){
    var numR = Math.floor(Math.random()*3);
    var x = chick.getAttribute('x');
    var y = chick.getAttribute('y');
    x = Number(x);
    y = Number(y);
    x += walking*(numR%2 == 0)*(x+walking > -50 && x+walking < 1100);
    y += walking*(numR%2 == 1)*(y+walking > -50 && y+walking < 400);
    chick.style.left = x + "px";
    chick.style.top = y + "px";
    chick.setAttribute('x', x);
    chick.setAttribute('y', y);
  }
}

function start(){
  money += 40;
  Enemy[3] += 80;
  Enemy[2] = Enemy[3];
  Enemy[1] = 0;
  document.querySelector("#enemy").setAttribute('size','a');
  Enemy[0] = Math.floor(Math.random() * 10)+90;
}

function enemyTime(){
  enemyCount++;
  var shot = Math.floor(Math.random() * 10);
  var chick = document.getElementById("b"+shot);
  if (shot%2 == 0){
    document.getElementById("enemy").setAttribute('src', 'image/theft.gif');
  }
  else{
    document.getElementById("enemy").setAttribute('src', 'image/theft_flip.gif');
  }
  if (chick.getAttribute('grow') > 0 && shot <= 8 && enemyCount >= 7){
    enemyCount = 0;
    chicken[shot-1] = 0;
    document.getElementById("enemy").style.left = chick.getAttribute('x') + "px";
    document.getElementById("enemy").style.top = chick.getAttribute('y') + "px";
    document.getElementById("b"+shot).setAttribute('grow', 0);
    document.getElementById("b"+shot).setAttribute('size', 'a');
    document.getElementById("b"+shot).setAttribute('src', 'image/chick_flip.gif');
  }
}

function kill(){
  if (document.querySelector("#enemy").getAttribute('size') == "c"){
    Enemy[2] -= 20*gun;
  }
  if (Enemy[2] <= 0){
    start();
  }
}

function gunMan(){
  if (money >= gunPirce){
    gun++;
    money -= gunPirce;
    gunPirce += 150;
    document.getElementById("gun").innerHTML = "Lv."+gun+" "+gunPirce+"$";
  }
  if (gun == 2){
    document.getElementById("gun").style.backgroundImage = "url('image/pan.png')";
  }
  if (gun == 3){
    document.getElementById("gun").style.backgroundImage = "url('image/gun.png')";
  }
}

game = setInterval(gameplay, 300);

farm.addEventListener("click", spon);
