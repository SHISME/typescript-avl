import { BinarySearchTree } from './BinarySearchTree';
import { BinarySearchTreeNode } from './BinarySearchTreeNode';

class AvlTree extends BinarySearchTree {
   
    public insert(value) {
        super.insert(value);
        let currentNode = this.root.find(value);
        while(currentNode) {
            this.balance(currentNode);
            currentNode = currentNode.parent;
        }
    }

    public balance(node:BinarySearchTreeNode) {
        // 左子树比右子树高出一个以上
        if (node.balanceFactor > 1) {
            // 说明插入方式为leftleft
            if (node.left.balanceFactor > 0) {
                this.rotateLeftLeft(node);
            } else {
                // 插入方式为leftright
                this.rotateLeftRight(node);
            }
        } else if (node.balanceFactor < -1) { // 右子树比左子树高出1个以上

            // 插入方式为 rightright
            if (node.right.balanceFactor < 0) {
                this.rotateRightRight(node);
            } else {
                // 插入方式为 rightLeft
                this.rotateRightLeft(node);
            }
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
    private rotateLeftLeft(rootNode:BinarySearchTreeNode) {
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
    private rotateRightRight(rootNode:BinarySearchTreeNode) {
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
    private rotateLeftRight(rootNode:BinarySearchTreeNode) {
        const leftNode = rootNode.left;
        // 根节点左节点先置空
        rootNode.setLeft(null);

        const leftRightNode = leftNode.right;
        // 准备对左节点右旋转
        leftNode.setRight(null);

        // 把左节点的右节点的左节点放到左节点的右节点上
        if (leftRightNode.left) {
            leftNode.setRight(leftRightNode.left);
            leftRightNode.setLeft(null);
        }

        // 把左节点的右节点向上提升
        rootNode.setLeft(leftRightNode);

        // 把左节点放到左右节点的左节点上
        leftRightNode.setLeft(leftNode);

        // 对根节点用左左操作
        this.rotateLeftLeft(rootNode);
    }

    /**
     *     A
     *  C     B
     *      D
     *        E
     * 先转化成
     *     A
     *   C   D
     *         B
     *       E
     * 第一步可以看做是将 B 的左节点和 D 的右节点做交换，并调换 B 和 D 的层级
     * 
     * 然后再对其做rotateRightRight操作即可
     */
    private rotateRightLeft(rootNode:BinarySearchTreeNode) {
        const rightNode = rootNode.right;
        // 把根节点先置空
        rootNode.setRight(null);

        const rightLeftNode = rightNode.left;
        // 把右节点的左边置空
        rightNode.setLeft(null);

        // 把右左节点的右边设置到右节点的左边
        if (rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right);
            rightLeftNode.setRight(null);
        }

        // 把右左节点上升
        rootNode.setRight(rightLeftNode);

        // 把右节点设置到右左节点的右边
        rightLeftNode.setRight(rightNode);

        this.rotateRightRight(rootNode);
    }

}

export {
    AvlTree,
}