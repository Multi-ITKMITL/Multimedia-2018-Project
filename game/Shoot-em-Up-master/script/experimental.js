///////////////////////////////
// Hand-crafted with Love ♥ //
/////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gForce = 10;
var player;
level = [];


function Rectangle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function Entity(x, y, width, height, color) {
    Rectangle.call(this, x, y, width, height, color);
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.score = 0;

    this.entityUpdate = function entityUpdate() {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.updatePos = function updatePos() {
        this.y += this.yVelocity + gForce;
        this.x += this.xVelocity;
    }

    this.moveRight = () => {
        xVelocity = 4;
    }

    this.moveLeft = () => {
        xVelocity = -4;
    }

    this.jump = () => {
        yVelocity = -4;
    }
}

const draw = {
    canvas : function drawCanvas(width, height, color) {
        this.width = width;
        this.height = height;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    map : function drawMap() { // Draw map and keep all platform in array
        level.push(
            Rectangle(400, 600, 400, 10, "red")
        );
    }
}

// ---------- Game Loop ----------

function load() {
    draw.canvas(1200, 750, "#383434");
    draw.map();
    player = new Entity(500, 100, 50, 80, "#9ce2a0");
    setInterval(game, 33); // 33ms ~ 30fps (defalut = 33ms)
}

function updateGame() {
    draw.canvas(1200, 750, "#383434"); //render Canvas first
    draw.map(); // than render map
    player.entityUpdate(); // than everything else

}

function game() {
    //player.moveLeft();
    player.updatePos();
    updateGame();

}
