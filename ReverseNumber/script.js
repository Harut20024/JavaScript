function reverse(num) {
   return (""+num)
    .split("")
    .reverse()
    .join("")
}
const Number = prompt("Input a number to change it")
alert(reverse(Number))
