class Node {
  constructor(data, leftNode = null, rightNode = null) {
    this.data = data;
    this.left = leftNode;
    this.right = rightNode;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree() {
    const noDuplicates = new Set(this.array);
    const newArray = [...noDuplicates];
    const arr = newArray.sort((a, b) => a - b);
    console.log("array recursion is done on: ", arr);
    this.recursiveTree(arr);
  }

  recursiveTree(arr, start, end) {
    const root = arr[Math.floor((arr.length - 1) / 2)];
    console.log("middle: ", root);
  }
}

const tree = new Tree([17, 12, 1, 5, 3, 7, 11, 5, 17, 3]);

tree.buildTree();

console.log("tree after build: ", tree);
