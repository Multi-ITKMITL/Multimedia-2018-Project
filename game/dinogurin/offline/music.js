document.getElementById("music").addEventListener('click', playMusic);

function playMusic() {
  if (document.getElementById("music_board").getAttribute("status") == "off"){
  	document.getElementById("music_board").setAttribute("status", "on");
  	document.querySelector('audio').play();
  }
  else {
  	document.getElementById("music_board").setAttribute("status", "off");
  	document.querySelector('audio').pause();
  }
}
