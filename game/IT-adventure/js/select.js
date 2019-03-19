function setPlayer(character) {
    var num;
    document.querySelector("#selectPlayer").style.display = 'none';
    if(character.classList.contains('select2') == true){
        player.player3.status = 1;
    } else if(character.classList.contains('select3') == true){
        player.player3.status = 1;
        player.player4.status = 1;
    }
    document.querySelector("#selectCharacter").style.display = 'inline-block';

}

function characterMananger(change, name) {
    for(let c in player){
        if(player[c].character == 0 && player[c].status == 1 && change == 1){
            player[c].character = name;
            document.querySelector("[charId ="+"\""+name+"\""+"] div").setAttribute("player", c);
            change -= 1;
            checkCharacter();
            break;
        }
    }
}

function checkCharacter(){
    let count = 0;
    for(let c in player){
        if(player[c].status == 1 && player[c].character == 0){
            count += 1
        }
    }
    if(count == 0){
        document.querySelector("#startGame").style.display = 'inline-block';
    }
}

function setCharacter(theChar) {
    let count = 0;
    for(let c in player){
        if(player[c].status == 1 && player[c].character == 0){
            count += 1
        }
    }
    if(theChar.getAttribute("selection") == "0" && count  > 0){
        theChar.setAttribute("selection", "1");
        characterMananger(1, theChar.getAttribute("charId"))
    } else {
        theChar.setAttribute("selection", "0");
        for(let c in player){
            if(theChar.getAttribute("charId") == player[c].character){
                player[c].character = 0;
                console.log(theChar.firstChild);
                theChar.childNodes[1].setAttribute("player", "")
            }
        }
    }
}