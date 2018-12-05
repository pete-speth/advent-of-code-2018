let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");
let string = inputs[0];

// Find length of reduced polymer
let reduced = reducePolymer(string);
console.log("Length of original polymer after reduction: " + reduced.length);

// Modify the polymer by removing all instances (case insensitive) of one letter
// Repeat for all letters
// Determine the size of the smallest reduction of a modified polymer
var smallestReductionSize = string.length;
for (var char = 65; char < 91; char++){
  var filteredString = []
  for (var index = 0; index < string.length; index++){
    if (!(string.charCodeAt(index) == char || string.charCodeAt(index) == char+32)){
      filteredString.push(string.charAt(index));
    }
  }
  filteredString = filteredString.join("");
  let thisReduction = reducePolymer(filteredString);

  if (thisReduction.length < smallestReductionSize) {
    smallestReductionSize = thisReduction.length;
  }
}

console.log("Smallest possible length of reduced polymer after modification: " + smallestReductionSize);

// --- FUNCTION DEFINITIONS ---

// Eliminates all pairs of adjacent letters that are the same letter and opposite case
// Does this repeatedly until there are no more such pairs
function reducePolymer(string) {
  var isFullyReduced = false;
  while (!isFullyReduced) {
      var reducedString = [];
      for (var i = 0; i < string.length-1; i++){
          destroy = Math.abs(string.charCodeAt(i) - string.charCodeAt(i+1)) == 32;
          destroy ? i++ : reducedString.push(string.charAt(i));

          if (i == string.length-2){
              reducedString.push(string.charAt(i+1));
          }
      }

      reducedString = reducedString.join("");
      isFullyReduced = string.length == reducedString.length;
      string = reducedString;
  }

  return string;
}
