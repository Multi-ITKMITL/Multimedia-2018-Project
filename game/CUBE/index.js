// Chapter1-1
const startButton = document.getElementById("start-button")
const instructions = document.getElementById("instructions-text")
const instructions2 = document.getElementById("instructions-text2")
const instructions3 = document.getElementById("instructions-text3")
const instructions4 = document.getElementById("instructions-text4")
const mainPlayArea = document.getElementById("main-play-area")
const shooter = document.getElementById("player")
const monsterImgs = ['Enermy/E1.png', 'Enermy/E2.png']
const scoreCounter = document.querySelector('#score span')

let justice
let monsterInterval


point = 30;


startButton.addEventListener("click", (event) => {
  point = 30;
  shooter.style.display = 'block'
  playGame()
})


function letmove(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    moveUp()
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    moveDown()
  } else if (event.key === " ") {
    event.preventDefault()
    firebullet()
  }
  
}


function moveUp() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "0px") {
    return
  } else {
    let position = parseInt(topPosition)
    position -= 150
    shooter.style.top = `${position}px`
  }
}

function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "450px") {
    return
  } else {
    let position = parseInt(topPosition)
    position += 150
    shooter.style.top = `${position}px`
  }
}


function firebullet() {
  let bullet = createbulletElement()
  mainPlayArea.appendChild(bullet)
  movebullet(bullet)
}


function createbulletElement() {
  let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
  let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
  let newbullet = document.createElement('img')
  newbullet.src = 'Chapter/bullet.png'
  newbullet.classList.add('bullet')
  newbullet.style.left = `${xPosition}px`
  newbullet.style.top = `${yPosition}px`
  return newbullet
}


function movebullet(bullet) {
  let bulletInterval = setInterval(() => {
    let xPosition = parseInt(bullet.style.left)
    let monsters = document.querySelectorAll(".monster")
    monsters.forEach(monster => {
      if (checkbulletCollision(bullet, monster)) {
        monster.classList.remove("monster")
        monster.classList.add("dead-monster")
        bullet.remove()
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
        point-=1;
      }
    })
    if (xPosition === 900) {
      bullet.remove()
    } else {
      bullet.style.left = `${xPosition + 25}px`
    }
  }, 10)
}


function createMonster() {
  let newMonster = document.createElement('img')
  let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)]
  newMonster.src = monsterSpriteImg
  newMonster.classList.add('monster')
  newMonster.classList.add('monster-transition')
  newMonster.style.left = '900px'
  //newMonster.style.top = `${Math.floor(Math.random() * 500)}px` nomal
  newMonster.style.top = `${Math.floor(Math.random() * 4)*150}px`// easy mode
  mainPlayArea.appendChild(newMonster)
  moveMonster(newMonster)

}



function moveMonster(monster) {
  let moveMonsterInterval = setInterval(() => {
    let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
    if (xPosition <= 0) {
      if (point == 0){
        gameOver2()
      }
      if (Array.from(monster.classList).includes("dead-monster")) {
        monster.remove()
      } else {
          gameOver()
      }
    } else {
      monster.style.left = `${xPosition - 5}px`
    }
  }, 30)
}


function checkbulletCollision(bullet, monster) {
  let bulletLeft = parseInt(bullet.style.left)
  let bulletTop = parseInt(bullet.style.top)
  let bulletBottom = bulletTop - 20
  let monsterTop = parseInt(monster.style.top)
  let monsterBottom = monsterTop - 30
  let monsterLeft = parseInt(monster.style.left)
  if (bulletLeft != 900 && bulletLeft + 40 >= monsterLeft) {
    if ( (bulletTop <= monsterTop && bulletTop >= monsterBottom) ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function gameOver2() {
  window.removeEventListener("keydown", letmove)
  clearInterval(monsterInterval)
  let monsters = document.querySelectorAll(".monster")
      monsters.forEach(monster => monster.remove())
  let bullets = document.querySelectorAll(".bullet")
      bullets.forEach(bullet => bullet.remove())
  setTimeout(() => {
    shooter.style.top = "0px"
    instructions3.style.display = "block"
    instructions4.style.display = "block"
    scoreCounter.innerText = 0
  }, 1100)
  
}




function gameOver() {
  window.removeEventListener("keydown", letmove)
  justice.pause()
  justice.remove()
  clearInterval(monsterInterval)
  let monsters = document.querySelectorAll(".monster")
      monsters.forEach(monster => monster.remove())
  let bullets = document.querySelectorAll(".bullet")
      bullets.forEach(bullet => bullet.remove())
  setTimeout(() => {
    alert(`Mission Fail - yout point ${scoreCounter.innerText}!`)
    shooter.style.top = "0px"
    startButton.style.display = "block"
    instructions.style.display = "block"
    instructions2.style.display = "block"
    scoreCounter.innerText = 0
  }, 1100)
 
}



function playGame() {
  shooter.style.top = "0px"
  startButton.style.display = 'none'
  instructions.style.display = 'none'
  instructions2.style.display = 'none'
  window.addEventListener("keydown", letmove)
  justice = new Audio("Sound/state.mp3")
  justice.play()
  monsterInterval = setInterval(() => { createMonster() }, 2100)
}