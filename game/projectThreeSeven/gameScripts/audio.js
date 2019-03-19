class audioState{
    constructor(){
        //code
    }
}

class Audio{
    constructor(id){
        this.context = new AudioContext();
        this.target = id;
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = 1;

    }
    play(song){
        URL = new Assets;
        var songBuffer;
        window.fetch(URL.song[this.target].sound).then( response => response.arrayBuffer()).then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
        songBuffer = audioBuffer;
        var source = this.context.createBufferSource();
        source.buffer = songBuffer;
        this.gainNode.connect(this.context.destination);
        this.gainNode.gain.value = 0.5;
        source.connect(this.gainNode);
        source.start();
        let gameTimer = new GameTimer(song);
        gameTimer.startTime(song);

        });
        
    }
}
