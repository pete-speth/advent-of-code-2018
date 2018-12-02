
module.exports = {

  parseStringInput: function (inputFile){

    let fs = require("fs");
    let content = fs.readFileSync(inputFile, "utf8");
    var inputs = content.split("\n");

    inputs = inputs.filter(function(el){
      regex = /[\w\d]+/g;
      return el.match(regex);
    });

    return inputs
  }

}
