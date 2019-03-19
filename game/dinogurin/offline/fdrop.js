console.log(document.getElementById("dino").getAttribute("x"));
var config = {
    apiKey: "AIzaSyCUHQjWzjaNnAWZFDESs27rEg0D1_p1nfw",
    authDomain: "dinogu-29338.firebaseapp.com",
    databaseURL: "https://dinogu-29338.firebaseio.com",
    projectId: "dinogu-29338",
    storageBucket: "dinogu-29338.appspot.com",
    messagingSenderId: "858692298345"
  };
  firebase.initializeApp(config);
function ready_go() {
  //set up page
  document.getElementById("dino").setAttribute("hit", "none");
  document.getElementById("score").innerHTML = "SCORE: 0";
  document.getElementById("hp").innerHTML = "HP: 5";
  document.getElementById("score_push").style.display = "none";
  document.getElementById("input").style.display = "none";
  var mulscore = 1; // เมื่อจบการทำงานให้เป็น 0 score และ hp จะไม่เปลี่ยนแปลง
  var score = 0;
  var hp = 5;// hp เริ่มต้น
  var count = 0; // คือ ID ที่ค่าจะเพิ่มไปเรื่อยๆ ในทุกๆ loop ทีละ 1
  //random_on();
  var delay_drop = 1000; //set ความเร็วในการ drop
  var delay_spawn = 1000; //set ความเร็วในการ spawn
  var spawn = setInterval(random_on, delay_spawn); //สร้างการดรอป
  

  var database = firebase.database();
  var ref = database.ref('score');
  var end = 0; //ป้องกันการนับซ้ำซ้อน
  function random_on(){
    //create Element with
    var rate = Math.floor(Math.random() * 100); // random rate เนื้อหรืออุกกาบาต
    var posXMeat = Math.floor(Math.random() * 5); //random แกน x
    var posYMeat = -1; // แกน y เริ่มต้น
    meat = document.createElement('div'); // สร้าง div
    meat.setAttribute("id", count); //set id เป็น count
    // ดู rate มากกว่าเท่ากับ 80 เป็นผลไม้ 
    if (rate >= 80){
      //set เป็นผลไม้
      meat.setAttribute("class", "fruit");
    }
    // น้อยกว่านั้นเป็นอุกกาบาต
    else {
      //set เป็นอุกกาบาต
      meat.setAttribute("class", "meteor");
    }

    meat.setAttribute("y", posYMeat);
    meat.setAttribute("x", posXMeat);
    document.getElementById("content").appendChild(meat);
    
    var temp = count;// ID ที่
    var iscount = 1; // เซ็คการนับซ้ำซ้อน
    var is_im = 0; //ไม่อมตะ
    //drop object
    drop_meat(is_im, temp, posXMeat, posYMeat, iscount);

    function drop_meat(is_im, para, posit_x, posit_y, is_count){
      /*meat คือสิ่งที่ตกลงมา
        para คือ ID ของสิ่งที่ตกลงมา
        posit_x คือ แกน x ของ object ที่ตกลงมา
        posit_y คือ แกน y ที่อยู่ปัจจุบันของ object
        is_count คือ จะเช็คหรือไม่เช็คตอนโดน กันความซ้ำซ้อนของการนับ
      */
      setTimeout(function drop(){
        var status = 1; //ใช้ป้องกันเมื่อ Element หายแล้วไป set ค่า
        posit_y += 1; //ค่า Y เพิ่มของตกลงมาเรื่อยๆ
        var con = 1;
        //คืนสถานะให้ไดโนเสาร์
        // if (is_im == 1){
        //   document.getElementById("dino").setAttribute("hit", "none");
        // }
        //เมื่อ object ที่ตกลงมาอยู่ใกล้ไดโนเสาร์
        if (posit_y >= 9 && posit_y <= 10 && status == 1 && is_count == 1){
          //check hit ว่าไดโนเสาร์โดน Object ไหม
          if (posit_x ==  document.getElementById("dino").getAttribute("x")){
            console.log("dino hit");
            console.log(document.getElementById(para).getAttribute("class"));
            //check ว่าโดนไร ชนไรเข้าสักอย่างแล้วดิ
            //โดนอาหาร
            if (document.getElementById(para).getAttribute("class") == "fruit"){
              score += (1*mulscore);//เลือดเพิ่ม
              document.getElementById("score").innerHTML = "SCORE: "+score; //update Score
              console.log("this score: "+score);
            }
            //โดนอุกกาบาต
            else {
              //check สถานะว่าเป็นอมตะอยู่ไหม
              if (is_im == 0){
                document.getElementById(para).setAttribute("hit", "meteor");
                document.getElementById("dino").setAttribute("hit", "immortal");
                is_im = 1;
                con = 0;
                hp -= (1*mulscore);
                console.log("HP -1");
                document.getElementById("hp").innerHTML = "HP: "+hp; //update HP
                //เช็คเลือด ถ้าเป็น 0 หยุดเกมส์ HP Check
                if (hp == 0 && end == 0){
                  end = 1;
                  console.log(score);
                  //push ขึ้น firebase ครับ
                  var data = {
                    name: pname,
                    score: score
                  }
                  ref.push(data);
                  console.log("Game End");
                  mulscore = 0; //หยุดเพิ่มค่า
                  clearInterval(spawn);//clear การ spawn}
                  document.getElementById("score_push").style.display = "flex";
                }
              }
            }
          is_count = 0; //หยุดนับในการ Drop ต่อไป
          }
          
        } // if เช็ครอบ
        //คืนค่าสถานะ
        if (is_im == 1 && con == 1 ){
          is_im = 0;
          document.getElementById("dino").setAttribute("hit", "none");
        }

        //ของตกลงมาก็เซตค่า y เปลี่ยนไป
        document.getElementById(para).setAttribute("y", posit_y);
        // recursive ในการ
        if (posit_y <= 10 && status == 1 && end != 1){
         drop_meat(is_im, para, posit_x, posit_y, is_count);
        }
        // remove when out screen ออกไปจากจอเรานะ
        if (posit_y == 11 || end == 1){
         remove(para); //para คือ id
         status = 0; //หยุดนะ
        }
      }, delay_drop);
  }

  //count id +1
  count += 1;
  //remove ID ฟังชั่นลบ ID
  function remove(meatID){
   var elem = document.getElementById(meatID);
    return elem.parentNode.removeChild(elem);
    }
  }
}
