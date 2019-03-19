
function gameOver(){
        var audio = document.getElementById("Audio");
        audio.src = "assets/sound/gameover.wav";
        audio.loop = false;
        audio.load();
        audio.playbackRate = 0.5;
        audio.play();
        console.log(audio)
}

function gameWin(){
    var audio = document.getElementById("Audio");
    audio.src = "assets/sound/victory.wav";
    audio.loop = false;
    audio.load();
    audio.playbackRate = 0.8;
    audio.play();
    console.log(audio)
}

function startGame(){
    var audio = document.getElementById("Audio");
        audio.src = "assets/sound/bgm.wav";
        audio.loop = true;
        audio.load();
        audio.volume = 0.25;
        audio.playbackRate = 1;
        audio.play();
}

function walking(){
    var sfx = document.getElementById("SFX");
    if (sfx.src != "assets/sound/walk.wav") {
        sfx.src = "assets/sound/walk.wav";
        sfx.load();
        sfx.volume = 0.5;
    }
    sfx.loop = true;
    sfx.play();
}

function stopWalking(){
    var sfx = document.getElementById("SFX");
    if (sfx.src != "assets/sound/silent.wav") {
        sfx.src = "assets/sound/silent.wav";
        sfx.load();
    }
    sfx.loop = true;
    sfx.play();
}

function getHit(){
    var sfx = document.getElementById("hit");
    if (sfx.src != "assets/sound/hit.wav") {
        sfx.src = "assets/sound/hit.wav";
        sfx.load();
    }
    sfx.play();
}

function fireBullet(){
    var sfx = document.getElementById("hit");
    if (sfx.src != "assets/sound/shoot.wav") {
        sfx.src = "assets/sound/shoot.wav";
    sfx.load();
    }
    sfx.volume = 0.5;
    sfx.play();
}
function monsterHit(){
    var sfx = document.getElementById("mob");
    sfx.src = "assets/sound/ghost.wav";
    sfx.load();
    sfx.play();
}

function soundMute(){
    if (config.gameSound == 1){
        document.getElementById('bgmmute').style.backgroundImage = "url(assets/mute.png)";
        document.getElementById("Audio").muted = true;
        config.gameSound = 0;
    }
    else{
        document.getElementById('bgmmute').style.backgroundImage = "url(assets/unmute.png)";
        document.getElementById("Audio").muted = false;
        config.gameSound = 1;
    }
}

function sfxMute(){
    if (config.sfxSound == 1){
        document.getElementById('sfxmute').style.backgroundImage = "url(assets/mute.png)";
        document.getElementById("SFX").muted = true;
        document.getElementById("hit").muted = true;
        document.getElementById("mob").muted = true;
        config.sfxSound = 0;
    }
    else{
        document.getElementById('sfxmute').style.backgroundImage = "url(assets/unmute.png)";
        document.getElementById("SFX").muted = false;
        document.getElementById("hit").muted = false;
        document.getElementById("mob").muted = false;
        config.sfxSound = 1;
    }
}
