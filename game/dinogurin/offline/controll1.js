var x = 2;
//with keyboard
document.body.onkeydown = function(event) {
  console.log(event.code);
  console.log(x);
    if (event.code == "ArrowRight")
      x += 1;
    else if (event.code == "ArrowLeft")
      x -= 1;
    if (x >= 4){
      x = 4;
    }
    else if (x <= 0){
      x = 0;
    }
    document.querySelector('#dino').setAttribute('x',x); 
}
//with touchscreen
document.getElementById("conl").onclick = function() {
  console.log("click left");
  x -= 1;
  if (x <= 0){
    x = 0;
  }
  document.querySelector('#dino').setAttribute('x',x);
}
document.getElementById("conr").onclick = function(){
  console.log("click right");
  x += 1;
  if (x >= 4){
    x = 4;
  }
  document.querySelector('#dino').setAttribute('x',x);
}
