import { BinarySearchTreeNode } from './BinarySearchTreeNode';

class BinarySearchTree {
  public root:BinarySearchTreeNode;
  constructor() {
    this.root = new BinarySearchTreeNode(null);
  }
  
  public insert(value) {
    this.root.insert(value);
  }
  
  public contains(value) {
    return this.root.contains(value);
  }
  
  public remove(value) {
    return this.root.remove(value);
  }
  
  public toString() {
    return this.root.toString();
  }
}

export {
  BinarySearchTree
};
