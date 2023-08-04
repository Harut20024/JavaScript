const canvas = document.getElementById("MyCanvas");
const context = canvas.getContext("2d");
let Score = document.getElementById("scoreValue");
let ScoreCount = 0;

let Mises = document.getElementById("missesValue");
let MissesCount = 0;

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

    this._img = document.createElement("img");
    this._img.src = "ninja.png";

    this._audio = document.createElement("audio");
    this._audio.src = "Knife.mp3";
  }
  stopY() {
    if (this._y === 250) this._yDelta = 0;
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
    this._audioJump.currentTime = 0;
    this._audioJump.play();
    if (this._y > 20) this._yDelta = -10;
    else this._yDelta = 7;
  }

  fire() {
    const now = Date.now();
    if (now - this._lastShootTime >= this._shootInterval) {
      const x = this._x + this._width;
      const y = this._y + this._height / 2;
      const width = 20;
      const height = 20;

      const bullet = new Bullet(x, y, width, height);
      bullet.goRight();
      data.bullets.push(bullet);

      this._audio.currentTime = 0;
      this._audio.play();

      this._lastShootTime = now; 
    }
  }

}

class Enemy extends GameObj {
  constructor(x, y, width, height) {
    super(x, y, width, height);

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

    if (intersect(this.getBoundingBox(), data.hero.getBoundingBox())) {
      Mises.innerHTML = MissesCount += 1;
      this._stabAudio.currentTime = 0.1;
      this._stabAudio.play();
      this.die();
    }
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

    data.enemies.forEach((enemy) => {
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

let data = {
  hero: new Hero(0, 270, 130, 130),
  bullets: [],
  enemies: [],
  backgroundAudio: BackGraundAudio
};

function update() {
  if (ScoreCount === 30) {
    ScoreCount = 0;
    alert("you win");
    location.reload();
  }
  if (MissesCount === 3) {
    MissesCount = 0;
    alert("you Loose");
    location.reload();
  }

  data.hero.update();
  data.enemies.forEach((enemy) => enemy.update());
  data.bullets.forEach((bullet) => bullet.update());

  data.bullets = data.bullets.filter((bullet) => !bullet.deleteMe);
  data.enemies = data.enemies.filter((enemy) => !enemy.deleteMe);

  if (data.enemies.length === 0) {
    const enemy = new Enemy(canvas.width - 100, 240, 140, 140);
    enemy.goLeft();
    data.enemies.push(enemy);
  }
}

function draw() {
  context.drawImage(BackgraundImg, 0, 0, canvas.width, canvas.height);
  data.hero.render();
  data.bullets.forEach((bullet) => bullet.render());
  data.enemies.forEach((enemy) => enemy.render());
}

function loop() {
  data.backgroundAudio.play();
  requestAnimationFrame(loop);
  update();
  draw();
}

document.addEventListener("keydown", (evt) => {
  if (evt.code === "ArrowRight") {
    data.hero.goRight();
  } else if (evt.code === "ArrowLeft") {
    data.hero.goLeft();
  } else if (evt.code === "ArrowUp") {
    data.hero.jump();
  } else if (evt.code === "Space") {
    data.hero.fire();
  }
});

document.addEventListener("keyup", () => {
  data.hero.stop();
  data.hero.stopY();
});

////////////////////////////////////////////////////

function myFunction() {
  location.reload();
  data.backgroundAudio.pause();
}

//warning function
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    let div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function() { div.style.display = "none"; }, 600);
  };
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
