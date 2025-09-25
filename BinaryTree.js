class Node {
    constructor (data, leftNode, rightNode) {
        this.data = data;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

export class BinaryTree {
    constructor (arr) {
        this.arr = arr;
        this.length = 0;
    }
}

const node = new Node("dog", null, null);

console.log(node);