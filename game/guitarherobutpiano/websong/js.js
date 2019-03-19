var button = {};
var speed = 2;
var keybutton = {"C":"A", "D":"S", "E":"D", "F":"F", "G":"G", "A":"H", "B":"J", "C2":"K", "bC":"W", "bD":"E", "bF":"T", "bA":"Y", "bB":"U"};
var buttonkey = {"A":"C", "S":"D", "D":"E", "F":"F", "G":"G", "H":"A", "J":"B", "K":"C2", "W":"bC", "E":"bD", "T":"bF", "Y":"bA", "U":"bB"};
var tilewidth = {"TC":50, "TbC":25, "TD":50, "TbD":25, "TE":50, "TF":50, "TbF":25, "TG":50, "TbA":25, "TA":50, "TbB":25, "TB":50};
var score = 0;
var buttonuse = ["A", "S", "D", "F", "G", "H", "J", "W", "E", "T", "Y", "U"];
var presscount = 0;
var notedowned = 0;
var miss = 0;
//pull audio element to play.

//contain playing note.
// var playing = {};

function playsound(soundname, playtime){
    var thesound = document.querySelector(`audio[data-key="` + soundname +`"]`);
    thesound.pause();
    const playPromise = thesound.play();
    if (playPromise !== null){
        thesound.currentTime = 0;
        playPromise.catch(() => { thesound.play(); })
    } 
        // sound[soundname].play();
    setTimeout(function(){
        // thesound.pause();
            // playing[soundname] = 0;
    }, playtime*1000/speed/speed);
}

// function pausesound(soundname){
//     sound[soundname].pause();
//     // playing[soundname] = 0;
// }

setInterval(function(){

}, 50);


document.onkeydown = document.onkeyup = function(e){
    var key_code = String.fromCharCode(e.keyCode);
    button[key_code] = e.type == "keydown";
    for(i in button){
        if(button[i]){
            var tileid = document.getElementById("T" + buttonkey[key_code]);
            if(buttonuse.includes(key_code))
            if(tileid.hasChildNodes()){
                var firstnode = tileid.firstChild;
                var posy = firstnode.getAttribute("y");
                var notesize = Number(firstnode.getAttribute("size"))*20;
                var canhit = (posy >= (450 - notesize)) && (posy <= 450);
                if(!canhit){
                    updatekeyart("T" + buttonkey[key_code], "miss");
                    miss += 1;
                }
            }
            else{
                miss += 1;
            }
        }
    }
    // if(e.type == "keyup" && buttonuse.includes(key_code)){
    //     pausesound(key_code);
    // }
    // if(e.type == "keydown" && buttonuse.includes(key_code)){
    //     playsound(key_code);
    // }
    presscount += e.type == "keyup";
    // keypress.innerText = pressing;
    pressing = "";
}
var allkeyid = {0:"C", 1:"D", 2:"E", 3:"F", 4:"G", 5:"A", 6:"B", 7:"bC", 8:"bD", 9:"bF", 10:"bA", 11:"bB"};

// document.onkeyup = function(){
//     presscount += 1;
// }

for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById(allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
    pk.style.top = 450;
}

for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById("T" + allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
}


setInterval(whatkeypress, 10);


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

function updatekeyart(keyname, statset){
    var keypressed = document.getElementById(keyname);
    keypressed.setAttribute("status", statset);
}

var fallingnote = [];

function addnote(tileid, rythm){
    var note = document.createElement("div");
    note.setAttribute("class", "note");
    note.setAttribute("y", 300);
    note.setAttribute("size", rythm);
    note.setAttribute("keytohit", tileid.slice(1, tileid.length - 1));
    note.setAttribute("soundkey", tileid.slice(1, tileid.length) + "-" + rythm);
    note.setAttribute("hit", "false");
    note.style.width = tilewidth[tileid];
    if(tileid == "0"){
        note.style.display = "none";
    }
    fallingnote.push(note);
    tile = document.getElementById(tileid.slice(0, tileid.length - 1));
    tile.appendChild(note);
    notedowned += 1;
}

var song = 
[["E2", 2], ["G2", 2], ["B2", 4], ["D2", 2], ["bF2", 2], ["B2", 3], ["E2", 2], ["G2", 2], ["B2", 2], ["G2",2],
["E3", 4], ["0", 2], ["E3", 2], ["E2", 2], ["G2", 2], ["B2", 3], ["D2", 2], ["bF3", 2], ["B2", 3], ["G2", 2], ["B3", 2], ["D3", 2], ["B3", 2],
["G2", 4], ["0", 2], ["G2", 2], ["E3", 2], ["0", 2], ["B3", 2], ["C4", 4], ["0", 4], ["E2", 2], ["B2", 2], ["E3", 2], ["bF3", 2],
["G3", 4], ["0", 4], ["C2", 2], ["G2", 2], ["C3", 4], ["B1", 2], ["bF2", 2], ["B2", 4], ["E2", 2], ["G2", 2], ["B", 2], ["G", 2],
["E3", 4], ["0", 2], ["E3", 2], ["E2", 2], ["G2", 2], ["B2", 3], ["D2", 2], ["bF2", 2], ["B2", 3], ["E2", 2], ["G2", 2], ["B2", 2], ["G2", 2],
["E3", 4], ["0", 2], ["E3", 2], ["E2", 2], ["G2", 2], ["B2", 3], ["D2", 2], ["bF3", 2], ["B2", 3], ["G2", 2], ["B3", 2], ["D3", 2], ["B3", 2],
["G2", 4], ["0", 2], ["G2", 2], ["E3", 2], ["0", 2], ["B3", 2], ["C4", 4], ["0", 4], ["E2", 2], ["B2", 2], ["E3", 2], ["bF3", 2],
["G3", 4], ["0", 4], ["C2", 2], ["G2", 2], ["C3", 4], ["B1", 2], ["bF2", 2], ["B2", 3], ["E2", 2], ["A2", 2], ["B2", 2], ["A2", 2], ["G2", 2],

["0", 2], ["0", 2], ["C1", 2], ["G1", 2], ["C2", 2], ["G1", 2], ["C1", 2], ["G1", 2], ["C2", 2], ["G1", 2], ["D1", 2], ["A1", 2], ["D2", 2], ["A1", 2], ["D1", 2], ["A1", 2], ["D2", 2], ["A2", 2], ["B0", 2], ["bF1", 2], ["B1", 2], ["bF1", 2], ["B0", 2], ["bF1", 2], ["B1", 2], ["bF1", 2], ["E1", 2], ["G1", 2], ["B1", 2], ["G1", 2],
["E1", 2], ["G1", 2], ["B1", 2], ["G1", 2], ["C1", 2], ["G1", 2], ["C2", 2], ["G1", 2], ["C1", 2], ["G1", 2], ["C2", 2], ["G1", 2], ["D1", 2], ["A1", 2], ["D2", 2], ["A1", 2], ["D1", 2], ["A2", 2], ["D2", 2], ["A1", 2], ["B0", 2], ["bF1", 2], ["B1", 2], ["bF1", 2], ["B0", 2], ["bF1", 2], ["B1", 2], ["bF1", 2], ["E1", 2], ["B1", 2], ["E2", 2], ["B1", 2],
["G2", 4], ["0", 4], ["C3", 4], ["0", 4], ["0", 4], ["B2", 4], ["0", 4], ["0", 3], 
["C3", 4], ["0", 4], ["0", 4], ["B2", 4], ["0", 3], ["0", 4], ["C3", 4], ["0", 4], ["0", 4],
["E1", 2], ["B1", 2], ["E2", 2], ["bF2", 2], ["G2", 4], ["0", 4], ["A0", 2], ["E1", 2], ["A1", 4], ["B0", 2], ["bF1", 2], ["B1", 4], ["E1", 2], ["A1", 2], ["B1", 2], ["A1", 2], ["G1", 4], ["0", 2]];
var songtime = 0;
function playsong(){
    for(let i = 0 ; i <= song.length - 1 ; i++){
        songtime += song[i][1]*(i != 0) + 0.05;
        setTimeout(function(){
            if(song[i][0] != "0"){
                addnote("T" + song[i][0], song[i][1]);
            }
        }, songtime*1000/Math.pow(speed, 2));
    }
}
playsong();

function falldownnote(noteid){
        var note = fallingnote[noteid];
        var posy = Number(note.getAttribute("y"));
        posy += speed;
        note.setAttribute("y", posy);
        note.style.top = posy;
}

function delunbound(noteid){
    var note = fallingnote[noteid];
   // playsound(note.getAttribute("soundkey"));
   // note.parentNode.removeChild(note);
    fallingnote.splice(noteid, 1);

}

function isunboundnote(noteid){
    var note = fallingnote[noteid];
    var posy = Number(note.getAttribute("y"));
    return (posy >= 480)
}

function keyhit(){
    //hit is 450 1 rythm = 20
    for(let i = 0 ; i < fallingnote.length ; i++){
        var posy = fallingnote[i].getAttribute("y");
        var notesize = Number(fallingnote[i].getAttribute("size"))*20;
        var canhit = (posy >= (450 - notesize)) && (posy <= 450);
        var hit = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]]
        // keypress.innerText = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]];
        if(fallingnote[i].getAttribute("hit") == "false" && hit){
            fallingnote[i].setAttribute("hit", hit);
            playsound(fallingnote[i].getAttribute("soundkey"), fallingnote[i].getAttribute("size"));

        }
        // if(hit){
        //     score += 10*speed;
        // }
    }
}

setInterval(function(){
    if(fallingnote){
        for(let i = 0 ; i < fallingnote.length ; i ++){
            falldownnote(i);
            if(isunboundnote(i)){
                delunbound(i);
        }
    }
}
    keyhit();
    // keypress.innerText = JSON.stringify(playing);
    accuracy.innerText = score;
}, 50/speed)

setInterval(function(){
    keyhit();
}, 50/speed)
