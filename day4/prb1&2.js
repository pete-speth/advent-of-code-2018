let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

let events = getSortedEvents(inputs);

// Create a list of guards
// This list will be used to aggregate sleeping/waking info for each guard
var guards = [];
var id = -1;
var guard = {
  id: null,
  sleep: [],
  wake: []
};

events.forEach(function(event) {
  // Update ID if the shift has changed
  if (event.type == "shiftStart") {
    id = event.guard;
  }

  // If current guard exists in list, point to existing guard
  var found = false;
  var guardIndex = -1;
  for (index in guards){
    if (guards[index].id == id){
      guard = guards[index];
      guardIndex = index;
      found = true;
      break;
    }
  }

  // If current guard doesn't exist in list, create new guard object
  if (!found){
    guard = {
      id: id,
      sleep: [],
      wake: []
    };
  }

  // Add event information to guard
  if (event.type == "sleep") {
    guard.sleep.push(event.date.getMinutes());
  } else if (event.type == "wake") {
    guard.wake.push(event.date.getMinutes());
  }

  // Either update existing guard in list or add new guard to list
  if(guardIndex >= 0){
    guards[guardIndex] = guard;
  } else {
    guards.push(guard);
  }
});

// Create a map to indicate the how many times a guard has slept on each minute
// Find guard who has slept the most
var sleepyGuard = {};
sleepyGuard.totalSleep = 0;
guards.forEach(function(guard){
  guard.sleepMap = new Array(60).fill(0);

  for (var i = 0; i < guard.sleep.length; i++){
    for (var j = guard.sleep[i]; j < guard.wake[i]; j++){
      guard.sleepMap[j] += 1;
    }
  }

  guard.totalSleep = guard.sleepMap.reduce((a,b) => a+b, 0);
  if (guard.totalSleep > sleepyGuard.totalSleep){
    sleepyGuard = guard;
  }

});

// Find minute where sleepiest guard is most often sleeping
var sleepiestMinute = 0;
var sleepFreq = 0;
for (var i = 0; i < 60; i++){
  let thisFreq = sleepyGuard.sleepMap[i];
  if (thisFreq > sleepFreq){
    sleepiestMinute = i;
    sleepFreq = thisFreq;
  }
}

console.log("Id of the sleepiest guard: " + sleepyGuard.id);
console.log("Minute that guard has slept the most: " + sleepiestMinute);
console.log("Product is equal to: " + sleepyGuard.id * sleepiestMinute);

// Find the minute on which any single guard has slept the most
var guardId = 0;
sleepiestMinute = 0;
sleepFreq = 0;
guards.forEach(function(guard){
  for (i in guard.sleepMap) {
    let thisFreq = guard.sleepMap[i];
    if (thisFreq > sleepFreq){
      sleepFreq = thisFreq;
      sleepiestMinute = i;
      guardId = guard.id;
    }
  }
})

console.log("\nId of the guard who slept the most on a single minute: " + guardId);
console.log("Minute that guard slept the most: " + sleepiestMinute);
console.log("Product is equal to: " + guardId * sleepiestMinute);


// --- FUNCTION DEFINITIONS ---

// Returns a list of sorted Event objects
function getSortedEvents(inputs) {
  var events = [];
  inputs.forEach(function(input) {
    var event = {};

    if (input.includes("asleep")) {
      event.type = "sleep";
      event.guard = null;
    } else if (input.includes("wakes")) {
      event.type = "wake";
      event.guard = null;
    } else {
      event.type = "shiftStart"
      event.guard = input.match(/(?<=#)\d+/g)[0];
    }

    let dateParams = input.match(/\d+/g);
    event.date = new Date(dateParams[0], dateParams[1], dateParams[2], dateParams[3], dateParams[4], 0, 0);

    events.push(event);
  });

  events.sort(function(e1, e2) {
    return e1.date.getTime() - e2.date.getTime();
  });

  return events
}
