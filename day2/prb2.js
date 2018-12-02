let functions = require("../functions");
let inputs = functions.parseStringInput("input.txt");

for (var i=0; i<inputs.length; i++) {
  for (var j=i+1; j<inputs.length; j++) {

      let string1 = inputs[i];
      let string2 = inputs[j];

      var diffs = 0;
      var index = 0;
      while (diffs < 2 && index < string1.length) {
        if (!(string1.charAt(index) == string2.charAt(index))){
          diffs++;
        }
        index++;
      }

      if (diffs < 2) {
        console.log("String 1: " + string1);
        console.log("String 2: " + string2);
        process.exit(0);
      }
  }
}

console.log("Error: Didn't find any strings with only one different character.")
