const Canvas = document.querySelector("#MyCanva")
const ctx = Canvas.getContext("2d")
 
let data = {

}

function update(){

}
function render(){
  ctx.clearTect(0,0,Canvas.clientWidth,Canvas.height)
}
function loop(){
  requestAnimationFrame(loop)
  update()
  render()
}

loop()

document.addEventListener("keyup",(evt)=>{
  if(evt.code==="ArrowRight"){

  }
  else if(evt.code==="ArrowLeft"){
    
  }
})
document.addEventListener("k eyup",(evt)=>{

})