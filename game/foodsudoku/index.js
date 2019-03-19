const easy = [
  [4,6,0,3,0,5,0,0,7],
  [9,1,0,4,6,0,2,0,0],
  [7,0,5,9,0,2,0,0,3],
  [8,0,0,5,0,6,0,0,2],
  [0,7,4,0,0,0,6,5,0],
  [5,0,0,7,0,1,0,0,8],
  [3,0,0,1,0,9,8,0,6],
  [0,0,9,0,3,8,0,7,4],
  [1,0,0,6,0,4,0,3,9]
];
const solveeasy = [
  [4,6,2,3,8,5,9,1,7],
  [9,1,3,4,6,7,2,8,5],
  [7,8,5,9,1,2,4,6,3],
  [8,3,1,5,4,6,7,9,2],
  [2,7,4,8,9,3,6,5,1],
  [5,9,6,7,2,1,3,4,8],
  [3,4,7,1,5,9,8,2,6],
  [6,5,9,2,3,8,1,7,4],
  [1,2,8,6,7,4,5,3,9]
];
const medium = [
  [0,2,0,0,0,0,7,0,1],
  [0,7,0,0,6,0,8,0,0],
  [8,9,0,7,0,1,0,0,0],
  [0,5,9,1,0,0,0,0,0],
  [6,0,0,9,0,4,0,0,8],
  [0,0,0,0,0,2,5,9,0],
  [0,0,0,4,0,8,0,6,2],
  [0,0,3,0,2,0,0,1,0,],
  [9,0,2,0,0,0,0,8,0],
];
const solvemedium = [
  [5,2,6,8,4,9,7,3,1],
  [3,7,1,2,6,5,8,4,9],
  [8,9,4,7,3,1,2,5,6],
  [2,5,9,1,8,3,6,7,4],
  [6,3,7,9,5,4,1,2,8],
  [1,4,8,6,7,2,5,9,3],
  [7,1,5,4,9,8,3,6,2],
  [4,8,3,5,2,6,9,1,7],
  [9,6,2,3,1,7,4,8,5]
];
const hard = [
  [0,0,0,1,0,0,2,0,5],
  [0,0,0,0,7,0,1,0,0],
  [1,8,2,0,0,0,0,0,0],
  [0,2,0,6,0,0,0,3,0],
  [5,0,0,2,0,9,0,0,4],
  [0,4,0,0,0,3,0,6,0],
  [0,0,0,0,0,0,6,1,9],
  [0,0,6,0,2,0,0,0,0],
  [9,0,7,0,0,8,0,0,0]
];
const solvehard = [ // 0 ==
  [3,7,4,1,8,6,2,9,5],
  [6,9,5,3,7,2,1,4,8],
  [1,8,2,4,9,5,3,7,6],
  [8,2,9,6,4,7,5,3,1],
  [5,6,3,2,1,9,7,8,4],
  [7,4,1,8,5,3,9,6,2],
  [2,5,8,7,3,4,6,1,9],
  [4,3,6,9,2,1,8,5,7],
  [9,1,7,5,6,8,4,2,3]
];
var imgPng = {
    0:"-",
  1: "https://cdn.shopify.com/s/files/1/1061/1924/files/Cherry_Emoji_60x60.png",
  2: "https://cdn.shopify.com/s/files/1/1061/1924/files/Red_Apple_Emoji_60x60.png",
  3: "https://cdn.shopify.com/s/files/1/1061/1924/files/Orange_Emoji_60x60.png",
  4: "https://cdn.shopify.com/s/files/1/1061/1924/files/Grape_Emoji_60x60.png",
  5: "https://cdn.shopify.com/s/files/1/1061/1924/files/Watermelon_Emoji_60x60.png",
  6: "https://cdn.shopify.com/s/files/1/1061/1924/files/Banana_Emoji_60x60.png",
  7: "https://cdn.shopify.com/s/files/1/1061/1924/files/Sushi_Emoji_60x60.png",
  8: "https://cdn.shopify.com/s/files/1/1061/1924/files/Birthday_Cake_Emoji_Icon_60x60.png",
  9: "https://cdn.shopify.com/s/files/1/1061/1924/files/Chocolate_Chip_Emoji_60x60.png"
}
function PuzzleEasy(){
    var a = 1;
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var x = easy[i][j];
            if(x != 0){
                var img = `<img src="${imgPng[x]}" width="42">`
                document.getElementById(a).innerHTML=img;
            }
                      else{
                            document.getElementById(a).innerHTML="";
                        }
            a++;
        }
    }
}
function Solveeasy(){
    var a = 1;
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var x = solveeasy[i][j];
            if(x != 0){
                var img = `<img src="${imgPng[x]}" width="42">`
                document.getElementById(a).innerHTML=img;
            }
            a++;
        }
    }
}
function Puzzlemedium(){
    var a = 1;
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var x = medium[i][j];
            if(x != 0){
                var img = `<img src="${imgPng[x]}" width="42">`
                document.getElementById(a).innerHTML=img;
            }
                      else{
                            document.getElementById(a).innerHTML="";
                        }
            a++;
        }
    }
}
function Solvemedium(){
    var a = 1;
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var x = solvemedium[i][j];
            if(x != 0){
                var img = `<img src="${imgPng[x]}" width="42">`
                document.getElementById(a).innerHTML=img;
            }
            a++;
        }
    }
}
function Puzzlehard(){
    var a = 1;
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var x = hard[i][j];
            if(x != 0){
                var img = `<img src="${imgPng[x]}" width="42">`
                document.getElementById(a).innerHTML=img;
            }
                      else{
                            document.getElementById(a).innerHTML="";
                        }
            a++;
        }
    }
}
function Solvehard(){
    var a = 1;
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var x = solvehard[i][j];
            if(x != 0){
                var img = `<img src="${imgPng[x]}" width="42">`
                document.getElementById(a).innerHTML=img;
            }
            a++;
        }
    }
}