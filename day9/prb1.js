let numPlayers = 435;
let lastMarble = 71184;

var circle = [0,2,1];
var marble = 3;
var currentPosition = 1;

var players = new Array(numPlayers).fill(0);

while (marble <= lastMarble) {
  if (marble % 23 == 0) {
    let currentPlayer = marble % numPlayers;
    currentPosition = getCirclePosition(circle, currentPosition, -7);
    players[currentPlayer] += marble + circle[currentPosition];
    circle.splice(currentPosition,1);

  } else {
    currentPosition = getCirclePosition(circle, currentPosition, 2);
    circle.splice(currentPosition, 0, marble);
  }

  marble++;
}

let max = players.reduce(function(a, b) {
    return Math.max(a, b);
})

console.log("High score is: " + max)

function getCirclePosition(arr, currentIndex, step) {
  var index = currentIndex + step;
  if (index < 0) {
    index = arr.length + index;
  } else if (index >= arr.length) {
    index = index - arr.length;
  }

  return index;
}
