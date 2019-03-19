import { BinarySearchTree } from './BinarySearchTree';
import { BinarySearchTreeNode } from './BinarySearchTreeNode';

class AvlTree extends BinarySearchTree {
    public balance(node:BinarySearchTreeNode) {
        if (node.balanceFactor > 1) {
        }
    }

    /**
     *   A
     *  B
     * C
     * 
     * 转化为
     * 
     *  B
     * C A
     * 
     * 或者
     * 
     *    A
     *   B E
     *  C F
     * D 
     * 转化为
     * 
     *    B
     *  C    A
     * D    F E
     */
    public rotateLeftLeft(rootNode:BinarySearchTreeNode) {
        const leftNode = rootNode.left;
        // 根节点的左节点设置为空
        rootNode.setLeft(null);

        // 根节点的左节点上升
        if (rootNode.parent) {
          rootNode.parent.setLeft(leftNode);
        } else if (rootNode === this.root) {
          this.root = leftNode;
        }

        // 把左节点的右子树设置到根节点的左边
        if (leftNode.right) {
          rootNode.setLeft(leftNode.right);
        }

        // 把根节点放在左节点的右子树上
        leftNode.setRight(rootNode);
    }

    /**
     * A
     *  B
     *   C
     * 转化为
     *  B
     * A C
     * 
     * 或者
     * 
     *   A
     * B   C
     *    D  E
     *         F
     * 转化为
     *     C
     *   A   E
     *  B D    F
     */
    public rotateRightRight(rootNode:BinarySearchTreeNode) {
        const rightNode = rootNode.right;
        rootNode.setRight(null);

        // 把右节点上升
        if (rootNode.parent) {
            rootNode.parent.setRight(rightNode);
        } else if (rootNode === this.root) {
            this.root = rightNode;
        }

        // 右节点的左子树设置到根节点的右边
        if (rightNode.left) {
            rootNode.setRight(rightNode.left);
        }

        // 把根节点设置到右节点的左边
        rightNode.setLeft(rootNode);
    }

    /**
     *   A
     *  B C
     *   D
     *  E
     * 先转化为
     *     A
     *   D  C 
     *  B
     *   E
     * 然后就可以用rotateLefLeft 旋转就得到结果了
     * 
     */
    public rotateLeftRight(rootNode:BinarySearchTreeNode) {
        const leftNode = rootNode.left;
        // 根节点左节点先置空
        rootNode.setLeft(null);

        const leftRightNode = leftNode.right;
        // 准备对左节点右旋转
        leftNode.setRight(null);

        // 
        if (leftRightNode.left) {
            leftNode.setRight(leftRightNode.left);
            leftRightNode.setLeft(null);
        }

        rootNode.setLeft(leftRightNode);

        leftRightNode.setLeft(leftNode);
        this.rotateLeftLeft(rootNode);
    }
}