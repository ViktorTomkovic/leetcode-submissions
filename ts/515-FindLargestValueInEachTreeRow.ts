import { makeTree } from "./TreeNodeUtils.ts"
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}


function largestValues(root: TreeNode | null): number[] {
	if (root == null) return [];
	let prevLevel: (TreeNode)[] = [];
	let nextLevel: (TreeNode)[] = [];
	prevLevel.push(root!);
	const maximums: number[] = [];
	while (prevLevel.length > 0) {
		maximums.push(Math.max.apply(null, prevLevel.map(node => node.val)));
		nextLevel = [];
		for (const node of prevLevel) {
			if (node.left != null) {
				nextLevel.push(node.left);
			}
			if (node.right != null) {
				nextLevel.push(node.right);
			}
		}
		prevLevel = nextLevel;
	}
	return maximums;
};

let root;
root = [1,3,2,5,3,null,9];

console.log(largestValues(makeTree(root))); // 1,3,9

root = [1,2,3];
console.log(largestValues(makeTree(root))); // 1,3
