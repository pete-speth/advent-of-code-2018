let recipeLimit = 320861;

var recipes = [3,7];
var indexA = 0;
var indexB = 1;

while (recipes.length < recipeLimit){
  let combination = recipes[indexA] + recipes[indexB];

  combination/10 >= 1 ? recipes.push(1, combination%10) : recipes.push(combination);
  indexA = getCircleIndex(indexA, recipes[indexA]+1, recipes.length);
  indexB = getCircleIndex(indexB, recipes[indexB]+1, recipes.length);
}

let lastTen = recipes.slice(recipes.length-10, recipes.length);
console.log("The last 10 recipe scores are:")
console.log(lastTen);

function getCircleIndex(currentIndex, step, arrLength){
  var index = currentIndex + step;
  if (index < 0){
    index = arrLength + index;
  } else if (index >= arrLength){
    index = index % arrLength;
  }

  return index;
}
