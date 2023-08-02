function Spaces(num) {
    let str = ""
    for (let i = 0; i < num; i++) {
        str += "-"
    }
    return str
}
function Adding(num) {
    let str = ""
    for (let i = 0; i < num; i++) {
        str += "*"
    }
    return str
}

function Diamond(height) {
    let str = ""
    let Butoonspaces = height/2-1
    for (let i = 1; i   <= height; i+=2) {
        str +=Spaces(Butoonspaces)+Adding(i)+"\n"
        Butoonspaces--
    }
    Butoonspaces = 1
    for(let i = height-2; i >= 0; i-=2) {
        str +=Spaces(Butoonspaces)+Adding(i)+"\n"
        Butoonspaces++

    }
    return str
}


let InputNum = +prompt("input number")
alert(Diamond(InputNum))