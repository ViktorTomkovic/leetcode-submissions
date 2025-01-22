import { TreeNode, makeArray, makeTree, makeIndeces } from "./TreeNodeUtils.ts";
function reverseOddLevels(root: TreeNode | null): TreeNode | null {
	const array = makeArray(root!);
	const indeces = makeIndeces(array.length, 2, 0);
	// const transposed = array.entries().toArray().toSorted((a, b) => indeces[a[0]] - indeces[b[0]]).map(v => v[1]);
	const transposedArray = new Array<[number, number]>(0);
	for (const entry of array.entries()) transposedArray.push(entry);
	const transposed = transposedArray.sort((a, b) => indeces[a[0]] - indeces[b[0]]).map(v => v[1]);
	const newRoot = makeTree(transposed);
	return newRoot;
}

let root, treeRoot, result;
//Input: root = [2,3,5,8,13,21,34]
//Output: [2,5,3,8,13,21,34]
root = [2, 3, 5, 8, 13, 21, 34];
treeRoot = makeTree(root);
result = reverseOddLevels(treeRoot);
console.log(makeArray(result!));

//Input: root = [7,13,11]
//Output: [7,11,13]
root = [7, 13, 11];
treeRoot = makeTree(root);
result = reverseOddLevels(treeRoot);
console.log(makeArray(result!));


//Input: root = [0,1,2,0,0,0,0,1,1,1,1,2,2,2,2]
//Output: [0,2,1,0,0,0,0,2,2,2,2,1,1,1,1]
root = [0, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
treeRoot = makeTree(root);
result = reverseOddLevels(treeRoot);
console.log(makeArray(result!));

