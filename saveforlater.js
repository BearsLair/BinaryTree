// Not level order, but still useful.

function levelOrderTraversal(root = this.root.data, nodes = [], children = []) {
  if (root == null) return;

  console.log("----------------");
  console.log("root: ", root);
  console.log("nodes: ", nodes);
  console.log("children: ", children);
  console.log("----------------");

  nodes.push(root);
  console.log("nodes after push: ", nodes);

  const currentNode = this.find(root);
  console.log("currentNode: ", currentNode);

  if (currentNode.left != null) {
    children.push(currentNode.left.data);
  }
  if (currentNode.right != null) {
    children.push(currentNode.right.data);
  }

  console.log("children added: ", children);
  console.log("----------------");

  children.map((data) => {
    this.levelOrderTraversal(data, nodes);
  });

  return nodes;
}
