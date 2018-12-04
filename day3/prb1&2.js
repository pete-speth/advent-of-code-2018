let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

let data = getClaimData(inputs);

// Create a 2D array of zeros to simulate the sheet
var overlapMap = initializeMap(data.size);

// For each claim, add 1 to each map coordinate included
data.claims.forEach(function(claim) {
  let startX = claim.fromLeft;
  let endX = startX + claim.width;
  let startY = claim.fromTop;
  let endY = startY + claim.height;


  for (var x = startX; x < endX; x++) {
    for (var y = startY; y < endY; y++) {
      overlapMap[x][y]++;
    }
  }
});

// # of coords with >1 claim on them = # square inches with overlap
// Mark each coord with overlap as -1 on the map
var overlapCoords = 0;
for (var x = 0; x < data.size; x++) {
  for (var y = 0; y < data.size; y++) {
    if (overlapMap[x][y] > 1) {
      overlapCoords++;
      overlapMap[x][y] = -1;
    }
  }
}

console.log("Square inches with multiple claims = " + overlapCoords);

// Find the claim that doesn't have any coords with value -1
// This is the claim with no overlap
for (var index in data.claims) {
  let claim = data.claims[index];

  let startX = claim.fromLeft;
  let endX = startX + claim.width;
  let startY = claim.fromTop;
  let endY = startY + claim.height;

  var isOverlapped = false;
  for (var x = startX; x < endX; x++) {
    for (var y = startY; y < endY; y++) {
      if (overlapMap[x][y] < 0){
        isOverlapped = true;
        break;
      }
    }
    if (isOverlapped){
      break;
    }
  }

  if (!isOverlapped){
    console.log("Claim #%d has no overlap.",claim.id);
  }
}


// ---FUNCTION DEFINITIONS---

// Creates a claim object from the list of string inputs
function getClaimData(inputs) {
  var claims = [];
  var size = 0;

  inputs.forEach(function(input) {
    let params = input.match(/\d+/g);
    let claim = {
      id: parseInt(params[0]),
      fromLeft: parseInt(params[1]),
      fromTop: parseInt(params[2]),
      width: parseInt(params[3]),
      height: parseInt(params[4]),
    }

    totalWidth = claim.fromLeft + claim.width;
    totalHeight = claim.fromTop + claim.height;

    if (totalWidth > size) {
      size = totalWidth;
    }

    if (totalHeight > size) {
      size = totalHeight;
    }

    claims.push(claim);
  });

  return {
    size: size,
    claims: claims
  };
}

// Creates a 2D array of zeros
function initializeMap(size) {
  var map = [];
  for (var i = 0; i < size; i++) {
    map.push(new Array(size).fill(0));
  }

  return map;
}
