let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

let initialState = inputs[0].match(/[.#]+/g)[0];
let paddingSize = 50;
let padding = new Array(paddingSize).fill('.').join("");
initialState = padding + initialState + [padding]

var rules = [];
for (var i = 1; i < inputs.length; i++){
  let rawRule = inputs[i].match(/[.#]+/g);
  let rule = {
    pattern: rawRule[0],
    outcome: rawRule[1]
  };

  rules.push(rule);
}

let numGenerations = 50000000000;
var generations = [initialState];

var nonFlowers = [];
var flowers = [];
for (var i = 0; i < numGenerations; i++) {

  nonFlowers = [];
  flowers = [];

  rules.forEach(function(rule){
    var index = generations[i].indexOf(rule.pattern);
    while (index >= 0){
      if (rule.outcome == '.'){
        nonFlowers.push(index+2);
      } else {
        flowers.push(index+2);
      }

      index = generations[i].indexOf(rule.pattern, index+1);
    }
  });

  var newGeneration = new Array(initialState.length).fill('.');
  nonFlowers.forEach(i => newGeneration[i] = '.');
  flowers.forEach(i => newGeneration[i] = '#');
  generations.push(newGeneration.join(""));

  console.log(i)
}

// console.log(generations)
var total = 0
flowers.forEach(function(flower){
  total += flower-paddingSize;
})
console.log(total)
