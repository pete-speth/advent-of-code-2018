let gridSize = 300;
let serialNo = 18;

var powerGrid = [];
for (var i = 0; i < gridSize; i++){
    powerGrid.push(new Array(gridSize));
}

for (var i = 0; i < gridSize; i++){
    for(var j = 0; j < gridSize; j++){
        let thisPower = getPower(i,j,serialNo);
        powerGrid[i][j] = thisPower;
    }
}


var maxSectionPower = 0;
var maxCoord = {x:-1, y: -1}
for (var i = 0; i < gridSize-2; i++){
    for(var j = 0; j < gridSize-2; j++){
        var sectionPower = 0;
        for(var m = 0; m < 3; m++){
            for(var n = 0; n < 3; n++){
                sectionPower += powerGrid[i+m][j+n];
            }
        }

        if (sectionPower > maxSectionPower) {
            maxCoord.x = i;
            maxCoord.y = j;
            maxSectionPower = sectionPower;
        }
    }
}

console.log("Max section power is: " + maxSectionPower);
console.log("Coordinate of this section is: " )
console.log(maxCoord);

function getPower(x,y,sn) {
    var power = ((x + 10)*y + sn)*(x+10);
    power = Math.floor(power%1000/100) - 5;
    return power;
}
