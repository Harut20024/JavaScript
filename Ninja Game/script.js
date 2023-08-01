const canvas = document.getElementById("MyCanvas")
const context = canvas.getContext("2d")
let Score = document.getElementById("scoreValue")
let ScoreCount = 0

let Mises = document.getElementById("missesValue")
let MissesCount = 0

let close = document.getElementsByClassName("closebtn");
let i;

//warnin function
for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    let div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}

const BackgraundImg = document.createElement("img")
BackgraundImg.src = "backgraund.jpg"

const HeroImg = document.createElement("img")
HeroImg.src = "ninja.png"

const NinjaStar = document.createElement("img")
NinjaStar.src = "Star.png"

const Enemy = document.createElement("img")
Enemy.src = "Knight.png"

const AudioDefend = document.createElement("audio")
AudioDefend.src = "Die.mp3"

const BackGraundAudio = document.createElement("audio")
BackGraundAudio.src = "forest.mp3"

const Audio = document.createElement("audio")
Audio.src = "Knife.mp3"

const AudioJump = document.createElement("audio")
AudioJump.src = "jump.mp3"

const AudioJumpDown = document.createElement("audio")
AudioJumpDown.src = "JumpDown.mp3"

function myFunction(){
  location.reload();
}


let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 0,
    y: 270,
    width: 130,
    height: 130
  },
  boolets: [],
  enemyes: []

}
//this function is to detect are objects hit each other
function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
      num1 = Math.min(rect1.x + rect1.width-20, rect2.x + rect2.width-20),
      y = Math.max(rect1.y, rect2.y),
      num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y);
};

function update() {
  data.hero.x += data.hero.xDelta

  data.hero.y += data.hero.yDelta

  if(data.hero.y<=20) {
    data.hero.yDelta = 7
  }
  else if(data.hero.y>=270){
    data.hero.yDelta = 0
  } 
  if(data.hero.y<270){
    AudioJumpDown.currentTime = 0;
    AudioJumpDown.play()
  }


  data.boolets.forEach(function(bullet){
    data.enemyes.forEach(function(enemi){
     if(intersect(bullet,enemi)){
      
      AudioDefend.currentTime = 0;
      AudioDefend.play()
      bullet.deleteMe = true
      enemi.deleteMe1 = true
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
    if(bullet.deleteMe===true)Score.innerHTML = ScoreCount+=1
    return bullet.deleteMe !== true;
  });
  
  data.enemyes = data.enemyes.filter(function(enemi) {
    if(enemi.deleteMe===true)Mises.innerHTML = MissesCount+=1
    return  enemi.deleteMe1!== true
  });

  data.enemyes = data.enemyes.filter(function(enemi) {
    return enemi.deleteMe !== true 
  });

  data.boolets.forEach(function (bullet) {
    if(bullet.deleteMe===true) Score.innerHTML = MissesCount++
    bullet.x += bullet.xDelta
  })
  data.boolets = data.boolets.filter(function(bullet){
    if(bullet.x>canvas.width) return false
    else  return true
  })
  data.enemyes = data.enemyes.filter(function(enemi){
    if(enemi.x<0) return false
    else  return true
  })
  data.enemyes.forEach(function(enemi){
    enemi.x += enemi.xDelta
  })
  if(data.enemyes.length===0 ) data.enemyes.push({
    xDelta: -1,
    x: canvas.width-100,
    y: 220,
    width: 140,
    height: 140
  })
  if(data.hero.x<=-45) data.hero.x =-45

  if(data.hero.x>=canvas.width-100) data.hero.x =canvas.width-100
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
  if(MissesCount === 3 ){
    alert("you Loose")
    MissesCount = 0
    location.reload();
    
  } 
}

document.addEventListener("keydown", function (evn) {

  if (evn.code === "ArrowRight") data.hero.xDelta = 5
  else if (evn.code === "ArrowLeft") data.hero.xDelta = -5
  else if (evn.code === "ArrowUp"&&data.hero.y>20){
    AudioJump.currentTime = 0;
    AudioJump.play()
    data.hero.yDelta = -10
  } 
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
  if(data.hero.y===250) data.hero.yDelta = 0
  
})

loop()