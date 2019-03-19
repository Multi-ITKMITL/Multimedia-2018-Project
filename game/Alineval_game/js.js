            var canvas, context;
            var scene, player1, player2;
            const BLOCK_WIDTH = BLOCK_HEIGHT = 10;
            var stopDraw;
            var score1 = 0
            var score2 = 0
            var bgmi = 0;
            function gamestart(){
                //the cavas is the drawing space
                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                // ¡ÓË¹´¢¹Ò´¢Í§¡Óàà¾§
                canvas.style.width ='50%';
                canvas.width = window.innerWidth;
                canvas.style.height ='50%';
                canvas.height = window.innerHeight;
                // ÊÕ¢Í§àÊé¹
                context.fillStyle = "black";

                scene = [];
                
                player1 = new Player1(300,430,'W','S','A','D');
                player1.check();
                player2 = new Player2(1600,430,'I','K','J','L');
                player2.check();
                player1.alive = true;
                player2.alive = true;
                //µÓààË¹è§¢Í§¡Óàà¾§
                var minX = 10;
                var maxX = canvas.width - canvas.width%10-20;
                var minY = 10;
                var maxY = canvas.height - canvas.height%10-20;
                for(var x=minX; x<=maxX; x+=1){
                    wallcash(x,minY);
                    wallcash(x,maxY);
                    }
                for(var y=minY; y<=maxY; y+=1){
                    wallcash(minX,y);
                    wallcash(maxX,y);
                    }
                window.addEventListener('keydown',keyPress,false);
                    stopDraw = setInterval(draw,40);
                
                
            }
            function keyPress(e) {
                // ¤ÇÁ¤ØÁà»ç¹ char
                e.preventDefault();
                var key = String.fromCharCode(e.which);
                player1.keyPress(key);
                player2.keyPress(key);
            }
            // àªçÍ¡ÒÃÍÂÙéÃÍ¡ààÅÐÇÒ´àÊé¹
            function draw(){
                player1.check()
                if(!player1.alive) {
                    clearInterval(stopDraw);
                    const audio = new Audio("ya.wav");
                    audio.play();
                    var c = document.getElementById("canvas");
                    var ctx = c.getContext("2d");
                    var img = document.getElementById("p2-win");
                    ctx.drawImage(img, canvas.width/3, canvas.height/3);
                    score(1)
                    return;
                }
                player2.check()
                if(!player2.alive) {
                    clearInterval(stopDraw);
                    const audio = new Audio("ya.wav");
                    audio.play();
                    var c = document.getElementById("canvas");
                    var ctx = c.getContext("2d");
                    var img = document.getElementById("p1-win");
                    ctx.drawImage(img, canvas.width/3, canvas.height/3);
                    score(2)
                    return;
                }
                for(var i=0; i<scene.length; i++){
                    var block = scene[i];
                    context.fillRect(block.x, block.y, BLOCK_WIDTH, BLOCK_HEIGHT)
                }
                window.addEventListener('keydown', function() { 
                        if (event.keyCode === 82){
                            clearInterval(stopDraw);
                            gamestart()
                        }
                     }, false);
             }
            
            // µÓààË¹è§¢Í§ player ààÅÐ¡ÒÃ¤Çº¤ØÁ
            function Player1(startX,startY,upKey, downKey,leftKey,rightKey){
                this.alive = true;
                this.x = startX;
                this.y = startY;
                this.up = upKey;
                this.down = downKey;
                this.left = leftKey;
                this.right = rightKey;
                this.direction = this.right;

                this.keyPress = function(key){
                    if(key == this.up) {
                        if(this.direction != this.down)
                        {
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.up;
                        }
                    }
                    else if(key == this.down) {
                        if(this.direction != this.up){
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.down;
                        }
                    }
                    else if(key == this.left){
                        if(this.direction != this.right){
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.left;
                        }
                    }
                    else if(key == this.right) {
                    if(this.direction != this.left){
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.right;
                    }
                    }
                }

                this.check = function(){
                    if(this.direction == this.up) 
                        this.y -= BLOCK_HEIGHT;
                    else if(this.direction == this.down) 
                        this.y += BLOCK_HEIGHT;
                    else if(this.direction == this.left) 
                        this.x -= BLOCK_WIDTH;
                    else if(this.direction == this.right) 
                        this.x += BLOCK_WIDTH;
                    for(var i=0; i<scene.length; i++){
                        var block = scene[i];
                        if(block.x==this.x && block.y==this.y)
                            this.alive = false;
                    }
                    wallcash(this.x,this.y);
                }
            }
            function Player2(startX,startY,upKey, downKey,leftKey,rightKey){
                this.alive = true;
                this.x = startX;
                this.y = startY;
                this.up = upKey;
                this.down = downKey;
                this.left = leftKey;
                this.right = rightKey;
                this.direction = this.left;

                this.keyPress = function(key){
                    if(key == this.up) {
                        if(this.direction != this.down)
                        {
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.up;
                        }
                    }
                    else if(key == this.down) { 
                        if(this.direction != this.up){
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.down;
                        }
                    }
                    else if(key == this.left){
                        if(this.direction != this.right){
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.left;
                        }
                    }
                    else if(key == this.right) {
                    if(this.direction != this.left){
                            const audio = new Audio("walk.wav");
                            audio.play();
                            this.direction = this.right;
                    }
                    }
                }   

                this.check = function(){
                    if(this.direction == this.up) 
                        this.y -= BLOCK_HEIGHT;
                    else if(this.direction == this.down) 
                        this.y += BLOCK_HEIGHT;
                    else if(this.direction == this.left) 
                        this.x -= BLOCK_WIDTH;
                    else if(this.direction == this.right) 
                        this.x += BLOCK_WIDTH;
                    for(var i=0; i<scene.length; i++){
                        var block = scene[i];
                        if(block.x==this.x && block.y==this.y)
                            this.alive = false;
                    }
                    wallcash(this.x,this.y);
                    
                }
               
            } 
            function wallcash(x,y){
                scene.push({x:x,y:y})
            }
            function score(s){
                if (s == 1) {
                    score1 ++
                    updatescore(1)
                }
                else{
                    score2 ++
                    updatescore(2)
                }
                            
            }
            function updatescore(u){
                if (u == 1) {
                    score_1.innerText = score1
                }
                else{
                    score_2.innerText = score2
                }
                }
