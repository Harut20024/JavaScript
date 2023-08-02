function alertFreq(str) {
    const StrArr = str.split("");
    let sum = 0;
    let result = {};
  
    for (let i = 0; i < StrArr.length; i++) {
      for (let j = i; j < StrArr.length; j++) {
        if (StrArr[i] === StrArr[j]) sum++;
      }
    if(result[StrArr[i]]===undefined){
        result[StrArr[i]] = sum;
    }
        sum = 0;
    }
  
    Object.keys(result).forEach(function(key) {
        alert(`${key} : ${result[key]}`);
  })
  
}

let String = prompt("insert your sentance to check count of chars")
alertFreq(String)

  