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
* @param {number[]} queries
* @return {number[]}
*/
var treeQueries = function(root, queries) {
	/**@type {Map<number, number>} val -> height */
	const subtreeHeight = new Map();
	subtreeHeight.set(0, 0);
	/**@type {Map<number, number>} val -> height after removal */
	const treeHeightAfterRemoval = new Map();
	/** @param {TreeNode} node */
	const computeHeight = (node) => {
		if (node === null) return 0;
		const result = Math.max(computeHeight(node.left), computeHeight(node.right)) + 1;
		subtreeHeight.set(node.val, result);
		return result;
	}
	/**
	 * @param {TreeNode} node
	 * @param {number} level
	 * @param {number} unclesMaxHeight
	 */
	const computeTreeHeightAfterRemoval = (node, level, unclesMaxHeight) => {
		if (node === null) return;
		const leftHeight = subtreeHeight.get(node?.left?.val ?? 0);
		const rightHeight = subtreeHeight.get(node?.right?.val ?? 0);
		if (node.left !== null) {
			const cousinsMaxHeight = Math.max(unclesMaxHeight, level + rightHeight);
			treeHeightAfterRemoval.set(node.left.val, cousinsMaxHeight);
			computeTreeHeightAfterRemoval(node.left, level + 1, cousinsMaxHeight);
		}
		if (node.right !== null) {
			const cousinsMaxHeight = Math.max(unclesMaxHeight, level + leftHeight);
			treeHeightAfterRemoval.set(node.right.val, cousinsMaxHeight);
			computeTreeHeightAfterRemoval(node.right, level + 1, cousinsMaxHeight);
		}
	}
	computeHeight(root);
	computeTreeHeightAfterRemoval(root, 0, 0);
	console.log(subtreeHeight)
	console.log(treeHeightAfterRemoval)
	const result = [];
	for (const nodeVal of queries) {
		result.push(treeHeightAfterRemoval.get(nodeVal));
	}
	return result;
};

