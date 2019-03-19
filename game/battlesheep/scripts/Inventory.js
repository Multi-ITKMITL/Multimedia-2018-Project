class Inventory {
	constructor(owner, rows, cols, attribute) {
		this.owner = owner;
		this.slot = rows * cols;
		this.rows = rows;
		this.cols = cols;
		this.equipment = []; // to do [Weapon, Head, Armour, Arms, Legs, Boots]
		this.storages = attribute.storages ? [...attribute.storages] : this.createEmptyInventory();
		this.UI = new UIInventory(this);
	}

	getUI() {
		return this.UI;
	}

	getOwner() {
		return this.owner;
	}

	getItems() {
		return this.storages;
	}

	getItem(row, col) {
		return (this.storages[row][col] !== undefined && this.storages[row][col] !== 0) ? this.storages[row][col] : 0;
	}

	getItemBySlot(slot) {
		return (this.storages[slot / this.cols][slot % this.cols] !== undefined && this.storages[slot / this.cols][slot % this.cols] !== 0) ? this.storages[slot / this.cols][slot % this.cols] : 0;
	}

	getEquipment() {
		that.getWeapon = function() {
			return this.equipment[0];
		}
		that.getHead = function () {
			return this.equipment[1];
		}
		that.getArmour = function () {
			return this.equipment[2];
		}
		that.getArms = function () {
			return this.equipment[3];
		}
		that.getLegs = function () {
			return this.equipment[4];
		}
		that.getBoots = function () {
			return this.equipment[5];
		}
		return this.equipment;
	}

	setEquipment(equip) {
		that.setWeapon = function (item) {
			this.equipment[0] = item;
		}
		that.setHead = function (item) {
			this.equipment[1] = item;
		}
		that.setArmour = function (item) {
			this.equipment[2] = item;
		}
		that.setArms = function (item) {
			this.equipment[3] = item;
		}
		that.setLegs = function (item) {
			this.equipment[4] = item;
		}
		that.setBoots = function (item) {
			this.equipment[5] = item;
		}
		this.equipment = equip
	}

	swapItem(slot, to_slot) {
		let first_item = {"row": Math.floor(slot / this.cols), "col": slot % this.cols};
		let second_item = {"row": Math.floor(to_slot / this.cols), "col": to_slot % this.cols};

		let temp = this.getItem(first_item.row, first_item.col);
		this.addItem(this.getItem(second_item.row, second_item.col), first_item.row, first_item.col);
		this.addItem(temp, second_item.row, second_item.col);

		this.UI.updateInventory();
	}

	addItem(item, row, col) {
		this.storages[row][col] = item;
	}

	findItem(item) {
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				if (this.storages[r][c] === 0) continue;
				else {
					if (this.storages[r][c].isSame(item)) {
						return [r, c];
					} else {
						continue;
					}
				}
			}
		}
		return 0;
	}

	appendItem(item) {
		if (item.stackable) {
			let index_item = this.findItem(item);
			if (index_item !== 0) {
				let r = index_item[0];
				let c = index_item[1];
				this.storages[r][c].amount += 1;
				return [item, r, c, this.storages[r][c].amount];
			} 
		}

		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				if (!item.stackable) {
					if (this.storages[r][c] == 0) {
						this.storages[r][c] = item;
						return [item, r, c];
					}
				} else {
					if (this.storages[r][c] == 0) {
						this.storages[r][c] = item;
						return [item, r, c, this.storages[r][c].amount];
					}
				}
			}
		}
	}

	createEmptyInventory() {
		let inventory = [];
		for (let r = 0; r < this.rows; r++) {
			let row = []
			for (let c = 0; c < this.cols; c++) {
				row.push(0);
			}
			inventory.push(row);
		}
		return inventory;
	}
}
