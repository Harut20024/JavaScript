
function stringifyJSON(input) {
  // undefined
  if(input === undefined) {
     return input;
  }
  
  // null
  if(input === null) {
    return "null"; // 
  }
  
  
  // NaN
  // number
  if(typeof(input) === "number") {
    if(isNaN(input)) {
      return "null";
    }
    
    return "" + input;
  }
  
  // boolean
  if(typeof(input) === "boolean") {
    return "" + input;
  }
  
  // string
  if(typeof(input) === "string") {
    return "\"" + input + "\"";
  }
  
  
  // array
  if(Array.isArray(input)) {
    return "[" + input.filter(function(val) {
      return typeof(val) !== "function";
    }).map(stringifyJSON).join(",") + "]";
  }
  
  // object
  return "{" + Object.keys(input).filter(function(key) {
    return typeof(input[key]) !== "function";
  }).map(function(key) {
    const value = input[key];
    return "\"" + key + "\":" + stringifyJSON(value);
  }) + "}";
}
