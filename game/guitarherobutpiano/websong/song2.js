var button = {}; //เก็บสถานะว่าปุ่มไหนกดอยู่บ้าง
var speed = 2; //ความเร็วของเกม
//ไว้แปลงจากโน๊ตเป็นชื่อปุ่ม
var keybutton = {"C":"A", "D":"S", "E":"D", "F":"F", "G":"G", "A":"H", "B":"J", "C2":"K", "bC":"W", "bD":"E", "bF":"T", "bA":"Y", "bB":"U"};
//แปลงจากชื่อปุ่มเป็นโน๊ต
var buttonkey = {"A":"C", "S":"D", "D":"E", "F":"F", "G":"G", "H":"A", "J":"B", "K":"C2", "W":"bC", "E":"bD", "T":"bF", "Y":"bA", "U":"bB"};
//ความกว้างของ Tile สำหรับให้โน๊ตตกลงมา
var tilewidth = {"TC":50, "TbC":25, "TD":50, "TbD":25, "TE":50, "TF":50, "TbF":25, "TG":50, "TbA":25, "TA":50, "TbB":25, "TB":50};
var score = 0;//คะแนน
var buttonuse = ["A", "S", "D", "F", "G", "H", "J", "W", "E", "T", "Y", "U"]; //ปุ่มที่ใช้
var presscount = 0; //นับจำนวนครั้งที่ยกนิ้วออกจากปุ่ม (ยังไม่ได้ใช้)
var notedowned = 0; //จำนวนโน๊ตที่ตกลงมาแล้ว
var miss = 0; //จำนวนโน๊ตที่ไม่โดนกด และ ตกขอบจอหายไปแล้ว
var combo = 0; //นับคอมโบ
var maxcombo = 0;

//เล่นเสียงโน๊ตต่างๆ
function playsound(soundname, vol){
    var thesound = document.querySelector(`audio[data-key="` + soundname +`"]`); //query element เสียงที่ต้องการจาก html
    thesound.volume = vol;
    thesound.pause(); //หยุดเล่นเสียงนั้น (กรณีที่เสียงถูกเล่นก่อนหน้า)
    const playPromise = thesound.play(); //เล่นเสียง
    if (playPromise !== null){
        thesound.currentTime = 0;
        playPromise.catch(() => { thesound.play(); })
    } //ทั้งกล่องนี้ไว้กัน DOMexception ของ chrome
}
//รับ event การกดแป้นคีย์บอร์ด ทั้งตอนกด และ ตอนยกนิ้วออกจากปุ่ม แล้วเปลี่ยนสถานะของแต่ละปุ่มใน Object button
document.onkeydown = document.onkeyup = function(e){
    var key_code = String.fromCharCode(e.keyCode);
    if(countpress() < 2 || e.type == "keyup") //ป้องกันไม่ให้มีการกดพร้อมกันเกิน 2 ปุ่ม
        button[key_code] = e.type == "keydown";
    presscount += e.type == "keyup";
    // keypress.innerText = pressing;
    pressing = "";
}
//รายชื่อปุ่มตามลำดับ เอาไว้ loop set ค่าเฉยๆ
var allkeyid = {0:"C", 1:"D", 2:"E", 3:"F", 4:"G", 5:"A", 6:"B", 7:"bC", 8:"bD", 9:"bF", 10:"bA", 11:"bB"};

//นับจำนวณปุ่มที่ถูกกด ณ ปัจจุบัน (นับจากปุ่มที่ใช้เท่านั้น กดปุ่มอื่นไม่นำมานับรวมด้วย)
function countpress(){
    var count = 0;
    for(i = 0 ; i <= 11 ; i++){
        if(button[buttonuse[i]])
            count += 1;
    }
    return count;
}

//Set ค่า style ปรับตำแหน่งของ piano key และ tile
for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById(allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
    pk.style.top = 450;
}

for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById("T" + allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
}

//ทำฟังก์ชันด้านล่างซ้ำๆ
setInterval(whatkeypress, 10);

//function เช็คว่าปุ่มใดถูกกดอยู่ และให้แสดงผลว่าปุ่มถูกกดโดยการเปลี่ยน style ของ ปุ่ม
function whatkeypress(){
    for(i = 0 ; i <= 11 ; i++){
        if(button[keybutton[allkeyid[i]]]){
            updatekeyart(allkeyid[i], "onpress");
            updatekeyart("T" + allkeyid[i], "onpress");
        }
        else{
            updatekeyart(allkeyid[i], "unpress");
            updatekeyart("T" + allkeyid[i], "unpress");
        }
    }   
}

//ฟังก์ชันเปลี่ยน status ของทุกๆอย่าง รับชื่อ element นั้นๆ และ สถานะที่จะเปลี่ยน
function updatekeyart(keyname, statset){
    var keypressed = document.getElementById(keyname);
    keypressed.setAttribute("status", statset);
}

//array เก็บ element ทุกตัวที่กำลงตกลงมา เริ่มต้นไม่มีสักตัว
var fallingnote = [];

//ฟังก์ชันปล่อย note ให้ตกลงมา รับค่า tile ที่จะให้ตก และ จำนวนจังหวะของ note แต่ละตัว
function addnote(tileid, rythm){
    var note = document.createElement("div"); //สร้าง Element note ออกมา
    note.setAttribute("class", "note"); //set ค่า Attribute ต่างๆ ตั้ง class เป็น note
    note.setAttribute("y", 0); //set ค่า y เริ่มต้น ว่าจะให้ปล่อยจากจุดไหน
    note.setAttribute("size", rythm); //กำหนดขนาดของตัว note
    note.setAttribute("keytohit", tileid.slice(1, tileid.length - 1)); //กำหนดปุ่มที่จะต้องกดเพื่อเล่นเสียง
    note.setAttribute("soundkey", tileid.slice(1, tileid.length) + "-" + rythm); //กำหนดชื่อไฟล์เสียงที่จะเล่นเมื่อโดนกด
    note.setAttribute("hit", "false"); //สถานะว่าโดนกดรึยัง
    note.style.width = tilewidth[tileid];  //เปลี่ยนความกว้างโน๊ตให้เท่ากับขนาดของ tile
    fallingnote.push(note); //นำ element นี้ใส่ใน fallingnote array
    tile = document.getElementById(tileid.slice(0, tileid.length - 1)); //get Element ของ tile ที่ note จะไปอยู่
    tile.appendChild(note); //ปล่อยโน๊ตลงไปใน Tile นั้น
}
//เพลง เป็น array formatคือ ["ชื่อโน๊ต", "จำนวนจังหวะ"]
var song = [["C3", 3], ["bD3", 3], 
["F3", 3],  ["bD3", 3], ["F3", 1],
["0", 1], 
["F3", 3], ["bB3", 2], ["bA3", 2], 
["G3", 1], ["F3", 1], ["G3", 3],
 ["0", 1], ["G3", 3], ["bB3", 3], 
["C4", 2], ["F3", 1], 
["bD3", 1],
 ["bB3", 1], ["G3", 3],
["bB3", 2],["0", 1],
 ["bB3", 3], ["C4", 4], ["0", 4],
 ["C3", 2], ["bD3", 1], ["0", 1],
  ["F3", 2], ["bD3", 2], 
  ["F3", 1],["0", 0.5],
   ["F3", 1],["0", 0.5], ["F3", 1],




["bB3", 1], ["bA3", 1], ["G3", 1], ["F3", 2],


 ["G3", 3], ["G3", 2], ["bB3", 2], ["C4", 2], ["F3", 2], ["bD3", 1], ["bB3", 1], ["0", 0.5], ["bB3", 1], ["G3", 1], ["bB3", 1], ["bB3", 3], ["C4", 3],
["bD3", 2], ["bB2", 4], ["0", 1], ["bD3", 1],["0", 0.5], ["bD3", 2], ["F3", 2], ["bB2", 1], ["bB2", 3], ["0", 1],

["bB2", 1], ["G3", 2], ["bA3", 2], ["G3", 2], ["F3", 2], ["bD3", 2], ["F3", 2], ["G3", 2], ["bA3", 2], ["G3", 2], ["C3", 2],
["0", 2], ["C3", 1], ["D3", 1], ["bD3", 2], ["bD3", 2], ["D3", 1],["0", 1], ["D3", 3], ["0", 1], ["bD3", 1], ["F3", 1], ["G3", 1], ["0", 1], ["G3", 2], ["F3", 1], ["bD3", 3],
["G3", 1], ["0", 0.5], ["G3", 2], ["F3", 2], ["E3", 2], ["F3", 2], ["C3", 2], ["C3", 3], ["D3", 1], ["0", 0.5], ["D3", 3], ["0",1],
["bD3", 2], ["bB2", 4], ["0", 0.5], ["bD3", 1], ["0", 1], ["bD3", 2], ["F3", 2], ["bB2", 1], ["bB2", 3], ["0", 0.5],
["bB2", 2], ["G3", 2], ["bA3", 2], ["G3", 2], ["bD3", 2], ["F3", 2], ["G3", 3], ["bA3", 2], ["G3", 2], ["C3", 3], ["0", 2],
["C3", 1], ["D3", 1], ["bD3", 2], ["bD3", 3], ["D3", 1], ["0", 0.5], ["D3", 2], ["0", 1], ["bD3", 1], ["F3", 1], ["bA3", 2], ["G3", 2], ["F3", 2], ["bD3", 4],
["G3", 1], ["0", 0.5], ["G3", 2], ["F3", 2], ["E3", 2], ["F3", 2], ["G3", 2], ["bA3", 1], ["0", 0,5], ["bA3", 4], ["0", 4],
["bD3", 2], ["bD3", 2], ["D3", 1], ["bD3", 2], ["bD3", 2], ["D3", 1], ["0", 0.5], ["F3", 2], ["F3", 3], ["bD3", 1], ["D3", 3], ["C3", 2], ["D3", 2], ["bD3", 1], ["0", 0.5], ["bD3", 2], ["D3", 2], ["F3", 3], ["D3", 3], ["C3", 1], ["F3", 3], ["G3", 3], ["bA3", 3], ["bB3", 2],
["bD3", 1], ["0", 0.5], ["bD3", 2], ["D3", 1], ["bD3", 1], ["0", 0.5], ["bD3", 2], ["D3", 1], ["F3", 1], ["0", 0.5], ["F3", 3], ["bD3", 1], ["D3", 2], ["bD3", 2], ["F3", 1], ["G3", 2], ["bA3", 2], ["G3", 2], ["F3", 2], ["bD3", 2], ["F3", 2], ["G3", 4],
["G3", 2], ["A3", 2], ["B3", 1], ["C3", 3], ["bD3", 2], ["F3", 3], ["bD3", 2], ["F3", 1], ["0", 0.5], ["F3", 1], ["0", 0.5], ["F3", 1], ["0", 1], ["bB3", 2], ["bA3", 1], ["G3", 2], ["F3", 1], ["G3", 3],

["G3", 2], ["bB3", 2], ["C4", 2], ["F3", 3], ["bD3", 1], ["D3", 1], ["0", 0.5], ["D3", 1], ["C3", 1], ["D3", 1], ["bD3", 1], ["D3", 1], ["bD3", 3],
["0", 0.5], ["C3", 3], ["bD3", 2], ["F3", 3], ["bD3", 2], ["F3", 1], ["0", 0.5], ["F3", 1], ["0", 0.5], ["F3", 1], ["0", 1], ["bB3", 2], ["bA3", 1], ["G3", 2], ["F3", 1], ["G3", 3],
["G3", 2], ["bB3", 2], ["C4", 2], ["F3", 3], ["bD3", 1], ["D3", 1], ["0", 0.5], ["D3", 1], ["C3", 1], ["D3", 1], ["bD3", 1], ["D3", 1], ["bD3", 3],
["0", 0.5], ["C3", 3], ["bD3", 2], ["F3", 3], ["bD3", 2], ["F3", 1], ["0", 0.5], ["F3", 1], ["0", 0.5], ["F3", 1], ["0", 1], ["bB3", 2], ["bA3", 1], ["G3", 2], ["F3", 1], ["G3", 4],
["G3", 2], ["bB3", 2], ["C4", 2], ["F3", 3], ["bB3", 1], ["bB3", 1],  ["G3", 1], ["bB3", 1], ["bB3", 1], ["C4", 4]];

var songtime = 0; //นับเวลาว่าปัจจุบันเพลงกี่วินาทีแล้วฃ
//Function เล่นเพลง จะปล่อยโน๊ตแต่ละตัวตามลำดับไล่ลงมา
var cordsong = 
[["G2", 4], ["0", 2], ["bA2", 4], ["0", 3], ["bB2", 4], ["0", 3], ["bB2", 4], ["0", 1], ["G2", 4], ["0", 3],
["bA3", 3], ["bA3", 4], ["0", 3], ["C3", 4], ["0", 4], ["0", 3], ["C2", 4], ["F1", 4], ["0", 1.5], ["bB1", 4], ["0", 1],
["bD2", 2], ["C2", 4], ["F1", 4], ["0", 1], ["bB1", 4], ["C2", 4], ["bD1", 4], ["0", 2], ["bB1", 4], ["0", 4],
["C2", 4], ["0", 2], ["bB1", 4], ["0", 1], ["bA1", 4], ["0", 4], ["0", 4], ["bB1", 4], ["0", 1], ["bB1", 4], ["bD2", 4], ["0", 2],
["C2", 3], ["D2", 4], ["0", 4], ["0", 2], ["G1", 4], ["G3", 4], ["bD1", 4], ["0", 4], ["bB1", 4], ["0", 4], ["C2", 4], ["0", 2],
["bB1", 4], ["0", 1], ["bA1", 4], ["0", 4], ["0", 4], ["bB1", 4], ["0", 1], ["bB1", 4], ["bD2", 4], ["0", 1], ["C2", 4], 


["D2", 4], ["0", 4], ["0", 3], ["G1", 4], ["0", 4], ["bD2", 4], ["0", 4], ["0", 2], ["G1", 4], ["C2", 4], ["0", 2], 
["F1", 4], ["0", 1], ["bB1", 4], ["0", 1], ["bB1", 4], ["0", 1], ["bD2", 4], ["bA1", 4], ["0", 4], ["0", 2], ["G1", 4],


["C2", 4], ["D2", 4], ["0", 4], ["0", 4], ["G1", 4], ["0", 4], ["0", 2], ["C2", 4], ["F1", 4], ["bB1", 4], ["bD2", 4],
["C2", 4], ["F1", 4], ["bB1", 4], ["C2", 4], ["C2", 4], ["F1", 4], ["bB1", 4], ["bD2", 4], ["C2", 4], ["F1", 4], ["C2", 2], ["0", 1],

["C2", 2], ["F1", 4], ["bB1", 4], ["bD2", 4], ["C2", 4], ["F1", 4], ["C2", 2], ["0", 1],
["C2", 2], 
["C2", 2], ["F1", 4], ["bB1", 4], ["bD2", 4], ["C2", 4], ["F1", 4], ["C2", 2], ["0", 1],
["C2", 2],
["C2", 2], ["F1", 4], ["bB1", 4], ["bD2", 4], ["C2", 4], ["F1", 4], ["C2", 2], ["0", 1],
["C2", 2],
["C2", 2], ["F1", 4], ["bB1", 4], ["bD2", 4], ["C2", 4], ["F1", 4], ["C2", 2], ["0", 1],
["C2", 2],
["C2", 2], ["bD2", 4]];

var cordtime = 0;

function countdown(cd){
    Thecountdowntext.style.display = "none";
    Thecountdownnum.style.visibility = "visible";   
    for(let i = 1 ; i <= 4 ; i++){
        setTimeout(function(){
            console.log(cd);
            cd --;
            Thecountdownnum.innerText = cd + "s";
            if(i == 4){
                Thecountdown.style.display = "none";
                playsong();
                setTimeout(function(){
                    playcord();
                }, 5400);
            }
        }, i*1000);
    }
}



function playcord(){
    for(let i = 0 ; i <= cordsong.length - 1 ; i++){
        cordtime += cordsong[i][1]*(i != 0) + 0.05;
        setTimeout(function(){
            if(cordsong[i][0] != "0"){
                console.log(cordsong[i][0]);
                playsound(cordsong[i][0] + "-" + cordsong[i][1], 0.4);
            }
        }, cordtime*1000/Math.pow(speed, 2));
    }
}


function playsong(){
    for(let i = 0 ; i <= song.length - 1 ; i++){
        songtime += song[i][1]*(i != 0) + 0.05;
        setTimeout(function(){
            if(song[i][0] != "0"){
                addnote("T" + song[i][0], song[i][1]);
            }
            if(i == song.length - 1){
                setTimeout(function(){
                    model.style.visibility = "visible";
                    sumscore.innerText = score;
                    var acc = ((notedowned - miss)/notedowned*100);
                    resultacc.innerText = "Accuracy : " + ((notedowned - miss)/notedowned*100).toString().slice(0, 5) + "%";
                    Mcombo.innerText = "Max Combo : " + maxcombo;
                    if(acc >= 90){
                        rank.setAttribute("Getrank", "S");
                    }else if(acc >= 80){
                        rank.setAttribute("Getrank", "A");
                    }else if(acc >= 65){
                        rank.setAttribute("Getrank", "B");
                    }else{
                        rank.setAttribute("Getrank", "C");
                    }
                }, 6400)
            }
        }, songtime*1000/Math.pow(speed, 2)); //ต้อง ^2 เพราะ speed ในการปล่อยเร็วขึ้น n เท่า และ speed ในการตกก็เร็วขึ้น n เท่า (n^2)
    }
}
// playsong(); //เรียกใช้ฟังก์ชั่น ให้มันปล๋อยโน๊ตตกลงมาก

//Function ทำให้โน๊ตทุกตัวตกลงมาเรื่อยๆ
function falldownnote(noteid){
        var note = fallingnote[noteid];
        var posy = Number(note.getAttribute("y"));
        posy += speed;
        note.setAttribute("y", posy);
        note.style.top = posy;
}

//Function ลบ Note ที่ตกลงมาจนเลยขอบไปแล้ว
function delunbound(noteid){
    var note = fallingnote[noteid];
    if(note.getAttribute("hit") == "false"){
        miss += 1; //หาก note ไม่ถูกกด miss + 1
        combo = 0
    }
    if(note.getAttribute("hit") == "true"){
        combo += 1;
        score += 100 + combo*10; //หาก note ถูกกด score + 1
    }
    if(combo > maxcombo){
        maxcombo = combo;
    }
    note.parentNode.removeChild(note)  //เอาโน๊ตออกจาก tile
    fallingnote.splice(noteid, 1);
    notedowned += 1; //นับว่าโน๊ตตกลงมาเพิ่มแล้วอีก 1 ตัว
    accuracy.innerText = "Accuracy : " + ((notedowned - miss)/notedowned*100).toString().slice(0, 5) + "%";
}

//ฟังก์ชันเช็คว่า Note ที่ตกลงมาเลยขอบรึยัง
function isunboundnote(noteid){
    var note = fallingnote[noteid];
    var posy = Number(note.getAttribute("y"));
    return (posy >= 480)
}

//Function เช็คว่า note โดนกดรึยัง ถ้าโดนกดให้เล่นเสียง
function keyhit(){
    for(let i = 0 ; i < fallingnote.length ; i++){
        var posy = fallingnote[i].getAttribute("y");
        var notesize = Number(fallingnote[i].getAttribute("size"))*20;
        var canhit = (posy >= (450 - notesize)) && (posy <= 450);
        var hit = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]] //เช็คว่ากดโดนมั้ยจากตำแหน่ง y
        if(fallingnote[i].getAttribute("hit") == "false" && hit){ //ถ้ายังไม่โดนกด และ กดโดน
            fallingnote[i].setAttribute("hit", hit);
            playsound(fallingnote[i].getAttribute("soundkey"), 1); //เล่นเสียง
        }
    }
}

//ทำฟังก์ชัน falldownnote เพื่อให้ note ทุกตัวตกตลอดเวลา - เช็คว่าพ้นขอบมั้ย - ถ้าพ้นขอบแล้วให้ลบ  Note ตัวนั้นออก
//เป็น interval ที่เอาไว้ update ค่าตัวเลขที่แสดงต่างๆด้วยเนื่องจากทำงานตลอดเวลา เปลี่ยนพวกคะแนน และ ความแม่นยำ ต่างๆ
setInterval(function(){
    if(fallingnote){
        for(let i = 0 ; i < fallingnote.length ; i ++){
            falldownnote(i);
            if(isunboundnote(i)){
                delunbound(i);
        }
    }
}
    progress.style.width = notedowned/song.length*100 + "%";
    pacman.style.left = notedowned/song.length*100 + "%";
    keyhit();
    Thescore.innerText = score;
    Thecombo.innerText = "Combo : " + combo;
}, 50/speed)

// setInterval(function(){
//     keyhit();
// }, 50/speed)
