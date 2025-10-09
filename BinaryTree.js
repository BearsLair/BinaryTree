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
    // Create new leaf node
    const newValue = new Node(value);
    let current = this.root;
    let parent = null;

    // Find where to put leaf node on tree
    while (current != null) {
      parent = current;
      console.log("Value to insert:", value, "/ current.data: ", current.data);
      if (value < current.data) {
        current = current.left;
        console.log("go left");
      } else if (value > current.data) {
        current = current.right;
        console.log("go right");
      }
    }

    if (newValue.data < parent.data) {
      parent.left = newValue;
    } else {
      parent.right = newValue;
    }
    // this.current = newValue;
    return newValue;
  }
  // delete(value) {}
}

const tree = new Tree([1, 3, 5, 7, 9, 15, 21]);

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

tree.insert(2);

console.log("New tree after insertion: ");

prettyPrint(tree.root);
