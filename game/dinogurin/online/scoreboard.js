var config = {
    apiKey: "AIzaSyCUHQjWzjaNnAWZFDESs27rEg0D1_p1nfw",
    authDomain: "dinogu-29338.firebaseapp.com",
    databaseURL: "https://dinogu-29338.firebaseio.com",
    projectId: "dinogu-29338",
    storageBucket: "dinogu-29338.appspot.com",
    messagingSenderId: "858692298345"
  };
  firebase.initializeApp(config);
  //var data = {
  //  name: "jame",
  //  score: 43
  //}
  //ref.push(data);
  var score = 0;
  var database = firebase.database();
  var ref = database.ref('score');
  var i = 0;
  var arr = [];
  //arrow function
  ref.orderByChild("score").limitToLast(10).on("child_added", snap => {
    console.log(i);
    arr.push(snap.val());
    if (i >= 9){
      gotdata();
    }
    i += 1;
    //ส่วนทดสอบ
  /*
    console.log(snap.val());
    var scores = snap.val();
    var keys = Object.keys(scores);
    console.log(keys);
    console.log(scores[keys[0]], scores[keys[1]]);
    */
  },function (errorObject) {
        console.log("The read failed: " + errorObject.code);
  });

  function gotdata(){
    if (arr.length > 10){
      console.log(arr);
      arr.shift();
    }
    var json = arr;
    json.sort(function(a, b){
      return a.score - b.score;
    });
    remove_id("scoreboardz");
    var sb = document.createElement("div");
    sb.setAttribute("id", "scoreboardz");
    document.getElementById("scoreboard").appendChild(sb);
    for (let i = 9; i >= 0; i--){
      var scores = arr[i];
      var sc = document.createElement("div");
      sc.innerHTML = "Name: "+scores.name+" Score: "+scores.score;
      document.getElementById("scoreboardz").appendChild(sc);
    }
    console.log(json);
  }
 
  function remove_id(meatID){
   var elem = document.getElementById(meatID);
    return elem.parentElement.removeChild(elem);
  }