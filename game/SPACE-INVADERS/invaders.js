(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
  if (!window.performance.now) {
    window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } : 
      function() { return Date.now(); }
  }
})();

// กำหนดค่าต่างๆ
var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 640;
var SPRITE_SHEET_SRC = 'image/tank.png';
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SHOOT_KEY = 32;
var TEXT_BLINK_FREQ = 500;
var PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 32 };
var ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 51, h: 34 }, { x: 0, y: 102, w: 51, h: 34 }];
var ALIEN_MIDDLE_ROW = [ { x: 0, y: 137, w: 50, h: 33 }, { x: 0, y: 170, w: 50, h: 34 }];
var ALIEN_TOP_ROW = [ { x: 0, y: 68, w: 50, h: 32 }, { x: 0, y: 34, w: 50, h: 32 }];
var ALIEN_X_MARGIN = 40;
var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;

// ฟังชั้นและคลาสต่างๆ
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function valueInRange(value, min, max) {
  return (value <= max) && (value >= min);
}
 //เช็คการโดนกระสุน
function checkhit(A, B) {
  var xOverlap = valueInRange(A.x, B.x, B.x + B.w) || valueInRange(B.x, A.x, A.x + A.w);
 
  var yOverlap = valueInRange(A.y, B.y, B.y + B.h) || valueInRange(B.y, A.y, A.y + A.h); 
  return xOverlap && yOverlap;
}

var Point2D = Class.extend({
  init: function(x, y) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
  },
  
  set: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

var Rect = Class.extend({
  init: function(x, y, w, h) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
    this.w = (typeof w === 'undefined') ? 0 : w;
    this.h = (typeof h === 'undefined') ? 0 : h;
  },
  
  set: function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
});

// ค่าทั่วไป
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var aliens = [];
var updateAlienLogic = false;
var alienDirection = -1;
var alienYDown = 0;
var alienCount = 0;
var wave = 1;
var hasGameStarted = false;

// Entities
var BaseSprite = Class.extend({
  init: function(img, x, y) {
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  },
                           
  update: function(dt) { },
  
  _updateBounds: function() {
     this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
  },
  
  _drawImage: function() {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  },
  
  draw: function(resized) {
    this._updateBounds();
    
    this._drawImage();
  }
});

var SheetSprite = BaseSprite.extend({
  init: function(sheetImg, clipRect, x, y) {
    this._super(sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  },
  
  update: function(dt) {},
  
  _updateBounds: function() {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
  },
  
  _drawImage: function() {
    ctx.save();
    ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
    ctx.restore();

  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Player = SheetSprite.extend({
  init: function() {
    this._super(spriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    this.scale.set(0.85, 0.85);
    this.lives = 5;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
  },
  
  reset: function() {
    this.lives = 5;
    this.score = 0;
    this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
  },
  
  shoot: function() {
    var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
    this.bullets.push(bullet);
  },
  
  handleInput: function() {
    if (isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;
    
    if (wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot(); 
        this.bulletDelayAccumulator = 0;
      }
    }
  },
  // กระสุนเคลื่อนที่
  updateBullets: function(dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  },
  
  update: function(dt) {
    // การอัพเดทแต่ละเฟรม
    this.bulletDelayAccumulator += dt;
    
    //  ค่า x เพิ่มขึ้น
    this.position.x += this.xVel * dt;
    
    // ตำแหน่งผู้เล่น ขอบเขตการเคลื่อนไหว
    this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
    this.updateBullets(dt);
  },
  
  draw: function(resized) {
    this._super(resized);

    // การสุน
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
});

var Bullet = BaseSprite.extend({
  init: function(x, y, direction, speed) {
    this._super(bulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },
  
  update: function(dt) {
    this.position.y -= (this.speed * this.direction) * dt;
    
    if (this.position.y < 0) {
      this.alive = false;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Enemy = SheetSprite.extend({
  init: function(clipRects, x, y) {
    this._super(spriteSheetImg, clipRects[0], x, y);
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 2; // 1,2
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
  },
  
  toggleFrame: function() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
  },
  // การยิง
  shoot: function() {
    this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w/2, -1, 500);
  },
  
  update: function(dt) {
    this.stepAccumulator += dt;
    
    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
      updateAlienLogic = true;
    } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
      updateAlienLogic = true;
    }
      if (this.position.y > CANVAS_WIDTH - 50) {
        reset();
      }
      
      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 20 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += alienYDown;
    
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);  
    } else {
      this.bullet = null;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
});

// การเริ่มต้น canvas
function initCanvas() {
  // สร้าง canvas แบบ 2d
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  setImageSmoothing(false);
  
  spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;  
  bulletImages();

  // รับค่าขนาดจอ และ ค่า keyboard
  window.addEventListener('resize', resize);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}
// กระสุน
function bulletImages() {
  var canvas = drawIntoCanvas(2, 8, function(ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    bulletImg = new Image();
    bulletImg.src = canvas.toDataURL();
}

function setImageSmoothing(value) {
  this.ctx['imageSmoothingEnabled'] = value;
  this.ctx['mozImageSmoothingEnabled'] = value;
  this.ctx['oImageSmoothingEnabled'] = value;
  this.ctx['webkitImageSmoothingEnabled'] = value;
  this.ctx['msImageSmoothingEnabled'] = value;
}
// 
function initGame() {
  dirtyRects = [];
  aliens = [];
  player = new Player();
  setupAlien();  
  drawBottomHud();
}
// ตั้งค่า ตัวศัตรู
function setupAlien() {
  alienCount = 0;
  for (var i = 0, len = 5 * 11; i < len; i++) {
    var gridX = (i % 11);
    var gridY = Math.floor(i / 11);
    var clipRects;
    switch (gridY) {
      case 0: 
      case 1: clipRects = ALIEN_BOTTOM_ROW; break;
      case 2: 
      case 3: clipRects = ALIEN_MIDDLE_ROW; break;
      case 4: clipRects = ALIEN_TOP_ROW; break;
    }
    aliens.push(new Enemy(clipRects, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40));
    alienCount++;
  }
}
// รีเซ็ตค่า
function reset() {
  aliens = [];
  setupAlien();
  player.reset();
}
// เริ่มต้น เรียก ตั้งค่าหน้าจอ และแสดงจอ
function init() {
  initCanvas();
  keyStates = [];
  prevKeyStates = [];
  resize();
}

//ฟังชั่นรับค่า
function isKeyDown(key) {
  return keyStates[key];
}

function wasKeyPressed(key) {
  return !prevKeyStates[key] && keyStates[key];
}

// วาดตัวละครต่างๆ และ อัพเดทฟังชั่นต่างๆ
function updateAliens(dt) {
  if (updateAlienLogic) {
    updateAlienLogic = false;
    alienDirection = -alienDirection;
    alienYDown = 25;
  }
  
  for (var i = aliens.length - 1; i >= 0; i--) {
    var alien = aliens[i];
    if (!alien.alive) {
      aliens.splice(i, 1);
      alien = null;
      alienCount--;
      if (alienCount < 1) {
        wave++;
        setupAlien();
      }
      return;
    }
    
    alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
    if (alien.stepDelay <= 0.05) {
      alien.stepDelay = 0.05;
    }
    alien.update(dt);
    
    if (alien.doShoot) {
      alien.doShoot = false;
      alien.shoot();
    }
  }
  alienYDown = 0;
}
//เมื่อกระสุนโดนศัตรู
function hitenemy() {
  var bullets = player.bullets;
  
  for (var i = 0, len = bullets.length; i < len; i++) {
    var bullet = bullets[i];
    for (var j = 0, alen = aliens.length; j < alen; j++) {
      var alien = aliens[j];
      if (checkhit(bullet.bounds, alien.bounds)) {
        alien.alive = bullet.alive = false;
        player.score += 25;
      }
    }
  }
}
// เมื่อ กระสุนโดนผู้เล่น
function hitplayer() {
  for (var i = 0, len = aliens.length; i < len; i++) {
    var alien = aliens[i];
    if (alien.bullet !== null && checkhit(alien.bullet.bounds, player.bounds)) {
      if (player.lives === 0) {
        hasGameStarted = false;
      } else {
       alien.bullet.alive = false;
       player.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
       player.lives--;
        break;
      }

    }
  }
}
//ฟังชั่นเช็คว่าโดน กระสุนยิงโดนรึเปล่า
function hit() {
  hitenemy();
  hitplayer();
}
//
function updateGame(dt) {
  player.handleInput();
  prevKeyStates = keyStates.slice();
  player.update(dt);
  updateAliens(dt);
  hit();
}
// จอ canvas
function drawIntoCanvas(width, height, drawFunc) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  drawFunc(ctx);
  return canvas;
}
//ข้อความปกติ
function fillText(text, x, y, color, fontSize) {
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px Play';
  ctx.fillText(text, x, y);
}
//ข้อความปกติ อยู่ตรงกลางจอ
function fillCenterText(text, x, y, color, fontSize) {
  var metrics = ctx.measureText(text);
  fillText(text, x - metrics.width/2, y, color, fontSize);
}
//ข้อความที่กระพริบ
function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenterText(text, x, y, color, fontSize);
  }
}
// บอก score และ บอกจำนวนชีวิต 
function drawBottomHud() {
  ctx.fillStyle = '#02ff12';
  fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
  ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w, 
                 player.clipRect.h, 45, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
                 player.clipRect.h * 0.5);
  fillCenterText('SCORE: ' + player.score, CANVAS_WIDTH/2, 20);
}
// วาดตัว เอเลี่ยน
function drawAliens(resized) {
  for (var i = 0; i < aliens.length; i++) {
    var alien = aliens[i];
    alien.draw(resized);
  }
}
// เรียกฟังชั้นของใน มี ตัวผู้เล่น , ศัตรู , textบอกจำนวนชีวิต และ score 
function drawGame(resized) {
  player.draw(resized);  
  drawAliens(resized);
  //particleManager.draw();
  drawBottomHud();
}
// เขียนหน้าจอ ข้อความก่อนเข้าเกม
function drawStartScreen() {
  fillCenterText("Space Invaders", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
  fillBlinkingText("Press Enter to Play!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
  fillCenterText("Press Arrow Left and Right to Control", CANVAS_WIDTH/2, CANVAS_HEIGHT/1.6, '#FFFFFF', 36);
  fillCenterText("Press Spacebar to Shoot", CANVAS_WIDTH/2, CANVAS_HEIGHT/1.35, '#FFFFFF', 36);
}
//แสดง canvas หน้าจอก่อนเริ่มเกม 
function animate() {
  var now = window.performance.now();
  var dt = now - lastTime;
  if (dt > 100) dt = 100;
  if (wasKeyPressed(13) && !hasGameStarted) {
    initGame();
    hasGameStarted = true;
  }
  
  if (hasGameStarted) {
     updateGame(dt / 1000);  
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (hasGameStarted) {
    drawGame(false);
  } else {
    drawStartScreen();
  }
  lastTime = now;
  requestAnimationFrame(animate);
}

// เช็คว่า เปิดด้วย Google chrome 
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

	// คำนวณอัตราส่วนสเกลเพื่อรักษาอัตราส่วนภาพให้ถูกต้อง ถ้าเป็น Google chrome
  var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
  
  if (IS_CHROME) {
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    setImageSmoothing(false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
  } else {
    // ปรับขนาดตาม css
    canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
    canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
  }
}

//รับค่า จาก Keyboard ตอนกดปุ่ม
function onKeyDown(e) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}
// ไม่รับค่า จาก Keyboard ตอนปล่อยปุ่ม
function onKeyUp(e) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}

//โหลดไฟล์ทั้งหมดก่อนค่อยเริ่ม
window.onload = function() {
  init();
  animate();
};
