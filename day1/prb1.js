let fs = require('fs');

inputFile = "input.txt";

fs.readFile(inputFile, "utf8", function(error, content){
  if (error) throw error;
  inputs = content.split("\n");

  inputs = inputs.filter(function(el){
    regex = /([+-])*([0-9])+/g
    return el.match(regex);
  });

  var sum = 0
  inputs.forEach(function(input){
    sum += parseInt(input);
  });

  console.log(sum);
});
