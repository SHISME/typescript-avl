import { BinarySearchTreeNode } from '../BinarySearchTree/BinarySearchTreeNode';

class RedBlackTreeNode extends BinarySearchTreeNode {
    public meta:Map<string, any>;
    constructor (value:any) {
        super(value);
        this.meta = new Map();
    }

    public uncle() {
        if (!this.parent) {
            return;
        }
        if (!this.parent.parent) {
            return;
        }
        if (!this.parent.parent.left || this.parent.parent.right) {
            return;
        }
        if (this.parent.parent.left === this.parent.parent) {
            return this.parent.parent.right;
        }
        return this.parent.parent.left;
    }
}