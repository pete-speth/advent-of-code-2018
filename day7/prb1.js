let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

let rules = getRules(inputs);
let numSteps = 26;
let steps = [];

while (steps.length < numSteps){
  // Loop through rules to check what is available
  // (Available = There is no comesAfter rule containing char)
  var available = [];
  for (var i = 65; i < 65+numSteps; i++){
    available.push(String.fromCharCode(i));
  }

  available = available.filter(el => !steps.includes(el));

  rules.forEach(function(rule){
    let index = available.indexOf(rule.comesAfter);
    if (index >= 0){
      available.splice(index,1);
    }
  });

  // Add available that is first alphabetically to the completed steps
  steps.push(available[0]);

  // remove all rules where this step was the comesFirst char
  rules = rules.filter(rule => rule.comesFirst != available[0]);
}

console.log("Steps should be completed in order: " + steps.join(""))


// --- FUNCTION DEFINITIONS ---
function getRules(inputs){
  var rules = [];
  inputs.forEach(function(input){
    let matches = input.match(/(?<=[Ss]tep )[A-Z]/g);
    rules.push({
      comesFirst: matches[0],
      comesAfter: matches[1]
    });
  });

  return rules;
}
