let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

var coords = getCoords(inputs);
var mapObj = mapCoords(coords);

// Grow each coordinate outwards until the map is completely filled
var isFull = false;
while (!isFull) {

  // 1 step of horizontal growth + 1 step of vertical growth = 1 step of manhattan distance
  let hFull = mapObj.growHorizontally();
  let vFull = mapObj.growVertically();
  isFull = hFull && vFull;

  // Convert all new growth (negative numbers) to permanent growth
  for (var i = 0; i < mapObj.xMax; i++) {
    mapObj.map[i] = mapObj.map[i].map(el => Math.abs(el));
  }
}

// Count the area of each coordinate zone.
// Mark the coordinate zones that touch the edge of the map
for (var i = 0; i < mapObj.xMax; i++) {
  for (var j = 0; j < mapObj.yMax; j++) {
    let id = mapObj.map[i][j];
    if (id < Infinity) {
      if (i == 0 || j == 0 || i == mapObj.xMax - 1 || j == mapObj.yMax - 1) {
        coords[id - 1].isEdge = true;
      }
      coords[id - 1].area++;
    }
  }
}

// Find the largest coordinate zone that is not on the edge of the map
let boundedCoords = coords.filter(coord => !coord.isEdge);
let largestArea = 0;
boundedCoords.forEach(function(coord) {
  if (coord.area > largestArea) {
    largestArea = coord.area;
  }
});

console.log("The largest bounded area is %d units.", largestArea);


// --- FUNCTION DEFINITIONS ---

// Returns array of all coordinates given
function getCoords(inputs) {
  var coords = [];
  var count = 1;
  inputs.forEach(function(input) {
    let thisCoord = input.match(/\d+/g);
    coords.push({
      id: count,
      x: parseInt(thisCoord[0]),
      y: parseInt(thisCoord[1]),
      area: 0,
      isEdge: false
    });
    count++;
  });

  return coords;
}

// Maps all coordinates on a 2D array, using zeros as the fill
function mapCoords(coords) {

  var xMax = 0;
  var yMax = 0;
  coords.forEach(function(coord) {
    if (coord.x > xMax) {
      xMax = coord.x + 1;
    }
    if (coord.y > yMax) {
      yMax = coord.y + 1;
    }
  });

  var map = [];
  var xMax = 0;
  var yMax = 0;
  coords.forEach(function(coord) {
    if (coord.x > xMax) {
      xMax = coord.x + 1;
    }
    if (coord.y > yMax) {
      yMax = coord.y + 1;
    }
  });
  for (var i = 0; i < xMax; i++) {
    map.push(new Array(yMax).fill(0));
  }

  coords.forEach(function(coord) {
    map[coord.x][coord.y] = coord.id;
  });

  let mapObj = {
    map: map,
    xMax: xMax,
    yMax: yMax,
    growHorizontally: growHorizontally,
    growVertically: growVertically
  }

  return mapObj;
}

// Expand each coordinate zone horizontally by 1 step.
// Mark new growth as the negative of the coordinate Id
// If two new growths occur in the same point from two different coords, mark point as Inf
function growHorizontally() {
  var isFull = true;
  for (var i = 0; i < this.xMax; i++) {
    for (var j = 0; j < this.yMax; j++) {
      if (this.map[i][j] > 0) {
        let left = i - 1;
        if (left >= 0) {
          if (this.map[left][j] == 0) {
            isFull = false;
            this.map[left][j] = this.map[i][j] * -1;
          } else if (this.map[left][j] < 0 && this.map[left][j] * -1 != this.map[i][j]) {
            this.map[left][j] = -Infinity;
          }
        }

        let right = i + 1;
        if (right <= this.xMax - 1) {
          if (this.map[right][j] == 0) {
            isFull = false;
            this.map[right][j] = this.map[i][j] * -1;
          } else if (this.map[right][j] < 0 && this.map[right][j] * -1 != this.map[i][j]) {
            this.map[right][j] = -Infinity;
          }
        }
      }
    }
  }

  return isFull;
}

// Expand each coordinate zone vertically by 1 step.
// Mark new growth as the negative of the coordinate Id
// If two new growths occur in the same point from two different coords, mark point as Inf
function growVertically(mapObj) {
  var isFull = true;
  for (var i = 0; i < this.xMax; i++) {
    for (var j = 0; j < this.yMax; j++) {
      if (this.map[i][j] > 0) {
        let down = j - 1;
        if (down >= 0) {
          if (this.map[i][down] == 0) {
            isFull = false;
            this.map[i][down] = this.map[i][j] * -1;
          } else if (this.map[i][down] < 0 && this.map[i][down] * -1 != this.map[i][j]) {
            this.map[i][down] = -Infinity;
          }
        }

        let up = j + 1;
        if (up <= this.yMax - 1) {
          if (this.map[i][up] == 0) {
            isFull = false;
            this.map[i][up] = this.map[i][j] * -1;
          } else if (this.map[i][up] < 0 && this.map[i][up] * -1 != this.map[i][j]) {
            this.map[i][up] = -Infinity;
          }
        }
      }
    }
  }

  return isFull;
}
