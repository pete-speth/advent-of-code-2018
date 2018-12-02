let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

var doubleCount = 0;
var tripleCount = 0;

inputs.forEach(function(string,index){

    var oneTime = [];
    var twoTimes = [];
    var threeTimes = [];
    var fourTimes = [];

    for(var i=0; i<string.length; i++){
      let char = string.charAt(i);
      if (!fourTimes.includes(char)){
        if (!threeTimes.includes(char)){
          if (!twoTimes.includes(char)){
            if (!oneTime.includes(char)){
              oneTime.push(char);
            } else {
              twoTimes.push(char);
            }
          } else {
            threeTimes.push(char);
          }
        } else {
          fourTimes.push(char);
        }
      }
    }

    triples = threeTimes.length - fourTimes.length;
    doubles = twoTimes.length - threeTimes.length - fourTimes.length;

    if (!doubles == 0){
      doubleCount++;
    }

    if (!triples == 0){
      tripleCount++;
    }

    // console.log("Input: %s, doubles: %d, triples: %d",string, twoTimes.length, threeTimes.length)
});

console.log("Number of strings containing at least one double: " + doubleCount);
console.log("Number of strings containing at least one triple: " + tripleCount);
console.log("Checksum = " + doubleCount*tripleCount);
