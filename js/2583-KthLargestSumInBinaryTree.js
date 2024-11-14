import { MaxPriorityQueue } from "@datastructures-js/priority-queue"
/**
* Definition for a binary tree node.
*/
class TreeNode {
	constructor(val, left, right) {
		this.val = (val === undefined ? 0 : val);
		this.left = (left === undefined ? null : left);
		this.right = (right === undefined ? null : right);
	}
}

/**
* @param {TreeNode} root
* @param {number} k
* @return {number}
*/
var kthLargestLevelSum = function(root, k) {
	/** @type {MaxPriorityQueue<number>} */
	let sums = new MaxPriorityQueue();
	/** @type {TreeNode[]} */
	let thisLevel = [root];
	/** @type {TreeNode[]} */
	let nextLevel = [];
	let thisLevelIndex = 1;
	let thisLevelSum = 0;
	do {
		for (const node of thisLevel) {
			thisLevelSum += node.val;
			if (node.left != null) nextLevel.push(node.left);
			if (node.right != null) nextLevel.push(node.right);
		}
		sums.enqueue(thisLevelSum, thisLevelSum);
		thisLevel = nextLevel;
		nextLevel = [];
		thisLevelIndex++;
		thisLevelSum = 0;
	} while (thisLevel.length > 0)

	if (k > sums.size()) return -1;
	/* @type {number} */
	let result = undefined;
	while (k--) result = sums.dequeue().element;
	return result;
};

var root = new TreeNode(5, new TreeNode(4), new TreeNode(3, new TreeNode(2), new TreeNode(1)));
var k = 5;
console.log(kthLargestLevelSum(root, k));
