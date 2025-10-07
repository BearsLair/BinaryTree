class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
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
    console.log("Array: ", arr);
    this.root = this.recursiveTree(arr, 0, arr.length - 1);
  }

  recursiveTree(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.left = this.recursiveTree(arr, start, mid - 1);
    root.right = this.recursiveTree(arr, mid + 1, end);

    return root;
  }

  insert(value) {
    let current = this.root;
    let nextLeft = null;
    let nextRight = null;

    while (current != null) {
      if (current.data < value) {
        current = current.left;
      }
      if (current.data > value) {
        current = current.right;
      }
    }
  }

  delete(value) {}
}

const tree = new Tree([
  15, 29, 2, 19, 16, 8, 32, 22, 29, 83, 75, 98, 19, 32, 45, 48, 62, 92, 32, 59,
  73, 8, 29, 54, 91, 6, 72, 95, 7, 1,
]);

tree.buildTree();

// Function to visualize tree:
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
