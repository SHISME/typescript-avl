import { BinarySearchTree } from './src/BinarySearchTree';
const test = [12,32,34,1,2,4];
const bst = new BinarySearchTree();
test.forEach((num) => {
  bst.insert(num);
})
console.log(bst.contains(4));