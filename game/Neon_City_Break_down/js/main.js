window.addEventListener("load", function(event){

	"use strict";

	const AssetsManager = function () {
		
		this.tile_set_image = undefined;

	}

	AssetsManager.prototype = {
		
		constructor: Game.AssetsManager,

		loadTileSetImage:function(map_url, player_url, enemy_url, callback) {

			this.background      = new Image();
			this.map_tile_set    = new Image();
			this.player_tile_set = new Image();
			this.enemy_tile_set  = new Image();

			this.background.src  = "../image/neon_bg.png";
			this.map_tile_set.addEventListener("load", function(event) {

				callback();

			}, {once : true});

			this.map_tile_set.src = map_url;

			this.player_tile_set.addEventListener("load", function(event) {

				callback();

			}, {once : true});

			this.player_tile_set.src = player_url;

			this.enemy_tile_set.addEventListener("load", function(event) {

				callback();

			}, {once : true});

			this.enemy_tile_set.src = enemy_url;

		}

	};

	var keyDownUp = function(event){

		controller.keyDownUp(event.type, event.keyCode);

	};

	var resize = function(event){

		display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
		display.render();

	};

	var render = function(){

		display.drawObject(assets_manager.background, 0, 0, 0, 0, 288, 128)

		display.drawMap(assets_manager.map_tile_set, game.world.tile_set.columns, game.world.map, game.world.columns, game.world.tile_set.tile_size, game.world.offset_map);

		let frame = game.world.tile_set.frames[game.world.player.frame_value];
		let bframe = game.world.tile_set.frames[game.world.berserk.frame_value];

		/*		if you want to see hitbox uncomment this
		display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, "#ff0000");
		display.drawRectangle(game.world.berserk.x, game.world.berserk.y, game.world.berserk.width, game.world.berserk.height, "#0000ff");
		if(game.world.player.slashing) display.drawRectangle(game.world.player.x + 20, game.world.player.y, 10, game.world.player.height, "#00ff00");
		*/

		display.drawObject(assets_manager.player_tile_set,
		frame.x, frame.y,
		game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
		game.world.player.y + frame.offset_y,
		frame.width, frame.height);

		display.drawObject(assets_manager.enemy_tile_set,
		bframe.x, bframe.y,
		game.world.berserk.x + Math.floor(game.world.berserk.width * 0.5 - bframe.width * 0.5) + bframe.offset_x,
		game.world.berserk.y + bframe.offset_y,
		bframe.width, bframe.height);
		if(!game.world.player.alive) display.drawRectangle(0, 0, game.world.width, game.world.height, "rgba(255, 0, 0, "+game.world.player.deadframe/100+")");

		display.render();

		document.getElementById("score").innerText = "Score: "+game.world.score;
		/*add highscore*/
		document.getElementById("highscore").innerText = "Highscore: "+game.world.highscore;
	};

	var update = function(){

		if(!game.world.player.alive) { 
			controller.jump.active = false; 
			controller.slash.active = false;
			if(game.world.player.deadframe == 30) {
				game.world.reset()
			}
		}
		/*jumpu*/
		else if(controller.jump.active) {game.world.player.jump(); controller.jump.active = false;}
		/*slashu*/
		else if(controller.slash.active) {game.world.player.slash(); controller.slash.active = false;}

		game.update();

	};

	var assets_manager = new AssetsManager();
	var controller     = new Controller();
	var display        = new Display(document.querySelector("canvas"));
  	var game           = new Game();
  	var engine         = new Engine(1000/30, render, update);

  	display.buffer.canvas.height         = game.world.height;
  	display.buffer.canvas.width          = game.world.width;
  	display.buffer.imageSmoothingEnabled = false;

  	assets_manager.loadTileSetImage("../image/neon_map.png", "../image/neon_player.png", "../image/neon_enemy.png", () => {

  		resize();
  		engine.start();

  	});

  	window.addEventListener("keydown", keyDownUp);
  	window.addEventListener("keyup", keyDownUp);
  	window.addEventListener("resize", resize);
  	
});
