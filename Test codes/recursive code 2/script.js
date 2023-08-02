function sum(arr) {
   return arr.reduce(function(aggr, val) {
     if(Array.isArray(val)) {
       return aggr + sum(val);
     }
     return aggr + val;
   }, 0);
 }
 
 alert(sum([ 4, 3, [8, 2], [3, 6, [9, 12, 33], 6 ], 7, 8, 9 ]));