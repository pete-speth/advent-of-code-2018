let fs = require('fs');

inputFile = "input.txt";

fs.readFile(inputFile, "utf8", function(error, content){
  if (error) throw error;
  inputs = content.split("\n");

  inputs = inputs.filter(function(el){
    regex = /([+-])*(\d)+/g
    return el.match(regex);
  });

  var index = 0;
  var sum = 0;
  var pastSums = [];

  while (!pastSums.includes(sum)) {
    pastSums.push(sum);
    sum += parseInt(inputs[index]);

    index >= inputs.length-1 ? index=0 : index++;
  }

  console.log(sum);
});
