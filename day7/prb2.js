let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

let rules = getRules(inputs);
let numSteps = 26;
let workers = 5;

var steps = [];
var workingOn = [];
var time = 0;

while (steps.length < numSteps){

  // Initialze all steps as available
  var available = [];
  for (var i = 65; i < 65+numSteps; i++){
    available.push(String.fromCharCode(i));
  }

  // Filter out steps that have already been taken or are being worked on
  available = available.filter(function(el){
    for (index in workingOn){
      if (el == workingOn[index].step){
        return false;
      }
    };
    return !steps.includes(el);
  });

  // Filter out steps that are not yet available due to the given rules
  rules.forEach(function(rule){
    let index = available.indexOf(rule.comesAfter);
    if (index >= 0){
      available.splice(index,1);
    }
  });

  // Delegate as many avaialbe steps as possible
  let availableWorkers = workers-workingOn.length
  for (var i = 0; i < availableWorkers; i++){
    if (i < available.length){
      let task = {
        step: available[i],
        timeLeft: getStepTime(available[i])
      }
      // console.log("Delegating task " + task.step)
      workingOn.push(task);
    }
  }

  // Find task with the least amount of time left
  var minTimeLeft = 100;
  var taskToComplete;
  var taskIndex = -1;
  for (index in workingOn) {
    // console.log("%s has %d seconds left.",workingOn[index].step,workingOn[index].timeLeft)
    if (workingOn[index].timeLeft < minTimeLeft){
      taskToComplete = workingOn[index];
      taskIndex = index;
      minTimeLeft = taskToComplete.timeLeft;
    }
  }

  // Complete task with the least amount of time left
  time += taskToComplete.timeLeft;
  steps.push(taskToComplete.step);
  workingOn.splice(taskIndex,1);

  // Remove time from other tasks that were being worked on concurrently
  workingOn.forEach(task => task.timeLeft -= taskToComplete.timeLeft)

  // remove all rules where this step was the comesFirst char
  rules = rules.filter(rule => rule.comesFirst != taskToComplete.step);

  // Log info for this step
  console.log("Time is: %d seconds", time)
  console.log("Step completed: " + taskToComplete.step)
  console.log("Currently working on:")
  console.log(workingOn);
  console.log("=======================================\n")
}

console.log("Time to complete all steps: %d seconds", time )


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

function getStepTime(char){
  return char.charCodeAt(0) - 4;
}
