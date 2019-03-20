import { AvlTree } from './src/AvlTree';
const test = new AvlTree();
test.insert(11);
test.insert(2);
test.insert(3);
test.insert(7);
test.insert(8);
console.log(test.toString());