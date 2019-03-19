
// charecter for map
var char =  {"p": Player, "o": gem, "*": trap, "#": trap, "v": trap};

var MAP = [
  ["                       x!!!x                                   v     v     v     v                                                                                                                                                          x!x                 x!x                     x!x     x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
   "                       x!!!x                                                                                                                                                                                                                x!x                 x!x                     x!x     x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
   "                       x!!!x                           o                                                                                                                                                                                     v                   v                      x!x     x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
   "                       x!!!x                                                                                                                                                                                                                                                            x!x     x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
   "o   o                  x!!!x                                                                                                                                                                                                                                                            x!x        v                 v        v             v       v                      v              ",
   "                       x!!!x                           o                                                  o                                                                                                                 o                                                           x!x                                                                                               ",
   "                        vvv                                                                                                                                                                                                                                                             x!x                                                                                               ",
   "                                                                                                                                                                                                                                                                                        x!x                                                                                v              ",
   "xxxxxxxxx                                              o                                           xxxxxxxxxx      xxxxxx                                                                                             xxxxx====xxxxx                                                     v                                                                                                ",
   "                                                                                                          x!x                                                                                                                                                                                                                                                                             ",
   "            o                                                                                             x!x                                                                                                                       xxxxxxxx                                                                                                                                              ",
   "                                                     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx             x!x                 o                                       o                                                             x                                                                                                                                                     ",
   "                                                                                                          x!x                                                                                                                       x          xxxxx                 o                                                                                                                    ",
   "                                                                                                          x!x                                                                                                                       x                                                                                                                                                     ",
   "            xxx                                                                                       o   x!x               xxxxxx                                   xxxxx                                    xxxxx                 x                                                                                                                                                     ",
   "                                                                                                          x!x                                                                                                                       x                      o       xxxxx                                                                                                                  ",
   "      o                                                                                                   x!x                                                                                                                       x                                                        o                                                                                            ",
   "                                                                                                xxxxxxxxxxx!x        o                                                                                                              x                                                                                           o       o                                                 ",
   "                                                                                                          x!x                                                                                                                       x                  xxxxxxxxx             o                                                                                                            ",
   "                                                                                                          x!x                                                                                                                       x                                              xxxxx   xxxxx            o                                                                             ",
   "      xxx                                                  o                                              x!x      xxxxxx                                                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                         x                                                          x                                xxx==xxxxxx                                               ",
   "                                                                                                          x!x        vv                                                          #          #          #                            x                                      xxxxx               x                                                                                    ==    ",
   "                                                                                                          x!x                                                                                                                       x                                                          x      xxxxx====xxxxx                                                                ===   ",
   "o                                            xx     xxxxxx====xxxxxx      xxxxxxxxxxxxxxxxxxx             x!x                                                                                                    xxxxx           o  x                                                          x            #                                                                       ====  ",
   "                                            xx                                                            x!x                                                                                                                       x                                                          x                                              xxxxx   xxxxxxxxxxxxxxx               x     ",
   "                                           xx                                                             x!x                                                                                                                       x                                                          x                                                         #       #                  x     ",
   "xxx                                       xx                                                              x!x                                                                                                               xxxxxxxxx                                                          x                        xxxxx                                                       x     ",
   "!!x                                      xx                                                               x!x                                                                                                                       x                                                          x                                                                                xxxxxxxxxx",
   "!!x       p                       xxxxxxx                                                                 x!x        o                   o          o          o          o          o          o          o                        x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x                                                                                         x",
   "!!x                               x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x                                                                                                                       x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x       o                                                    o                      o     x",
   "!!xx  xxxxxxxxxxx      xxxxx      x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x                                                                                                                       x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x                                                                                         x",
   "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x                                                                                                                       x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x                                                                                         x",
   "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",]]


function Vector(x, y) {
  this.x = x; 
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);};

Vector.prototype.times = function(scale) {
  return new Vector(this.x * scale, this.y * scale);};

/*draw player size and position*/
function Player(pos) {
  this.size = new Vector(3,3);
  this.pos = pos.plus(new Vector(0, -1));
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

/*draw trap , speed*/
function trap(pos, ch) {
  this.size = new Vector(0.7, 0.7);
  this.pos = pos;
  if (ch == '#')
    this.speed = new Vector(0, 15);
  else if (ch == 'v'){
    this.speed = new Vector(0, 5);
    this.repeatPos = pos;
  }
}
trap.prototype.type = "trap";
/*draw gem*/
function gem(pos) {
  this.basePos = this.pos = pos;
  this.size = new Vector(2, 2);
}
gem.prototype.type = "gem";

Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};
/*Draw map*/
function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.actors = [];

  for (var y = 0; y < this.height; y++) {
    var line = plan[y],  gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fill = null;
      var Actor = char[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch === "x")
        fill = "wall";
      else if (ch === "!" || ch === "!" || ch === "#" || ch === "=" || ch === "v"){
        fill = "trap";
        console.log(fill);
      }
      gridLine.push(fill)
    }
    this.grid.push(gridLine);
  }
  this.player = this.actors.filter(function(actor) {
    return actor.type === "player"
  })[0];
  this.status = this.finishDelay = null;
}

function element(name, className) {
  var elem = document.createElement(name);
  if(className)
      elem.className = className;
  return elem;
}

function Display(parent, level) {
  this.cover = parent.appendChild(element("div", "game"));
  this.level = level;

  this.cover.appendChild(this.background());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 20; // scale_on_display

Display.prototype.background = function() {
  var table = element("table", "background");
  table.style.width = this.level.width * scale + "px";
  table.style.height = this.level.height * scale + "px";
  this.level.grid.forEach(function(row) {
  var rowElement = table.appendChild(element("tr"));
    rowElement.style.height = scale + "px";
    row.forEach(function(type) {
      rowElement.appendChild(element("td", type));
    });
  });
  return table;
};

Display.prototype.drawActors = function() {
  var cover = element("div");
  this.level.actors.forEach(function(actor) {
    var rect = cover.appendChild(element("div", "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return cover;
}

Display.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.cover.removeChild(this.actorLayer);
  this.actorLayer = this.cover.appendChild(this.drawActors());
  this.cover.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};


// clear it later
Display.prototype.scrollPlayerIntoView = function() {
  var width = this.cover.clientWidth;
  var height = this.cover.clientHeight;
  var margin = width / 2;

  // The viewport
  var left = this.cover.scrollLeft, right = left + width;
  var top = this.cover.scrollTop, bottom = top + height;

  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.cover.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.cover.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.cover.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.cover.scrollTop = center.y + margin - height;
};

Display.prototype.clear = function() {
  this.cover.parentNode.removeChild(this.cover);
};

Level.prototype.theTrapAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "trap";
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fill = this.grid[y][x];
      if (fill) return fill;
    }
  }
};

Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      return other;
  }
};

var maxStep = 0.05;

Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step;

  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};


trap.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.theTrapAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};


gem.prototype.act = function(step) {
  this.pos = this.basePos.plus(new Vector(0, 0));
};

// walk motion
var walkSpeed = 10; // walk speed

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= walkSpeed;
  if (keys.right) this.speed.x += walkSpeed;
  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var theTrap = level.theTrapAt(newPos, this.size);
  if (theTrap)
    level.playerTouched(theTrap);
  else
    this.pos = newPos;
};

// jump motion
var gravity = 30;
var jumpSpeed = 20; 

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var theTrap = level.theTrapAt(newPos, this.size);
  if (theTrap) {
    level.playerTouched(theTrap);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Die
  if (level.status == "lost") {
    dead.play();
  }
};

Level.prototype.playerTouched = function(type, actor) {
  if (type == "trap" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } else if (type == "gem") {
    this.actors = this.actors.filter(function(other) {
      jump.play();
      return other != actor;
    });
    if (!this.actors.some(function(actor) {
      return actor.type == "gem";
    })) {
      this.status = "win";
      this.finishDelay = 1;
      
    }
  }
};

// Arrow KeyCode
var Control = {37: "left", 38: "up", 39: "right"};

function trackKeys(codes) {
  var pressed = Object.create(null);
  function keyControl(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", keyControl);
  addEventListener("keyup", keyControl);
  return pressed;
}

function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) == false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
var arrows = trackKeys(Control);

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}

//audio
var dead = new Audio();
var jump = new Audio();
dead.src = "sound/jump.wav";
jump.src = "sound/jump1.wav";
// countdown time
var timeleft = 210;
var downloadTimer = setInterval(function(){
  document.getElementById("countdown").innerHTML = "Time : " + timeleft;
  timeleft -= 1;
  if(timeleft <= 0){
    window.location.replace("game.html");
  }
}, 1000);

function runGame(map, Display) {
  function loadMap(n) {
    runLevel(new Level(map[n]), Display, function(status) {
      if (status == "lost") loadMap(n);    // reload map if die
      else window.location.replace("win.html"); //show winner
    });
  } 
  loadMap(0); 
}
runGame(MAP, Display); // run game

