const canvas = document.getElementById("MyCanvas")
const context = canvas.getContext("2d")
let Score = document.getElementById("scoreValue")
let ScoreCount = 0

let Mises = document.getElementById("missesValue")
let MissesCount = 0

const BackgraundImg = document.createElement("img")
BackgraundImg.src = "backgraund.jpg"

const HeroImg = document.createElement("img")
HeroImg.src = "ninja.png"

const NinjaStar = document.createElement("img")
NinjaStar.src = "Star.png"

const Enemy = document.createElement("img")
Enemy.src = "Samurai.png"

const AudioDefend = document.createElement("audio")
AudioDefend.src = "Die.mp3"

const BackGraundAudio = document.createElement("audio")
BackGraundAudio.src = "forest.mp3"

const Audio = document.createElement("audio")
Audio.src = "Knife.mp3"

function myFunction(){
  location.reload();
}


let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 0,
    y: 250,
    width: 150,
    height: 150
  },
  boolets: [],
  enemyes: []

}
//this function is to detect are objects hit each other
function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
      num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
      y = Math.max(rect1.y, rect2.y),
      num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y);
};

function update() {
  data.hero.x += data.hero.xDelta

  data.hero.y += data.hero.yDelta

  data.boolets.forEach(function(bullet){
    data.enemyes.forEach(function(enemi){
     if(intersect(bullet,enemi)){
      
      AudioDefend.currentTime = 0;
      AudioDefend.play()
      bullet.deleteMe = true
      enemi.deleteMee = true
     }
    })
  })
  data.enemyes.forEach(function(enemi){
    
    if(intersect(data.hero,enemi)){
      AudioDefend.currentTime = 0;
      AudioDefend.play()
      enemi.deleteMe = true
     }
  })

  data.boolets = data.boolets.filter(function(bullet) {
    if(bullet.deleteMe===true)Score.innerHTML = ScoreCount++
    return bullet.deleteMe !== true;
  });
  
  data.enemyes = data.enemyes.filter(function(enemi) {
    if(enemi.deleteMe===true)Mises.innerHTML = MissesCount++
    return (enemi.deleteMe !== true || enemi.deleteMee!== true)
  });

  data.boolets.forEach(function (bullet) {
    if(bullet.deleteMe===true) Score.innerHTML = MissesCount++
    bullet.x += bullet.xDelta
  })
  data.boolets = data.boolets.filter(function(bullet){
    if(bullet.x>canvas.width) return false
    else  return true
  })
  data.enemyes.forEach(function(enemi){
    enemi.x += enemi.xDelta
  })
  if(data.enemyes.length===0 ) data.enemyes.push({
    xDelta: -1,
    x: canvas.width-100,
    y: data.hero.y-10,
    width: 100,
    height: 130
  })

}

function drow() {

  context.drawImage(BackgraundImg, 0, 0, canvas.width, canvas.height)

  context.drawImage(HeroImg, data.hero.x, data.hero.y, data.hero.width, data.hero.height)
  
  data.boolets.forEach(function(bullet) {
    context.drawImage(NinjaStar, bullet.x, bullet.y, bullet.width, bullet.height);
  });
  data.enemyes.forEach(function(enemi) {
    context.drawImage(Enemy, enemi.x, enemi.y, enemi.width, enemi.height);
  });
}

function loop() {
  requestAnimationFrame(loop)
  BackGraundAudio.play()
  update()
  drow()
  if(ScoreCount === 30 ){
    alert("you win")
    ScoreCount = 0
    location.reload();
    
  } 
}

document.addEventListener("keydown", function (evn) {

  if (evn.code === "ArrowRight") data.hero.xDelta = 5
  else if (evn.code === "ArrowLeft") data.hero.xDelta = -5
  else if(evn.code === "Space"){
   Audio.currentTime = 0;
    Audio.play()
    data.boolets.push({
      xDelta: 10,
      x: data.hero.x + data.hero.width,
      y: data.hero.y + data.hero.height/2,
      width: 20,
      height: 20
    })
  }

})

document.addEventListener("keyup", function (evn) {
  data.hero.xDelta = 0
})

loop()