let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

var coords = getCoords(inputs);

// Find grid area of the coordinates
var xMax = 0;
var yMax = 0;
coords.forEach(function(coord){
    if (coord.x > xMax){
        xMax = coord.x;
    }
    if (coord.y > yMax){
        yMax = coord.y;
    }
});

// Measure the distance of each grid point to all coordinates
// Tally points where total distance is within threshold
var regionCount = 0;
for (var i = 0; i <= xMax; i++){
  for (var j = 0; j <= yMax; j++){
    var totalDistance = 0;
    coords.forEach(function(coord){
      totalDistance += measureDistance(i,j,coord.x, coord.y);
    });

    if (totalDistance < 10000){
      regionCount++;
    }
  }
}

console.log("There are %d points within 10000 units of all coordinates", regionCount);


// --- FUNCTION DEFINITIONS ---
function getCoords(inputs){
    var coords = [];
    var count = 1;
    inputs.forEach(function(input){
        let thisCoord = input.match(/\d+/g);
        coords.push({
            id: count,
            x: parseInt(thisCoord[0]),
            y: parseInt(thisCoord[1]),
        });
        count++;
    });

    return coords;
  }

  function measureDistance(startX, startY, endX, endY){
    return Math.abs(startX - endX) + Math.abs(startY - endY);
  }
