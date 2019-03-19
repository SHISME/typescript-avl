class BinaryTreeNode {
  public left?: BinaryTreeNode;
  public right?: BinaryTreeNode;
  public parent?: BinaryTreeNode;
  public value: any;
  
  constructor(value) {
    this.value = value;
  }
  
  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }
  
  get rightHeight() {
    if (!this.right) {
      return 0;
    }
    return this.right.height + 1
  }
  
  get leftHeight() {
    if (!this.left) {
      return 0;
    }
    return this.left.height + 1;
  }
  
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }
  
  setValue(value) {
    this.value = value;
    return this;
  }
  
  setLeft(node?: BinaryTreeNode) {
    if (this.left) {
      this.left.parent = null;
    }
    this.left = node;
    if (this.left) {
      this.left.parent = this;
    }
    return this;
  }
  
  setRight(node?: BinaryTreeNode) {
    if (this.right) {
      this.right.parent = null;
    }
    this.right = node;
    if (this.right) {
      this.right.parent = this;
    }
    return this;
  }
  
  public removeChild(nodeToRemove: BinaryTreeNode) {
    if (this.left === nodeToRemove) {
      this.left = null;
      return true;
    }
    if (this.right === nodeToRemove) {
      this.right = null;
      return true;
    }
    return false;
  }
  
  public replaceChild(nodeToReplace: BinaryTreeNode, replacementNode: BinaryTreeNode) {
    if (!nodeToReplace || !replacementNode
    ) {
      return false;
    }
    
    if (this.left === nodeToReplace) {
      this.left = replacementNode;
      return true;
    }
    if (this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }
    return false;
  }
  
  public traverseInOrder() {
    let traverse = [];
    if (this.left) {
      traverse = traverse.concat(this.left.traverseInOrder());
    }
    traverse.push(this.value);
    if (this.right) {
      traverse = traverse.concat(this.right.traverseInOrder());
    }
    return traverse;
  }
  
  public toString() {
    return this.traverseInOrder().toString();
  }
}

function copyNode(sourceNode:BinaryTreeNode, targetNode:BinaryTreeNode) {
  targetNode.setValue(sourceNode.value);
  targetNode.setLeft(sourceNode.left);
  targetNode.setRight(sourceNode.right);
}

export {
  copyNode,
  BinaryTreeNode,
};