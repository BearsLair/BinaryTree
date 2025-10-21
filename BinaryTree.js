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

  // TODO: What to do if value already exists
  insert(value) {
    // Create new leaf node
    const newValue = new Node(value);
    this.array.push(value);
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

    // Remove value from this.array
    const index = this.array.indexOf(value);
    this.array.splice(index, 1);

    // Traverse tree to find parent node of node to be deleted (if value is not root)

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

  find(value) {
    let current = this.root;

    while (current != null) {
      if (current == null) return;

      if (current.data == value) {
        return current;
      }

      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }
  }

  levelOrderForEach(callback) {
    if (callback == null || typeof callback != "function") {
      throw new Error("Parameter is not a function!");
    }
    const userCallback = callback;
    const orderedArray = this.levelOrderTraversal();

    const updatedArray = orderedArray.map((item) => {
      return userCallback(item);
    });

    this.array = updatedArray;

    this.buildTree();
  }

  preOrderForEach(callback) {
    if (callback == null || typeof callback != "function") {
      throw new Error("Parameter is not a function!");
    }
    const userCallback = callback;
    const orderedArray = this.preOrderTraversal();

    const updatedArray = orderedArray.map((item) => {
      return userCallback(item);
    });

    this.array = updatedArray;

    this.buildTree();
  }

  inOrderForEach(callback) {
    if (callback == null || typeof callback != "function") {
      throw new Error("Parameter is not a function!");
    }
    const userCallback = callback;
    const orderedArray = this.inOrderTraversal();

    const updatedArray = orderedArray.map((item) => {
      return userCallback(item);
    });

    this.array = updatedArray;

    this.buildTree();
  }

  postOrderForEach(callback) {
    if (callback == null || typeof callback != "function") {
      throw new Error("Parameter is not a function!");
    }
    const userCallback = callback;
    const orderedArray = this.postOrderTraversal();

    const updatedArray = orderedArray.map((item) => {
      return userCallback(item);
    });

    this.array = updatedArray;

    this.buildTree();
  }

  levelOrderTraversal(root = [this.root.data], nodes = []) {
    // Base case. Return completed node array to beginning of recursive stack
    if (root.length == 0) return nodes;

    let children = [];
    // Add root data to nodes
    root.map((item) => {
      nodes.push(item);
    });

    root.map((item) => {
      // Get node containing children
      let currentNode = this.find(item);

      // Children added children to nodes and children arrays
      if (currentNode.left != null) {
        children.push(currentNode.left.data);
      }
      if (currentNode.right != null) {
        children.push(currentNode.right.data);
      }
    });

    // Recursively obtain children of parent nodes and add them to nodes array
    return this.levelOrderTraversal(children, nodes);
  }

  preOrderTraversal(root = this.root) {
    if (root === null) return;

    let nodes = [];

    nodes.push(root.data);

    if (root.left != null) {
      nodes.push(...this.inOrderTraversal(root.left));
    }

    if (root.right != null) {
      nodes.push(...this.inOrderTraversal(root.right));
    }
    return nodes;
  }

  inOrderTraversal(root = this.root) {
    if (root === null) return;

    let nodes = [];

    if (root.left != null) {
      nodes.push(...this.inOrderTraversal(root.left));
    }

    nodes.push(root.data);

    if (root.right != null) {
      nodes.push(...this.inOrderTraversal(root.right));
    }
    return nodes;
  }

  postOrderTraversal(root = this.root) {
    if (root === null) return;

    let nodes = [];

    // visit left side from root recursively, add that node(s) to BEGINNING of node array
    if (root.left != null) {
      nodes.push(...this.postOrderTraversal(root.left));
    }

    // visit right side from root recursively, add that node(s) to BEGINNING of node array

    if (root.right != null) {
      nodes.push(...this.postOrderTraversal(root.right));
    }

    // visit root, add it to BEGINNING of node array

    nodes.push(root.data);

    return nodes;
  }

  height(value) {
    let current = this.root;
    console.log("current.data: ", current.data);

    // find value
    while (current.data != value) {
      console.log(current.data);
      if (value < current.data) {
        console.log("go left");
        current = current.left;
      } else if (value > current.data) {
        console.log("go right");
        current = current.right;
      }
    }

    console.log(current.data);

    const measureheight = (current, height = 0) => {
      if (current.left === null && current.right === null) {
        return height;
      }

      let left = 0;
      let right = 0;

      if (current.left != null) {
        left = measureheight(current.left, height++);
      }

      if (current.right != null) {
        right = measureheight(current.right, height++);
      }

      if (left > right) {
        return left;
      } else if (left < right) {
        return right;
      } else if (left === right) {
        return left;
      }
    };

    return measureheight(current);
  }

  depth(value) {
    let current = this.root;
    console.log("current.data: ", current.data);
    let depth = 0;

    // find value
    while (current.data != value) {
      console.log(current.data);
      if (value < current.data) {
        console.log("go left");
        current = current.left;
        depth++;
      } else if (value > current.data) {
        console.log("go right");
        current = current.right;
        depth++;
      }
    }

    console.log(current.data);

    return depth;
  }

  isBalanced() {}

  rebalance() {}
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

// TESTING STUFF

// const tree = new Tree([1, 3, 5, 7, 9, 10, 15]);

const tree = new Tree([
  3, 9, 7, 18, 15, 25, 6, 29, 32, 1, 3, 5, 19, 4, 23, 32, 17,
]);

tree.buildTree();

tree.insert(10);
tree.insert(11);
tree.insert(13);

prettyPrint(tree.root);
