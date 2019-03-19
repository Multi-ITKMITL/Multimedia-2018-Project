var canvas = document.getElementById("c");
var canvastext = canvas.getContext("2d");
var input = document.getElementById("input");
var status = 2;
var time = 60000;
var startTime = 0,
	endTime = 0;
var endscene = false;
//words from http://www.world-english.org/english500.htm
//hand-typed cause dedication, cant sleep, relieve some thoughts 
var words = ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "hot", "but", "some", "what", "there", "we", "can", "out", "other", "were", "all", "your", "when", "up", "use", "word", "how", "said", "an", "each", "she", "which", "do", "their", "time", "if", "will", "way", "about", "many", "then", "them", "would", "write", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", "go", "come", "did", "my", "sound", "no", "most", "number", "who", "over", "know", "water", "than", "call", "first", "people", "may", "down", "side", "been", "now", "find", "any", "new", "work", "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man", "year", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just", "form", "much", "great", "think", "say", "help", "low", "line", "before", "turn", "cause", "same", "mean", "differ", "move", "right", "boy", "old", "too", "does", "tell", "sentence", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add", "event", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun", "four", "thought", "let", "keep", "eye", "never", "last", "door", "between", "city", "tree", "cross", "since", "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real", "life", "few", "stop", "open", "seem", "together", "next", "white", "children", "begin", "got", "walk", "example", "ease", "paper", "often", "always", "music", "those", "both", "mark", "book", "letter", "until", "mile", "river", "car", "feet", "care", "second", "group", "carry", "took", "rain", "eat", "room", "friend", "began", "idea", "fish", "mountain", "north", "once", "base", "hear", "horse", "cut", "sure", "watch", "color", "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct", "pose", "leave", "song", "measure", "state", "product", "black", "short", "numeral", "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", "south", "problem", "piece", "told", "knew", "pass", "farm", "top", "whole", "king", "size", "heard", "best", "hour", "better", "true", "during", "hundred", "am", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast", "five", "sing", "listen", "six", "table", "travel", "less", "morning", "ten", "simple", "several", "vowel", "toward", "war", "lay", "against", "pattern", "slow", "center", "love", "person", "money", "serve", "appear", "road", "map", "science", "rule", "govern", "pull", "cold", "notice", "voice", "fall", "power", "town", "fine", "certain",/*getting paranoid of typos or mixed dreams, anyways, last 100ish words, didn't take as long as i thought, only been about 30 minutes or so*/ "fly", "unit", "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box", "noun", "field", "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood", "contain", "front", "teach", "week", "final", "gave", "green", "oh", "quick", "develop", "sleep", "warm", "free", "minute", "strong",/*left pinky and right ring finger beginning to hurt*/ "special", "mind", "behind", "clear", "tail", "produce", "fact", "street", "inch", "lot", "nothing", "course", "stay", "wheel", "full", "force", "blue", "object", "decide", "surface", "deep", "moon", "island", "foot", "yet", "busy", "record", "boat", "common", "gold", "possible", "plane", "age", "dry", "wonder", "laugh", "thousand", "ago", "ran", "check", "game", "shape", "yes", "hot",/*did hot come up twice?*/ "miss", "brought", "heat", "snow", "bed", "bring", "sit", "perhaps", "fill", "east", "weight", "language", "among"];
var enemies = [],
	enemyWords = [];
var enemySpeed = 0.35;
var generatorNumber = 0.1;
	maxGeneratorNumber = 50;
var value = "";
var score = 0;
	done = 0;
var y = 0;
var storage = window.localStorage;
var laser = false,
	storedX,
	storedY;
var hit = 0,
	full = 0;
var smallSparks = [],
	largeSparks = [];
var sx = [],
	sy = [],
	sc = [],
	ss = [];
var soundFX;
var shot;
var state = 0;

function preload(){
	soundFX = new Audio('./music/Lazerbeam3.wav');
}
preload();
for(var i = 0; i < 250; i++) {
	sx.push(Math.random() * window.innerWidth);
	sy.push(Math.random() * window.innerHeight);
	sc.push("rgb(" + Math.floor(Math.random() * 55) + 200 + ", " + Math.floor(Math.random() * 55) + 200 + ", " + Math.floor(Math.random() * 55) + 200 + ")");
	ss.push(Math.random());
}
if(typeof storage.highscoreYaeQam === "undefined") 
	storage.highscoreYaeQam = 0;

function clear() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	for(var i = 0; i < ss.length; i++) {
		canvastext.beginPath();
		canvastext.fillStyle = sc[i];
		canvastext.arc(sx[i], sy[i], ss[i], 0, 2 * Math.PI);
		canvastext.fill();
	}
}
function smallExplosion() {
	for(var i = 0; i < 30; i++) {
		//x, y, sideMovement, downSpeed
		smallSparks.push([
			storedX,
			storedY,
			Math.random() * 8 - 4,
			Math.random() * 25 + 5
		]);
			soundFX.currentTime = 0;
			soundFX.play();
	}

}
function bigExplosion() {
	for(var i = 0; i < 500; i++) {
		largeSparks.push([
			Math.random() * canvas.width,
			-Math.random() * 25,
			Math.random() * 8 - 4,
			Math.random() * 4 + 1,
			"rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")"
		]);
	}
}
function generate() {
	//x
	enemies.push(
		Math.random() * (canvas.width - 550) + 200
	);
	//word
	enemyWords.push(
		words[Math.floor(Math.random() * words.length)]
	);
}
function laze() {
	if(laser) {
		canvastext.strokeStyle = "#f00";
		canvastext.lineWidth = 8;
		canvastext.beginPath();
		canvastext.moveTo(canvas.width / 2, canvas.height - 100);
		canvastext.lineTo(storedX, y);
		canvastext.stroke();
		smallExplosion();
		laser = false;
	}
}
function test() {
	input.value = input.value.substr(input.value.length - 1, 1);
	value = input.value;
	if(status==1) {
		if(enemyWords[0].length < 12) {
			if(value === enemyWords[0].substr(0, 1)) {
				enemyWords[0] = enemyWords[0].substr(1);
				score += 2 ;
				laser = true;
				storedX = enemies[0];
				storedY = y;
				hit++;
			}
			else 
				if(score > 0){
					score -= 2 ;
				}
		}
	}
}
function update() {
	input.focus();
	state += 1;
	if(input.value.length !== value.length) 
		test();
	if(status==1) {
		generate();
		if(Math.random() > generatorNumber) {
				generate();
		}
		y += enemySpeed;
		for(var i = enemies.length - 1; i > -1; i--) {
			if(i * -24 + y >= canvas.height - 150) {
				enemies.splice(i, 1);
				enemyWords.splice(i, 1);
				endTime = new Date().getTime();
				if(enemyWords[i].length < 12) 
					full += enemyWords[i].length;
				else 
					full += enemyWords[i][0].length;
				y -= 25;
			}
			if(enemyWords[i].length < 12) {
				if(enemyWords[i].length < 1) {
					enemies.splice(i, 1);
					enemyWords.splice(i, 1);
					y -= 25;
				}
			}
			else {
				if(enemyWords[i][0].length < 1) {
					enemies.splice(i, 1);
					enemyWords.splice(i, 1);
					y -= 25;
				}
			}
		}
		if(new Date().getTime() >= endTime) {
			endscene = true;
			status = 2;
			if(score > Number(storage.highscoreYaeQam)) {
				storage.highscoreYaeQam = score;
				bigExplosion();
			}
			percentage = Math.round((hit / full) * 10000) / 100;// ใช้ math.round เพื่อปัดค่าไปเลข interger ที่ใกล้ที่สุด ห
			if(percentage > 100) 
				percentage = 100;
			if(isNaN(percentage)) // isNaN สำหรับเช็คว่าค่า ไม่ใช่ตัวเลข ใช่หรือไม่( is Not-a-number) ใช้เช็ค undifined ได้
				percentage = 0;
			if(percentage > Number(storage.highpercentYaeQam)) {
				storage.highpercentYaeQam = percentage;
				bigExplosion();
			}
		}
	}
	else {
		if(value === " ") {
				score = 0;
				input.value = "";
				enemies = [];
				enemyWords = [];
				generatorNumber = 0.1;
				enemySpeed = 0.35;
				done = 0;
				y = 0;
				hit = 0;
				full = 0;
				startTime = new Date().getTime();
				endTime = startTime + time;
				status = 1;
				document.querySelector('#box').style.display = "none";
				document.querySelector('img').style.display = "inline";
		}
	}
	for(var i = 0; i < smallSparks.length; i++) {
		smallSparks[i][0] += smallSparks[i][2];
		smallSparks[i][1] += smallSparks[i][3];
		if(smallSparks[i][1] > canvas.height) 
			smallSparks.splice(i, 1);
	}
	for(var i = 0; i < largeSparks.length; i++) {
		largeSparks[i][0] += largeSparks[i][2];
		largeSparks[i][1] += largeSparks[i][3];
		if(largeSparks[i][1] > canvas.height) 
			largeSparks.splice(i, 1);
	}
}
function draw() {
	requestAnimationFrame(draw);
	update();
	clear();
	for(var i = 0; i < smallSparks.length; i++) {
		canvastext.fillStyle = "#fff";
		canvastext.fillRect(smallSparks[i][0], smallSparks[i][1], 5, 5);
	}
	for(var i = 0; i < largeSparks.length; i++) {
		canvastext.fillStyle = largeSparks[i][4];
		canvastext.fillRect(largeSparks[i][0], largeSparks[i][1], 10, 10);
	}
	if(status==1) {
		laze();
		canvastext.font = "32px 'Press Start 2P'";
		for(var i = enemies.length - 1; i > -1; i--) {
			if(i == 1) {
				if(enemyWords[i].length < 12)
					canvastext.fillStyle = "#f44336";
				else 
					canvastext.fillStyle = "#c03f0e0";
			}
			else if(i == 0) {
				if(enemyWords[i].length < 12)
					canvastext.fillStyle = "#ffeb3b";
				else 
					canvastext.fillStyle = "#c03f0e0";
			}
			else {
				if(enemyWords[i].length < 12)
					canvastext.fillStyle = "#282";
				else 
					canvastext.fillStyle = "#b020d0";
			}
			if(enemyWords[i].length < 12) 
				canvastext.fillText(enemyWords[i], enemies[i], i * -24 + y);
			else 
				canvastext.fillText(enemyWords[i][0], enemies[i], i * -24 + y);
		}
	}
	if(status==1) {
		canvastext.shadowColor="red";
		canvastext.shadowBlur=10;
		canvastext.lineWidth=5;
		canvastext.fillStyle = "#8fcae4";
		canvastext.fillStyle = "#ffa500";
		canvastext.fillText(Math.round((endTime - new Date().getTime()) / 1000)+ " s", 4, 36);
		canvastext.font = "32px 'Press Start 2P'";
		canvastext.fillStyle = "#ff0";
		canvastext.fillText("Score: " + score, canvas.width - score.toString().length * 18 - 310, canvas.height - 80);
		canvastext.fillStyle = "#FF6347";
		canvastext.fillText("High Score: "+storage.highscoreYaeQam, canvas.width - storage.highscoreYaeQam.toString().length * 18 - 450, c.height - 36);
	}
	if(status==2) {
		if (endscene==false){
			canvastext.font = "24px 'Press Start 2P'";
			canvastext.shadowColor="#caef62";
			canvastext.shadowBlur=10;
			canvastext.lineWidth=5;
			canvastext.fillStyle = "#7bff5a";
			canvastext.fillText("Press SPACE to start! ", canvas.width / 2 - 250, canvas.height / 2 + 94);


			canvastext.font = "48px 'Press Start 2P'";
			canvastext.shadowColor="red";
			canvastext.shadowBlur=10;
			canvastext.lineWidth=5;
			canvastext.fillStyle = "#8fcae4";
			canvastext.fillText("THE GALAXY OF DICTIONARY", canvas.width / 2 - 560, canvas.height / 2 + 24);

		
			var sub = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			for(var i=0; i<24 ; i++){
				canvastext.font = "24px 'Press Start 2P'";
				canvastext.shadowColor="#caef62";
				canvastext.fillStyle = "#0808a3";
				canvastext.fillText(sub[i], Math.random() * canvas.width, canvas.height *Math.random());
			}
	
		}
		else{
			canvastext.font = "24px 'Press Start 2P'";
			canvastext.shadowColor="#caef62";
			canvastext.shadowBlur=10;
			canvastext.lineWidth=5;
			canvastext.fillStyle = "#7bff5a";
			canvastext.fillText("Press SPACE to Retry Again! ", canvas.width / 2 - 340, canvas.height / 2 + 94);
			canvastext.font = "30px 'Press Start 2P'";
			canvastext.fillStyle = "#FF6347";
			canvastext.fillText("High Score: "+storage.highscoreYaeQam, canvas.width /3, canvas.height / 2 - 180);
			canvastext.fillStyle = "#ff0";
			canvastext.fillText("Your Score: " + score, canvas.width /3 , canvas.height / 2 - 110);
			if(storage.highscoreYaeQam > score){
				canvastext.font = "48px 'Press Start 2P'";
				canvastext.shadowColor="red";
				canvastext.shadowBlur=10;
				canvastext.lineWidth=5;
				canvastext.fillStyle = "#8fcae4";
				canvastext.fillText("Let's Try It Again"+"👽", canvas.width / 2 - 460, canvas.height / 2 + 30,);

		
			}else{
				canvastext.font = "48px 'Press Start 2P'";
				canvastext.shadowColor="red";
				canvastext.shadowBlur=10;
				canvastext.lineWidth=5;
				canvastext.fillStyle = "#8fcae4";
				canvastext.fillText("You are monters finger!"+"👩‍💻", canvas.width / 2 - 560, canvas.height / 2 + 30,);
			} 
		}
	}

}

draw();
window.oncontextmenu = function() {
	return false;
}