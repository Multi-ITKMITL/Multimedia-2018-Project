/*
 * Game.js
 * THIS IS MAIN SOURCE JS
 */
class GameBoard {
	/*
	 *	This is class "GameBoard"
	 *  Define as main game board
	 */
	constructor(canvasName) {
		/*
		 * Constructor
		 * เป็นฟังก์ชันที่เอาไว้ใช้ กำหนดว่า class นี้
		 * ต้องสร้างจะต้องมี parameter อะไร สร้างตัวแปรอะไรบ้ง
		 */
		this.board = document.getElementById(canvasName);
		this.context = this.board.getContext("2d");
		this.config = {
			width: 1366,
			height: 768
		};
		this.isPause = false;
		this.keyAction = new Set();

		this.resizeCanvas();
		window.addEventListener('resize', (e) => this.resizeCanvas());
		window.addEventListener('keydown', (e) => this.bindAction(e, "add"));
		window.addEventListener('keyup', (e) => this.bindAction(e, "remove"))
	}

	getEntitys() {
		/*
		 * Return Object Entity ทั้งหมดที่อยู่ในเกม
		 *
		 */
		return this.entitys; // เป็น ArrayList ที่เก็บ object Entity ในเกม ต้องอัพเดตมันตลอดเวลาจะเพิ่ม / ลบ Entity อะไร
	}

	getContext() {
		/*
		 * Return context of this canvas
		 *
		 */
		return this.context;
	}

	showInterface() {
		/*
		 * โชว์ Interface menu (ปุ่มเริ่มเกม)
		 *
		 */
		document.querySelector("#title").style.display = "block";
		document.querySelector("#menu").style.display = "block";
		document.querySelector("#gameboard").style.display = "none";
		document.querySelector("#gameover").style.display = "none";
		document.querySelector("#backdrop").style.display = "none";
		this.resizeCanvas();
		return 1;
	}

	showAnnounce(x){
		if (x == 1){
			if (document.querySelector("#howtoplay").style.display == "block"){
				document.querySelector("#howtoplay").style.display = "none";
				document.querySelector("#option").style.display = "none";
			}
			else
				document.querySelector("#howtoplay").style.display = "block";
				document.querySelector("#option").style.display = "none";
		}
		else{
			if (document.querySelector("#option").style.display == "block"){
				document.querySelector("#option").style.display = "none";
			}
			else{
				document.querySelector("#option").style.display = "block";
				document.querySelector("#howtoplay").style.display = "none";
			}
		}


	}

	hideAnnounce(){
		document.querySelector("#howtoplay").style.display = "none";
		document.querySelector("#option").style.display = "none";
	}

	hiddenInterface() {
		/*
		 * ซ่อน Interface menu (ปุ่มเริ่มเกม)
		 *
		 */
		this.context.clearRect(0, 0, this.board.width, this.board.height);
		document.querySelector("#title").style.display = "none";
		document.querySelector("#gameboard").style.display = "block";
		document.querySelector("#menu").style.display = "none";
		document.querySelector("#backdrop").style.display = "block";
		return 0;
	}

	pause() {
		this.isPause = true;
		this.showAnnounce();
		// pause panel show
	}

	unpause() {
		this.isPause = false;
		this.hideAnnounce();
		// pause panel hide
	}

	togglePause() {
		if (this.isPause) this.unpause();
		else this.pause();

		console.log(this.isPause)
	}

	bindAction(e, action) {
		if (action === "add") {
			if (this.keyAction.has(e.keyCode)) return 0;
			else this.keyAction.add(e.keyCode);
		} else {
			if (this.keyAction.has(e.keyCode)) this.keyAction.delete(e.keyCode);
			else return 0;
		}

		if (e.keyCode == 27 && action === "add") { // Escape
			this.togglePause();
		}
	}

	init() {
		/*
		 * ตั้งค่าพื้นฐาน เพื่อเริ่มเกม
		 *
		 */
		startGame();
		document.querySelector("#howtoplay").style.display = "none";
		document.querySelector("#option").style.display = "none";
		var list = document.getElementById("interface");
		while (list.hasChildNodes()) {
			list.removeChild(list.childNodes[0]);
		}

		this.identity = Math.floor(Math.random() * 1000000);
		config.identity = this.identity;

		this.board.width = this.config.width;
		this.board.height = this.config.height;
		this.hiddenInterface();
		this.resizeCanvas()

		this.i = 0;

		this.entitys = [];

		this.map = new Map(
			this.context,
			1280 / 8,
			720 / 8
		);

		this.character = new Character(
			"Sheep", Math.random() * this.map.map.width, Math.random() * this.map.map.height, 64, 64,
			{
				src: "assets/charecter/sheepy-idle-walk.png",
				width: 64,
				height: 64,
				ticksPerFrame: 10,
				numberOfFrames: 4,
				loop: true,
				ratio: 1.0
			}, 100, 5, 0, 1, 2, 0.5
		);

		for (let n = 50; n > 0; n--) {
			let level = Math.ceil(Math.random() * 10);
			let ent = new Enemy(
				`Lv.${level} Spirit`, 0 + Math.random() * (this.map.map.width - 43.75), 0 + Math.random() * (this.map.map.height - 40), 43.75, 40,
				{
					src: "assets/monster/monster.png",
					width: 43.75,
					height: 40,
					ticksPerFrame: 8,
					numberOfFrames: 3,
					loop: true,
					ratio: 1.0
				}, level, 25, 10, 1, 1.5, 0.25, "idle"
			);

			/*
			if (this.entitys.some((entity) => entity.collided(ent))) {
				continue
			}*/

			this.entitys.unshift(ent);
		}

		document.querySelector("#gameover").style.display = "none";
		this.gameUpdate();
	}

	gameUpdate() {
		/*
		 * ในทุกๆ tick จะทำการ update เกม ซึ่ง function นี้จะทำเรียกตัวเองซ้ำๆ
		 * เพื่ออัพเดตข้อมูลในเกม (การเคลื่อนที่ตัวละคร object)
		 *
		 */

		if (this.character.isAlive()) {
			if (this.entitys.length === 0) {
				console.log("Game over");
				document.querySelector("#gameover").style.display = "block";
				document.querySelector("#gameover_text").innerText = "You win!";
				gameWin();
				stopWalking();
				return 0;
			} else if (!this.isPause) {
				// Clear screen
				this.context.clearRect(0, 0, this.board.width, this.board.height);

				// Camera update
				this.map.updateCamera();

				// Check for each entitys
				this.entitys.forEach((ent) => {
					// If entity collied with character and entity has a character to be a target
					if (ent.collided(this.character) && ent.getTarget() === this.character) {
						this.character.giveDamage(ent.getAttackDamage(), ent);
					}

					// Check for each bullets that character shoot
					this.character.getBullet().forEach((bullet) => {
						// If character bullet hit entity
						if (bullet.collided(ent)) {
							monsterHit(); // Monster Sound
							// Give entity a amount of damage
							this.character.getBullet().splice(this.character.getBullet().indexOf(bullet), 1);
							ent.giveDamage(this.character.getAttackDamage(), bullet);
							// If entity have health less than or equal 0, then remove it
							if (ent.getHealth() <= 0) {
								this.entitys.splice(this.entitys.indexOf(ent), 1);
							}
						}
					})
				})

				// Entity update
				this.orderEntitys = [...this.entitys];
				this.orderEntitys.sort(function (a, b) {
					if (a.y > b.y) {
						return 1;
					} else if (a.y < b.y) {
						return -1;
					} else {
						return 0;
					}
				});

				this.orderEntitys.forEach((entity) => {
					entity.render();
				}, this);

				// Character update
				this.i++;
				this.character.render();
			}

			setTimeout(() => {
				this.gameUpdate()
			}, config.gameTick);
		} else {
			console.log("Game over");
			this.character.render();
			document.querySelector("#gameover").style.display = "block";
			document.querySelector("#gameover_text").innerText = "Game Over";
			gameOver();
		}
	}


	drawRotatedBox(x, y, width, height, angle) {
		/*
		 * วาดกล่องลงไปใน canvas
		 * (Not used)
		 *
		 */
		this.context.save();
		this.context.translate(x, y);
		this.context.rotate(angle * Math.PI / 180);
		this.context.fillStyle = "red";
		this.context.fillRect(-width/2, -height/2, width, height);
		this.context.restore();
	}

	resizeCanvas() {
		/*
		 * ปรับ canvas size
		 *
		 */
	  	this.board.style.width = window.innerWidth + "px";
  		this.board.style.height = window.innerHeight + "px";
	};
}

/* Configuration */
const config = {
	gameTick: 20
	,gameSound: 1
	,sfxSound: 1
}

/* Game declare */
const game = new GameBoard("GameBoard");

//game.init();
window.onload = function () {
	console.log("on load...");
}