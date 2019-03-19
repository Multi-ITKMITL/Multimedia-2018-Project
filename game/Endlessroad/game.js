        //สร้างตัวแปรทั้งหมดใว้ในฟังก์ชั่น เผื่อการรีเซท
        function start(){
            //ลูปเพื่มความเร็ซ
            thespeed = 0;
            //แสดงสีปกติ
            run.style.filter = 'grayscale(0)'
            //ค่าเดิมของรถทุกคัน
            resetcar = "position:absolute; background-repeat: no-repeat; background-size: contain; display:block; width:4vw; height:12vh;"
            //เกจพลัง
            slow = document.querySelector('slow');
            //จุดของรถผู้เล้น
            carx = 80;
            cary = 10;
            //ความเร็วของ รถ ถนน
            speedcarx = 0.35;
            speedcary = 0.15;
            speedroad = 1;
            speedenemy = [0.5,0.75,1,1.15];
            speedspawn = [800,650,500,400];
            //ตำแหน่งของรถทั้ง 16 ตัน
            enemytop = [-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15,-15];
            enemyleft = [1,7.25,13.5,20,1,7.25,13.5,20,1,7.25,13.5,20,1,7.25,13.5,20];
            enemystatus = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            //ใช้ชี้ตำแหน่งของ ตัวแปร speedenemy
            lol= 0;
            //ค่าปุ่ม
            key = {};
            //ตำแหน่งเลนที่รถเราอยู่
            lane = [0,0,0,0];
            //เวลา
            sc = 0;
            //สถานะวโลว์
            brainbreak = 0;
            //สถานะของเกจพลัง โดย bbreak = การเปิดให่ใช้งาน brain = จำนวนของพลัง/ความยาวเกจพลัง fill = ความพร้อมของการเติมเกจพลัง lock = เช็คความพร้อม
            lock = 0
            brain = 14;
            fill = 0;
            bbreak = 0;
            //ความเร็วของเสียง
            soundspeed = 1;
        }

        // การเคลื่อนที่ของถนน
        function runroad(){
        var roadx = 0;
        theroad = setInterval(function(){
            roadx+=speedroad;
            run.style.backgroundPosition = '0px '+roadx+'vh';
            if (roadx>=110) {roadx=0;}
            }, 1);
        }

        //การส่งรถจากบนจอลงด้านล่าง โดยจะเช็คสถานะรถก่อนว่า spawn มาหรือยังแล้วค่อยปล่อยลงไป หลังจากลงเกินหน้าจอแล้ว รีเช็ทตำแหน่งรถแล้ว despawn 
        cbefore = -1
        c = -1
        before = -1
        x = -1
        function game(){
            sp = setInterval(spawn, speedspawn[lol]);
            var i;
            theenemyrun = setInterval(function(){
                for(i=0;i<16;i++){
                    if(enemystatus[i] == 1){
                        enemytop[i] += speedenemy[lol];
                    }
                    if(enemytop[i] >= 100){
                        enemytop[i] = -15;
                        enemystatus[i] = 0;
                    }
                }
            },10)
        }
        //สุ่ม skin รถ
        function enecar(){
            var j;
            for(j=0;j<16;j++){
                c = Math.floor(Math.random() * 5);
                enecarchan = document.querySelector('enemy:nth-child('+(j+1)+')');
                enecarchan.style.backgroundImage = "url('img/car"+(c+1)+".png')"
            }
        }

        //spawn รถ
        function theenemycar(){
            enecar();
            theenemy = setInterval(enecar(),20);
        }

        function spawn() {
            while(before == x){
                x = Math.floor(Math.random() * 12);
            }
            before = x;
            enemystatus[x] = 1;
        }

        function stopspawn() {
            clearInterval(sp);
        }
        

        //รับข้อมูลเมื่อปล่อยลูกศร
        window.onkeyup = function(event) { 
            var a = event.code;
            if(a == 'ArrowUp'|| a == 'KeyW'){
                key['Up'] = false;
            }
            else if(a == 'ArrowDown'|| a == 'KeyS'){
                 key['Down'] = false;
            }
            else if(a == 'ArrowRight'|| a == 'KeyD'){
                key['Right'] = false;
            }
            else if(a == 'ArrowLeft'|| a == 'KeyA'){
                key['Left'] = false;
            }
            else if(a == 'Space'){
                key['Space'] = false;
            }
        }
        //รับข้อมูลเมื่อกดลูกศร
        window.onkeydown = function(event) { 
            var a = event.code;
            if(a == 'ArrowUp'|| a == 'KeyW'){
                key['Up'] = true;
            }
            else if(a == 'ArrowDown'|| a == 'KeyS'){
                 key['Down'] = true;
            }
            else if(a == 'ArrowRight'|| a == 'KeyD'){
                key['Right'] = true;
            }
            else if(a == 'ArrowLeft'|| a == 'KeyA'){
                key['Left'] = true;
            }
            else if(a == 'Space'){
                key['Space'] = true;
            }

        }

        //เช็ค Inputการเครื่อนไหวตลอดเวลา
        function move(){

            if(carx<87&&carx>0)carx+=0.1;

            if(key['Up']&&carx>1){
                carx-=speedcarx;
                if((key['Right'])&&cary<20.5){
                cary+=speedcary;
                }
                else if(key['Left']&&cary>0.5){
                cary-=speedcary;
                }
            }
            else if(key['Down']&&carx<87){
                carx+=speedcarx;
                if((key['Right'])&&cary<20.5){
                cary+=speedcary;
                }
                else if(key['Left']&&cary>0.5){
                cary-=speedcary;
                }
            }
            else if((key['Right'])&&cary<20.5){
                cary+=speedcary;
            }
            else if(key['Left']&&cary>0.5){
                cary-=speedcary;
            }
        }

        //ฟังชั่นระบบการ slowtime AKA. "Brainbreak" โดยเมื่อถ้ารับ key:space มาจะทำงาน
        //โดยการใช้ Brainbreak กด1ครั้งจะสามารถใช้จนกว่าเกจจะหมด แต่ถ้าปล่อยแล้วจะไม่สามารถใช้ได้จนกว่าเกจจะกลับมาเต็ม
        function thebrainactive(){
        thebrain = setInterval(function(){
                //ได้รับ key:space และยังไม่มีการเปิดใช้งานให้ เกจวิ่งลดลง
                if(key['Space']==true && bbreak == 0){
                    lock = 0;
                    fill = 2;
                    brain -= 0.058;
                }
                //แล้ว สั่งเกมทั้งหมดเคลื่อนไหวช้าลง
                if(key['Space']==true && brainbreak == 0 && brain>0 && bbreak == 0){
                    run.style.filter = 'grayscale(0.8)'
                    run.style.transition = 'filter 0.5s'
                    speedcarx *= 0.8;
                    speedcary *= 0.8;
                    speedroad *= 0.5;
                    speedenemy[lol] *= 0.5;
                    slowspawn = speedspawn[lol]*2;
                    if(brainbreak == 0)
                        stopspawn();
                    brainbreak = 1;
                    sp = setInterval(spawn, slowspawn);
                }
                //เมื่อปล่อย key:space จะทำการคืนค่าความเร็วเดิม แล้วส่งค่าเพื่อทำการฟื้นฟูเกจ
                else if((key['Space']==false && brainbreak == 1)||(brain<=0 && brainbreak == 1)){
                    lock = 1;
                    bbreak = 1;
                    if(fill >= 50){fill = 1}
                    run.style.filter = 'grayscale(0)'
                    run.style.transition = 'filter 0.5s'

                    speedcarx /= 0.8;
                    speedcary /= 0.8;
                    speedroad /= 0.5;
                    speedenemy[lol] /= 0.5;
                    if(brainbreak == 1)
                        stopspawn();
                    brainbreak = 0;
                    sp = setInterval(spawn, speedspawn[lol]);
                    lock = 1;
                    setTimeout(function(){fill = 1},3000)
                    slow.style.filter = 'grayscale(1)';
                    slow.style.transition = 'filter 0.2s'
                }
                //เมื่อได้รับค่ามาแล้ว จึงจะทำการเติมเกจ
                if(fill == 1 && brain < 14){
                    brain += 0.058*5;
                    bbreak = 1;

                }
                //เมื่อเกจเต็ม จะส่งค่าให้สามารถใช้งานBrainbreakต่อได้
                if(brain >= 14){
                    bbreak = 0;
                    slow.style.filter = 'grayscale(0)';
                    slow.style.transition = 'filter 0.2s'
                }
                slow.style.width = brain+"vw";
            },10)
        }
        //update position ของรถทุกคัน
        function update(){
            player.style.top = carx+'vh';
            player.style.left = cary+'vw';
            for(i=0;i<16;i++)
                document.querySelector('enemy:nth-child('+(i+1)+')').style.top = enemytop[i]+"vh";
            //สถานะการอัพเดท
            ustat = 1;
        }
        //ฟังชั่นสั่งเคลื่อนไหว แล้วเช็คการชนเมื่อตำแหน่งของรถ2คันทับกัน โดยจะเช็คก่อนว่ามีการ update มาแล้วหรือยัง
        function themoveactive(){
        themove = setInterval(function(){
            move();
            update();
            //เช็คเลนของรถผู้เล่น
            if(ustat == 1){
                if (cary < 6.2){
                    lane[0] = 1;
                }
                if (cary > 6.2&&cary<12.6){
                    lane[0] = 0;
                    lane[1] = 1;
                }
                if (cary+4 < 6.2){
                    lane[1] = 0;
                }
                if (cary+4 > 6.2&&cary+4<12.6){
                    lane[1] = 1;
                }

                if (cary > 6.2&&cary < 12.6){
                    lane[1] = 1;
                }
                if (cary > 12.6&&cary<19){
                    lane[1] = 0;
                    lane[2] = 1;
                }

                if (cary+4 < 12.6){
                    lane[2] = 0;
                }
                if (cary+4 > 12.6){
                    lane[2] = 1;
                }

                if (cary > 12.6&&cary < 19){
                    lane[2] = 1;
                }
                if (cary > 19){
                    lane[2] = 0;
                    lane[3] = 1;
                }
                if (cary < 19){
                    lane[3] = 0;;
                }
                if (cary+4 < 19){
                    lane[3] = 0;
                }
                if (cary+4 > 19){
                    lane[3] = 1;
                }
                ustat = 0;
            }
            //เมื่อเช็คคเสร็จแล้ว จะตรวจสอบว่าตำแหน่งมีการทับกันหรือไม่ เมื่อทับกันให้หยุดเกม
                for(i=0;i<16;i++){
                    if(i == 0 || i == 4 || i == 8 || i == 12)
                        if(lane[0]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            stopall()
                            boom(i)
                        }
                    if(i == 1 || i == 5 || i == 9 || i == 13)
                        if(lane[1]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            stopall()
                            boom(i)
                        }
                    if(i == 2 || i == 6 || i == 10 || i == 14)
                        if(lane[2]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            stopall()
                            boom(i)
                        }
                    if(i == 3 || i == 7 || i == 11 || i == 15)
                        if(lane[3]==1&&enemytop[i]+12 > carx+1&&enemytop[i]+1 < carx+12&&enemyleft[i]+0.5<cary+4&&enemyleft[i]+4 > cary+0.5){
                            stopall()
                            boom(i)
                        }

                }
            },10)
        }
        //แสดงผลเวลา
        function time(){
            thetime = setInterval(function(){
                sc += 0.01;
                sec = sc.toFixed(2).split('.')[0];
                milsec = sc.toFixed(2).split('.')[1];
                score.innerText = sec+':'+milsec;
            },10)
        }
        //ระเบิดตูมตามมมมมมมมม
        function boom(i){
            document.querySelector('enemy:nth-child('+(i+1)+')').style.backgroundImage = "url('img/boom.gif')"
            setTimeout(function(){document.querySelector('enemy:nth-child('+(i+1)+')').style.background = ""},1000)
            player.style.backgroundImage = "url('img/boom.gif')"
            setTimeout(function(){player.style.background = "transparent"},1000)
            sound('boom')
        }
        //ฟังชั่นเพื่มความเร็ว เมื่อเวลาผ่านไป ระดับ 2 และ 3ให้เพื่มเมื่อผ่านไป 35วินาที แต่ระดับยากสุดให้เพื่มเมื่อเล่นระดับ3ไป 60 วินาที
        function madness(){
            themaddness = setInterval(function(){
                if(lol<2){
                    lol+=1;
                    speedtext()
                    addspeed('bgm')
                }
                else if(lol=2){
                    thespeed = setTimeout(function(){
                        lol+=1;
                        speedtext()
                    },1065*60)
                    setTimeout(function(){
                        clearTimeout(thespeed);
                    },1065*60.2)
                }

            },1000*35)

        }
        //text แสดงเมื่อเพื่มความเร็วจะวิ่งเมื่อถึงเวลา
        function speedtext(){
            inspd.style.left = "35vw";
                inspd.style.transition = "left .25s";
                setTimeout(function(){
                    inspd.style.left = "100vw";
                    setTimeout(function(){
                        inspd.style.left = "-100vw";
                        inspd.style.transition = "left .0s";
                    },1200);
                },1000);
        }
        //กล่องแสดงข้อความเมื่อจบเกมแล้ว
        function over(){
            setTimeout(function(){
                gameover.style.zIndex = '1000';
                gameover.style.width = '20vw';
                gameover.style.transition = 'width 0.75s';
                gamescore.innerText = sec+':'+milsec;
            },1000)
        }
        //การเล่นเสียง
        function sound(id){
        var audio = document.getElementById(id)
        audio.play();
        audio.volume = 0.2;
        }
        function pausesound(id){
            var audio = document.getElementById(id)
            audio.pause();
            audio.currentTime = 0;
        }
        function addspeed(id){
            var audio = document.getElementById(id)
            soundspeed *= 1.1;
            audio.playbackRate = soundspeed;
        }
        //สั่งฟังก์ชั่นทุกส่วนให้ทำงาน
        function allstart(){
            time()
            start()
            runroad();
            game();
            madness();
            update();
        }
        //ลูปทุกตัวในส่วนที่ไม่ถูกครอบคลุใด้วยฟังก์ชั่น
        function allInterval(){
            theenemycar();
            themoveactive();
            thebrainactive();
        }
        //หยุดการทำงานทั้งหมด
        function stopall(){
            clearInterval(thetime);
            clearInterval(thebrain);
            clearInterval(theenemy);
            clearInterval(theenemyrun);
            clearInterval(theroad);
            clearInterval(themove);
            clearInterval(themaddness);
            clearInterval(sp);
            clearTimeout(thespeed);
            pausesound('bgm');
            over();
        }
        //สั่งเกมให้ทำงาน
        function rungame(){
            sound('bgm');
            allstart();
            allInterval();
            player.style = resetcar;
            gameover.style.zIndex = '-1000';
            gameover.style.width = '0vw';
            document.querySelector('test').style.zIndex = '-100';

        }
