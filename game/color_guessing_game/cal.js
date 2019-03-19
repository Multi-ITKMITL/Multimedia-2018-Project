var numberSquares = 6;
var colours = generateColours(numberSquares);
var randomPick = pickColour();
var chosenColour = randomPick;
var score = document.querySelector("#score");
var firstVal = 0;
var squares = document.getElementsByClassName("square");
var shownColour = document.getElementById("colourDisplay");
var resultDisplay = document.querySelector("#result");
var titleBg = document.getElementsByTagName("h1")[0];
var restart = document.querySelector("#restartBtn");
var easy = document.getElementById("easyBtn");
var hard = document.getElementById("hardBtn");
shownColour.textContent = chosenColour;

easy.addEventListener("click", function() {
  this.classList.add("selected");
  hard.classList.remove("selected");
  titleBg.style.background = "forestgreen";
  numberSquares = 3;
  colours = generateColours(numberSquares);
  randomPick = pickColour();
  chosenColour = randomPick;
  shownColour.textContent = chosenColour;

  for (var i = 0; i < squares.length; i++) {
    if(colours[i]) {
      squares[i].style.background = colours[i];
    } else {
      squares[i].style.display ="none";
    }
    if (squares[i].style.opacity = "0") {
      squares[i].style.opacity = "1";
  }
    squares[i].style.pointerEvents = "all";
  }
})

hard.addEventListener("click", function() {
  this.classList.add("selected");
  easy.classList.remove("selected");
  titleBg.style.background = "forestgreen";
  numberSquares = 6;
  colours = generateColours(numberSquares);
  randomPick = pickColour();
  chosenColour = randomPick;
  shownColour.textContent = chosenColour;
  for (var i = 0; i < squares.length; i++) {
      squares[i].style.background = colours[i];
    if (squares[i].style.display = "none") {
      squares[i].style.display = "block";
    }
    if (squares[i].style.opacity = "0") {
      squares[i].style.opacity = "1";
  }
    squares[i].style.pointerEvents = "all";

  }
})

restart.addEventListener("click", function() {
  colours = generateColours(numberSquares);
  chosenColour = pickColour();
  shownColour.textContent = chosenColour;
  resultDisplay.textContent = "";
  this.textContent = "New colors";
  titleBg.style.background = "forestgreen";
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = colours[i];
    resultDisplay.textContent = "Choose your colors";
    if (squares[i].style.opacity = "0") {
      squares[i].style.opacity = "1";
  }
     squares[i].style.pointerEvents = "all";
  }
})

for (var i = 0; i < squares.length; i++) {
    resultDisplay.textContent = "Are you ready?";
  squares[i].style.background = colours[i];
  squares[i].addEventListener("click", function(){
  var clickedColour = this.style.background;
  
   if (clickedColour === chosenColour) {
resultDisplay.textContent = "Well done!";
     rightPick();
     restart.textContent = "Next colors"
   } else {
     this.style.opacity = "0";
     resultDisplay.textContent = "Oops. Try again!";
     firstVal = 0;
     score.textContent = firstVal;
   }  
  })
}


function rightPick () {
    var count = 0;
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].style.opacity = "0") {
      squares[i].style.opacity = "1";
      squares[i].style.background = chosenColour;
    }
    squares[i].style.background = chosenColour;
    squares[i].style.pointerEvents = "none";
  }
  titleBg.style.background = chosenColour;
  score.textContent = firstVal += 1;
  count += 1;
}

function pickColour() {
   var random = Math.floor(Math.random() * colours.length);
   return colours[random];
}

function generateColours(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(createColour());
  }
  return arr;
}

function createColour() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  
  return "rgb(" + r + ", " + g + ", " + b + ")";
}