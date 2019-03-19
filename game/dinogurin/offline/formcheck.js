var pname;
function textcheck(){
	var name = document.getElementById('users').value;
	var namer = name.trim();
	console.log(namer);
	if (namer == ''){
		document.getElementById("warning").innerText = "Enter your name"
	}
	else if (namer.length <= 2){
		document.getElementById("warning").innerText = "too short"
	}
	else {
		pname = namer;
		ready_go();
		document.getElementById('input').style.display = 'none';
		document.getElementById('name').innerText = document.getElementById('users').value;
		playMusic();
	}
}