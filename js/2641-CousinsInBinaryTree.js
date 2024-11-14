/**
* Definition for a binary tree node.
*/
class TreeNode {
	constructor(val, left, right) {
		/** @type {number} */
		this.val = (val === undefined ? 0 : val);
		/** @type {TreeNode} */
		this.left = (left === undefined ? null : left);
		/** @type {TreeNode} */
		this.right = (right === undefined ? null : right);
	}
}

/**
* @param {TreeNode} root
* @return {TreeNode}
*/
var replaceValueInTree = function(root) {
	/** @type {TreeNode[]} */
	let thisLevel = [root];
	/** @type {TreeNode[]} */
	let nextLevel = [];
	let nextLevelSum = 0;
	do {
		for (const node of thisLevel) {
			if (node.left != null) {
				nextLevel.push(node.left);
				nextLevelSum += node.left.val;
				node.left.val = -(node.left.val) - (node.right?.val ?? 0);
			}
			if (node.right != null) {
				nextLevel.push(node.right);
				nextLevelSum += node.right.val;
				node.right.val = node.left != null ? node.left.val : -(node.right.val);
			}
			console.log(node.val);
		}
		console.log('sum', nextLevelSum);
		for (const node of thisLevel) {
			if (node.left != null) node.left.val += nextLevelSum;
			if (node.right != null) node.right.val += nextLevelSum;
		}
		thisLevel = nextLevel;
		nextLevel = [];
		nextLevelSum = 0;
	} while (thisLevel.length > 0)
	root.val = 0;
	return root;
};
