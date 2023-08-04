const canvas = document.getElementById("MyCanvas")
const context = canvas.getContext("2d")
let Score = document.getElementById("scoreValue")
let ScoreCount = 0

let Mises = document.getElementById("missesValue")
let MissesCount = 0

let close = document.getElementsByClassName("closebtn");
let i;

const BackgraundImg = document.createElement("img")
BackgraundImg.src = "backgraund.jpg"


const Enemy = document.createElement("img")
Enemy.src = "Knight.png"

const AudioDefend = document.createElement("audio")
AudioDefend.src = "Die.mp3"

const BackGraundAudio = document.createElement("audio")
BackGraundAudio.src = "forest.mp3"

const Audio = document.createElement("audio")
Audio.src = "Knife.mp3"



//construction of bullet
function Bullet(x, y, width, height) {
  const NinjaStar = document.createElement("img");
  NinjaStar.src = "Star.png";
  this.xDelta = 10;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.update = () => {
    this.x += this.xDelta;
    if (this.deleteMe === true) Score.innerHTML = ScoreCount += 1;
    return this.x <= canvas.width && !this.deleteMe;
  };
  this.render = () => {
    context.drawImage(NinjaStar, this.x, this.y, this.width, this.height);
  };
}
//construction of Hero
function Hero(x,y,width,height){
  const AudioJump = document.createElement("audio")
  AudioJump.src = "jump.mp3"

  const AudioJumpDown = document.createElement("audio")
  AudioJumpDown.src = "JumpDown.mp3"

  const HeroImg = document.createElement("img")
  HeroImg.src = "ninja.png"
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  let xDelta = 0;
  let yDelta = 0;


  this.update = () => {
    this.x += xDelta;
    this.y += yDelta;

    if(this.x<=-45) this.x =-45
    if(this.x>=canvas.width-100) this.x =canvas.width-100

    if(this.y<=20) {
      yDelta = 7
    }
    else if(this.y>=270){
      yDelta = 0
    } 
    if(this.y<270){
      AudioJumpDown.currentTime = 0.5;
      AudioJumpDown.play()
    }
  };
  
  this.render = () => {
    context.drawImage(HeroImg, this.x, this.y, width, height);
  };
  
  this.goRight = () => {
    xDelta = 5;
  };
  this.goLeft = () => {
    xDelta = -5;
  };
  this.jump = () => {
  AudioJump.currentTime = 0;
  AudioJump.play()
  yDelta = -10
  }
  this.stopX = () => {
    xDelta = 0;
  }
  this.stopY = () => {
    if(data.hero.y===250) yDelta = 0;
  }
}


let data = {
  hero: new Hero(0,270,130,130),
  boolets: [],
  enemyes: []

}

function update() {
    //BackGraundAudio.play()

    if(ScoreCount === 30 ){
      alert("you win")
      location.reload();
      
    } 
    if(MissesCount === 300 ){
      alert("you Loose")
      location.reload();
      
    } 
    
    data.hero.update()

    data.boolets.forEach(function(bullet){
    data.enemyes.forEach(function(enemi){
     if(intersect(bullet,enemi)){
      // AudioDefend.currentTime = 0;
      // AudioDefend.play()
      bullet.deleteMe = true
      enemi.deleteMe1 = true
     }
    })
  })
  data.enemyes.forEach(function(enemi){
    if(intersect(data.hero,enemi)){
      // AudioDefend.currentTime = 0;
      // AudioDefend.play()
      enemi.deleteMe = true
     }
  })

  data.enemyes = data.enemyes.filter(function(enemi) {
    enemi.x += enemi.xDelta;

    if (enemi.deleteMe === true) {
        Mises.innerHTML = MissesCount += 1;
    }
    return !(enemi.deleteMe === true || enemi.deleteMe1 === true || enemi.x < 0)
});


data.boolets = data.boolets.filter(function (bullet) {
  return bullet.update();
});


  if(data.enemyes.length===0 ) data.enemyes.push({
    xDelta: -1,
    x: canvas.width-100,
    y: 220,
    width: 140,
    height: 140
  })
}

function drow() {
  context.drawImage(BackgraundImg, 0, 0, canvas.width, canvas.height);

  data.hero.render();

  data.boolets.forEach(function (bullet) {
    bullet.render();
  });

  data.enemyes.forEach(function (enemi) {
    context.drawImage(Enemy, enemi.x, enemi.y, enemi.width, enemi.height);
  });
}

function loop() {
  requestAnimationFrame(loop)
  update()
  drow()
}

document.addEventListener("keydown", function (evn) {

  if (evn.code === "ArrowRight")  data.hero.goRight()
  else if (evn.code === "ArrowLeft")  data.hero.goLeft()
  else if (evn.code === "ArrowUp"&&data.hero.y>20) data.hero.jump()
  else if(evn.code === "Space"){
   Audio.currentTime = 0;
    Audio.play()
    data.boolets.push(new Bullet(data.hero.x + data.hero.width,data.hero.y + data.hero.height/2,20,20))
  } 

})
document.addEventListener("keyup", function (evn) {
  data.hero.stopX();
  data.hero.stopY()
})







function myFunction(){
  location.reload();
}

//warnin function
for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    let div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}

//this function is to detect are objects hit each other
function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
      num1 = Math.min(rect1.x + rect1.width-20, rect2.x + rect2.width-20),
      y = Math.max(rect1.y, rect2.y),
      num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y);
};

//running programm
loop()