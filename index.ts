import { AvlTree } from './src/AvlTree';
const test = new AvlTree();
test.insert(24);
test.insert(12);
test.insert(34);
test.insert(26);
test.insert(25);

console.log(test.toString());