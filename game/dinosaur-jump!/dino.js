//โหลดรูปภาพ
let dino = new Image()
let map = new Image()
let rock = new Image()
map.src = 'image/map.png'
dino.src = 'image/dino_fix.png'
rock.src = 'image/rock.png'
//เริ่มเกมส์ จะเรียกฟังก์ชัน start()
map.onload = () => start()
//เข้าถึง tag canvas
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

const scale = 4 //กำหนดขนาด dino ที่จะเเสดงใน canvas
const width = 41 //ความกว้าง dino
const height = 40 //ความยาว dino
const scaleWidth = scale * width
const scaleHeigth = scale * height
ground  = 480 //ตำเเหน่งพื้นที่ dino ยืน
canvasY = 500 
gravity = 20 //เเรงโน้วถ่วง
jumping = true
up = false
velocity = 0
velocity_x = 0
let trap = 500

//ควบคุมเสียงเกมส์
let sound = (id)=>{
    document.getElementById(id).play()
}

let drawFram = (framX, framY, canvasX) => {
    ctx.drawImage(map, 0, 0)
    ctx.drawImage(dino, framX * width, framY * height, width, height, canvasX, canvasY, scaleWidth, scaleHeigth)
    ctx.drawImage(rock, trap, 520,100,100)
}
let jump = (event) => {
    let state = (event.type == 'keydown')?true:false
    up = state
}

//กำหนดจำนวน dino ใน sprite
const cycleLoop = [0, 1, 2, 3, 4, 5]
let currentLoopIndex = 0
let frameCount = 0
steps = 0

let sprite = () => {

    if (up && jumping == false){   
        canvasY -= 300
        sound('jump')
        jumping = true
    }
    

    velocity_x -= 1.5 //force
    velocity += 1.5// gravity

    trap += velocity_x
    canvasY += velocity
    velocity *= 0.5 // ถ่วงเวลา

    if(score < 100){
      velocity_x *= 0.5 //ความเร็วก้อนหิน
    }
    if(score >= 100){
      steps = 1
      velocity_x *= 0.6
      step.innerText = "STEP: " + steps
    }
    if (score >= 300){
      steps = 2
      velocity_x *= 0.8
      step.innerText = "STEP: " + steps
    }
    if (score >= 500){
      steps = 3
      velocity_x *= 0.9
      step.innerText = "STEP: " + steps
    }
    if (score >= 750){
      steps = 4
      velocity_x *= 1
      step.innerText = "STEP: " + steps
    }
    if (score >= 800){
      steps = 5
      velocity_x *= 1.2
      step.innerText = "STEP: " + steps
    }
    //เช็คเวลาชนกัน
    if(trap > 100 && trap < 250 && canvasY > 460){
	  sound('hit')
      score = -1;
	  let distance = [500, 600, 700, 800, 900, 1000, 1200, 650]
      trap = distance[Math.floor(distance.length * Math.random())]
    }

    if(trap < 0){
      let distance = [500, 600, 700, 800, 900, 1000, 1200, 650]
      trap = distance[Math.floor(distance.length * Math.random())]
    }

  // เช็คว่า dino ตกพื้น
  if (canvasY > 480) {

    jumping = false;
    canvasY = 480
    velocity = 0

  }

    frameCount++
    //ความเร็วของ Animation
    if (frameCount < 5){
        window.requestAnimationFrame(sprite)
        return
    }

    frameCount = 0
    //เคลียร์ภาพไม่ให้ซ้อนกัน
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    /*ส่ง sprite ไปทำงานใน draw(framX, framY, canvasX)
        framX คือ cycleLoop[currentLoopIndex]
        framY คือ 0
        canvasx คือ 0
    */
    drawFram(cycleLoop[currentLoopIndex], 0, 150)
    currentLoopIndex++
    if (currentLoopIndex >= cycleLoop.length){
        currentLoopIndex = 0
    }
    let audio_game = document.getElementById('bgm')
    let audio_jump = document.getElementById('jump')
    audio_game.volume = 0.5 // ปรับระดับเสียงเกมส์
    audio_jump.volume = 0.5 // ปรับเสียงกระโดด
    window.requestAnimationFrame(sprite)

}

let start = () => window.requestAnimationFrame(sprite)

//รับค่าจาก keyboard ลูกศรขึ้นม ลง
window.addEventListener('keydown', jump)
window.addEventListener('keyup', jump)

var score = 0;
function addScore() {
    score += 1;
    myScore.innerText = "SCORE: " + pad(score, 4);
}
function pad(n, length) {
  var len = length - (''+n).length;
  return (len > 0 ? new Array(++len).join('0') : '') + n
}
setInterval(addScore, 100);