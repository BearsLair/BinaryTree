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
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }

    if (newValue.data < parent.data) {
      parent.left = newValue;
    } else {
      parent.right = newValue;
    }
    return newValue;
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null;
    let traveledLeftSide = false;
    let childData = [];

    // Recursive function to retrieve data from children
    const retrieveChildData = (child) => {
      if (child == null) return;

      childData.push(child.data);

      retrieveChildData(child.left);
      retrieveChildData(child.right);
    };

    // In case the value is the root value of binary tree
    if (value == this.root.data) {
      retrieveChildData(this.root.left);
      retrieveChildData(this.root.right);

      this.array = childData;
      this.buildTree();
      return this.root.data;
    }

    // Traverse tree to find parent node of node to be deleted
    while (current.data != value) {
      parent = current;
      if (value < current.data) {
        current = current.left;
        traveledLeftSide = true;
      } else if (value > current.data) {
        current = current.right;
        traveledLeftSide = false;
      }
    }

    // Place data of deleted item's children into childData array
    retrieveChildData(current.left);
    retrieveChildData(current.right);

    if (traveledLeftSide == true && childData.length == 0) {
      parent.left = null;
    } else if (traveledLeftSide == false && childData.length == 0) {
      parent.right = null;
    } else if (traveledLeftSide == true && childData.length > 0) {
      parent.left = null;
      childData.map((item) => {
        this.insert(item);
      });
    } else if (traveledLeftSide == false && childData.length > 0) {
      parent.right = null;
      childData.map((item) => {
        this.insert(item);
      });
    }
    return current.data;
  }
}

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

const tree = new Tree([1, 3, 5, 7, 9, 15, 21]);

tree.buildTree();

console.log(tree.array);

prettyPrint(tree.root);

console.log("New tree after deletion(s): ");

tree.deleteItem(3);
tree.deleteItem(15);
tree.deleteItem(21);
tree.deleteItem(7);

prettyPrint(tree.root);
