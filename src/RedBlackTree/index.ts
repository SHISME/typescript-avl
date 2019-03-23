import { RedBlackTree } from './RedBlackTree';

const tree = new RedBlackTree();

const node1 = tree.insert(10);
const node2 = tree.insert(-10);
const node3 = tree.insert(20);
const node4 = tree.insert(-20);
console.log(tree.isNodeRed(node3));
