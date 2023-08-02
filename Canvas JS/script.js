const Canvas = document.querySelector("#MyCanvas");
const Button = document.querySelector("#MyButton");
const ctx = Canvas.getContext("2d");
let xDelta = 6;
let yDelta = 6;

Canvas.style.backgroundColor = "lightblue";
//Constructor function
function CreatingBalls() {
    this.x = Math.floor(Math.random() * Canvas.width)
    this.y = Math.floor(Math.random() * Canvas.height)
    this.Radius = Math.floor(Math.random() * 50)
    this.fillStyle = getRandomColor()
    this.xDelta = xDelta
    this.yDelta = yDelta
}


let data = {
  balls: []
};

Button.addEventListener("click", function() {
  const ball = new CreatingBalls() 
  data.balls.push(ball);
});


function update() {
  data.balls.forEach(function(ball) {
    if (ball.x+ball.Radius > Canvas.width || ball.x-ball.Radius < 0) ball.xDelta *= -1;
    if (ball.y+ball.Radius > Canvas.height || ball.y-ball.Radius< 0) ball.yDelta *= -1;
    ball.x += ball.xDelta;
    ball.y += ball.yDelta;
  });
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
function draw() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    data.balls.forEach(function(ball) {
    ctx.fillStyle = ball.fillStyle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.Radius, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();