const Controller = function() {

	this.spacial = new Controller.ButtonInput();
	this.slash 	 = new Controller.ButtonInput();
	this.jump    = new Controller.ButtonInput();

	this.keyDownUp = function(type, key_code) {

		var down = (type == "keydown") ? true : false;

		switch(key_code) {

			case 90: this.spacial.getInput(down); break;
			case 88: this.slash.getInput(down);   break;
			case 67: this.jump.getInput(down);

		}

	};

};

Controller.prototype = {

	constructor : Controller

};

Controller.ButtonInput = function(){

	this.active = this.down = false;

};

Controller.ButtonInput.prototype = {

	constructor : Controller.ButtonInput,

	getInput : function(down) {

		if(this.down != down) this.active = down;
		this.down = down;

	}

};