function forEach(arr, func) {
  
  function loop(i) {
    if(i >= arr.length) {
      return;
    }
    func(arr[i], i);
    loop(i + 1);
  }
  loop(0);
}

forEach([5, 4, 3], function(val, i) {
  alert(val + " at index " + i);
});
