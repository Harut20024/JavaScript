function find(arr, searchText) {
    
    return arr.filter(function(obj){
        const ObjValues =  Object.values(obj)
        for(let i = 0;i< ObjValues.length;i++){
            if((" "+ObjValues[i]).search(searchText) !== -1) return true
        }
            return false
    })

    
}
  
let arr = [
    { name: "Apple", color: "red" },
    { name: "Banana", color: "my favorite color is yellow" },
    { name: "Orange", color: "orange" },
    { name: "Apple", color: "yellow" }
  ]

let NessaryStr = prompt("Insert nessary sentance")
alert(JSON.stringify(find(arr, NessaryStr),undefined,4));