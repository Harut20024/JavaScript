function magic(obj) {
  return Object.keys(obj).reduce(function (aggr, key) {
    aggr[obj[key]] = key;
    return aggr;
  }, {});
}


arr = {
  firstName: "Michael",
  lastName: "Jackson"
};

alert(JSON.stringify(magic(arr)))