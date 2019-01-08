let recipeSequence = "320851";

var recipes = [3,7];
var indexA = 0;
var indexB = 1;

var lastSix = [-1,-1,-1,-1,3,7]

while (lastSix.join("") != recipeSequence){
  let combination = recipes[indexA] + recipes[indexB];

  if (combination/10 >= 1){
    recipes.push(1, combination%10);
    lastSix.splice(0,2);
    lastSix.push(1, combination%10);
  } else {
    recipes.push(combination);
    lastSix.splice(0,1);
    lastSix.push(combination);
  }

  indexA = getCircleIndex(indexA, recipes[indexA]+1, recipes.length);
  indexB = getCircleIndex(indexB, recipes[indexB]+1, recipes.length);
  console.log(lastSix)
}

console.log("There are %d recipes before input sequence appears.", recipes.length-6)

function getCircleIndex(currentIndex, step, arrLength){
  var index = currentIndex + step;
  if (index < 0){
    index = arrLength + index;
  } else if (index >= arrLength){
    index = index % arrLength;
  }

  return index;
}
