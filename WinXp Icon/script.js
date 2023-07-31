const canvas = document.getElementById("MyCanvas");
const context = canvas.getContext("2d")
let xDelta = 6
let yDelta = 6

let data = {
  x: 10,
  y: 30,
  height: 50,
  width: 50,
  fillstyle: "blue",
  imageSrc: "icon.png"
}

let image = new Image()
image.src = data.imageSrc


function update(){
  if (data.x + data.width > canvas.width || data.x < 0) xDelta *= -1
  if (data.y + data.height > canvas.height || data.y < 20) yDelta *= -1

  data.x +=xDelta
  data.y +=yDelta

  
}
function drow(){
  context.clearRect(0,0,canvas.width,canvas.height)
  context.drawImage(image, data.x, data.y, data.width, data.height)
}

function loop(){
  requestAnimationFrame(loop)
  update()
  drow()
}

loop()