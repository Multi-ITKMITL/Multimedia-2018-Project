var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var color_p = ["hsl(0, 100%, 47%)","hsl(24, 100%, 50%)","hsl(54, 100%, 50%)","hsl(73, 91%, 55%)","hsl(180, 100%, 47%)","hsl(240, 100%, 40%)","hsl(288, 100%, 50%)"]
var color_p2 = ["hsl(0, 75%, 47%)","hsl(24, 75%, 50%)","hsl(54, 75%, 50%)","hsl(73, 70%, 55%)","hsl(180, 75%, 47%)","hsl(240, 75%, 40%)","hsl(288, 75%, 50%)"]
var count = 0;
var shield_fly = 'off';
var clockcount = 0;
var bombkill = "off";
var chktime = "off"; //กำหนดตัวแปรเช็คการเริ่มกดปุ่มตัวแรก
var casebomb = "on";//ตั้งค่าจุดระเบิด
var boomset = "off";//ตั้งระเบิดจะระเบิด
var timebomb = 0;//เซตเวลาระเบิด
var key = { //กำหนดตค่าปุ่มเริ่มต้น
    move:undefined
}
var randomtimeborn = [3.5, 4, 5, 7];
var randomtimestill = [9, 11,12, 13];
var rs = randomtimestill[Math.floor(Math.random() * randomtimestill.length)];
var rb = randomtimeborn[Math.floor(Math.random() * randomtimeborn.length)];
var countchage = 0;
var size = 25; //ขนาดบล็อคตัวงู
var key_p = undefined;
var snake = [{x:canvas.width/2-12.5, y:canvas.height/2-12.5}]; //สร้างarray snake เก็บค่าพิกัดงู ซึ่งตัวแรกให้อยู่กลางแมพ
var long = 0; //ความยาวของตัวงู
var high = 0; //score สุดท้าย
var energy = 30; //กำหนดพลังงาน
var max_energy = 30;
var chkclock = "on"; // เช็คว่างูกินที่เพิ่มเวลาไปหรือยัง
var bomb = {
    x:undefined,
    y:undefined
}
var shield_p = 0;
var clock = {
    x:undefined,
    y:undefined
}
var boom = {
    x:undefined,
    y:undefined
}
var food = {
    x:undefined,
    y:undefined
}
var shield = {
    x:undefined,
    y:undefined,
}
var dx = 12.5;    //ความเร็วไอเทม
var dy = 12.5;
var cc = 1;
var countshield = 1;
var status = "normal";  //สถานะงู [ normal | blue | cooldown ]
var blueCount = 5;
var blink = 0;
var numc = 0;
var ant = undefined;
var ant2 = undefined;

/* Insert Picture Here! */
var pbombr = new Image();
pbombr.src = '../src/pic/bmbr.png';
var pbomb = new Image();
pbomb.src = '../src/pic/bmbg.png';
var pclock = new Image();
pclock.src = '../src/pic/energyball.png';
var pshield = new Image();
pshield.src = '../src/pic/shield.png';
var p2shield = new Image();
p2shield.src = '../src/pic/shield2.png';

    window.onkeyup = function(event) {
        let key = event.key.toUpperCase();
        if ( key == 'W' || key == 'A' || key == 'D') {
            document.getElementById("startGame").style.display="none";
            chktime = "on";
        }
        else if( key == 'P' ) {
            died();
        }
        else if( key == 'M' ){
            status = "mode_blue"
            document.getElementById('bgm').pause(); //Pause เสียง BGM
            sound("blue");
        }
        else if (key == ']'){
            energy -= 10;
            energy = (energy > max_energy?max_energy:energy);
            updateEnergy();
        }
        else if (key == 'V'){
            localStorage.clear();
        }
    }
    //sound("bgm");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i <= 3; i++){ //สร้างพิกัดจุดงูเริ่มต้นซึ่งมี4จุด เพราะมี4บล็อค
        snake.push({
            x:canvas.width/2-12.5,
            y:(canvas.height/2-12.5)+(i*size)
        })
    }
    function spaceNoSnake(){  //พื้นที่ที่ไม่มีงู
        this.space = [] //array เก็บ พื้นที่
        for (var i = 0; i <= canvas.width-size; i += size){ // แกน x
            for(var j = 0; j <= canvas.height-size; j += size){ // แกน y
                for(let y = 0; y < snake.length; y++){
                    if ((snake[y].x == i && snake[y].y == j) || (i == food.x && j == food.y) || (i == bomb.x && j == bomb.y) || (i == clock.x && j == clock.y)){ //พื้นที่ไม่มีอะไรทับงู
                        break}
                    else if (y == snake.length-1) space.push({x:i, y:j})
                }
            }
        }
    }
    spaceNoSnake();
    food = this.space[Math.floor(Math.random() * this.space.length)]; // array อาหารที่เกิด
    window.addEventListener('keydown', function(event){ // รับค่าkeyborad
        key.move= String.fromCharCode(event.keyCode); //ให้ค่าที่รับกลายเป็นstr
    })

    function draw(){ //ฟังชั่นในการสร้างภาพทั้งหมด
        if (status == "mode_blue"){
            if (count%0.5 == 0){
                numc = Math.floor(Math.random() * color_p.length);
                ant = "2px solid "+color_p2[numc];
                myCanvas.style.border = ant;
                ant2 = "0px 0px 80px "+color_p[numc];
                myCanvas.style.boxShadow = ant2;
            }
        }
        else{
            myCanvas.style.border= "2px solid #1FD01F";
            myCanvas.style.boxShadow= "0px 0px 20px #1FEA1F";
        }
        if (key.move == "W" && key_p != "S") key_p = "W"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
        else if (key.move == "S" && key_p != "W" && key_p != undefined) key_p = "S"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
        else if (key.move == "A" && key_p != "D") key_p = "A"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
        else if (key.move == "D" && key_p != "A") key_p = "D"; //เช็คปุ่มและป้องกันการเดินถอยหลัง
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var ct = Math.floor((energy >= 11?0:-(10-energy)*4));
        var color1 = "hsl(0, 96%, "+(40+ct)+"%)";
        var color2 = "#ef648f";
        var shadow1 = "#F20505";
        var sc = (energy >= 11?15:(15-energy));
        for (let i = 0; i < snake.length; i++ ){ //สร้างงูที่อยู่ในarray
            if(status == "mode_blue"){
                    color1 = "#e0f1ff";
                    color2 = color_p2[numc];
                    shadow1 = color_p[numc];
                    document.querySelector("body").style.backgroundImage = 'url("../src/pic/climax.gif")';
                    sc = 25;
            }
            if (status == "cooldown"){
                    sound("cdtime");
                    document.getElementById('blue').pause();    //Pause เสียง Mode Blue
                    if((0 <= countchage && countchage <= 0.4) || (0.8 <= countchage && countchage <= 1.2) || (1.6 <= countchage && countchage <= 2) || (2 <= countchage && countchage <= 2.4) || (2.8 <= countchage && countchage <= 3)){
                        color1 = "pink";
                        color2 = "#ef648f";
                        //blink++;
                    }
                    else{

                        color1 = "#BA01FF";
                        color2 = "#ef648f";
                        //blink++;
                    }
            }
                ctx.shadowColor = shadow1; //สีshadow
                ctx.shadowBlur = sc; //ขนาดshadow
                ctx.fillStyle = color1; //สี
                ctx.fillRect(snake[i].x, snake[i].y, size, size);
                ctx.strokeStyle = color2;
                ctx.strokeRect(snake[i].x, snake[i].y, size, size);
            }

        var colorfood = "white";
        var shadowfood = shadow1;
        var colorsizefood = 10;
        if (status == "mode_blue"){
            colorfood = color2;
            shadowfood = shadow1;
            colorsizefood = 30;
        }
        function drawFood(){
            ctx.shadowColor = shadowfood;
            ctx.shadowBlur = colorsizefood;
            ctx.fillStyle = colorfood; //สร้างอาหาร
            ctx.fillRect(food.x, food.y, size, size);
            ctx.strokeRect(food.x, food.y, size, size);
        }
        let newx = snake[0].x; // ให้พิกัดใหม่มีค่าเท่ากับหัวงู
        let newy = snake[0].y;

        if (this.key_p == "A") newx -= this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d
        if (this.key_p == "S") newy += this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d
        if (this.key_p == "D") newx += this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d
        if (this.key_p == "W") newy -= this.size; // บวกพิกัดใหม่เพิ่มตามค่า w a s d

        newx = (newx >= canvas.width?0:newx < 0?canvas.width:newx); //ถ้างูชนกำแพงงูจะวาปมากำแพงตรงข้ามในแนวแกน x
        newy = (newy >= canvas.height?0:newy < 0?canvas.height:newy); //ถ้างูชนกำแพงงูจะวาปมากำแพงตรงข้ามในแนวแกน y
        if (newx != snake[0].x || newy != snake[0].y){
            for (let i = 0; i < snake.length; i++){ //เช็คว่างูชนรึยัง
                if((newx == snake[i].x && newy == snake[i].y)|| (newx == bomb.x && newy == bomb.y)){
                    //เช็คว่าอยู่ mode อมตะหรือไม่
                    sound("hit");
                    if(status == "normal"){
                        ctx.fillStyle = "#ff7b01";
                        ctx.shadowColor = "#ffb701";
                        ctx.fillStyle = "#ffb701";
                        ctx.shadowBlur = 30;
                        ctx.fillRect(snake[i].x, snake[i].y, size, size);
                        ctx.strokeRect(snake[i].x, snake[i].y, size, size);
                        died();
                    }
                    else if(status == "mode_blue"){
                        status = "cooldown";
                        break;
                    }
                }
            }
        }
        if(newx == food.x && newy == food.y){ //ถ้างูกินอาหารแล้วอาหารจะถูกสุ่มเกิดใหม่
            spaceNoSnake();
            if (status == 'normal' && shield_fly == 'off'){
                shield_p++;}
            sound("bite")   //เสียงกิน
            max_energy += 10;
            updateMaxEnergy();
            food = this.space[Math.floor(Math.random() * this.space.length)];
            }
        else{
            if ((newx != snake[0].x || newy != snake[0].y) && snake.length != 1){
            snake.pop();} //แล้วงูไม่กินอาหารหางจะหาย
        }
        if (newx != snake[0].x || newy != snake[0].y){
            snake.unshift({ //เพิ่มส่วนหัว (ถ้างูกินอาหารส่วนหางจะไม่ถูกตัดทำให้งูยาวขึ้น)
            x:newx,
            y:newy
        })
        }

        var r = "hsl("+(-10+(timebomb*10))+",100%, 50%)"
        function drawBomb(){ //ฟังชั้นวาดระเบิด
            if(timebomb >= 4){
                ctx.shadowColor = r;
                ctx.shadowBlur = (timebomb*20);
                ctx.drawImage(pbomb,bomb.x,bomb.y,size,size);
            }
            else if(timebomb >= 3){
                ctx.shadowColor = r;
                ctx.shadowBlur = (timebomb*20);
                ctx.drawImage(pbombr,bomb.x,bomb.y,size,size);
            }
            else if(timebomb >= 2){
                ctx.shadowColor = r;
                ctx.shadowBlur = (timebomb*20);
                ctx.drawImage(pbomb,bomb.x,bomb.y,size,size);
            }
            else if(timebomb >= 1){
                ctx.shadowColor = r;
                ctx.shadowBlur = (timebomb*20);
                ctx.drawImage(pbombr,bomb.x,bomb.y,size,size);
            }
            else if(timebomb >= 0){
                ctx.shadowColor = r;
                ctx.shadowBlur = (timebomb*18);
                ctx.drawImage(pbomb,bomb.x,bomb.y,size,size);
            }
        }
        function drawBoom(){//วาดรัศมีระเบิด
            ctx.shadowColor = "#FFF60C";
            ctx.shadowBlur = 20;
            ctx.fillStyle = "#FFF60C";
            ctx.fillRect(0, boom.y, canvas.width, size);
            ctx.fillRect(boom.x, 0, size, canvas.height);
        }
        function drawClock(){ //ฟังชั้นวาดระเบิด
            ctx.shadowColor = "#F20505"; //สีshadow
            ctx.shadowBlur = 10; //ขนาดshadow
            ctx.drawImage(pclock,clock.x,clock.y,size,size);
        }
        if (chktime == "on" && shield_fly == 'on'){
            countshield = (countshield*10 + 0.1*10)/10;
        }
        function drawShield(){//วาดไอเทม: โล่
            ctx.shadowColor = "aqua";
            ctx.shadowBlur = 10;
            ctx.fillStyle = "aqua";
            if ((13 <= countshield && countshield <= 13.4)||(13.8 <= countshield && countshield <= 14.2)||(14.6 <= countshield && countshield <= 15)||(15.3 <= countshield && countshield <= 15.6)||(15.8 <= countshield && countshield <= 16)){
                ctx.drawImage(p2shield,shield.x,shield.y,size,size);
            }
            else{
                ctx.drawImage(pshield,shield.x,shield.y,size,size);}
                if(shield.x  >= canvas.width-size || shield.x  <= 0){
                    if (!(chk_ShieldX_born && shield.x == 0)) dx = -dx; //แก้บัคxเกิดตำแหน่ง 0 แล้วขยับไม่ได้
                    chk_ShieldX_born = 0;
                }
                if(shield.y  >= canvas.height-size || shield.y <= 0){
                    if (!(chk_ShieldY_born && shield.y == 0)) dy = -dy;//แก้บัคyเกิดตำแหน่ง 0 แล้วขยับไม่ได้
                    chk_ShieldY_born = 0;
                }
                shield.x += dx;
                shield.y += dy;
        }
        if(shield_p == 3){  //สุ่มตำแหน่ง Shield
            shield_p = 0;
            countshield = 1;
            shield_fly = 'on';
            shield = this.space[Math.floor(Math.random() * this.space.length)];
            var chk_ShieldX_born = 1;
            var chk_ShieldY_born = 1;
            dx = Math.abs(dx);
            dy = Math.abs(dy);
        }
        //เช็คว่ากิน shield ได้ไหม
        if((shield.x >= snake[0].x-12.5 && shield.x <= snake[0].x+12.5) && (shield.y >= snake[0].y-12.5 && shield.y <= snake[0].y+12.5)){
            shield.x = undefined;   //กินเสร็จแล้วไอเทมหาย
            shield.y = undefined;
            status = "mode_blue";
            shield_fly = 'off';
            sound("pop");
            sound("blue");
            chk_ShieldX_born = 1;
            chk_ShieldY_born = 1;
            document.getElementById('bgm').pause();
        }

        if (countshield == 16){
            shield.x = undefined;
            shield.y = undefined;
            shield_p = 0;
            countshield = 1;
            shield_fly = 'off';
            chk_ShieldX_born = 1;
            chk_ShieldY_born = 1;
        }
        if (chktime == "on"){
            count = (count*10 + 0.1*10) /10; // นับที่ละ 1 เพราะฟังชั่นdrawทำงานครั้งละ 1 วิ(ที่ต้องคูณ100เพราะ js บวก float มันกาก)
        }
        if (count%6 == 0){ // ไปที่ฟังชั้นspawn_b เพื่อรีเวลาใหม่
            if (casebomb == "on" && chktime == "on"){
                spaceNoSnake();
                bomb = this.space[Math.floor(Math.random() * this.space.length)];
                boomset = "on"
                casebomb = "off";
                timebomb = 0;
                sound("clock")  //เสียงนาฬิกา
            }
            else{
                bomb.x = undefined;
                bomb.y = undefined;
                casebomb = "on";
                boomset = "on";
            }
        }
        if (boomset == "on"){
            if(timebomb == 5 || bomb.x == undefined){//นับเวลาระเบิดหรือระเบิดหาย
                boom.x = bomb.x;
                boom.y = bomb.y;
                boomset = "off";
                if (bomb.x != undefined){
                    bombkill = "on";
                    sound("fire")   //เสียงระเบิด
                    if (status != "mode_blue"){
                    myCanvas.style.boxShadow = "0 0 20px rgb(28, 218, 28), 0 0 40px rgb(26, 216, 26),0px 0px 80px #1FEA1F,0px 0px 160px #1FEA1F"};
                }
                else {
                    bombkill = "off";
                    if (status != "mode_blue"){
                    myCanvas.style.boxShadow = "0 0 5px rgb(28, 218, 28), 0 0 10px rgb(26, 216, 26),0px 0px 20px #1FEA1F,0px 0px 30px #1FEA1F";}
                }
            }
            timebomb = (timebomb*10 + 0.1*10) /10;  //เวลาระเบิด
        }
        if ((snake[0].x == bomb.x || snake[0].y == bomb.y) && bombkill == "on"){ //โดนระเบิดตาย
            if(status == "normal"){
                ctx.fillStyle = "#42ff00";
                ctx.fillRect(snake[0].x, snake[0].y, size, size);
                ctx.strokeRect(snake[0].x, snake[0].y, size, size);
                cc = 0;
                died();
            }
            else if(status == "mode_blue"){
                status = "cooldown";
            }
        }
        if (bombkill == "on"){
            for (let i = 1; i < snake.length; i++){ //เช็คว่างูชนรึยัง
                if(bomb.x == snake[i].x || bomb.y == snake[i].y){
                    if(status == "normal"){
                        if (cc){
                        snake = snake.slice(0, i);}
                        max_energy = (cc?(snake.length-1)*10:max_energy);
                        if (max_energy == 0){
                            updateMaxEnergy();
                            updateEnergy();
                            youDied.innerText = "Energy Out!!";
                            document.getElementById('youDied').style ="120px";
                            died();
                        }
                        updateMaxEnergy();
                        updateEnergy();
                    }
                    else{
                        status = "cooldown";
                    }
                }
            }
        }

        if (chktime == "on"){
            clockcount = (clockcount*10 + 0.1*10)/10;
        }
        if (snake[0].x == clock.x && snake[0].y == clock.y){ //กินนาฬิกาแล้วหายไปเวลาเพิ่มขึ้น
            energy += 10;
            energy = (energy > max_energy?max_energy:energy);
            updateEnergy();
            clock.x = undefined;
            clock.y = undefined;
            chkclock = "on";
            clockcount = 1;
            rs = randomtimestill[Math.floor(Math.random() * randomtimestill.length)]
            rb = randomtimeborn[Math.floor(Math.random() * randomtimeborn.length)]
            sound("blink");
        }
        if (clockcount % rs == 0){
            clock.x = undefined;
            clock.y = undefined;
            chkclock = "on";
            clockcount = 1;
            rs = randomtimestill[Math.floor(Math.random() * randomtimestill.length)]
            rb = randomtimeborn[Math.floor(Math.random() * randomtimeborn.length)]
        }
        if (clockcount % rb == 0){ // ทำให้เกิดนาฬิกา
            if (chkclock == "on" && chktime == "on"){
                spaceNoSnake();
                clock = this.space[Math.floor(Math.random() * this.space.length)];
                chkclock = "off";;
            }
        }
        if (status == "cooldown"){
            countchage = (countchage*10 + 0.1*10) /10;
            if (countchage == 3){
                document.getElementById('blue').pause();    //Pause เสียง Mode Blue
                document.getElementById('bgm').play();    //Play BGM ต่อ
                document.querySelector("body").style.backgroundImage = 'url("../src/pic/bg1.gif")';
                status = "normal";
                countchage = 0;
            }
        }
        if(energy < 1) sound("flat");
        else if(energy <= 5){
            countcolor = (countcolor*10 + 0.1*10) /10;
            if((countcolor*10)%2 == 0){
                sound("beep");
                www.style.textShadow = "0 0 10px #fff";}
            else{
                www.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF1177, 0 0 30px #FF1177, 0 0 50px #FF1177, 0 0 60px #FF1177";
            }
        }
        else if(energy <= 10){
            countcolor = (countcolor*10 + 0.1*10) /10;
            if((countcolor*10)%3 == 0){
                sound("beep1");
                www.style.textShadow = "0 0 10px #fff";}
            else{
                www.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF1177, 0 0 30px #FF1177, 0 0 50px #FF1177, 0 0 60px #FF1177";
            }
        }
        else{
            countcolor = 0;
            www.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF1177, 0 0 30px #FF1177, 0 0 50px #FF1177, 0 0 60px #FF1177";
        }

    drawClock();//เรียกฟังก์ชันวาดนาฬิกา
    drawFood();//เรียกฟังชั้นวาดอาหาร
    drawBomb();//เรียกฟังชั้นวาดระเบิด
    drawBoom();//เรียกฟังชั้นวาดแรงระเบิด
    drawShield();//เรียกฟังก์ชันวาดไอเทม: โล่

    long = snake.length; //หาขนาด Array งู
    updateScore();//เรียกฟังก์ชัน อัพเดทคะแนน
    }

    let game = setInterval(draw,75);
    countdown();//เรียกฟังก์ชันนับถอยหลัง

    function updateScore(){
        // แสดงคะแนนให้คนดู
        theScore.innerText = long-1; //optional: เอาความยาวมา -1 เพราะไม่อยากให้นับรวมส่วนหัวด้วย
        highScore();}
    function countdown(){
        //  ฟังก์ชันนับเวลา
        cd = setInterval(
        function(){
            // ถ้ายังไม่หมดเวลา
            if (energy > 0) {
                // ลดเวลา
                if (chktime == "on"){ // BUG บางทีมันหน่วงตรงนับ 20
                    energy--;
                // อัพเดทเวลา
                updateEnergy();}
            }
            // ถ้าหมดเวลา
            else{
                youDied.innerText = "Energy Out!!";
                document.getElementById('youDied').style.fontSize = '120px';
                died();
            }
        },1000)
}
    function updateEnergy(){
        // แสดงเวลา
        energy = (energy > max_energy?max_energy:energy);
        Energy.innerText = energy;
    }
    function updateMaxEnergy(){
        // แสดงเวลา
        maxEnergy.innerText = max_energy;
    }
    function highScore(){   //ฟังก์ชั่นเก็บ HighScore
        if((long-1) > high){
            high = long-1;
        }
    }
    function died(){    //ฟังก์ชันตาย
        sound("gameover");  //เสียง Gameovers
        chktime = "off";
        document.getElementById('endGame').style.display = 'block'; //แสดงหน้า endGame ที่ซ่อนไว้
        total.innerText = high;     //คะแนน HighScore
        final.innerText = long-1;   //คะแนน FinalScore
        document.getElementById('bgm').pause(); //Pause เสียง BGM
        document.getElementById('clock').pause(); //Pause เสียง clock (บางทีมันชอบเกินมา)
        document.getElementById('blue').pause();    //Pause เสียง Mode Blue
        clearInterval(game); //หยุดการทำงาน
        clearInterval(cd); //หยุดเวลา
    }
    function start(){
        window.location.reload();   //รีเฟรซหน้า (เหมือน F5)
        document.getElementById('endGame').style.display = 'none';  //ซ่อนหน้า endGame
    }
    function sound(id){ //ฟังก์ชันใส่เสียง
        var song = document.getElementById(id);
        song.play();
        if(id == "bgm" || id == "beep" || id == "flat") song.volume = 0.2;
        else if(id == "beep1") song.volume = 0.1;
        else song.volume = 0.5;
    }