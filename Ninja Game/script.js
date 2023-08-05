const canvas = document.getElementById("MyCanvas");
const context = canvas.getContext("2d");
let Score = document.getElementById("scoreValue");
let Mises = document.getElementById("missesValue");
let ScoreCount = 0;
let MissesCount = 0;
let Starscount = 7;

let close = document.getElementsByClassName("closebtn");
let i;

const BackgraundImg = document.createElement("img");
BackgraundImg.src = "backgraund.jpg";

const BackGraundAudio = document.createElement("audio");
BackGraundAudio.src = "forest.mp3";


class GameObj {
  constructor(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;

    this._speed = 1;
    this._xDelta = 0;
    this._yDelta = 0;

    this._img = document.createElement("img");
    this._img.src = "";
  }

  getBoundingBox() {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height
    };
  }

  update() {
    this._x += this._xDelta;
    this._y += this._yDelta;
  }

  render() {
    context.drawImage(this._img, this._x, this._y, this._width, this._height);
  }

  goRight() {
    this._xDelta = this._speed;
  }

  goLeft() {
    this._xDelta = this._speed * -1;
  }

  stop() {
    this._xDelta = 0;
  }
}

class Hero extends GameObj {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this._speed = 5;
    this._shootInterval = 500; 
    this._lastShootTime = 0; 

    this._audioJumpDown = document.createElement("audio");
    this._audioJumpDown.src = "JumpDown.mp3";

    this._audioJump = document.createElement("audio");
    this._audioJump.src = "jump.mp3";

    this._img2 = document.createElement("img");
    this._img2.src = "ninja.png";

    this._img1 = document.createElement("img");
    this._img1.src = "ninja1.png";

    this._audio = document.createElement("audio");
    this._audio.src = "Knife.mp3";
  }
  stopY() {
    if (this._y === 250) this._yDelta = 0;
  }
  render() {
    super.render();
    const enemies = data.objects.filter(obj => obj instanceof Enemy);
      enemies.forEach((enemy) => {
        if (this._x > enemy._x) {
          context.drawImage(this._img1, this._x, this._y, this._width, this._height);
        } else {
          context.drawImage(this._img2, this._x, this._y, this._width, this._height);
        }
      });
    
  }
  update() {
    super.update();
    if (this._x <= -45) this._x = -45;
    if (this._x >= canvas.width - 100) this._x = canvas.width - 100;

    if (this._y < 20) {
      this._yDelta = 7;
    } else if (this._y >= 270) {
      this._yDelta = 0;
    }
    if (this._y < 270) {
      this._audioJumpDown.currentTime = 0.5;
      this._audioJumpDown.play();
    }
  }

  jump() {
    this._audioJump.currentTime = 0.05;
    this._audioJump.play();
    if (this._y > 20) this._yDelta = -10;
    else this._yDelta = 7;
  }

  fire() {
    const now = Date.now();
    if (now - this._lastShootTime >= this._shootInterval && Starscount>0) {
      removeStar(); 
      Starscount -= 1;
      const x = this._x + this._width;
      const y = this._y + this._height / 2;
      const width = 20; 
      const height = 20;

      const bullet = new Bullet(x, y, width, height);
      const enemies = data.objects.filter(obj => obj instanceof Enemy);

      enemies.forEach((enemy) => {
        if (this._x > enemy._x) {
            bullet.goLeft()
        } else {
            bullet.goRight();
          }
        });
      data.objects.push(bullet);

      this._audio.currentTime = 0;
      this._audio.play();
      this._lastShootTime = now; 
    }
}
}

class Enemy extends GameObj {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this._speed = 3;

    this._stabAudio = document.createElement("audio");
    this._stabAudio.src = "Die.mp3";

    this._img = document.createElement("img");
    this._img.src = "Knight.png";
  }

  update() {
    super.update();

    if ((this._xDelta < 0 && this._x + this._width < 0) ||
      (this._xDelta > 0 && this._x > canvas.width)) {
      this.deleteMe = true;
    }
    const hero = data.objects.filter(obj => obj instanceof Hero);
    hero.forEach((hero) => {
      if (intersect(this.getBoundingBox(),hero.getBoundingBox())) {
        Mises.innerHTML = MissesCount += 1;
        this._stabAudio.currentTime = 0.1;
        this._stabAudio.play();
        this.die();
      }
    })
  }

  die() {
    this.deleteMe = true;
  }
}


class Bullet extends GameObj {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this._speed = 10;

    this._img = document.createElement("img");
    this._img.src = "Star.png";

    this._stabAudio = document.createElement("audio");
    this._stabAudio.src = "Die.mp3";
  }

  update() {
    super.update();

    if ((this._xDelta < 0 && this._x + this._width < 0) ||
      (this._xDelta > 0 && this._x > canvas.width)) {
      this.deleteMe = true;
    }
    const enemies = data.objects.filter(obj => obj instanceof Enemy);
    enemies.forEach((enemy) => {
      if (intersect(this.getBoundingBox(), enemy.getBoundingBox())) {
        enemy.die();
        Score.innerHTML = ScoreCount += 1;
        this._stabAudio.currentTime = 0.1;
        this._stabAudio.play();
        this.deleteMe = true;
      }
    });
  }
}



//main code
let data = {
  objects: [new Hero(0, 270, 130, 130)],
  backgroundAudio: BackGraundAudio
};

function update() {
  if (ScoreCount === 5) {
    ScoreCount = 0;
    alert("you win");
    location.reload();
  }
  if (MissesCount === 3) {
    MissesCount = 0;
    alert("you Loose");
    location.reload();
  }

  data.objects.forEach((obj) => obj.update());

  data.objects = data.objects.filter((obj) => obj.deleteMe !== true);
  
  const enemies = data.objects.filter(obj => obj instanceof Enemy);
  if (enemies.length === 0) {
    const enemie = new Enemy(canvas.width - 100, 240, 140, 140);
    enemie.goLeft();
    data.objects.push(enemie);
  }
}

function draw() {
  context.drawImage(BackgraundImg, 0, 0, canvas.width, canvas.height);
  data.objects.forEach(obj => obj.render());
}

function loop() {
  data.backgroundAudio.play();
  requestAnimationFrame(loop);
  update();
  draw();
  createStars(Starscount)
}

document.addEventListener("keydown", (evt) => {
  const hero = data.objects.find(obj => obj instanceof Hero);
  if (evt.code === "ArrowRight") {
    hero.goRight();
  } else if (evt.code === "ArrowLeft") {
    hero.goLeft();
  } else if (evt.code === "ArrowUp") {
    hero.jump();
  } else if (evt.code === "Space") {
    if(Starscount>0){
      hero.fire();
    }
  }
});

document.addEventListener("keyup", () => {
  const hero = data.objects.find(obj => obj instanceof Hero);
  hero.stop();
  hero.stopY();
});

////////////////////////////////////////////////////
//here are functions witch are used

function myFunction() {
  data.backgroundAudio.pause();
  location.reload();
}

//warning function
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function() { div.style.display = "none"; }, 600);
  };
}


//this function is creating stars and adding into html code
function createStars(count) {
  const starContainer = document.getElementById("starContainer");
  starContainer.innerHTML = ""; 
  for (let i = 0; i < count; i++) {
    const star = document.createElement("img");
    star.src = "Star.png"; 
    starContainer.appendChild(star);
  }
}
//when you call this function it delete one of stars
function removeStar() {
  const stars = starContainer.getElementsByTagName("img");
  if (stars.length > 0) {
      starContainer.removeChild(stars[0]);
  }
}
//this function is to detect if objects hit each other
function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
    num1 = Math.min(rect1.x + rect1.width - 20, rect2.x + rect2.width - 20),
    y = Math.max(rect1.y, rect2.y),
    num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return num1 >= x && num2 >= y;
}

//running program
loop();

