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
    const callbackFunc = callback;

    let queue = [];

    const nodesInTree = (node) => {
      if (node == null) return;

      queue.push(node.data);

      nodesInTree(node.left);
      nodesInTree(node.right);

      return queue;
    };

    nodesInTree(this.root);

    let orderedQueue = [this.root.data];
    let itemIndex = 0;
    let children = [];

    while (queue.length > 0) {
      if (orderedQueue.length == 1) {
        itemIndex = queue.indexOf(this.root.data);
        queue.splice(itemIndex, 1);

        orderedQueue.push(this.root.left.data);
        children.push(this.root.left.data);
        itemIndex = queue.indexOf(this.root.left.data);
        queue.splice(itemIndex, 1);

        children.push(this.root.right.data);
        orderedQueue.push(this.root.right.data);
        itemIndex = queue.indexOf(this.root.right.data);
        queue.splice(itemIndex, 1);
      }
      let childrenRemoved = 0;

      children.map((num) => {
        let node = this.find(num);

        // Push left children to orderedQueue
        children.push(node.left.data);
        orderedQueue.push(node.left.data);
        itemIndex = queue.indexOf(node.left.data);
        queue.splice(itemIndex, 1);
        childrenRemoved++;

        // Push right children to orderedQueue
        children.push(node.right.data);
        orderedQueue.push(node.right.data);
        itemIndex = queue.indexOf(node.right.data);
        queue.splice(itemIndex, 1);
        childrenRemoved++;
      });

      // Remove parents from child queue
      for (let i = 0; i < childrenRemoved + 1; i++) {
        children.shift();
      }
    }

    const orderedArray = orderedQueue.map((item) => {
      return callbackFunc(item);
    });

    console.log(orderedArray);

    this.array = orderedArray;
    this.root = null;
    this.buildTree();
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

// const tree = new Tree([1, 3, 5, 7, 9, 15, 21]);

const tree = new Tree([
  3, 9, 7, 18, 15, 25, 6, 29, 32, 1, 3, 5, 19, 4, 23, 32, 17,
]);

tree.buildTree();

prettyPrint(tree.root);

tree.levelOrderForEach((num) => num + 2);

prettyPrint(tree.root);
