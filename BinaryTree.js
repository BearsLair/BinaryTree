class Node {
  constructor(data, leftNode = null, rightNode = null) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree() {
    const arr = this.array;
    if (this.root == null) {
      const rootData = arr[(arr.length - 1) / 2];
      this.root = new Node(rootData);
    }
  }
}

const tree = new Tree([1, 3, 5, 7, 10, 11, 15]);

tree.buildTree();
