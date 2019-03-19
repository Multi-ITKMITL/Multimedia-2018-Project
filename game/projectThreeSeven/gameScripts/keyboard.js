class Keyboard {
    constructor(){
        //let game =  new GameTimer;
        document.addEventListener('keyup',function(event){
            if (event.key == "f"){
                Keyboard.left = true;

            }
            if (event.key == "j"){
                Keyboard.right = true;
            }
        });
        document.addEventListener('keydown',(event) => {
            if (event.key == "f"){
                Keyboard.left = false;
                GameTimer.leftInput();
            }
            if (event.key == "j"){
                Keyboard.right = false;
                GameTimer.rightInput();
            }
        });
    }
}