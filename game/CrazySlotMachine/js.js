var doing = false;
var spin = [new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3")];
var coin = [new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3")]
var bgsound =[new Audio("res/sounds/sound.mp3")]
var win = new Audio("res/sounds/win.mp3");
var lose = new Audio("res/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
var info = true;
score = 100;
function bgsound() {
	document.getElementById("bgsound").autoplay;
}
function doSlot(){
	if (doing){return null;}
	doing = true;
	var numChanges = randomInt(1,4)*7
	var numeberSlot1 = numChanges+randomInt(1,7)
	var numeberSlot2 = numChanges+2*7+randomInt(1,7)
	var numeberSlot3 = numChanges+4*7+randomInt(1,7)
	score=score-2;
	updateScore();

	var i1 = 0;
	var i2 = 0;
	var i3 = 0;
	var sound = 0
	status.innerHTML = "SPINNING"
	slot1 = setInterval(spin1, 150);
	slot2 = setInterval(spin2, 150);
	slot3 = setInterval(spin3, 150);
	function spin1(){
		i1++;
		if (i1>=numeberSlot1){
			coin[0].play()
			clearInterval(slot1);
			return null;
		}
		slotTile = document.getElementById("slot1");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin2(){
		i2++;
		if (i2>=numeberSlot2){
			coin[1].play()
			clearInterval(slot2);
			return null;
		}
		slotTile = document.getElementById("slot2");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin3(){
		i3++;
		if (i3>=numeberSlot3){
			coin[2].play()
			clearInterval(slot3);
			testWin();
			return null;
		}
		slotTile = document.getElementById("slot3");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		sound++;
		if (sound==spin.length){
			sound=0;
		}
		spin[sound].play();
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
}

function testWin(){
	var slot1 = document.getElementById("slot1").className
	var slot2 = document.getElementById("slot2").className
	var slot3 = document.getElementById("slot3").className

	if(slot1=="a3"&&slot2=="a3"&&slot3=="a3"){
		status.innerHTML = "YOU WIN! 500$";
		score=score+500;
		updateScore();
		win.play();}
	else if(slot1=="a1"&&slot2=="a1"&&slot3=="a1"){
		status.innerHTML = "YOU WIN! 250$";
		score=score+250;
		updateScore();
		win.play();}
	else if(slot1=="a6"&&slot2=="a6"&&slot3=="a6"){
		status.innerHTML = "YOU WIN! 150$";
		score=score+150;
		updateScore();
		win.play();}
	else if(slot1=="a2"&&slot2=="a2"&&slot3=="a2"){
		status.innerHTML = "YOU WIN! 100$";
		score=score+100;
		updateScore();
		win.play();}
	else if(slot1=="a1"&&slot2=="a6"&&slot3=="a2"||slot1=="a2"&&slot2=="a6"&&slot3=="a1"||slot1=="a6"&&slot2=="a1"&&slot3=="a2"||slot1=="a1"&&slot2=="a2"&&slot3=="a6"||slot1=="a2"&&slot2=="a1"&&slot3=="a6"||slot1=="a6"&&slot2=="a2"&&slot3=="a1"){
		status.innerHTML = "YOU WIN! 80$";
		score=score+80;
		updateScore();
		win.play();}
	else if(slot1=="a4"&&slot2=="a4"&&slot3=="a4"){
		status.innerHTML = "YOU WIN! 80$";
		score=score+80;
		updateScore();
		win.play();}
	else if(slot1=="a4"&&slot2=="a4"||slot1=="a4"&&slot3=="a4"||slot2=="a4"&&slot3=="a4"){
		status.innerHTML = "YOU WIN! 50$";
		score=score+50;
		updateScore();
		win.play();}
	else if(slot1=="a5"&&slot2=="a5"&&slot3=="a5"){
		status.innerHTML = "YOU WIN! 30$";
		score=score+30;
		updateScore();
		win.play();}
	else if(slot1=="a5"&&slot2=="a5"||slot1=="a5"&&slot3=="a5"||slot2=="a5"&&slot3=="a5"){
		status.innerHTML = "YOU WIN! 15$";
		score=score+15;
		updateScore();
		win.play();}
	else if(slot1=="a7"&&slot2=="a7"&&slot3=="a7"){
		status.innerHTML = "YOU WIN! 10$";
		score=score+10;
		updateScore();
		win.play();}
	else if(slot1=="a7"&&slot2=="a7"||slot1=="a7"&&slot3=="a7"||slot2=="a7"&&slot3=="a7"){
		status.innerHTML = "YOU WIN! 5$";
		score=score+5;
		updateScore();
		win.play();}
	else if(slot1=="a7"||slot2=="a7"||slot3=="a7"){
		status.innerHTML = "YOU WIN! 2$";
		score=score+2;
		updateScore();
		win.play();}
	else{
		status.innerHTML = "YOU LOSE!"
		lose.play();
	}
	doing = false;}

function toggleAudio(){
	if (!audio){
		audio = !audio;
		for (var x of spin){
			x.volume = 0.5;
		}
		for (var x of coin){
			x.volume = 0.5;
		}
		for (var x of bgsound){
			x.volume = 1;
		}
		win.volume = 1.0;
		lose.volume = 1.0;
	}else{
		audio = !audio;
		for (var x of spin){
			x.volume = 0;
		}
		for (var x of coin){
			x.volume = 0;
		}
		for (var x of bgsound){
			x.volume = 0;
		}
		win.volume = 0;
		lose.volume = 0;
	}
	document.getElementById("audio").src = "res/icons/audio"+(audio?"On":"Off")+".png";
}

function randomInt(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}
function updateScore(){
  numscore.innerText = score;
}