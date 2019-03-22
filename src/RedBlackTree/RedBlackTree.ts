import { RedBlackTreeNode } from './RedBlackTreeNode';
import { BinarySearchTree } from '../BinarySearchTree/BinarySearchTree';

enum RED_BLACK_TREE_COLORS {
    RED,
    BLACK,
};
const COLOR = 'COLOR';

class RedBlackTree extends BinarySearchTree {
    public root:RedBlackTreeNode;

    public makeNodeRed(node:RedBlackTreeNode) {
        node.meta.set(COLOR, RED_BLACK_TREE_COLORS.RED);
        return node;
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
            }
            return;
        } else if (!node.uncle || this.isNodeBlack(node.uncle)) {

        }
    }

    /**
     * 右旋：
     */
    public rightrightRotation(node:RedBlackTreeNode) {
        // const pa
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