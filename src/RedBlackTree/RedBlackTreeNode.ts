import { BinarySearchTreeNode } from '../BinarySearchTree/BinarySearchTreeNode';

class RedBlackTreeNode extends BinarySearchTreeNode {
    public left?:RedBlackTreeNode;
    public right?:RedBlackTreeNode;
    public parent?:RedBlackTreeNode;
    public meta:Map<string, any>;
    constructor (value:any) {
        super(value);
        this.meta = new Map();
    }

    public insert(value) {
        if (this.value === null) {
          this.value = value;
          return this;
        }
        if (value < this.value) {
          if (this.left) {
            return this.left.insert(value);
          }
          const newNode = new RedBlackTreeNode(value);
          this.setLeft(newNode);
          return newNode;
        }
        if (value > this.value) {
          if (this.right) {
            return this.right.insert(value);
          }
          const newNode = new RedBlackTreeNode(value);
          this.setRight(newNode);
          return newNode;
        }
        return this;
    }

    get uncle() {
        if (!this.parent) {
            return;
        }
        if (!this.parent.parent) {
            return;
        }
        if (!this.parent.parent.left || !this.parent.parent.right) {
            return;
        }
        if (this.parent.parent.left === this.parent) {
            return this.parent.parent.right;
        }
        return this.parent.parent.left;
    }
}

export {
    RedBlackTreeNode,
};