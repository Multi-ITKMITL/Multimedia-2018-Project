class UI {
	constructor(options) {
		this.root = options.root !== undefined ? options.root : document.getElementById("interface");
		this.name = options.name !== undefined ? options.name : "Untitled";
		this.id = options.id !== undefined ? options.id : 0;
		this.class = options.class !== undefined ? options.class : 0;
		this.width = options.width !== undefined ? options.width : 0;
		this.height = options.height !== undefined ? options.height : 0;
		this.padding = options.padding !== undefined ? options.padding : 0;
		this.isPanel = options.isPanel !== undefined ? options.isPanel : false;
		this.showName = options.showName !== undefined ? options.showName : false;
		this.isShow = options.isShow !== undefined ? options.isShow : true;
		this.dragAble = options.dragAble !== undefined ? options.dragAble : false;
		this.game_identity = game.identity
		this.ui = 0;
		this.pos = options.pos !== undefined ? options.pos : {
			x: 100,
			y: 100
		};
	}

	createUI() {
		let ui = document.createElement("div");
		this.ui = ui;
		if (this.id) this.ui.setAttribute("id", this.id);
		if (this.class) this.ui.setAttribute("class", this.class);
		if (this.showName) {
			let header = document.createElement("div");
			header.setAttribute("class", "header");
			header.innerText = this.name.capitalize();
			this.ui.appendChild(header);
		}
		if (this.width) this.ui.style.width = this.width + "px";
		if (this.height) this.ui.style.height = this.height + "px";
		if (this.padding) this.ui.style.padding = this.padding + "px";
		if (this.isPanel) this.root.appendChild(this.ui);
		if (this.dragAble) {
			this.dragObject(this.ui);
		}

		this.isShow ? this.showUI() : this.hideUI();

		this.setPosition(this.pos.x, this.pos.y);
		return ui;
	}

	deleteUI(ui) {
		this.root.removeChild(ui);
		return 1;
	}

	getUI() {
		return this.ui;
	}

	showUI() {
		this.isShow = true;
		this.ui.style.display = "block";
	}

	hideUI() {
		this.isShow = false;
		this.ui.style.display = "none";
	}

	toggleUI() {
		this.isShow = !this.isShow;
		this.isShow ? this.showUI() : this.hideUI();
	}

	appendUI(anotherUI) {
		this.ui.appendChild(anotherUI.getUi());
	}

	setPosition(x, y) {
		this.ui.style.top = y + "px";
		this.ui.style.left = x + "px";
	}

	dragObject(ui) {
		var element = ui;

		var pos1 = 0,
		    pos2 = 0,
		    pos3 = 0,
		    pos4 = 0;

		let header = element.querySelector(".header");
		if (header !== undefined) {
			header.addEventListener("mousedown", (e) => dragMouseDown(e));
			header.classList.add("draggable");
		} else {
			element.addEventListener("mousedown", (e) => dragMouseDown(e));
			element.classList.add("draggable");
		}

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();

			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;

		}

		function elementDrag(e) {
			e = e || window.event;
		    e.preventDefault();
		    // calculate the new cursor position:
		    pos1 = pos3 - e.clientX;
		    pos2 = pos4 - e.clientY;
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    // set the element's new position:
		   	element.style.top = (element.offsetTop - pos2) + "px";
		    element.style.left = (element.offsetLeft - pos1) + "px";
		}

		function closeDragElement() {
		    // stop moving when mouse button is released:
		    document.onmouseup = null;
		    document.onmousemove = null;
		}
	}
}

class UIPlayerStatus extends UI {
	constructor(character) {
		super({
			name: "player status",
			id: "player_status",
			isPanel: true,
			isShow: false,
			showName: true,
			dragAble: true,
			padding: 5,
			pos: {
				x: 100,
				y: 400
			}
		})
		this.character = character;

		this.UI = this.createUI();
		this.UI.style.textAlign = "center";

		this.player_panel = document.createElement("div");
		this.player_panel.setAttribute("id", "player_status");

		this.UI.appendChild(this.player_panel);
	}

	update() {
		this.player_panel.innerHTML = "";
		let p_table = document.createElement("table")
		for (let r = 0; r < 5; r++) {
			let row = p_table.insertRow(r);
			for (let c = 0; c < 2; c++) {
				let cell = row.insertCell(c);

				/* Initialize the slot */
				cell.id = "player_panel_slot";
				cell.setAttribute("slot", r * 5 + c);
				cell.style.width = "100px";
				cell.style.height = "32px";
				cell.innerHTML = "";

				/* Add Event listener to cell */
				cell.addEventListener("dragover", function (e) {
					e.preventDefault();
				});

				let player_panel = this.player_panel;
				cell.addEventListener("drop", function (e) {
					e.preventDefault();
					let data = e.dataTransfer.getData("from-item-slot");
					player_panel.swapItem(data, this.getAttribute("slot"));
				});
			}
		}


		let ui = document.createElement("div");
		ui.innerText = this.character.getName();
		ui.id = "p_name";
		this.player_panel.appendChild(ui);

		/*
		ui = document.createElement("div");
		ui.innerText = `Level: ${this.character.level}`;
		ui.id = "p_level";
		this.player_panel.appendChild(ui);
		*/
		this.player_panel.appendChild(p_table);
	}

	randomRNG() {
		let sp = document.createElement("div");
		this.player_panel.appenccsdChild(sp);
	}

	toggleUI() {
		this.update();
		super.toggleUI();
	}
}

class UIInventory extends UI {
	constructor(inventory) {
		super({
			name: "inventory",
			id: "inventory",
			isPanel: true,
			isShow: false,
			showName: true,
			dragAble: true,
			padding: 5
		});

		this.inventory = inventory;

		this.UI = this.createUI();
		this.UI.style.textAlign = "center";

		this.inv_table = document.createElement("table");
		this.inv_table.setAttribute("id", "player_inventory");
		this.updateInventory();

		this.UI.appendChild(this.inv_table);
	}

	updateInventory() {
		this.inv_table.innerHTML = "";
		for (let r = 0; r < this.inventory.rows; r++) {
			let row = this.inv_table.insertRow(r);
			for (let c = 0; c < this.inventory.cols; c++) {
				let cell = row.insertCell(c);
				let item = this.inventory.getItem(r, c);

				/* Initialize the slot */
				cell.id = "inventory_slot";
				cell.setAttribute("slot", r * 9 + c);
				cell.style.width = "32px";
				cell.style.height = "32px";

				if (item !== undefined && item !== 0) {
					let el_item = new UIItem(item, r * 9 + c);
					cell.appendChild(el_item.getUI());
				} else {
					cell.innerHTML = `<img src="assets\\items\\9999.png">`;
				}

				/* Add Event listener to cell */
				cell.addEventListener("dragover", function (e) {
					e.preventDefault();
				});

				let inventory = this.inventory;
				cell.addEventListener("drop", function (e) {
					e.preventDefault();
					let data = e.dataTransfer.getData("from-item-slot");
					inventory.swapItem(data, this.getAttribute("slot"));
				});
			}
		}
	}

	toggleUI() {
		this.updateInventory();
		super.toggleUI();
	}

	getInventory() {
		return this.inventory;
	}
}

class UIItem extends UI {
	constructor(item, slot) {
		super({
			name: "item",
			class: "item",
			padding: 0,
			width: 32,
			height: 32,
			showName: false
		});
		this.item = item;
		this.slot = slot;

		this.UI = this.createUI();
		this.UI.style.cursor = "pointer";

		this.item_element = document.createElement("img");
		this.item_element.setAttribute("itemId", this.item.getItemId());

		let attr_str = `${this.item.getName()}`;
		for (let attr in this.item.getAttribute()) {
			let prefix = attribute_prefix[attr];
			prefix = prefix.replace("%d", this.item.getAttribute()[attr]);
			attr_str += `\u000d${prefix}`;
		}
		this.UI.setAttribute("title", attr_str);
		this.item_element.src = `assets\\items\\${this.item.getItemId()}.png`;

		this.UI.appendChild(this.item_element);
		if (this.item.isStackable()) {
			let text_amount = document.createElement("span");
			text_amount.classList.add("amount_item");
			text_amount.innerText = this.item.getAmount();
			text_amount.style.userSelect = "none";
			this.UI.appendChild(text_amount);
		}

		/* Add Event Listener - On Drag & Drop Event */
		this.UI.addEventListener("dragstart", function (e) {
			e.dataTransfer.setData("from-item-slot", slot);
			//console.log(e);
		});

		this.UI.addEventListener("dragover", function (e) {
			e.preventDefault();
			//console.log(e);
		});
		this.UI.addEventListener("drop", function (e) {
			//console.log(e);
		});
		this.UI.addEventListener("mouseover", (e) => this.getDetail());
		this.UI.addEventListener('dblclick', () => this.useItem());
		//this.UI.addEventListener("drag", (e) => console.log(e));
	}

	useItem() {
		//console.log(this.item);
		if (this.item.isStackable()) {
			this.item.amount -= 1;
			game.character.setHealth(Math.min(game.character.hp + this.item.attrs["regenHP"], 100));

			if (this.item.amount <= 0) {
				game.character.inventory.storages[Math.floor(this.slot / 9)][this.slot % 9] = 0;
			}
			game.character.inventory.UI.updateInventory();
		}

		else {
			if (game.character.equipment[0] !== undefined) {
				game.character.setAttackDamage(game.character.atk - game.character.equipment[0].attrs["atk"]);
				game.character.inventory.appendItem(game.character.equipment[0]);
				game.character.equipment[0] = undefined;
			}

			if (this.item.category === "sword") {
				game.character.equipment[0] = this.item;
				game.character.inventory.storages[Math.floor(this.slot / 9)][this.slot % 9] = 0;
				game.character.setAttackDamage(game.character.atk + this.item.attrs["atk"]);
			}
			game.character.inventory.UI.updateInventory();
		}
	}

	getItem() {
		return this.item;
	}

	getDetail() {
		console.log(this.item.getName());
	}
}

class UITextBox extends UI {
	constructor(text) {
		super({
			class: "textbox",
			isPanel: true
		});

		this.text = "";
		this.ui = this.createUI();

		this.setText(text);
		this.setPosition(300, 400);
		this.deleteUI();
	}

	deleteUI() {
		super.deleteUI(this.ui);
	}

	setText(text) {
		this.text = text;
		this.ui.innerHTML = this.text;
	}
}

class UIConsoleBox extends UI {
	constructor(text) {
		super({
			class: "consolebox",
			isPanel: true,
			width: 280,
			height: 180
		});

		this.text = "";
		this.ui = this.createUI();

		this.setText(text);
		this.setPosition(300, 400);
		this.deleteUI();
	}

	deleteUI() {
		super.deleteUI(this.ui);
	}

	setText(text) {
		this.text = text;
		this.ui.innerHTML = this.text;
	}
}

class UIHealthBar extends UI {
	constructor(character) {
		super({
			id: "healthbar",
			isPanel: true,
			width: 280,
			height: 60
		});

		this.character = character;
		this.ui = this.createUI();
		this.ui.innerText = `${this.character.getName()} Lv.${this.character.level}`;

		this.hpbar = document.createElement("div");
		this.hpbar.classList.add("bar");
		this.hpbar.id = "hpbar";

		this.health = document.createElement("div");
		this.health.classList.add("health");
		this.hpbar.appendChild(this.health);

		this.hp_text = document.createElement("span");
		this.hp_text.classList.add("floatText")
		this.hpbar.appendChild(this.hp_text);

		this.ui.appendChild(this.hpbar);

		this.expbar = document.createElement("div");
		this.expbar.classList.add("bar");
		this.expbar.id = "expbar";

		this.exp = document.createElement("div");
		this.exp.classList.add("experience");
		this.expbar.appendChild(this.exp);

		this.exp_text = document.createElement("span");
		this.exp_text.classList.add("floatText")
		this.expbar.appendChild(this.exp_text);

		this.ui.appendChild(this.expbar);

		this.setPosition(0, 0);
		this.render();

	}

	render() {
		//this.ui.innerText = `HP : ${this.character.getHealth()} / ${this.character.getMaxHealth()}`
		this.health.style.width = `${this.character.getHealth() / this.character.getMaxHealth() * 100}%`;
		this.exp.style.width = `${this.character.experience / this.character.needExperience * 100}%`;

		if (this.character.getHealth() <= 30) {
			document.querySelector('#interface > #healthbar > .bar > .health').style.animation = "blink .2s step-end infinite alternate";
			document.querySelector('#interface > #healthbar > .bar > .floatText').style.animation = "blinktxt .2s step-end infinite alternate";
		} else {
			document.querySelector('#interface > #healthbar > .bar > .health').style.animation = "";
			document.querySelector('#interface > #healthbar > .bar > .floatText').style.animation = "";
		}

		if (document.querySelectorAll('#player_panel_slot').length > 0) {
			document.querySelectorAll('#player_panel_slot')[0].innerHTML = "HP : " + this.character.getHealth();
		}

		this.hp_text.style.top = "0px";
		this.hp_text.innerText = `HP : ${this.character.getHealth()} / ${this.character.getMaxHealth()}`;

		this.exp_text.style.top = "0px";
		this.exp_text.innerText = `EXP : ${this.character.experience} / ${this.character.needExperience}`;

		setTimeout(() => {
			if (this.game_identity == config.identity)
				this.render();
		}, config.gameTick);
	}
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
