function ToNumber(StringNum){

    return StringNum.split("")
    .reverse()
    .map(function(BinNums,i){
        if(BinNums =='1') return Math.pow(2,i)
        else return 0
    })
    .reduce(function(aggr,num){
        return aggr+num
    },0)

}


let BinaryNum = prompt("input binary number")
let FilterNums = ToNumber(BinaryNum)
alert(FilterNums)