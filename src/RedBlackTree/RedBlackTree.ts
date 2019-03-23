import { RedBlackTreeNode } from './RedBlackTreeNode';
import { BinarySearchTree } from '../BinarySearchTree/BinarySearchTree';

enum RED_BLACK_TREE_COLORS {
    RED,
    BLACK,
};
const COLOR = 'COLOR';

class RedBlackTree extends BinarySearchTree {
    public root:RedBlackTreeNode;
    constructor() {
        super();
        this.root = new RedBlackTreeNode(null);
    }

    public insert(value:any) {
        const insertedNode = super.insert(value);
        if (this.root === insertedNode) {
            this.makeNodeBlack(insertedNode);
        } else {
            this.makeNodeRed(insertedNode);
        }
        this.balance(insertedNode);
        return insertedNode;
    }

    public makeNodeRed(node:RedBlackTreeNode) {
        node.meta.set(COLOR, RED_BLACK_TREE_COLORS.RED);
        return node;
    }

    public isNodeColored(node) {
        return this.isNodeRed(node) || this.isNodeBlack(node);
    }

    public balance(node:RedBlackTreeNode) {
        if (node === this.root) {
            return;
        }
        // 如果节点的父节点是黑色，不需要去检查平衡性
        if (this.isNodeBlack(node.parent)) {
            return;
        }

        const grantParent = node.parent.parent;
        // 叔叔节点是红色，父节点也是红色
        if (node.uncle && this.isNodeRed(node.uncle)) {
            // 把节点的叔，父节点染黑
            this.makeNodeBlack(node.uncle);
            this.makeNodeBlack(node.parent);

            // 把祖父节点变红，前提是祖父节点不是根节点
            if (this.root !== grantParent) {
                this.makeNodeRed(grantParent);
            } else {
                return;
            }
            // 向上递归平衡树
            this.balance(grantParent);
        } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
            // 叔叔节点是黑色的

            if (grantParent) {
                let newGrantParent;
                if (grantParent.left === node.parent) {
                    // 左左
                    if (node.parent.left === node) {
                        newGrantParent = this.leftLeftRotation(grantParent);
                    } else {
                        // 左右
                        newGrantParent = this.leftRightRotation(grantParent);
                    }
                } else {
                    // 右左
                    if (node.parent.left === node) {
                        newGrantParent = this.rightLeftRotation(grantParent);
                    } else {
                        // 右右
                        newGrantParent = this.rightRightRotation(grantParent);
                    }
                }
                // 确认是否需要将节点放入到根节点
                if (newGrantParent && newGrantParent.parent === null) {
                    this.root = newGrantParent;
                    this.makeNodeBlack(newGrantParent);
                }
                // 向上递归平衡树
                this.balance(newGrantParent);
            }

        }
    }

    /**
     * 右旋：
     */
    public rightRightRotation(node:RedBlackTreeNode) {
        const parentNode = node.parent;
        const rightNode = node.right;
        node.setRight(null);

        // 将rightNode向上升
        if (parentNode) {
            if (parentNode.left === node) {
                parentNode.setLeft(rightNode);
            } else {
                parentNode.setRight(rightNode);
            }
        } else {
            rightNode.parent = null;
        }

        // 把rightNode 的左子树挂到node的右边
        if (rightNode.left) {
            node.setRight(rightNode.left);
        }
        // 把node挂到rightNode 的左子树上
        rightNode.setLeft(node);

        // 交换node和rightNode的颜色
        this.swapNodeColor(rightNode, node);

        // 返回当前子树的root节点
        return rightNode;
    }

    public leftLeftRotation(node:RedBlackTreeNode) {
        const parentNode = node.parent;
        const leftNode = node.left;
        node.setLeft(null);

        // 提升leftNode
        if (parentNode) {
            if (parentNode.left === node) {
                parentNode.setLeft(leftNode);
            } else {
                parentNode.setRight(leftNode);
            }
        } else {
            leftNode.parent = null;
        }

        // 把leftNode的右子树挂到node的左节点上
        if (leftNode.right) {
            node.setLeft(leftNode.right);
        }
        // 把node挂到leftNode 的右子树上
        leftNode.setRight(node);
        // 交换颜色
        this.swapNodeColor(leftNode, node);
        return leftNode;
    }

    public leftRightRotation(node:RedBlackTreeNode) {
        const leftNode = node.left;
        const leftRightNode = leftNode.right;
        leftNode.setRight(null);

        node.setLeft(leftRightNode);
        if (leftRightNode.left) {
            leftNode.setRight(leftRightNode.left);
        }
        leftRightNode.setLeft(leftNode);
        return this.leftLeftRotation(node);
    }

    public rightLeftRotation(node:RedBlackTreeNode) {
        const rightNode = node.right;
        const rightLeftNode = rightNode.left;
        rightNode.setLeft(null);

        node.setRight(rightLeftNode);
        if (rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right);
        }
        rightLeftNode.setRight(rightNode);
        return this.rightRightRotation(node);
    }

    public makeNodeBlack(node:RedBlackTreeNode) {
        node.meta.set(COLOR, RED_BLACK_TREE_COLORS.BLACK);
        return node;
    }

    public isNodeRed(node:RedBlackTreeNode) {
        return node.meta.get(COLOR) === RED_BLACK_TREE_COLORS.RED;
    }

    public isNodeBlack(node:RedBlackTreeNode) {
        return node.meta.get(COLOR) === RED_BLACK_TREE_COLORS.BLACK;
    }

    public swapNodeColor(firstNode:RedBlackTreeNode, secondNode:RedBlackTreeNode) {
        const firstNodeColor = firstNode.meta.get(COLOR);
        const secondNodeColor = secondNode.meta.get(COLOR);
        firstNode.meta.set(COLOR, secondNodeColor);
        secondNode.meta.set(COLOR, firstNodeColor);
    }
}

export {
    RedBlackTree,
};