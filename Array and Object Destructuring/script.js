//////////// Object Destructuring 
const person = {
  FirsName:"Mike",
  LastName:"ALoxyan",
  //age:12 for example there is not any age 
}

const {FirsName: NameOfHero,LastName} = person
alert(NameOfHero)

//if there is not any age it will show Unknow age
function printinfo({FirsName: Name,LastName,age="Unknow"}){
  alert(`our frinds name is ${Name} ${LastName} and he is ${age} years old`)
}
printinfo(person)


//////////// Array Destructuring 
const list = [
  1,12,23
]
const [a,b] = list