class Character extends LivingEntity {
	/*
	 * This is `Character` class which extends from `LivingEntity` class
	 *
	 * Player object
	 * Define to playable object for player
	 */
	constructor(name, x, y, width, height, sprite_options, hp, atk, def, atkspd, velocity, acceralatation) {
		/*
		 * Constructor
		 * is a function to define new object, class declaration
		 *
		 * It run when a new object is create, use on store a data which
		 * coming in a list of parameter, or use to variable declaration
		 *
		 * Parameter
		 *  - name: Name of this object
		 *  - x: Position X of this object
		 *  - y: Position Y of this object
		 *  - width: Width of this object
		 *  - height: Height of this object
		 *  - sprite_option: Sprite option using render sprite image
		 *  - hp: Health of this object
		 *  - atk: Attack damage of this object
		 *  - def: Defense of this object
		 *  - atkspd: Attack this.velocity of this object
		 */

		// This is a child class from `LivingEntity` class, so we need to
		// call super() function to put a parameter to super class
		super(name, x, y, width, height, sprite_options, 1, hp, atk, def, atkspd, velocity, acceralatation);
		this.experience = 0;
		this.needExperience = this.calculateNextLevel();
		this.key = new Set();
		this.faced = "down";
		this.isWalking = false;
		this.bullets = [];
		this.equipment = []; // to do [Weapon, Head, Armour, Arms, Legs, Boots]
		this.velocity = new Vector2D(0, 0);

		/* Inventory (Not finish) */
		let item = new Item("9998", "Newbie's Sword", "An ordinary sword ? Is there any hidden power !?", {"atk": 2}, "sword");
		this.inventory = new Inventory(this, 2, 9, {});
		this.inventory.addItem(item, 1, 2);
		let potion = new ItemStack(new Item("9000", "Red Potion", "", {"regenHP" : 15}), 9, "consumable");
		this.inventory.appendItem(potion);
		console.log(this.inventory.swapItem(11, 12));

		let textbox = new UITextBox("test");
		let healthBar = new UIHealthBar(this);
		this.playerStatusBox = new UIPlayerStatus(this);

		while (!game.map.isWalkable(this.x + this.width / 2, this.y + this.height)) {
			this.x = Math.random() * game.map.map.width;
			this.y = Math.random() * game.map.map.height;
		}
		/* Event Listener */
		window.addEventListener('keydown', (e) => this.updateKey(e, 'add'));
		window.addEventListener('keyup', (e) => this.updateKey(e, 'remove'));
		window.addEventListener('CharacterOnDamage', (e) => {
			this.addKnockback(e);
			getHit();
		});
		// window.addEventListener('touchstart', (e) => this.fireBullet()); Tablet supported
		// window.addEventListener('click', (e) => this.fireBullet(e)); PC supported
	}

	updateKey(e, action) {
		/*
		 * Run when player press a keys
		 * It's use to trigger a event or control a controller
		 */
		if ([65, 68, 87, 83].includes(e.keyCode)) { // A D W S
			if (action === 'add') {
				this.key.add(e.keyCode);
				this.status.isMoving = true;
			} else if (action === 'remove') {
				this.key.delete(e.keyCode);
				this.status.isMoving = false;
			}

			//var playerMove = new CustomEvent("PlayerMove", {detail: {text: "test"}});
			//window.dispatchEvent(playerMove);
		} else if ([74, 75, 76].includes(e.keyCode)) {
			if (action === 'add') {
				if (this.status.isAttacking !== true) {
					fireBullet();
					this.fireBullet(e);
					this.status.isAttacking = true;
					setTimeout(() => { this.status.isAttacking = false }, (1 / this.getAttackSpeed()) * 1000);	// delay between each attack
				}
			}
		} else if ([73].includes(e.keyCode)) {
			if (action === 'add') {
				let ui = this.inventory.getUI();
				ui.toggleUI();
			}
		} else if ([67].includes(e.keyCode)) {
			if (action === 'add') {
				let ui = this.playerStatusBox;
				ui.toggleUI();
			}
		}
	}

	addKnockback(e) {
		/*
		 * Add character knockback when hit
		 */
		// Knockback
		if (this.status.isAttacked && !this.status.isInvincible) {
			this.status.isInvincible = true;

			let ent = e.detail.damager
			let target_posX = ent.x + ent.width / 2,
			    target_posY = ent.y + ent.height / 2,
			    center_posX = this.x + this.width / 2,
			    center_posY = this.y + this.height / 2;
			let vector_target = new Vector2D(target_posX, target_posY);
			let vector_ent = new Vector2D(center_posX, center_posY);
			let to_target = vector_target.subtract(vector_ent).normalize();
			this.velocity = this.velocity.add(to_target.multiple(-8));

			setTimeout(() => {
				this.status.isInvincible = false;
				this.status.isAttacked = false;
			}, 1250);
		}
	}

	render() {
		/*
		 * Render the object to the canvas
		 * In this character object
		 *
		 * We will check the direction that the key press
		 * to move the character on that direction
		 *
		 */
		let map = game.map.map;
		// Moving
		let vec = new Vector2D(0, 0);
		let acc = 0.25
		let static_velo = 4;
		let limit = 5
		if (this.key.has(65)) {
			vec.x += -static_velo;
			this.faced = "left";
		}

		if (this.key.has(68)) {
			vec.x += static_velo;
			this.faced = "right";
		}

		if (this.key.has(87)) {
			vec.y += -static_velo;
			this.faced = "up";
		}

		if (this.key.has(83)) {
			vec.y += static_velo;
			this.faced = "down";
		}

		//Decay Velocity
		if (this.velocity.x !== 0) {
			if (this.velocity.x > 0) {
				this.velocity.x = Math.max(this.velocity.x - acc, 0);
			} else if (this.velocity.x < 0) {
				this.velocity.x = Math.min(this.velocity.x + acc, 0);
			}
		}
		if (this.velocity.y !== 0) {
			if (this.velocity.y > 0) {
				this.velocity.y = Math.max(this.velocity.y - acc, 0);
			} else if (this.velocity.y < 0) {
				this.velocity.y = Math.min(this.velocity.y + acc, 0);
			}
		}

		vec = vec.add(this.velocity);
		let x = Math.min(Math.max(this.x + vec.x, -this.width), map.width - (this.sprite_options.width * this.sprite_options.ratio) / 2);
		let y = Math.min(Math.max(this.y + vec.y, -this.height), map.height - (this.sprite_options.height * this.sprite_options.ratio));
		if (game.map.isWalkable(x + this.width / 2, y + this.height)) {
			this.x = x;
			this.y = y;
		}

		if (vec.magnitude() && !this.isWalking) {
			this.isWalking = true;
			walking(); // sound walking
		} else if (!vec.magnitude() && this.isWalking) {
			this.isWalking = false;
			stopWalking() // sound silent
		}

		/*
		// Draw Rectangle around the character; Can remove this
		this.context.strokeStyle="blue";
		this.context.beginPath();
		//this.context.rect(this.x - (this.width / 2), this.y - (this.height / 2), this.width * 2, this.height * 2, 0);
		this.context.rect(this.x, this.y, this.width, this.height, 0);
		this.context.lineWidth=1;
		this.context.stroke();
		this.context.restore();
		*/

		this.bullets.forEach((bullet) => {
			// If bullet is time out or bullet is out frame
			// then remove it from stored
			if (bullet.isTimeOut() || bullet.isOutFrame()) {
				this.bullets.splice(this.bullets.indexOf(bullet), 1);
			} else {
				bullet.render();
			}
		})

		super.render();
	}

	addExperince(exp) {
		this.experience += exp;
		if (this.experience >= this.needExperience) this.levelUp();
	}

	levelUp() {
		console.log("level up " + (this.level + 1))
		this.level += 1;
		this.experience -= this.needExperience;
		this.needExperience = this.calculateNextLevel();

		this.atk = this.atk * (1 + this.level / 10);
		this.def = this.def * (1 + Math.max(((this.level - 1) / 25), 0));
		this.maxhp = Math.floor(this.maxhp * (1 + Math.max((this.level - 1) / 10, 0)));
		this.hp = this.maxhp;
		if (this.experience >= this.needExperience) {
			this.levelUp();
		}
	}

	calculateNextLevel() {
		let x = 1,
			y = 3,
			z = 4,
			w = -10;
		return x * ((this.level + 1) + y)**2 + z*(this.level + 1) + w;
	}

	getBullet() {
		/*
		 * Get bullets object that this character shoot
		 */
		return this.bullets;
	}

	fireBullet(e) {
		/*
		 * Fire a bullet to belong a direction
		 */
		let bullet = new Bullet(
							"Bullet",
							this.x + this.width / 2,
							this.y + this.height / 2,
							13,
							13,
							{
								src: "assets/bullet.png",
								width: 13,
								height: 13,
								ticksPerFrame: 10,
								numberOfFrames: 2,
								loop: true,
								ratio: 1.0,
							},
							this,
							10,			// velocity
							12,
							this.faced
						);

		// Store new bullet object to ArrayList
		this.bullets.push(bullet);
	}
}