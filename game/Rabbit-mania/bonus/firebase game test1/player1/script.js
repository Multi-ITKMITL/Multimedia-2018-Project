var box_box_1 = document.getElementById("box1");
var box_box_2 = document.getElementById("box2");
var box_box_3 = document.getElementById("box3");
var box_box_4 = document.getElementById("box4");
var box_box_5 = document.getElementById("box5");
var box_x = box_box_1.getAttribute("x");
var box_y = box_box_1.getAttribute("y");
var box_boost = box_box_1.getAttribute("boost");
var box_speed = 10;
var key_map = {87: false, 65:false, 83:false, 68:false, 32:false};
var offset = 0;

var name = "player1";
var room = "A1";

var box_all = {};
var temp = "";

  box_box_1.style.top = '0px';
  box_box_1.style.left = '0px';
  box_box_2.style.top = '0px';
  box_box_2.style.left = '0px';
  box_box_3.style.top = '0px';
  box_box_3.style.left = '0px';
  box_box_4.style.top = '0px';
  box_box_4.style.left = '0px';
  box_box_5.style.top = '0px';
  box_box_5.style.left = '0px';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIgt35xrVZvgiCLd5N5fcQe5WBCbdGdgg",
    authDomain: "gametest-1.firebaseapp.com",
    databaseURL: "https://gametest-1.firebaseio.com",
    projectId: "gametest-1",
    storageBucket: "",
    messagingSenderId: "822843097189"
  };
  firebase.initializeApp(config);

  var database_naja = firebase.database();
  function sendData(name, pos_x, pos_y, color) {
  	database_naja.ref('ball/' + room + "/" + name).set({
  			pos_x: pos_x,
  			pos_y: pos_y,
  			color: color
  	});
  }

	database_naja.ref('ball/' + room).on('value', function(snapshot) {
		box_all = (snapshot.val());
    if(Object.keys(box_all).length >=2){box_box_2.style.display = "block";}
    if(Object.keys(box_all).length >=3){box_box_3.style.display = "block";}
    if(Object.keys(box_all).length >=4){box_box_4.style.display = "block";}
    if(Object.keys(box_all).length >=5){box_box_5.style.display = "block";}
	});

  //Button press event
document.onkeydown = function(evt){
	evt = evt || window.event;
	key_map[evt.keyCode] = true;
};

document.onkeyup = function(evt) {  /*optional */
    evt = evt || window.event;
    key_map[evt.keyCode] = false;
};


setInterval(function(){
	sendData(name, box_x, box_y, "blue");
	if(key_map[87]&&box_y>0-offset){box_y = parseInt(box_y) - box_speed;}
    if(key_map[65]&&box_x>0){box_x = parseInt(box_x) - box_speed;}
    if(key_map[83]&&box_y<550-offset){box_y = parseInt(box_y) + box_speed;}
    if(key_map[68]&&box_x<750){box_x = parseInt(box_x) + box_speed;}
    if(key_map[32]){box_speed = 10}
    else{box_speed = 10;}
  box_box_1.style.top = box_y+'px';
	box_box_1.style.left = box_x+'px';
  box_box_1.setAttribute("x", box_x);
  box_box_1.setAttribute("y", box_y);
	box_box_2.style.top = box_all["player2"]["pos_y"]+'px';
	box_box_2.style.left = box_all["player2"]["pos_x"]+'px';
  box_box_3.style.top = box_all["player3"]["pos_y"]+'px';
  box_box_3.style.left = box_all["player3"]["pos_x"]+'px';
  box_box_4.style.top = box_all["player4"]["pos_y"]+'px';
  box_box_4.style.left = box_all["player4"]["pos_x"]+'px';
  box_box_5.style.top = box_all["player5"]["pos_y"]+'px';
  box_box_5.style.left = box_all["player5"]["pos_x"]+'px';
},10);

alert("pass");
