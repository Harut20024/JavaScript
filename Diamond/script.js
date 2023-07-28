let input = +prompt("input number")
let i
function Diamond(num){
  let result = ""
  var SameNum = 1

  for(i=1;i<=num;i++){
      result += '*'
      if(i%2!==0&&SameNum===i) {
        if(i===1)result +="\n"
        else result +="*\n"
        SameNum = i+2
        if(i===num-2) break
        else i=1
      }
  }
  debugger
  SameNum = num
  for(i=1;i<=num;i++){
    result += '*'
    if(SameNum===1) break
    if(i%2!==0&&SameNum===i) {
      if(i===5)result +="\n"
      else result +="*\n"
      SameNum = i-2
      i=1
    }
}
  return result
}

alert(Diamond(input))