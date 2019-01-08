function Node(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}

let lastMarble = 7118400;
let numPlayers = 435;

// Initial linked list setup
var headNode = new Node(0, null, null);
var currentNode = new Node(1, headNode, headNode);
headNode.next = currentNode;
headNode.prev = currentNode;
currentNode = insertAfter(currentNode.next, 2);

var players = new Array(numPlayers).fill(0)
var marble = 3
while (marble <= lastMarble) {

    if (marble % 23 == 0) {
      for (var i = 0; i < 7; i++){
        currentNode = currentNode.prev
      }

      let value = currentNode.value;
      let currentPlayer = marble%numPlayers;
      players[currentPlayer] += marble + value;

      currentNode = removeNode(currentNode);
    } else {
        currentNode = insertAfter(currentNode.next, marble);
    }

    marble++;
}

// printList(headNode)
let max = players.reduce(function(a, b) {
    return Math.max(a, b);
})

console.log("High score is: " + max)

function insertAfter(node, value) {
    let newNode = new Node(value, node.next, node)
    node.next.prev = newNode;
    node.next = newNode;
    return newNode;
}

function removeNode(node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  return node.next;
}

function printList(head) {
    console.log(head.value);
    node = head.next;
    while (node.value > head.value) {
        console.log(node.value);
        node = node.next;
    }
}
