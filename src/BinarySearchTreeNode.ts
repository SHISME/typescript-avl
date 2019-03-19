import { BinaryTreeNode, copyNode } from './BinaryTreeNode';
class BinarySearchTreeNode extends BinaryTreeNode {
  public left?:BinarySearchTreeNode;
  public right?:BinarySearchTreeNode;
  public parent?:BinarySearchTreeNode;
  
  constructor(value:any) {
    super(value);
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
      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);
      return newNode;
    }
    if (value > this.value) {
      if (this.right) {
        return this.right.insert(value);
      }
      const newNode = new BinarySearchTreeNode(value);
      this.setRight(newNode);
      return newNode;
    }
    return this;
  }
  
  public find(value) {
    if (this.value === value) {
      return this;
    }
    if (value < this.value && this.left) {
      return this.left.find(value);
    }
    if (value > this.value && this.right) {
      return this.right.find(value);
    }
    return null;
  }
  
  public contains(value) {
    return !!this.find(value);
  }
  
  remove(value) {
    const nodeToRemove = this.find(value);
    if (!nodeToRemove) {
      throw new Error('Not found the value');
    }
    
    const {parent} = nodeToRemove;
    
    // 无左右子树的情况
    if (!nodeToRemove.left && !nodeToRemove.right) {
      // 如果节点有父节点则在父节点删除该节点
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.setValue(undefined);
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // 同时有左右子树的情况
      // 找到比待删除节点大的下一个节点
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode !== nodeToRemove.right) {
        /**
         * 2
         *   4
         * 3  5
         *
         * 删除4转化为
         * 2
         *   3
         *     5
         */
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else {
        /**
         * 1
         *   2
         *     3
         * 删除2转化为
         * 1
         *   3
         * */
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else {
      const child = nodeToRemove.left
       || nodeToRemove.right;
      if (parent) {
        /**
         * 1
         *  2
         *    4
         *   3  5
         * 删除 2 转化为
         * 1
         *   4
         *  3 5
         */
        parent.replaceChild(nodeToRemove, child);
      } else {
        /**
         * 1
         *  2
         * 3 4
         * 删除1转化为
         *  2
         * 3 4
         */
        copyNode(child, nodeToRemove);
      }
    }
    nodeToRemove.parent = null;
    return true;
    
  }
  
  public findMin() {
    if (!this.left) {
      return this;
    }
    return this.left.findMin();
  }
}

export {
  BinarySearchTreeNode,
}