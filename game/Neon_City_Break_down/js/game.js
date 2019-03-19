const Game = function() {

    this.world    = new Game.World();

    this.update   = function() {

      this.world.update();

    };

};

Game.prototype = {
    constructor : Game
};

Game.World = function(friction = 0.8, gravity = 2) {

    this.friction   = friction;
    this.gravity    = gravity;

    this.columns    = 12;
    this.rows       = 4;
    this.speed      = 3;
    this.offset_map = 0;
    this.score      = 0;
    this.highscore = 0;
    this.checkscore = 0;
  
    this.tile_set = new Game.World.TileSet(5, 32);
    this.player   = new Game.World.Object.Player(30, 0);
    this.berserk  = new Game.World.Object.berserk();
    this.Hit      = new Game.World.Object.Hit(this.player.x, this.player.y);

  this.map           = [00,00,00,00,00,00,00,00,00,00,00,00,
                10,11,12,13,14,10,11,12,13,10,12,11,
                05,06,07,08,09,05,06,07,08,05,08,06,
                01,02,03,02,04,02,01,02,01,03,04,02];

    this.height   = 128;
    this.width    = 288;

};

Game.World.prototype = {

    constructor: Game.World,

    update:function() {

        this.scroll_map();
        this.score ++;
      this.player.updatePosition(this.gravity, this.friction);
      this.player.updateAnimation();
        this.berserk.updatePosition();
        this.berserk.updateAnimation();
        if(this.player.collideObject(this.berserk)) 
        {
          this.player.alive = false
          /*add highscore*/
          this.checkscore = this.score
          if (this.checkscore > this.highscore) 
            {
              this.highscore = this.checkscore
            }
        }
        if(this.player.slashing)
        {
            this.Hit.update(this.player.y)
            if(this.berserk.collideObject(this.Hit)) {
                this.berserk.reset();
                this.score += 300;
            }

        }

    },

    scroll_map:function() {

        this.offset_map += this.speed;
        if(this.offset_map >= 32) {

            this.offset_map -= 32;
            for(let index = this.map.length - this.columns * 2; index > -1; index -= this.columns) {

                this.map.splice(index, 1);
                if(index == 24) this.map.splice(index + this.columns - 1, 0, Math.floor(Math.random() * 5 + 5));
                if(index == 12) this.map.splice(index + this.columns - 1, 0, Math.floor(Math.random() * 5 + 10));
                if(index ==  0) this.map.splice(index + this.columns - 1, 0, 0);

            }

            this.map.splice(36, 1);
            this.map.splice(47, 0, Math.floor(Math.random() * 4 + 1));

        }

    },

    reset:function() {

        this.map = [00,00,00,00,00,00,00,00,00,00,00,00,
                    10,11,12,13,14,10,11,12,13,10,12,11,
                    05,06,07,08,09,05,06,07,08,05,08,06,
                    01,02,03,02,04,02,01,02,01,03,04,02];

        this.offset_map = 0;
        this.score      = 0;
        this.player.reset();
        this.berserk.reset();

    }

};

Game.World.Object = function(x, y, width, height) {

  this.height = height;
  this.width  = width;
  this.x      = x;
  this.y      = y;

};

Game.World.Object.prototype = {

    constructor:Game.World.Object,

    collideObject:function(object) {

    if (this.getRight()  < object.getLeft()  ||
        this.getBottom() < object.getTop()   ||
        this.getLeft()   > object.getRight() ||
        this.getTop()    > object.getBottom()) return false;

    return true;

    },

    getBottom : function()  { return this.y + this.height;       },
    getLeft   : function()  { return this.x;                     },
    getRight  : function()  { return this.x + this.width;        },
    getTop    : function()  { return this.y;                     },

};

Game.World.Object.Animator = function(frame_set, delay) {

    this.count       = 0;
    this.delay       = (delay >= 1) ? delay : 1;
    this.frame_set   = frame_set;
    this.frame_index = 0;
    this.frame_value = frame_set[0];
    this.mode        = "pause";

};

Game.World.Object.Animator.prototype = {

    constructor:Game.World.Object.Animator,

    animate:function() {

      switch(this.mode) {

          case "loop" : this.loop(); break;
          case "pause":              break;

      }

    },

    changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {

      if (this.frame_set === frame_set) { return; }

      this.count       = 0;
      this.delay       = delay;
      this.frame_set   = frame_set;
      this.frame_index = frame_index;
      this.frame_value = frame_set[frame_index];
      this.mode        = mode;

    },

    loop:function() {

      this.count ++;

      while(this.count > this.delay) {

        this.count -= this.delay;
        this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
        this.frame_value = this.frame_set[this.frame_index];

      }

    }

};

Game.World.Object.Hit = function(x, y) {

    this.x      = x + 7;
    this.y      = y;
    this.width  = 20;
    this.height = 28;

    Game.World.Object.call(this.x, this.y, this.width, this.height);

};

Game.World.Object.Hit.prototype = {

    constructor:Game.World.Object.Hit,
    update:function(y) {
        this.y = y;
    }

};

Game.World.Object.Player = function(x, y) {

    this.x           = x;
    this.y           = y;
    this.width       = 20;
    this.height      = 28;
    this.jumping     = false;
    this.slashing    = false;
    this.velocity_x  = 0;
    this.velocity_y  = 0;
    this.frame       = 0;
    this.alive       = true;
    this.deadframe   = 0;

    Game.World.Object.call(this.x, this.y, this.width, this.height);
    Game.World.Object.Animator.call(this, Game.World.Object.Player.prototype.frame_sets["idle"], 10);

};

Game.World.Object.Player.prototype = {

    constructor:Game.World.Object.Player,

    frame_sets: {

      "idle"        : [ 0],
        "run"         : [ 1, 2, 3, 4],
        "slash"       : [ 5, 6, 7, 8, 9, 5],
        "jump"        : [10],
        "double-jump" : [11],
        "dead"        : [12,13,14]

    },

    jump: function() {

      if (!this.jumping) {

          this.jumping     = true;
          this.velocity_y -= 30;

      }

    },

    slash:function(){

      if(!this.slashing) {

        this.slashing = true;

      }
      
  },

    updateAnimation:function() {

    //slashAttack-animation
        if(this.slashing)         this.changeFrameSet(this.frame_sets["slash"], "loop", 3);

        //jump-animation
        else if(this.y < 68) {
            if(!this.jumping)     this.changeFrameSet(this.frame_sets["jump"], "pause");
            else if(this.jumping) this.changeFrameSet(this.frame_sets["double-jump"], "pause");
        }

        //dead-animation
        else if(!this.alive)       this.changeFrameSet(this.frame_sets["dead"], "loop", 10);

        //run-animation
        else                      this.changeFrameSet(this.frame_sets["run"], "loop", 5);

        this.animate();

  },


    updatePosition:function(gravity, friction) {// Changed from the update function

        if(this.y + this.height > 96) {

            this.y             = 68;
            Game.World.gravity = 0;
            this.jumping       = false;

        }

        if(this.y < 0) this.y = 0;

        else if(this.y + this.height < 96) Game.World.gravity = 2;

        this.x_old       = this.x;
        this.y_old       = this.y;
        this.velocity_y += gravity;
        this.x          += this.velocity_x;
        this.y          += this.velocity_y;
        
        this.velocity_x *= friction;
        this.velocity_y *= friction;
        
        if(!this.alive) {

            this.deadframe++;

        }
            

      if(this.slashing) {

        if(this.frame == 15) { this.slashing = false; this.frame = 0; }

        this.frame++;

      }

    },
    reset:function() {
        this.jumping     = false;
        this.slashing    = false;
        this.velocity_x  = 0;
        this.velocity_y  = 0;
        this.frame       = 0;
        this.alive       = true;
        this.deadframe   = 0;
    }

};

Game.World.Object.berserk = function() {

    this.x          = 300;
    this.y          = 50;
    this.width      = 28;
    this.height     = 26;
    this.frame      = 0;
    this.velocity_x = -4;
    this.velocity_y = 3;

    Game.World.Object.call(this.x, this.y, this.width, this.height);
    Game.World.Object.Animator.call(this, Game.World.Object.berserk.prototype.frame_sets["berserk"], 3);
    this.mode = "loop";

};

Game.World.Object.berserk.prototype = {

    constructor:Game.World.Object.Enemy,

    frame_sets: { "berserk": [15,16,17,18]},

    reset:function() {

        this.x          = 300;
        this.y          = Math.floor(Math.random() * 69);
        this.velocity_y = 3;
        this.frame      = 0;

    },

    updateAnimation:function() {

        this.animate();

    },


    updatePosition:function() {

        if(this.y > 75)     this.velocity_y = -2;
        else if(this.y < 2) this.velocity_y = 2;

        this.x     += this.velocity_x;
        this.y     += this.velocity_y;
        this.frame ++;

        if(this.x < 0 - this.width) this.reset();

    }

};

Object.assign(Game.World.Object.Player.prototype, Game.World.Object.prototype);
Object.assign(Game.World.Object.Player.prototype, Game.World.Object.Animator.prototype);
Game.World.Object.Player.prototype.constructor = Game.World.Object.Player;

Object.assign(Game.World.Object.berserk.prototype, Game.World.Object.prototype);
Object.assign(Game.World.Object.berserk.prototype, Game.World.Object.Animator.prototype);
Game.World.Object.berserk.prototype.constructor = Game.World.Object.berserk;

Object.assign(Game.World.Object.Hit.prototype, Game.World.Object.prototype);
Game.World.Object.Hit.prototype.constructor = Game.World.Object.Hit;

Game.World.TileSet = function(columns, tile_size) {

    this.columns    = columns;
    this.tile_size  = tile_size;

    let f = Game.World.TileSet.Frame;

  this.frames = [            /*Player Sprite*/
                   new f( 0,  0, 32, 32, 3, -4), //idle
           new f(32,  0, 32, 32, 3, -4), new f(64,  0, 32, 32, 3, -4), new f( 96,  0, 32, 32, 3, -4), new f(128,  0, 32, 32, 3, -4), //run
           new f( 0, 32, 32, 32, 3, -4), new f(32, 32, 32, 32, 3, -4), new f( 64, 32, 32, 32, 3, -4), new f( 96, 32, 32, 32, 3, -4), new f(128, 32, 32, 32, 3, -4), //slash
           new f( 0, 96, 32, 32, 3, -4), //jump
                   new f(32, 96, 32, 32, 3, -4), //doublejump
           new f(64, 96, 32, 32, 3, -4), new f(96, 96, 32, 32, 3, -4), new f(128, 96, 32, 32, 3, -4), // dead

                               /*Enemy sprite*/
                            /*Spin berserk Sprite*/
                   new f( 0,  0, 32, 32, -2, -3),new f(32,  0, 32, 32, -2, -3),new f(64,  0, 32, 32, -2, -3),new f(96,  0, 32, 32, -2, -3),
                            /*One Punch Sprite*/
                   new f( 0, 32, 32, 32, 0,-11),new f(32, 32, 32, 32, 0,-11),new f(64, 32, 32, 32, 0,-11),
                            /*Toxic Pool Sprite*/
                   new f( 0, 64, 32, 32, 3, -3),new f(32, 64, 32, 32, 3, -3),new f(64, 64, 32, 32, 3, -3),new f(96, 64, 32, 32, 3, -3),
                            /*Danger Sprite*/
                   new f( 0, 96, 32, 32, 2, -2),new f(32, 96, 32, 32, 2, -2)
           ];

};

Game.World.TileSet.prototype = { constructor: Game.World.TileSet };

Game.World.TileSet.Frame = function(x, y, width, height, offset_x, offset_y) {

    this.x        = x;
    this.y        = y;
    this.width    = width;
    this.height   = height;
    this.offset_x = offset_x;
    this.offset_y = offset_y;

};

Game.World.TileSet.Frame.prototype = { constructor: Game.World.TileSet.Frame };
