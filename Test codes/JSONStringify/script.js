
function stringifyJSON(input) {
  // undefined
  if(input === undefined) {
     return input;
  }
  
  // null
  if(input === null) {
    return "null"; // change null to "null"
  }
  
  
  // NaN
  // number
  if(typeof(input) === "number") {
    if(isNaN(input)) {
      return "null"; // change NaN to "Null"
    }
    
    return "" + input; // change number to "Number"
  }
  
  // boolean
  if(typeof(input) === "boolean") {
    return "" + input; // change bool to "bool"
  }
  
  // string
  if(typeof(input) === "string") {
    return "\"" + input + "\""; //adding " " before and after string
  }
  
  
  // array
  if(Array.isArray(input)) {
    return "[" + input
    .map(function(val) {//changing undefined to null
      if(val === undefined) {
        return null;
      }
      return val;//if there is not just continue
    }).filter(function(val) {
      return typeof(val) !== "function"; //drop out functions
    }).map(stringifyJSON).join(",") + "]";
  }
  
  // object
  return "{" + Object.keys(input).filter(function(key) {
    return typeof(input[key]) !== "function" &&
      input[key] !== undefined;//drop out undefined and functions
  }).map(function(key) {
    const value = input[key];
    return "\"" + key + "\":" + stringifyJSON(value); // adding " "before and after Keys,adding : and adding value
  }) + "}";
}