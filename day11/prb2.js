let gridSize = 300;
let serialNo = 9798;

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
var maxCoord = {x:-1, y: -1};
for (var i = 0; i < gridSize-2; i++){
    for(var j = 0; j < gridSize-2; j++){
        var sectionPower = powerGrid[i][j];

        let sizeLimit = Math.min(gridSize-i, gridSize-j);
        for (var size = 0; size < sizeLimit; size++){
            for (var k = 0; k < size; k++){
                sectionPower += powerGrid[i+size][j+k] + powerGrid[i+k][j+size]
            }
            sectionPower += powerGrid[i+size][j+size];

            if (sectionPower > maxSectionPower) {
                maxCoord.x = i;
                maxCoord.y = j;
                maxSectionPower = sectionPower;
                maxCoord.size = size + 1;
            }
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
