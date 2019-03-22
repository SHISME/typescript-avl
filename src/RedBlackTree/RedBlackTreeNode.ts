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

    get uncle() {
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

export {
    RedBlackTreeNode,
};