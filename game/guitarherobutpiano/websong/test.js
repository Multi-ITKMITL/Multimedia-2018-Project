var audio = document.querySelector(`audio[data-key="1"]`);
var playing = 0;
var dur = audio.duration;
function vote(){
    if(playing){
        audio.pause();
        playing = 0;
    }
    else{
        audio.currentTime = 0;
        MarinePA.play();
        playing = 1;
    }

}

setInterval(function(){
    if(audio.ended){
        audio.currentTime = 0;
        playing = 0;
        }
    var now = audio.currentTime;
    var ratio = now/dur;
    console.log(ratio);
    bar.style.width = ratio;
    }, 50)
