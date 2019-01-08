let functions = require('../functions');
let inputs = functions.parseStringInput("input.txt");

let matches = inputs[0].match(/\d+/g);
let license = [];
matches.forEach(match => license.push(parseInt(match)));

var nodes = [];
getChildren2(license, 0);

var checksum = 0;
nodes.forEach(node => node.metadata.forEach(n => checksum += n));
console.log(nodes)

console.log("The checksum of the metadata is: " + checksum);
console.log("The value of the root node is: " + nodes[nodes.length-1].value);

function getChildren(license, index) {
  let childrenLeft = license[index];

  var childNodes = [];
  var totalSize = 0;
  while (childrenLeft > 0) {
    let node = getChildren(license, index + 2 + totalSize);
    childNodes.push(node);
    totalSize += node.size;
    childrenLeft--;
  }

  let amountMeta = license[index + 1];
  let node = {
    numChildren: license[index],
    metaAmount: license[index+1],
    metadata: license.slice(index+2+totalSize,index+2+totalSize+amountMeta),
    size: 2 + amountMeta + totalSize,
    childNodes: childNodes
  };

  if (node.childNodes.length == 0) {
    var value = 0;
    node.metadata.forEach(n => value += n);
    node.value = value;
  } else {

    var value = 0;
    node.metadata.forEach(function (datum){
      if (datum > 0 && datum <= childNodes.length) {
        value += childNodes[datum-1].value;
      }
    });
    node.value = value;
  }

  nodes.push(node);
  // console.log(node);
  return node;
}
