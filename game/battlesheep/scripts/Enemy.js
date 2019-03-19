class Enemy extends LivingEntity {
	/*
	 * This is `Enemy` class which extends from `LivingEntity` class
	 *
	 * Enemy object
	 * Define as attacker to player
	 */
	constructor(name, x, y, width, height, sprite_options, level, hp, atk, def, velocity, accelaration, state) {
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
		 */

		// This is a child class from `LivingEntity` class, so we need to
		// call super() function to put a parameter to super class
		super(name, x, y, width, height, sprite_options, level, hp, atk, def, 1);
		this.atk = this.atk * (1 + this.level / 10);
		//this.def = this.def * (1 + Math.max(((this.level - 1) / 25), 0));
		this.maxhp = Math.floor(this.maxhp * (1 + Math.max((this.level - 1) / 10, 0)));
		this.hp = this.maxhp;

		this.key = new Set();
		this.faced = "right";
		this.bullets = [];
		this.vector = new Vector2D(Math.random() * (2 - -2) + -2, Math.random() * (2 - -2) + -2);
		this.acceralation = accelaration;
		this.status = {
			state: state,
		}

		this.target = "";
		this.asyncWalking();

		window.addEventListener("EntityOnDamage", (e) => {
			this.addKnockback(e);
			/*
			if (e.detail.entity == this) {
				let vector_ent = new Vector2D(this.x, this.y);
				let vector_damager = new Vector2D(e.detail.damager.x, e.detail.damager.y);
				let distance = vector_ent.distance(vector_damager);
				let volume = Math.max(1 - (distance / 80), 0);
				getHit(volume);
			}*/
		});
	}

	getTarget() {
		/*
		 * Get this object target to attack
		 */
		return this.target;
	}

	setTarget(target) {
		/*
		 * Set this object target to attack
		 */
		this.target = target;
	}

	addKnockback(e) {
		/*
		 * Add Entity knockback when hit
		 */
		// Knockback
		if (e.detail.entity == this) {
			this.vector = new Vector2D(0, 0);
			let ent = e.detail.damager
			if (ent instanceof Bullet) {
				let bullet = ent;
				let center_posX = this.x + this.width / 2,
				    center_posY = this.y + this.height / 2;
				let vector_bullet = bullet.direction.normalize();
				this.vector = this.vector.add(vector_bullet.multiple(4));
			}
		}
	}

	asyncWalking() {
		let ent = this;
		let walkRange = 2.5;
		if (ent.status.state != "aggressive") {
			this.vector = new Vector2D(Math.random() * (2 * walkRange) + -walkRange, Math.random() * (2 * walkRange) + -walkRange);
			setTimeout(function() {
				ent.vector = new Vector2D(0, 0);
				setTimeout(function () {
					if (ent.status.state != "aggressive") {
						ent.vector = new Vector2D(Math.random() * (2 * walkRange) + -walkRange, Math.random() * (2 * walkRange) + -walkRange);
					}
					ent.asyncWalking();
				}, Math.random() * 10000);
			}, 1000);
		} else {
			setTimeout(function () {
				ent.asyncWalking()
			}, 1000);
		}
	}

	render() {
		/*
		 * Render
		 */
		let map = game.map.map;
		if (this.status.state === "aggressive") {
			if (this.getTarget() !== "" && this.getTarget() !== undefined) {
				let target_posX = this.getTarget().getX() + this.getTarget().getWidth() / 2,
				    target_posY = this.getTarget().getY() + this.getTarget().getHeight() / 2,
				    center_posX = this.x + this.width / 2,
				    center_posY = this.y + this.height / 2;
				let vector_target = new Vector2D(target_posX, target_posY);
				let vector_ent = new Vector2D(center_posX, center_posY);
				let to_target = vector_target.subtract(vector_ent).normalize().multiple(1.2).add(this.vector);
				this.x = Math.min(Math.max(this.x + to_target.x, 0), map.width - (this.sprite_options.width * this.sprite_options.ratio) / 2);
				this.y = Math.min(Math.max(this.y + to_target.y, 0), map.height - (this.sprite_options.height * this.sprite_options.ratio));

				//Decay Velocity
				let acc = 0.2;
				if (this.vector.x !== 0) {
					if (this.vector.x > 0) {
						this.vector.x = Math.max(this.vector.x - acc, 0);
					} else if (this.vector.x < 0) {
						this.vector.x = Math.min(this.vector.x + acc, 0);
					}
				}
				if (this.vector.y !== 0) {
					if (this.vector.y > 0) {
						this.vector.y = Math.max(this.vector.y - acc, 0);
					} else if (this.vector.y < 0) {
						this.vector.y = Math.min(this.vector.y + acc, 0);
					}
				}
			}
		} else {
			this.x = Math.min(Math.max(this.x + this.vector.x, 0), map.width - (this.sprite_options.width * this.sprite_options.ratio) / 2);
			this.y = Math.min(Math.max(this.y + this.vector.y, 0), map.height - (this.sprite_options.height * this.sprite_options.ratio));
		}

		this.context.save();

		if (this.collided(game.map.camera)) {
			let camera_offset_x = this.width / 2;
			let camera_offset_y = this.height / 2;
			let ent_to_x = this.x - game.map.camera.x;
			let ent_to_y = this.y - game.map.camera.y;
			if (this.status.isAttacked) {
				this.context.fillStyle = "red";
				this.context.fillRect(ent_to_x, ent_to_y - 5, this.width * (this.getHealth() / this.getMaxHealth()), 5);
			} else {
				this.context.fillStyle = "black";
				this.context.font = "11px Georgia";
				this.context.textAlign = "center";
				this.context.fillText(this.name, ent_to_x + this.width / 2, ent_to_y);
			}
			this.context.restore();
			super.render()
		}
	}
}