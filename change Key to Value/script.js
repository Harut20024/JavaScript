function Mag(obj){
  const Keys = Object.keys(obj)
  let NewObj = {}
  Keys.forEach(function(key){
    const Value = obj[key]
    NewObj[Value]=key
  })
  return NewObj
  
}
arr = {
    firstName: "Michael",
    lastName: "Jackson"
};

alert(JSON.stringify(Mag(arr)))